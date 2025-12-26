import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddressLink from "../AddressLink";
import BookingDatesFormat from "../BookingDatesFormat.jsx";
import PlacesImageAlbum from "../PlacesImageAlbum.jsx";

export default function BookingPage() {
  const params = useParams();
  const bookingId = params.booking_id || params.id; // supports either route name
  console.log("BookingPage params:", params, "bookingId:", bookingId);

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (!bookingId) return;

    setLoading(true);
    setErrMsg("");

    axios
      .get("/bookings")
      .then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === bookingId);
        setBooking(foundBooking || null);
      })
      .catch((err) => {
        console.error(err);
        setErrMsg("Failed to load booking (check /bookings request in Network).");
      })
      .finally(() => setLoading(false));
  }, [bookingId]);

  if (!bookingId) {
    return (
      <div className="my-8 p-4 rounded-xl bg-red-50 border border-red-200">
        No booking id found in URL params. Check your route param name in App.jsx.
      </div>
    );
  }

  if (loading) return <div className="my-8">Loading...</div>;

  if (errMsg) return <div className="my-8">{errMsg}</div>;

  if (!booking) {
    return <div className="my-8">Booking not found (maybe not owned by this user).</div>;
  }

 return (
  <div className="bg-gray-50 min-h-screen">
    <div className="mx-auto max-w-6xl px-4 md:px-6 py-10">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
          {booking.place.title}
        </h1>

        <AddressLink className="text-sm text-gray-600 underline underline-offset-4 hover:text-gray-900">
          {booking.place.address}
        </AddressLink>
      </div>

      {/* Main card */}
      <div className="mt-8 rounded-3xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
          {/* Left */}
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                Your booking information
              </h2>
              <span className="text-xs font-medium rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 border border-emerald-100">
                Confirmed
              </span>
            </div>

            <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-5">
              <BookingDatesFormat booking={booking} />
            </div>

            <div className="mt-6 text-sm text-gray-600">
              Need changes? Contact support from your account page.
            </div>
          </div>

          {/* Right */}
          <div className="border-t lg:border-t-0 lg:border-l border-gray-200 p-6 md:p-8 bg-white">
            <div className="rounded-3xl bg-primary text-black p-6 shadow-sm">
              <div className="text-sm text-black/70">Total price</div>
              <div className="mt-2 text-3xl font-bold">${booking.price}</div>

              <div className="mt-5 h-px bg-white/10" />

              <div className="mt-4 space-y-2 text-sm text-black/85">
                <div className="flex items-center justify-between">
                  <span>Guests</span>
                  <span className="font-semibold text-black">
                    {booking.numberOfGuests}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Name</span>
                  <span className="font-semibold text-black">
                    {booking.name || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Phone</span>
                  <span className="font-semibold text-black">
                    {booking.phone || "—"}
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-500">
              Prices include applicable fees (if any).
            </p>
          </div>
        </div>
        <div className="mt-0">
        <PlacesImageAlbum place={booking.place} />
      </div>
      </div>

      {/* Album (keep aligned with page width) */}
      
    </div>
  </div>
);

}
