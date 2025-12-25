import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext.jsx";

export default function BookingFunctionality({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookThisPlace() {
    const response = await axios.post('/bookings', {
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      place: place._id,
      price: numberOfNights * place.price,
    });
    const bookingId = response.data._id;
    setRedirect(`/account/bookings/${bookingId}`);
  }

  if (redirect) return <Navigate to={redirect} />;

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Book your stay</h3>
          <p className="mt-1 text-sm text-gray-500">Select dates and confirm details</p>
        </div>

        <div className="rounded-2xl bg-gray-50 px-3 py-2 text-right">
          <div className="text-xs text-gray-500">Per night</div>
          <div className="text-xl font-bold text-gray-900">${place.price}</div>
        </div>
      </div>

      {/* Form */}
      <div className="mt-5 rounded-2xl border border-gray-200 bg-white">
        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">Check in</label>
            <input
              type="date"
              value={checkIn}
              onChange={(ev) => setCheckIn(ev.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
            />
          </div>

          <div className="border-t p-4 md:border-l md:border-t-0">
            <label className="mb-2 block text-sm font-medium text-gray-700">Check out</label>
            <input
              type="date"
              value={checkOut}
              onChange={(ev) => setCheckOut(ev.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="border-t p-4">
          <label className="mb-2 block text-sm font-medium text-gray-700">Guests</label>
          <input
            type="number"
            min={1}
            value={numberOfGuests}
            onChange={(ev) => setNumberOfGuests(ev.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
          />
        </div>

        {/* Conditional: Contact */}
        {numberOfNights > 0 && (
          <div className="border-t p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="text-sm font-medium text-gray-900">Contact details</div>
              <div className="text-sm text-gray-600">
                {numberOfNights} night{numberOfNights > 1 ? "s" : ""} •{" "}
                <span className="font-semibold text-gray-900">
                  ${numberOfNights * place.price}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Full name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Phone number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(ev) => setPhone(ev.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={bookThisPlace}
        className="mt-5 w-full rounded-2xl bg-gray-900 px-4 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900/20 active:scale-[0.99] disabled:opacity-60"
      >
        {numberOfNights > 0 ? (
          <span className="flex items-center justify-center gap-2">
            Confirm booking <span className="opacity-90">•</span>
            <span className="font-bold">${numberOfNights * place.price}</span>
          </span>
        ) : (
          "Select dates to book"
        )}
      </button>

      {/* Subtext */}
      <p className="mt-3 text-center text-xs text-gray-500">
        You won’t be charged until you confirm.
      </p>
    </div>
  );
}
