import React, { useState } from "react";
import styles from "./ProductCard.module.scss";

const ProductCard = ({
  menuOpen,
  productList,
  checkedProductList,
  setCheckedProductList
}) => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleChange = (event) => {
    const { value, checked } = event.target;
    setCheckedItems((prevState) => ({
      ...prevState,
      [value]: checked
    }));
    if (checked && !checkedProductList.includes(value)) {
      checkedProductList.push(value);
    } else if (!checked) {
      const filteredList = checkedProductList.filter(
        (id) => id.toString() !== value.toString()
      );
      setCheckedProductList(filteredList);
    }
  };

  return productList.map((product) => (
    <div
      key={product.id}
      className={`${styles.card} ${menuOpen ? styles["card--open"] : ""} ${
        checkedItems[product.id] ? styles["card--green"] : ""
      }`}
    >
      {" "}
      <input
        type="checkbox"
        value={product.id}
        onChange={handleChange}
        checked={checkedItems[product.id] || false}
        className="delete-checkbox"
        id={styles["delete-checkbox"]}
      />
      <div className={styles.card__info}>SKU: {product.sku}</div>
      <div className={styles.card__info}>{product.name}</div>
      <div className={styles.card__info}>Price: {product.price}$</div>
      <div className={styles.card__info}>
        {product.attribute}: {product.attribute_value}
      </div>
    </div>
  ));
};

export default ProductCard;
