import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartContext } from "./Home"; // Import CartContext
import { useState } from "react";

function RootLayout() {
  const [cartItem, setCartItem] = useState(0);

  function addItemToCart() {
    setCartItem((prev) => prev + 1);
  }

  return (
    <CartContext.Provider value={{ cartItem, addItemToCart }}>
      <div className="flex flex-col min-h-screen px-2">
        <Navbar />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    </CartContext.Provider>
  );
}

export default RootLayout;
