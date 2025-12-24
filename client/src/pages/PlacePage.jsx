import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export default function PlacePage() {
  const { place_id } = useParams();
  const [place, setPlace] = useState(null);
  
  useEffect(() => {
    // Fetch place details using place_id
    if (!place_id) return;
    axios.get("/places/" + place_id).then((response) => {
      setPlace(response.data);
      // Handle the fetched data
    });
  }, [place_id]);
  
  if (!place) {
    return "Loading...";
  }
  
  const photoUrl = (photo) => {
    if (!photo) return "";
    return photo.startsWith("http")
      ? photo
      : `http://localhost:4000/uploads/${photo}`;
  };
  
  return (
    <div className="mt-8 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="my-2 block font-semibold underline"
        href={"https://maps.google.com/?q=" + place.address}
        target="_blank"
      >
        {place.address}
      </a>
      
      <div className="grid gap-2 grid-cols-[2fr_1fr] overflow-hidden">
        <div className="h-[38rem]">
          {place.photos?.[0] && (
            <div className="h-full overflow-hidden rounded-2xl bg-gray-200">
              <img
                className="h-full w-full object-cover"
                src={photoUrl(place.photos[0])}
                alt="Main"
              />
            </div>
          )}
        </div>
        <div className="grid grid-rows-2 gap-2 h-[38rem]">
          {place.photos?.[1] && (
            <div className="overflow-hidden rounded-2xl bg-gray-200">
              <img
                className="h-full w-full object-cover"
                src={photoUrl(place.photos[1])}
                alt=""
              />
            </div>
          )}
          {place.photos?.[2] && (
            <div className="overflow-hidden rounded-2xl bg-gray-200">
              <img
                className="h-full w-full object-cover"
                src={photoUrl(place.photos[2])}
                alt=""
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <p className="text-lg text-gray-700 leading-relaxed">{place.description}</p>
      </div>
    </div>
  );
}