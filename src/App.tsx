import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { SignUp } from "./components/SignUp";
import { Home } from "./components/Home";
import { AddtoCart } from "./components/AddToCart";
import { CheckOut } from "./components/CheckOut";
import { Print } from "./components/Print";

function App() {
  return (
    <>
      <BrowserRouter basename="/malone-fashion-shop">
        {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/AddToCart" element={<AddtoCart />} />
          <Route path="/CheckOut" element={<CheckOut />} />
          <Route path="/Print" element={<Print />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
