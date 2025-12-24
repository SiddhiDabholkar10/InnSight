import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AddressLink from "../AddressLink.jsx";
import axios from "axios";
import BookingFunctionality from "../BookingFunctionality.jsx";

export default function PlacePage() {
  const { place_id } = useParams();
  const [place, setPlace] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (!place_id) return;
    axios.get("/places/" + place_id).then((response) => setPlace(response.data));
  }, [place_id]);

  if (!place) return "Loading...";

  const photoUrl = (photo) => {
    if (!photo) return "";
    return photo.startsWith("http") ? photo : `http://localhost:4000/uploads/${photo}`;
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
    <div className="bg-gray-50">
      {/* Page container */}
      <div className="mx-auto max-w-9xl px-4 md:px-6 py-8">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            {place.title}
          </h1>
          <div className="text-sm text-gray-600">
            <AddressLink>{place.address}</AddressLink>
          </div>
        </div>

        {/* Photo collage */}
        <div className="relative mt-6 overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-2 p-2">
            <div className="h-[18rem] md:h-[32rem] overflow-hidden rounded-2xl bg-gray-200">
              {place.photos?.[0] && (
                <img
                  className="h-full w-full object-cover"
                  src={photoUrl(place.photos[0])}
                  alt="Main"
                  loading="lazy"
                />
              )}
            </div>

            <div className="grid grid-rows-2 gap-2 h-[18rem] md:h-[32rem]">
              <div className="overflow-hidden rounded-2xl bg-gray-200">
                {place.photos?.[1] && (
                  <img
                    className="h-full w-full object-cover"
                    src={photoUrl(place.photos[1])}
                    alt=""
                    loading="lazy"
                  />
                )}
              </div>
              <div className="overflow-hidden rounded-2xl bg-gray-200">
                {place.photos?.[2] && (
                  <img
                    className="h-full w-full object-cover"
                    src={photoUrl(place.photos[2])}
                    alt=""
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowAllPhotos(true)}
            className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-2xl bg-white/95 px-4 py-2 text-sm font-semibold text-gray-900 shadow-md backdrop-blur transition hover:bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                clipRule="evenodd"
              />
            </svg>
            Show all photos
          </button>
        </div>

        {/* Content grid */}
        <div className="mt-10 grid gap-8 grid-cols-1 lg:grid-cols-[2fr_1fr]">
          {/* Left column */}
          <div className="space-y-6">
            {/* Description card */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900">Description</h2>
              <p className="mt-3 text-gray-700 leading-relaxed whitespace-pre-line">
                {place.description}
              </p>
            </div>

            {/* Details + extra info card */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap gap-3">
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                  Check-in: <span className="ml-1 font-semibold text-gray-900">{place.checkIn}</span>
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                  Check-out: <span className="ml-1 font-semibold text-gray-900">{place.checkOut}</span>
                </span>
                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700">
                  Max guests:{" "}
                  <span className="ml-1 font-semibold text-gray-900">{place.maxGuests}</span>
                </span>
              </div>

              <h2 className="mt-6 text-xl font-semibold text-gray-900">Extra info</h2>
              <p className="mt-3 text-sm text-gray-700 leading-6 whitespace-pre-line">
                {place.extraInfo}
              </p>
            </div>
          </div>

          {/* Right column: sticky booking */}
          <div className="lg:sticky lg:top-24 h-fit">
            <BookingFunctionality place={place} />
          </div>
        </div>
      </div>
    </div>
  );
}
