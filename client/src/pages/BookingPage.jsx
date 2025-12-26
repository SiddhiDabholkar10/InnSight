import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import AddressLink from "../AddressLink";
import BookingDatesFormat from "../BookingDatesFormat.jsx";

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
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>

      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          <BookingDatesFormat booking={booking} />
        </div>

        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-3xl">${booking.price}</div>
        </div>
      </div>
    </div>
  );
}
