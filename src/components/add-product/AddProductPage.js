import React from "react";
import { useState } from "react";
import style from "./AddProductPage.module.scss";
import Dropdown from "./Dropdown";
import Header from "../Header/Header";
import { ValidationFields, getInputPlaceholder } from "./FieldValidations";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [state, setState] = useState({
    sku: "",
    name: "",
    price: "",
    size: "",
    weight: "",
    height: "",
    width: "",
    length: ""
  });

  const [openType, setType] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggler = () => setMenuOpen((hidden) => !hidden);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleProductTypeChange = (selectedOption) => {
    setType(selectedOption.value);
    setErrors({});
  };

  function handleChange(e) {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  }

  const options = [
    { value: "dvd", label: "DVD" },
    { value: "book", label: "Book" },
    { value: "furniture", label: "Furniture" }
  ];

  const renderInputField = (fieldName, label, placeholder) => (
    <div>
      {label} :
      <input
        name={fieldName}
        className={style.form__item}
        value={state[fieldName]}
        onChange={handleChange}
        id={fieldName}
        placeholder={placeholder}
      />
      {errors[fieldName] && (
        <div className={style.form__error}>{errors[fieldName]}</div>
      )}
    </div>
  );

  const validateFields = async (openType) => {
    const newErrors = {};
    for (const fieldName in ValidationFields) {
      if (
        openType === "dvd" &&
        ["weight", "height", "width", "length"].includes(fieldName)
      ) {
        continue;
      }

      if (
        openType === "book" &&
        ["size", "height", "width", "length"].includes(fieldName)
      ) {
        continue;
      }

      if (openType === "furniture" && ["size", "weight"].includes(fieldName)) {
        continue;
      }

      const { pattern, errorMessage } = ValidationFields[fieldName];
      const inputValue = state[fieldName].trim();

      if (inputValue.length === 0) {
        newErrors[fieldName] = "Please submit required data!";
      } else if (!pattern.test(inputValue)) {
        newErrors[fieldName] = errorMessage;
      }
    }

    if (!openType) {
      newErrors.productType = "You have not selected a product type.";
    }

    if (state.sku) {
      try {
        const response = await axios.get(
          `https://api-juniortestkristersjurcs.herokuapp.com/public/?sku=${state.sku}`
        );
        if (response.data.length > 0) {
          newErrors.sku = "SKU already exists";
        }
      } catch (error) {
        console.error(error);
      }
    }

    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validateFields(openType);

    if (!isValid) {
      const data = new FormData(e.target);
      saveProduct(Object.fromEntries(data.entries()));
      navigate("/");
    }
  };

  const saveProduct = (productData) => {
    productData.attribute = openType;

    switch (openType) {
      case "dvd":
        productData.attribute_value = `${state.size}MB`;
        break;
      case "book":
        productData.attribute_value = `${state.weight}KG`;
        break;
      case "furniture":
        productData.attribute_value = `${state.height}x${state.width}x${state.length}`;
        break;
      default:
        productData.attribute_value = "";
        break;
    }

    axios
      .post(
        "https://api-juniortestkristersjurcs.herokuapp.com/public",
        productData
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <div className="AddProductPage">
      <Header menuOpen={menuOpen} toggleMenu={menuToggler} isAddProductPage />
      <form
        className={`${style.form} ${menuOpen ? style["form--open"] : ""}`}
        id="product_form"
        onSubmit={handleSubmit}
      >
        {renderInputField("sku", "SKU", getInputPlaceholder("sku", openType))}
        {renderInputField(
          "name",
          "Name",
          getInputPlaceholder("name", openType)
        )}
        {renderInputField(
          "price",
          "Price ($)",
          getInputPlaceholder("price", openType)
        )}
        <div id="productType">
          <Dropdown
            placeHolder="Select..."
            options={options}
            name="attribute"
            onChange={handleProductTypeChange}
          />
          {errors.productType && (
            <div className={style.form__error}>
              {errors.productType} Try again!
            </div>
          )}
        </div>
        {openType === "dvd" && renderInputField("size", "Size (MB)", "700")}
        {openType === "book" && renderInputField("weight", "Weight (KG)", "2")}
        {openType === "furniture" && (
          <>
            {renderInputField("height", "Height (CM)", "24")}
            {renderInputField("width", "Width (CM)", "45")}
            {renderInputField("length", "Length (CM)", "15")}
          </>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
