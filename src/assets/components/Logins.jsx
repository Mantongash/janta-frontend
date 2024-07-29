import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { LuEye } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function Logins() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({});

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function changeThePassword() {
    setShowPassword((prev) => !prev);
  }

  async function handleRegistration() {
    const errors = {};
    if (!formData.email || formData.email === "") {
      errors.email = "Email is required.";
    }
    if (!formData.password || formData.password === "") {
      errors.password = "Password is required.";
    }
    if (formData.password && formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }
    setError(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      const url = "https://janta-backend.onrender.com/api/auth/LogIn";
      const options = {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      };
      try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("user", JSON.stringify(data));
          if (data.userType === "client") {
            navigate("/dashboard");
            location.reload()
          } else if (data.userType === "agency") {
            navigate("/agency");
            location.reload()
          } else {
            setErrorMessage("Unexpected user type.");
          }
        } else {
          // Display server error message
          setErrorMessage(data.message || "Login failed. Please try again.");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        setErrorMessage("An unexpected error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <div className="bg-[#E0F7FF] h-[100vh] flex justify-center items-center my-[2em]">
      {isLoading && <Loader />}
      <div className="bg-white p-[3em] shadow-xl box-border rounded-xl flex flex-col gap-[2em]">
        <div className="flex justify-center text-center text-5xl text-[#FE9C0A]">
          Log In
        </div>
        <p className="text-red-500 font-bold">{error.email && error.email}</p>
        <div className="border-2 rounded-lg w-full shadow-lg">
          <input
            type="text"
            placeholder="Email"
            className="py-5 pr-[20em] px-2 bg-transparent outline-none flex-1"
            name="email"
            onChange={handleChange}
          />
        </div>
        <p className="text-red-500 font-bold">
          {error.password && error.password}
        </p>
        <div className="border-2 rounded-lg shadow-lg flex">
          <input
            type={showPassword ? "password" : "text"}
            placeholder="Password"
            className="py-5 pr-[20em] px-2 bg-transparent outline-none flex-1"
            name="password"
            onChange={handleChange}
          />
          <div
            className="flex items-center text-[20px] cursor-pointer pr-4"
            onClick={changeThePassword}
          >
            {showPassword ? <LuEye /> : <FaRegEyeSlash />}
          </div>
        </div>
        <p className="text-red-400 font-bold">{errorMessage}</p>
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <input type="checkbox" className="w-4 h-4 mr-2" />
            <p>Remember me</p>
          </div>
          <p className="text-[#FE9C0A] underline underline-offset-2 cursor-pointer">
            Forgot Password?
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleRegistration}
            className="bg-[#FE9C0A] px-[7em] py-5 rounded-2xl shadow-lg text-white font-bold"
          >
            Log in
          </button>
        </div>
        <div className="flex justify-center text-[20px] my-2">
          Don't Have An Account Yet?
          <a href="/signup" className="text-[#FE9C0A]">
            Sign Up Free
          </a>
        </div>
      </div>
    </div>
  );
}

export default Logins;
