import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "@firebase/firestore";
import { signOut } from "firebase/auth";

function ProfilePage() {
  const [userDetails, setUserDetails] = useState(null);

  async function fetchUserData() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        console.log(user);
        const docRef = doc(db, "Users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
          console.log(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } else {
        console.log("User is not logged in");
      }
    });
  }

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await signOut(auth);
      window.location.href = "/";
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div className="mx-auto container border-t pt-10">
      {userDetails ? (
        <div className="space-y-5">
          <h3 className="text-2xl font-semibold">
            {" "}
            Welcome, {userDetails.name}
          </h3>
          <div className="space-y-5">
            <p>Email: {userDetails.email}</p>
            <p>Name: {userDetails.name}</p>
          </div>
          <button
            className="bg-red-500 text-white px-4 py-1 cursor-pointer"
            onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProfilePage;
