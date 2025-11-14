import { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage.jsx";
import AccountNav from "../AccountNav.jsx";

export default function ProfilePage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null); // This state can be used to redirect after logout, if needed
  let { subpage } = useParams();
  if (!ready) {
    // If the user state is not ready yet (still fetching), return a loading indicator
    return "Loading..."; // You can replace this with a proper loading component if needed
  }
  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }

  
  if (subpage === undefined) {
    // If no subpage is provided in the URL, default to 'profile'
    subpage = "profile";
  }
  //console.log("Subpage:", subpage); // For debugging purposes, to see which subpage is being accessed

 

  async function userlogout() {
    await axios.post("/logout");
    setUser(null); // Clear the user state in context to indicate the user has logged out
    setRedirect("/");
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div>
      <AccountNav/>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          <h1 className="text-2xl">Profile Page</h1>
          <p>
            Logged in as {user.name} - ({user.email})
          </p>
          <br />
          <button onClick={userlogout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}

      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
