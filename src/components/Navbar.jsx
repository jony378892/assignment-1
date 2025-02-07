import { useState, useEffect, useContext } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "@firebase/firestore";
import { IoCartSharp } from "react-icons/io5";
import { CartContext } from "../pages/Home"; // Import CartContext

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const { cartItem } = useContext(CartContext);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(docSnap.data());
        }
      }
    });
  }, []);

  function changeMenuVisibility() {
    setShowDropdown(!showDropdown);
  }

  return (
    <div className="flex items-center justify-between py-3 relative px-2 mx-auto container">
      <Link
        to="/"
        className="text-2xl sm:text-3xl font-semibold">
        Shipper
      </Link>
      <div className="sm:flex gap-5 hidden">
        <Link
          to="/"
          className="hover:text-blue-500 hover:underline">
          Home
        </Link>
        <Link
          to="/products"
          className="hover:text-blue-500 hover:underline">
          Products
        </Link>
        <Link
          to="/contact"
          className="hover:text-blue-500 hover:underline">
          Contact
        </Link>
      </div>
      <div className="hidden sm:flex gap-3">
        {user ? (
          <Link
            to="/profile"
            className="text-blue-500 font-semibold cursor-pointer">
            {user.name}
          </Link>
        ) : (
          <>
            <Link
              to="/auth/signin"
              className="border border-blue-500 text-blue-500 hover:bg-blue-500 rounded-md hover:text-white px-3 py-0.5">
              Sign In
            </Link>
            <div className=" flex gap-2">
              Cart{" "}
              <div className="relative">
                <IoCartSharp size={23} />
                <p className="absolute -top-2 -right-2 rounded-full p-0.5 px-1 text-xs bg-blue-500 text-white font-bold">
                  {cartItem}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="block sm:hidden">
        {showDropdown ? (
          <RxCross1
            size={24}
            onClick={changeMenuVisibility}
            className="cursor-pointer"
          />
        ) : (
          <button onClick={changeMenuVisibility}>
            <AiOutlineMenu
              size={24}
              className="cursor-pointer"
            />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="flex flex-col gap-2 border border-gray-600 rounded-md sm:hidden p-3 absolute top-12 right-2 pr-10 bg-white z-30">
          <Link
            to="/"
            className="hover:text-blue-500 hover:underline">
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-blue-500 hover:underline">
            Products
          </Link>
          <Link
            to="/contact"
            className="hover:text-blue-500 hover:underline">
            Contact
          </Link>
          {user ? (
            <Link
              to="/profile"
              className="text-blue-500 font-semibold cursor-pointer">
              {user.name}
            </Link>
          ) : (
            <>
              <Link
                to="/auth/signin"
                className="border border-blue-500 text-blue-500 hover:bg-blue-500 rounded-md hover:text-white px-3 py-0.5">
                Sign In
              </Link>
              <div className=" flex gap-2">
                Cart{" "}
                <div className="relative">
                  <IoCartSharp size={23} />
                  <p className="absolute -top-2 -right-2 rounded-full p-0.5 px-1 text-xs bg-blue-500 text-white font-bold">
                    {cartItem}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
