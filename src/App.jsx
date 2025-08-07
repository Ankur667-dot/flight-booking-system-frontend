import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import HomeApp from '../src/page/user/HomeApp';
import FlightApp from '../src/page/user/FlightApp';
import BookingApp from '../src/page/user/BookingApp';
// import MyBooking from '../src/page/user/MyBooking';
// import UserProfile from '../src/page/user/UserProfile';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeApp />} />
          <Route path="/flights" element={<FlightApp />} />
          <Route path="/booking" element={<BookingApp />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
    // <UserProfile/>
    // <MyBooking />
  );
}

export default App;




// import React, { useState } from 'react';
// import { log } from 'react-native-version/util';

// // SeatMap Component
// const SeatMap = ({ classType, selectedSeats, onSeatClick, passengerCount }) => {
//   const layout = {
//     Business: { seatsPerRow: 4, rows: 4, spaceAfter: 2 }, // S1 S2 _ S3 S4
//     Economy: { seatsPerRow: 6, rows: 5, spaceAfter: 3 },  // S1 S2 S3 _ S4 S5 S6
//   };

//   const config = layout[classType] || layout['Economy'];
//   const { seatsPerRow, rows, spaceAfter } = config;

//   let seatNumber = 1;
//   const rowsUI = [];

//   for (let row = 0; row < rows; row++) {
//     const seats = [];
//     for (let i = 0; i < seatsPerRow; i++) {
//       if (i === spaceAfter) {
//         seats.push(<div key={`sp-${i}`} style={{ width: '20px' }}></div>);
//       }
//       const seatId = `S${seatNumber++}`;
//       seats.push(
//         <div
//           key={seatId}
//           style={{
//             width: '30px',
//             height: '30px',
//             backgroundColor: selectedSeats.includes(seatId) ? 'green' : 'lightgray',
//             margin: '4px',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             cursor: 'pointer',
//             borderRadius: '4px',
//           }}
//           onClick={() => onSeatClick(seatId)}
//         >
//           {seatId}
//         </div>
//       );
//     }
//     rowsUI.push(<div key={row} style={{ display: 'flex', marginBottom: '8px' }}>{seats}</div>);
//   }

//   return <div>{rowsUI}</div>;
// };

// // // Main Booking Page
// const App = () => {
//   const flightData = {
//     flightNumber: 'AI-203',
//     from: 'Delhi',
//     to: 'Mumbai',
//     classType: 'Economy',
//     passengerCount: 1,
//   };

//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [passengerNames, setPassengerNames] = useState(Array(flightData.passengerCount).fill(''));
//   const [email, setEmail] = useState('');
//   const [submitted, setSubmitted] = useState(false);

//   const handleSeatClick = (seatId) => {
//     if (selectedSeats.includes(seatId)) {
//       setSelectedSeats(selectedSeats.filter((s) => s !== seatId));
//     } else {
//       if (selectedSeats.length < flightData.passengerCount) {
//         setSelectedSeats([...selectedSeats, seatId]);
//       }
//     }
//   };

//   const handleNameChange = (index, value) => {
//     const updatedNames = [...passengerNames];
//     updatedNames[index] = value;
//     setPassengerNames(updatedNames);
//   };

//   const handleBooking = () => {
//     if (passengerNames.some((name) => name.trim() === '') || email.trim() === '') {
//       alert('Please fill in all names and email.');
//       return;
//     }
//     if (selectedSeats.length !== flightData.passengerCount) {
//       alert('Please select seats equal to passenger count.');
//       return;
//     }
//     // setSubmitted(true);
//     console.log('Booking Summary:');
//     console.log('Flight:', selectedFlight);
//     console.log('Class:', flightClass);
//     console.log('Passengers:', passengerNames);
//     console.log('Email:', email);
//     console.log('Selected Seats:', selectedSeats);
//     alert('Booking Submitted!');
    
//   };

//   return (
//     <div style={{ display: 'flex', padding: '20px', gap: '40px' }}>
//       {/* Left Column */}
//       <div style={{ flex: 1 }}>
//         <h2>Booking Info</h2>
//         <p><b>Flight:</b> {flightData.flightNumber}</p>
//         <p><b>From:</b> {flightData.from}</p>
//         <p><b>To:</b> {flightData.to}</p>
//         <p><b>Class:</b> {flightData.classType}</p>
//         <p><b>Passengers:</b> {flightData.passengerCount}</p>

//         <h3>Passenger Info</h3>
//         {passengerNames.map((name, index) => (
//           <div key={index}>
//             <label>Passenger {index + 1} Name: </label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => handleNameChange(index, e.target.value)}
//               style={{ marginBottom: '10px' }}
//             />
//           </div>
//         ))}

//         <div>
//           <label>Email: </label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </div>

//         <button onClick={handleBooking} style={{ marginTop: '20px', padding: '8px 16px' }}>
//           Create Booking
//         </button>

//         {/* Summary
//         {submitted && (
//           <div style={{ marginTop: '20px', backgroundColor: '#f0f0f0', padding: '10px' }}>
//             <h4>Booking Summary</h4>
//             <p><b>Seats:</b> {selectedSeats.join(', ')}</p>
//             <p><b>Passenger Names:</b></p>
//             <ul>
//               {passengerNames.map((name, i) => (
//                 <li key={i}>{name}</li>
//               ))}
//             </ul>
//             <p><b>Email:</b> {email}</p>
//           </div>
//         )} */}
//       </div>

//       {/* Right Column */}
//       <div style={{ flex: 1 }}>
//         <h2>Seat Map</h2>
//         <SeatMap
//           classType={flightData.classType}
//           selectedSeats={selectedSeats}
//           onSeatClick={handleSeatClick}
//           passengerCount={flightData.passengerCount}
//         />
//       </div>
//     </div>
//   );
// };




// export default App;





