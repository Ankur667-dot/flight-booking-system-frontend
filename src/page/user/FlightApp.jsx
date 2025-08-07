// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const FlightApp = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const flights = location.state?.flights;

//   if (!Array.isArray(flights)) {
//     return <p>No flights data provided. Please search again.</p>;
//   }

//   const handleRowClick = (flight) => {
//     navigate('/booking', { state: { flight } });
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Available Flights</h2>
//       {flights.length === 0 ? (
//         <p>No flights found. Try a different search.</p>
//       ) : (
//         <table border="1" cellPadding="10" cellSpacing="0">
//           <thead>
//             <tr>
//               <th>Flight Number</th>
//               <th>Departure City</th>
//               <th>Departure Time</th>
//               <th>Arrival City</th>
//               <th>Arrival Time</th>
//               <th>Seats Available</th>
//               <th>Price</th>
//               {/* <th>Boarding Gate</th> */}
//             </tr>
//           </thead>
//           <tbody>
//             {flights.map((flight, index) => (
//               <tr key={index} onClick={() => handleRowClick(flight)} style={{ cursor: 'pointer' }}>
//                 <td>{flight.flightNumber || 'N/A'}</td>
//                 <td>{flight.departureAirport?.cityName || 'Unknown'}</td>
//                 <td>{flight.departureTime ? new Date(flight.departureTime).toLocaleString() : 'N/A'}</td>
//                 <td>{flight.arrivalAirport?.cityName || 'Unknown'}</td>
//                 <td>{flight.arrivalTime ? new Date(flight.arrivalTime).toLocaleString() : 'N/A'}</td>
//                 <td>{flight.availableSeats ?? 'N/A'}</td>
//                 <td>₹{flight.price || 'N/A'}</td>
//                 {/* <td>{flight.boardingGate || 'N/A'}</td> */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default FlightApp;

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { selectedFlightAtom } from '../../store/bookingAtom';

const FlightApp = () => {
  const location = useLocation();
  const flights = location.state?.flights || [];
  const setSelectedFlight = useSetRecoilState(selectedFlightAtom);
  const navigate = useNavigate();

  const handleSelect = (flight) => {
    setSelectedFlight(flight);
    navigate('/booking');
  };

  return (
    <div>
      <h2>Available Flights</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Flight</th>
            <th>Airline</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {flights.map(flight => (
            <tr key={flight.id}>
              <td>{flight.flightNumber}</td>
              <td>{flight.airline}</td>
              <td>{flight.departureAirport.name}</td>
              <td>{flight.arrivalAirport.name}</td>
              <td>{flight.departureTime} - {flight.arrivalTime}</td>
              <td><button onClick={() => handleSelect(flight)}>Book</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightApp;

