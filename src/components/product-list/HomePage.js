import React, { useEffect } from "react";
import { useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import Header from "../header/Header";

const HomePage = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggler = () => setMenuOpen((hidden) => !hidden);
  const [productList, setProductList] = useState([]);
  const [checkedProductList, setCheckedProductList] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  function getProducts() {
    axios.get("https://api-juniortestkristersjurcs.herokuapp.com/").then(function (response) {
      setProductList(response.data);
    });
  }

  async function massDelete() {
    try {
      const response = await axios.delete("https://api-juniortestkristersjurcs.herokuapp.com/", {
        data: checkedProductList,
      });
      if (response.status === 200) {
        getProducts();
      } else {
        console.log("Error deleting products");
      }
    } catch (error) {
      console.log("Error deleting products:", error.message);
    }
  }
  

  return (
    <div className="HomePage">
      <Header
        menuOpen={menuOpen}
        toggleMenu={menuToggler}
        massDelete={massDelete}
      />
      <ProductCard
        menuOpen={menuOpen}
        productList={productList}
        checkedProductList={checkedProductList}
        setCheckedProductList={setCheckedProductList}
      />
    </div>
  );
};

export default HomePage;
