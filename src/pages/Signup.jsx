import { createUserWithEmailAndPassword } from "firebase/auth/web-extension";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig";
import { setDoc, doc } from "@firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          name: name,
          email: user.email,
        });
      }
      console.log("User registered successfully");
      toast.success("User registered successfully", {
        position: "top-center",
        closeButton: true,
      });
      window.location.href = "/auth/signin";
    } catch (err) {
      console.log(err.message);
      toast.error(err.message, {
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
          onSubmit={handleRegister}>
          <h2 className="text-2xl mb-4 text-center pb-5">Sign Up</h2>
          <input
            className="mb-4 p-2 border border-gray-300 rounded"
            type="text"
            placeholder="John Doe"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="mb-4 p-2 border border-gray-300 rounded"
            type="email"
            placeholder="example@email.com"
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
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded cursor-pointer">
            Sign Up
          </button>
          <Link
            to="/auth/signin"
            className="mt-4 text-blue-500 cursor-pointer text-center">
            Already have an account?{" "}
            <span className="font-semibold hover:underline">Sign In</span>
          </Link>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
