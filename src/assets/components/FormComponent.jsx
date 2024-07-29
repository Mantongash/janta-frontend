import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const FormComponent = () => {
  const navigate = useNavigate();
  const [update, setUpdate] = useState({});
  const [error, setError] = useState({});
  const [succesfulMessage, setsuccesfulMessage] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    agencyDetails: "",
    email: "",
    phoneNumber: "",
    businessOffered: "",
    location: "",
    image: null,
  });

  useEffect(() => {
  const agencyData = JSON.parse(localStorage.getItem("user"));

    if (agencyData) {
      setUpdate(agencyData);
      setFormData({
        name: agencyData.fullName || "",
        agencyDetails: agencyData.agencyDetails || "",
        email: agencyData.email || "",
        phoneNumber: agencyData.phoneNumber || "",
        businessOffered: agencyData.businessOffered || "",
        location: agencyData.location || "",
        image: agencyData.image || null,
      });
    }
  }, []);

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errors = {};
    if (!formData.name) {
      errors.name = "Please enter your name";
    }
    if (!formData.agencyDetails) {
      errors.agencyDetails = "Please enter the agency details";
    }
    if (!formData.email) {
      errors.email = "Please enter your email address";
    }
    if (!formData.phoneNumber) {
      errors.phoneNumber = "Please enter your phone number";
    }
    if (!formData.businessOffered) {
      errors.businessOffered = "Please enter the business offered";
    }
    if (!formData.location) {
      errors.location = "Please enter your location";
    }
    if (!formData.image) {
      errors.image = "Please upload an image";
    }
    setError(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      const url = "https://janta-backend.onrender.com/api/agency/add";
      const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      };
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok) {
          setsuccesfulMessage("Added successfully");
          navigate("/agency");
          window.location.reload();
          setIsLoading(false);
          localStorage.setItem("agency", JSON.stringify(data));

        } else {
          setErrorMessage(data.message || "Failed to add the agency");
          setIsLoading(false);
        }
      } catch (error) {
        setErrorMessage("An error occurred while submitting the form");
        console.error(error);
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="flex items-center justify-center my-[2em] bg-[#E0F7FF] h-[150vh]">
      {isLoading && <Loader />}
      <div className="bg-white shadow-md rounded p-[7em] w-[40%]">
        <div>
          <div className="mb-4 w-[100%]">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-[100%] py-4 px-3 text-gray-700"
              type="text"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <p className="text-red-500 font-bold">{error.name && error.name}</p>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="Enter your email address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <p className="text-red-500 font-bold">
              {error.email && error.email}
            </p>
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="tel"
              placeholder="Enter your phone number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <p className="text-red-500 font-bold">
              {error.phoneNumber && error.phoneNumber}
            </p>
          </div>

          <div className="mb-4 w-[100%]">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="businessOffered"
            >
              Business Offered
            </label>
            <input
              className="shadow appearance-none border rounded w-[100%] py-4 px-3 text-gray-700"
              type="text"
              placeholder="Plumbers, Cleaners, etc."
              name="businessOffered"
              value={formData.businessOffered}
              onChange={handleChange}
            />
            <p className="text-red-500 font-bold">
              {error.businessOffered && error.businessOffered}
            </p>
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Enter agency location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
            <p className="text-red-500 font-bold">
              {error.location && error.location}
            </p>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="agencyDetails"
            >
              Agency Details
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-6 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-none"
              placeholder="Enter agency details"
              name="agencyDetails"
              value={formData.agencyDetails}
              onChange={handleChange}
            />
            <p className="text-red-500 font-bold">
              {error.agencyDetails && error.agencyDetails}
            </p>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <p className="text-red-500 font-bold">
              {error.image && error.image}
            </p>
          </div>

          {formData.image && (
            <div className="mb-4">
              <img src={formData.image} alt="Uploaded" className="w-[40%]" />
            </div>
          )}

          <div className="flex items-center justify-between">
            <button
              className="bg-[#FE9C0A] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          <p className="text-green-500 text-[2em] font-bold">
            {succesfulMessage && succesfulMessage}
          </p>
          <p className="text-red-500 text-[2em] font-bold">
            {errorMessage && errorMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
