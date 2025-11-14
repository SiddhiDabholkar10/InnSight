import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect,useState } from "react";
import axios from "axios";




export default function PlacesPage() {
  const [places,setPlaces]=useState([]);
  useEffect(() => {
    axios.get('/places').then(({data})=>{
      setPlaces(data);
    });



  },[]);
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-1000 text-sm">{text}</p>;
  }

  
  
  // if (redirectToAccomodationsList && action != "new") {
    //return <Navigate to={'/account/places'}/>
  //}
  

  return (
    <div>
      <AccountNav/>
      
        <div className="text-center mt-8">
          
          Manages all your accomodation places.
          <br />
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
        <div className="mt-4">
          {places.length > 0 && places.map(place=>(
            <Link to={'/account/places/'+place._id} className ="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
              <div className="w-32 h-32 bg-gray-300 grow shrink-0">
                {place.photos.length>0 && (<img src={place.photos[0]} alt=""/>
              )}
              </div>
              <div className="grow-0 shrink">
                 <h2 className="text-xl"> {place.title}</h2>
              <p className="text-sm mt-2">{place.description}</p>
              </div>
             
            </Link>
          )
          )}
        </div>
      
      
    </div>
  );
}
