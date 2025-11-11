import { useState } from "react";
import axios from "axios";
export default function PhotoUploader({addedPhotos,onChange}){
      const [photoLink, setPhotoLink] = useState("");
      
      //Adding Photo by Link
  async function addPhotoWithLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    console.log("Uploaded filename:", filename);
    onChange((prev) => {
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
    // onChange updates React state while preserving previous items
      onChange((prev) => {
      return [...prev, ...filenames];
    });

    });

  }
    return (
        <>
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
                              className="rounded-2xl w-full object-cover"
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
        </>
    );
}