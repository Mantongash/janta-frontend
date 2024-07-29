import { LuEye } from "react-icons/lu";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Await, useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { data } from "autoprefixer";

function Sign() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [registerSelection, setRegisterSelection] = useState("");

  const [formData, setFormData] = useState({});
  const [agencyData, setAgencyData] = useState({});

  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  function handleRegisterSelection(selection) {
    setRegisterSelection(selection);
    setFormData((prev) => ({ ...prev, userType: selection }));
  }
  function changeThePassword() {
    setShowPassword((prev) => !prev);
  }

  function handleChange(e, user) {
    if (user === "client") {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    if (user === "agency") {
      setAgencyData({ ...agencyData, [e.target.name]: e.target.value });
    }
  }

  async function handleRegistration() {
    console.log(error)
    console.log(formData);

    const errors = {};
    if (!formData.fullName || formData.fullName === "") {
      errors.fullName = "Kindly fill all the full name";
    }
    if (!formData.email || formData.email === "") {
      errors.email = "Kindly fill all the email";
    }
    if (!formData.phoneNumber || formData.phoneNumber === "") {
      errors.phoneNumber = "Kindly fill all the phone number";
    }
    if (!formData.password || formData.password === "") {
      errors.password = "Kindly fill all the password";
    }
    if (!formData.confirmPassword || formData.confirmPassword === "") {
      errors.confirmPassword = "Kindly confirm the password";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.fullName = "The password doesn't match";
    }
    if (formData.userType === "") {
      errors.userType = "Kindly select either as a client or an Agency";
    }

    // Agency Validation
    if (!agencyData.agencyName || agencyData.agencyName === "") {
      errors.agencyName = "Kindly fill the agency name";
    }

    if (!agencyData.agencyDescription || agencyData.agencyDescription === "") {
      errors.agencyDescription = "Kindly fill the agency description";
    }

    if (!agencyData.services || agencyData.services === "") {
      errors.services = "Kindly fill the services you offer";
    }

    if (!agencyData.location || agencyData.location === "") {
      errors.location = "Kindly fill the location of your agency";
    }

    // if (formData.password.length < 6) {
    //   errors.password = "The password doesn't match";
    // }
    setError(errors);

    if (formData.userType === "client") {
      const agencyErrors = { ...errors };

      delete agencyErrors.agencyDescription &&
        delete agencyErrors.agencyName &&
        delete agencyErrors.location &&
        delete agencyErrors.services;

      setError(agencyErrors);
    }



    if (Object.keys(error).length === 0) {
      const { confirmPassword, ...otherData } = formData;
      setIsLoading(true);
      const url = "https://janta-backend.onrender.com/api/auth/Register";
      const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(otherData),
      };
      const response = await fetch(url, options);
      const data = await response.json().catch(error);
      console.log(data);

      if (response.ok) {
        if(formData.userType==="agency"){
          console.log("agency")
          const {email, phoneNumber} = formData;
          const agencyProfile = {...agencyData, uid:data._id, email, phoneNumber};
          const url = "https://janta-backend.onrender.com/api/agency/add";
          const options = {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(agencyProfile),
          };

          const response = await fetch(url, options);
          const resData = await response.json()
          console.log(resData)
        }
        navigate("/login");
      } else {
        // setErrorMessage(data.message);
        setIsLoading(false);
      }
    }
  }

  return (
    <>
      {" "}
      {/* <div className="w-[50vw] h-[100%] bg-[#0D47A1] absolute -z-10 right-0"></div> */}
      <div className=" flex justify-center items-center shadow-[0_0_5px_lightgray] z-10 bg-[#E0F7FF] my-[2em]">
        <div className=" flex flex-col gap-5">
          {isLoading && <Loader />}
          <h1 className="flex justify-center text-5xl pr-[3em]  pt-3">
            Create Account
          </h1>
          <div className="flex bg-white box-boder shadow-[0_0_5px_lightgray] p-[50px] rounded-xl mb-[6em]">
            {errorMessage && errorMessage}
            <div className="">
              <img src="src/assets/images/sign.svg" className="w-[90%]" />
            </div>
            <div className="flex flex-col gap-5 ">
              <div>
                <label>Register as:</label>
                <div className="flex w-full gap-7">
                  <div className="flex-1">
                    <button
                      className="bg-[#FE9C0A] flex gap-4 justify-center items-center py-[1em] px-[3em] cursor-pointer"
                      onClick={() => handleRegisterSelection("agency")}
                      style={{
                        backgroundColor:
                          registerSelection === "agency" ? "black" : "#FE9C0A",
                      }}
                    >
                      <div className="w-[30px] h-[30px] bg-white rounded-full"></div>
                      <span className="text-white font-bold">Agency</span>
                    </button>
                  </div>
                  <div className="flex-1">
                    <button
                      className="bg-[#FE9C0A] flex gap-4 justify-center items-center py-[1em] px-[3em]  cursor-pointer"
                      onClick={() => handleRegisterSelection("client")}
                      style={{
                        backgroundColor:
                          registerSelection === "client" ? "black" : "#FE9C0A",
                      }}
                    >
                      <div className="w-[30px] h-[30px] bg-white rounded-full"></div>
                      <span className="text-white font-bold">Client</span>
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-red-500 font-bold">
                {error.fullName && error.fullName}
              </p>
              <div className="border-2  rounded-lg w-full shadow-lg">
                <input
                  type="text"
                  placeholder="Full Name"
                  className=" py-5 pr-[20em] px-2 bg-transparent outline-none flex-1 "
                  name="fullName"
                  onChange={(e) => handleChange(e, "client")}
                />
              </div>
              <p className="text-red-500 font-bold">
                {error.email && error.email}
              </p>
              <div className="border-2  rounded-lg w-full shadow-lg">
                <input
                  type="text"
                  placeholder="Email"
                  className=" py-5 pr-[20em] px-2 bg-transparent outline-none flex-1 "
                  name="email"
                  onChange={(e) => handleChange(e, "client")}
                />
              </div>
              <p className="text-red-500 font-bold">
                {error.phoneNumber && error.phoneNumber}
              </p>
              <div className="border-2  rounded-lg w-full shadow-lg">
                <input
                  type="number"
                  placeholder="Phone Number"
                  className=" py-5 pr-[20em] px-2 bg-transparent outline-none flex-1 "
                  name="phoneNumber"
                  onChange={(e) => handleChange(e, "client")}
                />
              </div>
              <p className="text-red-500 font-bold">
                {error.password && error.password}
              </p>
              <div className="border-2  rounded-lg  shadow-lg flex">
                <input
                  type={showPassword ? "password" : "text"}
                  placeholder="password"
                  className=" py-5 pr-[20em] px-2 bg-transparent outline-none flex-1 "
                  name="password"
                  onChange={(e) => handleChange(e, "client")}
                />
                <div
                  className="flex  items-center text-[20px] cursor-pointer pr-4"
                  onClick={changeThePassword}
                >
                  {" "}
                  {showPassword ? <LuEye /> : <FaRegEyeSlash />}
                </div>
              </div>
              <p className="text-red-500 font-bold">
                {error.confirmPassword && error.confirmPassword}
              </p>
              <div className="border-2  rounded-lg w-full shadow-lg">
                <input
                  type={showPassword ? "password" : "text"}
                  placeholder="Confirm Passsword"
                  className=" py-5 pr-[20em] px-2 bg-transparent outline-none flex-1 "
                  name="confirmPassword"
                  onChange={(e) => handleChange(e, "client")}
                />
              </div>

              {formData.userType === "agency" && (
                <div>
                  <p className="text-red-500 font-bold">
                    {error.agencyName && error.agencyName}
                  </p>
                  <div className="border-2  rounded-lg w-full shadow-lg">
                    <input
                      type="text"
                      placeholder="Agency Name"
                      className=" py-5 pr-[20em] px-2 bg-transparent outline-none flex-1 "
                      name="agencyName"
                      onChange={(e) => handleChange(e, "agency")}
                    />
                  </div>

                  <p className="text-red-500 font-bold">
                    {error.agencyDescription && error.agencyDescription}
                  </p>
                  <div className="border-2  rounded-lg w-full shadow-lg">
                    <textarea
                      placeholder="Agency Desription"
                      className=" py-5 pr-[20em] px-2 bg-transparent outline-none flex-1 "
                      name="agencyDescription"
                      onChange={(e) => handleChange(e, "agency")}
                    ></textarea>
                  </div>

                  <p className="text-red-500 font-bold">
                    {error.location && error.location}
                  </p>
                  <div className="border-2  rounded-lg w-full shadow-lg">
                    <input
                      type="text"
                      placeholder="Location"
                      className=" py-5 pr-[20em] px-2 bg-transparent outline-none flex-1 "
                      name="location"
                      onChange={(e) => handleChange(e, "agency")}
                    />
                  </div>

                  <p className="text-red-500 font-bold">
                    {error.services && error.services}
                  </p>
                  <div className="border-2  rounded-lg w-full shadow-lg">
                    <input
                      type="text"
                      placeholder="Services e.g plumbing, house managers ... "
                      className=" py-5 pr-[20em] px-2 bg-transparent outline-none flex-1 "
                      name="services"
                      onChange={(e) => handleChange(e, "agency")}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-center ">
                <button
                  onClick={handleRegistration}
                  className="bg-[#FE9C0A] px-[5em] py-5 rounded-[2em] shadow-lg text-white font-bold "
                >
                  Create Account
                </button>
              </div>
              <div className="flex justify-center text-[25px]">
                Already Have An Account?
                <a href="/login" className="text-[#FE9C0A] ">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sign;
