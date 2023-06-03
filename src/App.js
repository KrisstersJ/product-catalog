import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/product-list/HomePage";
import AddProduct from "./components/add-product/AddProductPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="/add-product" element={<AddProduct />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
