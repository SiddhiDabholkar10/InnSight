import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import AddressLink from "../AddressLink.jsx";
import axios from "axios";
import BookingFunctionality from "../BookingFunctionality.jsx";

export default function PlacePage() {
  const { place_id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

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

  if (showAllPhotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen">
        <div className="bg-black p-8 grid gap-4">
          <div>
            <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              Close photos
            </button>
          </div>
          {place?.photos?.length > 0 &&
            place.photos.map((photo) => (
              <div>
                <img className="min-w-full" src={photoUrl(photo)} alt="" />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-gray-100 -mx-8 px-8 py-8">
      <h1 className="text-3xl">{place.title}</h1>
      <AddressLink>{place.address}</AddressLink>

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
        <button
          onClick={() => setShowAllPhotos(true)}
          className="flex gap-1 absolute bottom-1 right-10 py-2 px-4 bg-white rounded-2xl border-black shadow-md hover:shadow-lg shadow-gray-500 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
              clipRule="evenodd"
            />
          </svg>
          Show more photos
        </button>
      </div>
      <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            {place.description}
          </div>
          
          <div className="bg-white -mx-8 my-6 px-8 py-8 border-t">
            <div>
              Check-in: {place.checkIn}
          <br />
          Check-out: {place.checkOut}
          <br />
          Max number of guests: {place.maxGuests}
          <br /><br />
              <h2 className="font-semibold text-2xl">Extra info</h2>
            </div>
            <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
              {place.extraInfo}
            </div>
          </div>
        </div>
        <div>
          <BookingFunctionality place={place} />
        </div>
      </div>

      {/* <div className="mt-6">
        <p className="text-lg text-gray-700 leading-relaxed">{place.description}</p>
      </div> */}
    </div>
  );
}
