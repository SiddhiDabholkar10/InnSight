import { Link } from "react-router-dom";
export default function PlacesPage() {
  return (
    <div>
      <h1 className="text-2xl text-center">Your Accommodations</h1>
      <p className="text-center">This is where you can manage your places.</p>
      <div className="text-center mt-8"></div>
      <Link
        to="/account/places/new"
        className="inline-flex py-2 px-6 gap-1 border border-primary rounded-full hover:bg-primary hover:transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="size-6"
        >
          <path
            fill-rule="evenodd"
            d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
            clip-rule="evenodd"
          />
        </svg>{" "}
        Add a new place
      </Link>
    </div>
  );
}
