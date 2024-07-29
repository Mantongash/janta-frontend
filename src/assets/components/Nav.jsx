import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { StateContext } from "../../context/state";
function Nav() {
  const { currentUser, setCurrentUser } = useContext(StateContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
  }, []);

  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  }
  return (
    <nav className=" fixed right-0 left-0 top-0 bg-white  border  shadow-2xl ">
      <div className="container mx-auto flex justify-between items-center h-[100px]">
        <div>
          <Link to="/">
            {" "}
            <img src="src/assets/images/logo.png" alt="" className="w-[30%]" />
          </Link>
        </div>
        <div>
          <ul className="flex justify-end items-center gap-8 cursor-pointer">
            <Link to="/">
              {" "}
              <li className="hover:text-[#FE9C0A]">Home</li>
            </Link>

            {currentUser ? (
              <div className="flex items-center gap-5">
                {currentUser.userType === "agency" && (
                  <Link to="/agency">
                    <button className="border border-[#FE9C0A] rounded-full py-4 px-[4em] bg-white text-[#FE9C0A] font-bold outline-none flex items-center">
                      My Profile
                    </button>
                  </Link>
                )}

                {currentUser.userType === "client" && (
                  <Link to="/dashboard">
                    <button className="border border-[#FE9C0A] rounded-full py-4 px-[4em] bg-white text-[#FE9C0A] font-bold outline-none flex items-center">
                      Browse Agencies
                    </button>
                  </Link>
                )}

                <p>Hi, {currentUser.fullName}</p>

                <button
                  className="border border-[#FE9C0A] rounded-full py-4 px-[4em] bg-[#FE9C0A] text-[white] font-bold outline-none hover:border-white flex items-center"
                  onClick={handleLogOut}
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex justify-between gap-9">
                <Link to="/register">
                  <li className="hidden md:block hover:text-[#FE9C0A]">
                    Register
                  </li>
                </Link>
                <Link to="/login">
                  <li className="hidden md:block hover:text-[#FE9C0A]">
                    Log In
                  </li>
                </Link>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
