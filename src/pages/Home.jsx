import Banner from "../components/Banner";
import ProductsPage from "./Products";
import SubscriptionBanner from "../components/SubscriptionBanner";
import Map from "../components/map";
import { createContext, useState } from "react";

// Context for the cart items
const CartContext = createContext();

function HomePage() {
  const [cartItem, setCartItem] = useState(0);

  function addItemToCart() {
    setCartItem((prev) => prev + 1);
  }

  return (
    <CartContext.Provider value={{ cartItem, addItemToCart }}>
      <div className="mx-auto container">
        <Banner />
        <ProductsPage />
        <SubscriptionBanner />
        <Map />
      </div>
    </CartContext.Provider>
  );
}

export default HomePage;

export { CartContext };
