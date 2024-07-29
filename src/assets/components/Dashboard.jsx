import React, { useState, useEffect } from "react";
import AgencyCard from "../components/Agencycard";
import Profile from "../components/Profile";

function Dashboard() {
  const [agencies, setAgencies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [filteredAgencies, setFilteredAgencies] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState(null);

  useEffect(() => {
    async function fetchAgencyData() {
      let url = "https://janta-backend.onrender.com/api/agency";
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        setAgencies(data);

        const uniqueLocations = [
          ...new Set(data.map((agency) => agency.location)),
        ];
        setLocations(uniqueLocations);
      } else {
        // Handle fetch error
      }
    }
    fetchAgencyData();
  }, []);

  useEffect(() => {
    const filtered = agencies.filter((agency) => {
      return (
        agency.services.join(",").toLowerCase()
          .includes(searchQuery.toLowerCase()) &&
        (locationFilter === "" || agency.location === locationFilter)
      );
    });
    setFilteredAgencies(filtered);
  }, [agencies, searchQuery, locationFilter]);

  const handleSelectAgency = (agency) => {
    setSelectedAgency(agency);
  };

  return (
    <div>
      <div className="flex items-center border border-[#FE9C0A] rounded-full px-5 gap-3 mt-6 w-[40%] justify-between py-7 mb-5 mx-auto">
        <input
          className="w-full text-lg rounded-full py-3 px-4 outline-none"
          type="text"
          placeholder="Search by keyword or business offered"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {locations.length > 0 && (
          <select
            className="px-3 text-[20px] text-[#FE9C0A] outline-none"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">Filter by Location</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="bg-[#E0F7FF]">
        {filteredAgencies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[90%] mx-auto">
            {locationFilter && <p>Filtered by: {locationFilter}</p>}
            {filteredAgencies.map((agency) => (
              <AgencyCard
                key={agency._id}
                image={agency.image}
                agencyName={agency.agencyName}
                agencyDescription={agency.agencyDescription}
                email={agency.email}
                phoneNumber={agency.phoneNumber}
                services={agency.services}
                location={agency.location}
                onClick={() => handleSelectAgency(agency)} // Handle click event
              />
            ))}
          </div>
        ) : (
          <p>No results found.</p>
        )}
      </div>

      {selectedAgency && (
        <Profile
          agencyData={selectedAgency}
          setAgencyData={setSelectedAgency}
        />
      )}
    </div>
  );
}

export default Dashboard;
