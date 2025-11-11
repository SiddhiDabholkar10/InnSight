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
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    console.log("Uploaded filename:", filename);
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });

    //set to empty again after adding
    setPhotoLink('');
  }


  function uploadPhoto(ev){
    //Get the file(s) selected by the user from the <input type="file" />
    const files = ev.target.files;
    // Create a new FormData object — used to send files or form data in HTTP requests
    const data = new FormData();
   for (let i = 0; i < files.length; i++) {
         // Append the first selected file to the FormData under the key 'photos'
    // The backend will use this key to access the uploaded file (req.file / req.files)
   
      data.append('photos', files[i]);
    }
  
  //Send a POST request to the backend endpoint '/upload'
  // Include the FormData and set the Content-Type header to 'multipart/form-data'
  // (axios automatically handles boundary formatting for this type)
    axios.post('/upload',data,{
      headers:{'Content-Type':'multipart/form-data'}
    }).then(response=>{
      // Extract the filename returned by the backend from the response
      const {data:filenames} = response;

      // Add the new filename to the existing list of uploaded photos
    // setAddedPhotos updates React state while preserving previous items
      setAddedPhotos((prev) => {
      return [...prev, ...filenames];
    });

    });

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
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
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

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="{'Add using a link ... jpg'}"
                value={photoLink}
                onChange={(ev) => setPhotoLink(ev.target.value)}
              />
              <button
                className="bg-gray-200 px-4 rounded-2xl"
                onClick={addPhotoWithLink}
              >
                Add&nbsp;Photo Link
              </button>
            </div>
            
            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => (
                  <div className="h-32 flex" key={link}>
                    <img
                      className="rounded-2xl"
                      src={`http://localhost:4000/uploads/${link}`}
                      alt=""  
                    />
                  </div>
                ))}
              <label className="h-32 flex justify-center border bg-transparent rounded-2xl p-2 text-xl text-gray-400 text-gray-400">
                <input type="file" multiple className="hidden" onChange={uploadPhoto}/>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-8"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765 4.5 4.5 0 0 1 8.302-3.046 3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Zm3.75-2.75a.75.75 0 0 0 1.5 0V9.66l1.95 2.1a.75.75 0 1 0 1.1-1.02l-3.25-3.5a.75.75 0 0 0-1.1 0l-3.25 3.5a.75.75 0 1 0 1.1 1.02l1.95-2.1v4.59Z"
                    clipRule="evenodd"
                  />
                </svg>
                &nbsp;&nbsp;Upload from your device
              </label>
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
