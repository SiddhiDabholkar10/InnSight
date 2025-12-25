import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../PlaceImg";
import { Link } from "react-router-dom";
import BookingDatesFormat from "../BookingDatesFormat.jsx";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    axios.get("/bookings").then((response) => setBookings(response.data));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-6">
        <AccountNav />

        <div className="mt-6 space-y-4">
          {bookings?.length > 0 &&
            bookings.map((booking) => (
              <Link
                key={booking._id}
                to={`/account/bookings/${booking._id}`}
                className="group flex flex-col md:flex-row gap-0 md:gap-5 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="w-full md:w-56 shrink-0 bg-gray-100">
                  <div className="h-52 md:h-full w-full overflow-hidden">
                    {/* PlaceImg already renders an image; we’re just improving its container */}
                    <PlaceImg place={booking.place} />
                  </div>
                </div>

                <div className="flex-1 p-4 md:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:underline">
                      {booking.place.title}
                    </h2>

                    <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-900">
                      ${booking.price}
                    </span>
                  </div>

                  <BookingDatesFormat
                    booking={booking}
                    className="mt-2 text-sm text-gray-500"
                  />

                  <div className="mt-4 flex items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-700"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>

                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-sm text-gray-600">Total price</span>
                      <span className="text-lg md:text-xl font-bold text-gray-900">
                        ${booking.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
