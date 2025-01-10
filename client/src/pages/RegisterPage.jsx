import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="mt-6 grow flex items-center justify-around">
      <div className="mb-32 w-3/4 max-w-lg">
        <h1 className="text-4xl text-center mb-4 font-bold">Register</h1>
        <form className="max-w-md mx-auto border rounded-xl mt-2 flex flex-col gap-2 p-4 shadow-md shadow-primary-500 ">
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder={"your@email.com"}></input>
          <input type="password" placeholder="password" />
          <button className="primary login"> Login</button>
          <div className="py-2 text-center text-gray-500">
            Already a member? <span></span>
            <Link to={'/login'} className="underline text-secondary">Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
