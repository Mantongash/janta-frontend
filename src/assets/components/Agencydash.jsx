import React, { useState, useEffect,useContext } from "react";
import Profile from "../components/Profile";
import Clients from "../components/Clients";
import { StateContext } from "../../context/state";
import Loader from "./Loader";

function Agencydash() {
  const [isLoading, setIsLoading] = useState(true);
  const { agencyData, setAgencyData } = useContext(StateContext);


  useEffect(() => {
    const fetchData = async () => {
      const storedData = JSON.parse(localStorage.getItem("user"));
      if (storedData) {
        setAgencyData(storedData);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="dashboard-container my-[4%] bg-[#E0F7FF] h-[100vh] ">
      <h1 className="dashboard-title font-bold text-[2em] text-center">Agency Dashboard</h1>
      <div className="dashboard-sections">
        <Profile />
        {/* <Clients agencyId={agencyData.id} /> */}
      </div>
    </div>
  );
}

export default Agencydash;
