import {useState} from "react";

import Perks from "./Perks";
import axios from "axios";
import PhotosUploader from "../PhotosUploader.jsx";
import AccountNav from "../AccountNav.jsx";

export default function AddAccomodationPlaceForm() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);

  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

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

  //Form Submission Handler
  async function addNewAccomodationPlaces(ev) {
    ev.preventDefault();
    await axios.post("/addAccomodations", {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    setRedirectToAccomodationsList(true);
  }
  return (
    <>
      <div>
        <AccountNav />
        <form onSubmit={addNewAccomodationPlaces}>
          {preInput(
            "Title",
            "Title for your place. should be short and catchy as in advertisement"
          )}
          <input
            type="text"
            placeholder="Title, for example: 1234 My Apartment Name"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
          {preInput(
            "Description",
            "Description of the place. should be long and detailed"
          )}

          <textarea
            name=""
            id=""
            cols="5"
            rows="5"
            placeholder="Tell us more about your place..."
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          ></textarea>
          {preInput("Address", "Address to your place")}

          <input
            type="text"
            placeholder="How to get there?"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
          />
          <h2 className="text-xl mt-4">Photos</h2>
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

          <h2 className="text-xl mt-4">Perks</h2>
          <Perks selected={perks} onChange={setPerks} />
          {preInput("Extra Info", "House rules, etc")}

          <textarea
            value={extraInfo}
            onChange={(ev) => setExtraInfo(ev.target.value)}
          />
          <h2 className="text-xl mt-4">Check in & out times</h2>
          <div className="grid sm:grid-cols-3 gap-2">
            <div>
              <h3 className="mt-2 -mb-1">Check in time</h3>
              <input
                type="text"
                placeholder="14"
                value={checkIn}
                onChange={(ev) => setCheckIn(ev.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check out time</h3>
              <input
                type="text"
                placeholder="16"
                value={checkOut}
                onChange={(ev) => setCheckOut(ev.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Guest Count</h3>
              <input
                type="number"
                placeholder="2"
                value={maxGuests}
                onChange={(ev) => setMaxGuests(ev.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="primary my-4 w-full block !w-full !block text-center"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
}
