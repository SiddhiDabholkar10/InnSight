import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="mt-6 grow flex items-center justify-around">
      <div className="mb-32 w-3/4 max-w-lg">
        <h1 className="text-4xl text-center mb-4 font-bold"> Login</h1>
        <form className="max-w-md mx-auto border rounded-xl mt-2 flex flex-col gap-2 p-4 shadow-md shadow-primary-500 ">
          <input type="email" placeholder={"your@email.com"}></input>
          <input type="password" placeholder="password" />
          <button className="primary login"> Login</button>
          <div className="py-2 text-center text-gray-500">
            Don't have an account yet? <span></span>
            <Link to={'/register'} className="underline text-secondary">Register now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
