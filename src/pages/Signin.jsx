import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User signed in successfully");
      toast.success("User signed in successfully", {
        position: "top-center",
        closeButton: true,
      });
      window.location.href = "/profile";
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "bottom-center",
        closeButton: true,
      });
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <form
          className="flex flex-col"
          onSubmit={handleLogin}>
          <h2 className="text-2xl mb-4 text-center pb-5">Sign In</h2>
          <input
            className="mb-4 p-2 border border-gray-300 rounded"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="mb-4 p-2 border border-gray-300 rounded"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded">
            Sign In
          </button>
          <p className="text-sm text-right pt-2 text-blue-600 cursor-pointer">
            Forget password
          </p>
          <Link
            to="/auth/signup"
            className="mt-4 text-blue-500 cursor-pointer text-center">
            Already have an account?{" "}
            <span className="hover:underline font-semibold">Sign Up</span>
          </Link>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signin;
