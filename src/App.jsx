import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import RootLayout from "./pages/RootLayout";
import ProductsPage from "./pages/Products";
import ProductDetail from "./pages/ProductDetail"; // Import the ProductDetail page
import ProfilePage from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage"; // Import the ErrorPage
import Contact from "./pages/Contact"; // Import the Contact page
import { useEffect, useState } from "react";
import { auth } from "./firebase/firebaseConfig";

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "", element: <HomePage /> },
        { path: "products", element: <ProductsPage /> },
        { path: "products/:slug", element: <ProductDetail /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "contact", element: <Contact /> },
        {
          path: "auth",
          children: [
            { path: "signup", element: <Signup /> },
            { path: "signin", element: <Signin /> },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
