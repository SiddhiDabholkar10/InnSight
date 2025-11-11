import { Link, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";


export default function PlacesPage() {
  const { action } = useParams();
  
  //const [redirectToAccomodationsList, setRedirectToAccomodationsList] = useState(false);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-1000 text-sm">{text}</p>;
  }

  //combining both header and paragraph - increasing reusability
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
  
  // if (redirectToAccomodationsList && action != "new") {
    //return <Navigate to={'/account/places'}/>
  //}
  

  return (
    <div>
      <AccountNav/>
      
        <div>
          {preInput(
            "Your Accommodations",
            "This is where you can manage your places."
          )}
          <div className="text-center mt-8"></div>
          <Link
            to="/account/places/new"
            className="inline-flex py-2 px-6 gap-1 border border-primary rounded-full hover:bg-primary hover:transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>{" "}
            Add a new place
          </Link>
        </div>
      
      
    </div>
  );
}
