import React, { useState, useContext, useEffect } from "react";
import { FaUser, FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import { StateContext } from "../../context/state";
import { MdDesignServices } from "react-icons/md";
import { FaRegImage } from "react-icons/fa";
import { getStorage, ref, uploadString } from "firebase/storage";
import { app } from "../../firebase";

import Loader from "../components/Loader";

const Profile = () => {
  const { agencyData, setAgencyData } = useContext(StateContext);
  const [formData, setFormData] = useState({ ...agencyData });
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { currentUser, setCurrentUser } = useContext(StateContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    const url = `https://janta-backend.onrender.com/api/agency/${user._id}`;

    (async () => {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setAgencyData(data);
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const storage = getStorage(app);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const { _id, ...other } = formData;

    const user = JSON.parse(localStorage.getItem("user"));

    const url = `https://janta-backend.onrender.com/api/agency/66a5eacc4af773369f021901`;
    const option = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(other),
    };

    try {
      console.log(other);
      const response = await fetch(url, option);
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Profile updated successfully!");
        setErrorMessage("");
        setAgencyData(data);
      } else {
        setSuccessMessage("");
        setErrorMessage("Update failed. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setSuccessMessage("");
      setErrorMessage("Update failed. Please try again.");
    } finally {
      location.reload();
      setIsLoading(false);

      setIsEditing(false);
      setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      });
    }
  }

  function onImageUpload(e) {
    const file = e.target.files[0];

    const reader = new FileReader();

    const storageRef = ref(storage, `profile/${file.name}`);

    reader.onload = () => {
      console.log(reader.result);

      // Data URL string
      const base64 = reader.result;
      uploadString(storageRef, base64, "data_url").then((snapshot) => {
        console.log("Uploaded a data_url string!");

        setFormData(prev => ({
          ...prev,
          image: `https://firebasestorage.googleapis.com/v0/b/janta-e4e06.appspot.com/o/profile%2F${file.name}?alt=media`,
        }));
      });
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className="profile-section bg-white shadow-md rounded p-[7em] w-[40%] mx-auto my-[50px]">
      {console.log(agencyData && agencyData)}
      {isLoading && <Loader />}
      <h2 className="font-bold text-[30px]">Profile</h2>
      {successMessage && (
        <p className="text-green-600 font-bold">{successMessage}</p>
      )}
      {errorMessage && <p className="text-red-600 font-bold">{errorMessage}</p>}
      {isEditing ? (
        <form onSubmit={handleSubmit} className="flex gap-4 flex-col">
          <input
            placeholder="Change your name"
            type="text"
            name="agencyName"
            defaultValue={agencyData && agencyData.agencyName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-[100%] py-4 px-3 text-gray-700"
          />
          <input
            placeholder="Change your email"
            type="email"
            name="email"
            defaultValue={agencyData && agencyData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-[100%] py-4 px-3 text-gray-700"
          />
          <input
            placeholder="Change your phone number"
            type="tel"
            name="phoneNumber"
            defaultValue={agencyData && agencyData.phoneNumber}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-[100%] py-4 px-3 text-gray-700"
          />
          <input
            placeholder="Change your location"
            type="text"
            name="location"
            defaultValue={agencyData && agencyData.location}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-[100%] py-4 px-3 text-gray-700"
          />
          <input
            placeholder="Change the business offered"
            name="services"
            defaultValue={agencyData && agencyData.services}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-[100%] py-4 px-3 text-gray-700"
          />

          <textarea
            placeholder="Change the business offered"
            name="agencyDescription"
            defaultValue={agencyData && agencyData.agencyDescription}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-[100%] py-4 px-3 text-gray-700"
          ></textarea>
          <div>
            <label htmlFor="image">Upload profile image: </label>
            <input type="file" id="image" onChange={(e) => onImageUpload(e)} />
          </div>
          <button
            type="submit"
            className="bg-[#FE9C0A] px-[20px] py-[10px] rounded-2xl text-white font-bold"
            onClick={handleSubmit}
          >
            Save
          </button>
        </form>
      ) : (
        <div className="leading-9">
          <div className="flex items-center gap-4">
            <FaUser />
            <p>Name: {agencyData && agencyData.agencyName}</p>
          </div>
          <div className="flex items-center gap-4">
            <MdEmail />
            <p>Email: {agencyData && agencyData.email}</p>
          </div>
          <div className="flex items-center gap-4">
            <FaPhoneAlt />
            <p>Phone: {agencyData && agencyData.phoneNumber}</p>
          </div>
          <div className="flex items-center gap-4">
            <FaLocationDot />
            <p>Location: {agencyData && agencyData.location}</p>
          </div>
          <div className="flex items-center gap-4">
            <MdDesignServices />

            <p>Services: {agencyData && agencyData.services}</p>
          </div>
          <div className="flex items-center gap-4">
            <CgDetailsMore />
            <p>Services: {agencyData && agencyData.agencyDescription}</p>
          </div>

          <div className="flex items-center gap-4">
            <FaRegImage />
            <p>
              Image:{" "}
              {agencyData && (
                <img src={agencyData.image} width={100}/>
              )}

              {agencyData && agencyData.image === "" &&  'No image uploaded. Click "Edit" to upload an image'}
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-10">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-[#FE9C0A] px-[20px] py-[10px] rounded-2xl text-white font-bold"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
