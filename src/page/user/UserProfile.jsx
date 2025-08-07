import React, { useEffect, useState } from 'react';
import { getUserProfile, getCurrentFlight, getPreviousFlights } from '../../api/UserProfileApi';

const UserProfile = () => {
  const userId = 1;
  const [user, setUser] = useState({});
  const [currentFlight, setCurrentFlight] = useState({});
  const [previousFlights, setPreviousFlights] = useState([]);

  useEffect(() => {
    getUserProfile(userId).then(res => setUser(res.data));
    getCurrentFlight(userId).then(data => setCurrentFlight(data));
    getPreviousFlights(userId).then(res => setPreviousFlights(res.data));
  }, []);

  return (
    <div>
      <h2>{user.name}'s Profile</h2>
      <p>Email: {user.email}</p>

      <h3>Current Flight</h3>
      <p>{currentFlight?.flightNumber} from {currentFlight?.from} to {currentFlight?.to}</p>

      <h3>Previous Flights</h3>
      {previousFlights.map((flight, idx) => (
        <div key={idx}>
          <p>{flight.flightNumber} from {flight.from} to {flight.to}</p>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;


// const UserProfile = ({ userId })