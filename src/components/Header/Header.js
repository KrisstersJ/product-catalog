import React from "react";
import styles from "../../sass/header.module.scss";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineCloseSquare } from "react-icons/ai";

const Header = ({ menuOpen, toggleMenu, isAddProductPage, massDelete }) => {
  return (
    <div className={styles.header}>
      <div className={styles.header__content}>
        <div>
          <span className={styles.logo}>
            {" "}
            {isAddProductPage ? "Add Product" : "Product Catalog"}
          </span>
        </div>
        <div>
          <nav
            className={`${styles.nav} ${menuOpen ? styles["nav--open"] : ""}`}
          >
            {isAddProductPage ? (
              <>
                <button
                  className={styles.nav__item}
                  type="submit"
                  form="product_form"
                >
                  Save
                </button>
                <button
                  className={styles.nav__item}
                  onClick={() => (window.location.href = "/")}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  className={styles.nav__item}
                  type="link"
                  onClick={() => (window.location.href = "/add-product")}
                >
                  ADD
                </button>
                <button
                  className={styles.nav__item}
                  role="button"
                  id="delete-product.btn"
                  onClick={massDelete}
                >
                  MASS DELETE
                </button>
              </>
            )}
          </nav>
        </div>
        <div>
          <button className={styles.header__toggler} onClick={toggleMenu}>
            {!menuOpen ? <BiMenuAltRight /> : <AiOutlineCloseSquare />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
