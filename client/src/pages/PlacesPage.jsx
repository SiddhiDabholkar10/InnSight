import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Perks from "./Perks";
import axios from "axios";

export default function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
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
  //Adding Photo by Link 
  async function addPhotoWithLink(ev) {
    ev.preventDefault();
    await axios.post('/upload-by-link' , { link: photoLink });
    
  }

  return (
    <div>
      {action !== "new" && (
        <div>
          {preInput(
            "Your Accommodations",
            "This is where you can manage your places."
          )}
          <div className="text-center mt-8"></div>
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
                fill-rule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clip-rule="evenodd"
              />
            </svg>{" "}
            Add a new place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form action="">
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
            <div className="grid grid-rows-2 lg:grid-rows-2 md:grid-rows-2 sm:grid-rows-2 gap-4 mt-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="{'Add using a link ... jpg'}"
                  value={photoLink}
                  onChange={(ev) => setPhotoLink(ev.target.value)}
                />
                <button className="bg-gray-200 px-4 rounded-2xl" onClick={addPhotoWithLink}>
                  Add&nbsp;Photo Link
                </button>
              </div>

              <button className="flex justify-center border bg-transparent rounded-2xl p-8 text-xl text-gray-400 text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="size-8"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765 4.5 4.5 0 0 1 8.302-3.046 3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z"
                    clip-rule="evenodd"
                  />
                </svg>
                &nbsp;&nbsp;Upload from your device
              </button>
            </div>
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
      )}
    </div>
  );
}
