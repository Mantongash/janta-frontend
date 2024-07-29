import React, { useState, useEffect } from "react";

const Clients = ({ agencyId }) => {
  const [clients, setClients] = useState({});

  useEffect(() => {
    const fetchClients = async () => {
      const url = "https://janta-backend.onrender.com/api/auth/Register";
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    //   if (data.usertype === client) {
    //     setClients(client);
    //   }
    };

    fetchClients();
  }, [agencyId]);

  return (
    <div className="clients-section">
      <h2>Clients</h2>
      <ul>
        {/* {clients && client.fullName} */}
      </ul>
    </div>
  );
};

export default Clients;
