import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function registerUser(ev) {
    //prevent reload
    ev.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registration successful. Now you can log in");
    } catch (e) {
      alert("Registration failed. Please try again later");
    }
  }

  return (
    <div className="mt-6 grow flex items-center justify-around">
      <div className="mb-32 w-3/4 max-w-lg">
        <h1 className="text-4xl text-center mb-4 font-bold">Register</h1>
        <form
          className="max-w-md mx-auto border rounded-xl mt-2 flex flex-col gap-2 p-4 shadow-md shadow-primary-500"
          onSubmit={registerUser}
        >
           <input type="text"
                 placeholder="John Doe"
                 value={name}
                 onChange={ev => setName(ev.target.value)} />
          <input type="email"
                 placeholder="your@email.com"
                 value={email}
                 onChange={ev => setEmail(ev.target.value)} />
          <input type="password"
                 placeholder="password"
                 value={password}
                 onChange={ev => setPassword(ev.target.value)} />
          <button className="primary login">Register</button>
          <div className="py-2 text-center text-gray-500">
            Already a member? <span></span>
            <Link to={"/login"} className="underline text-secondary">
              Login
            </Link>
          </div>
        </form>
      </div> 
    </div>
  );
}
