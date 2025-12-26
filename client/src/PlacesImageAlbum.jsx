import { useState } from "react";
import Image from "./Image.jsx";

export default function PlacesImageAlbum({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <div className="fixed inset-0 z-50 bg-black text-white">
        <div className="mx-auto max-w-6xl px-4 md:px-6 py-8">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-xl md:text-3xl font-semibold">
              Photos of {place.title}
            </h2>

            <button
              onClick={() => setShowAllPhotos(false)}
              className="inline-flex items-center gap-2 rounded-2xl bg-white/95 px-4 py-2 text-sm font-semibold text-gray-900 shadow-md backdrop-blur hover:bg-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              Close
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {place?.photos?.length > 0 &&
              place.photos.map((photo, idx) => (
                <div
                  key={photo + idx}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                >
                  <Image className="w-full h-full object-cover" src={photo} alt="" />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-100 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-2 p-2">
          {/* Big image */}
          <div className="overflow-hidden rounded-2xl bg-gray-200">
            {place.photos?.[0] && (
              <Image
                onClick={() => setShowAllPhotos(true)}
                className="h-[18rem] md:h-[26rem] w-full cursor-pointer object-cover"
                src={place.photos[0]}
                alt=""
              />
            )}
          </div>

          {/* Right column (2 stacked) */}
          <div className="grid grid-rows-2 gap-2">
            <div className="overflow-hidden rounded-2xl bg-gray-200">
              {place.photos?.[1] && (
                <Image
                  onClick={() => setShowAllPhotos(true)}
                  className="h-[9rem] md:h-[12.5rem] w-full cursor-pointer object-cover"
                  src={place.photos[1]}
                  alt=""
                />
              )}
            </div>

            <div className="overflow-hidden rounded-2xl bg-gray-200">
              {place.photos?.[2] && (
                <Image
                  onClick={() => setShowAllPhotos(true)}
                  className="h-[9rem] md:h-[12.5rem] w-full cursor-pointer object-cover"
                  src={place.photos[2]}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => setShowAllPhotos(true)}
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-2xl bg-white/95 px-4 py-2 text-sm font-semibold text-gray-900 shadow-md backdrop-blur hover:bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
              clipRule="evenodd"
            />
          </svg>
          Show more photos
        </button>
      </div>
    </div>
  );
}
