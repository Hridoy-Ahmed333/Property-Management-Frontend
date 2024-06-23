import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/Property";
//import Cart from "./pages/Cart";
import Order from "./pages/Order";
import PageNotFound from "./pages/PageNotFound";
import "./App.css";
import ProductDetail from "./pages/PropertyDetail";
import AppLayout from "./Components/AppLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProperty";
import { CartProvider } from "./context/CartContext";
import { useState } from "react";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import UserOrder from "./pages/UserOrder";
import AdminOrder from "./pages/AdminOrder";
import Edit from "./pages/Edit";
import AddCategory from "./pages/AddCategory";
import Website from "./pages/Website";
import Contactus from "./pages/Contactus";

function App() {
  const [visitedCart, setVisitedCart] = useState(false);

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Website />} />
            <Route path="/property" element={<Products />} />
            <Route path="/:id" element={<ProductDetail />} />
            {<Route path="contact" element={<Contactus />} />}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="addProduct" element={<AddProduct />} />
            <Route path="success" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />
            <Route path="userOrder" element={<UserOrder />} />
            <Route path="category" element={<AddCategory />} />
            <Route path="adminOrders" element={<AdminOrder />} />
            <Route path="edit" element={<Edit />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
