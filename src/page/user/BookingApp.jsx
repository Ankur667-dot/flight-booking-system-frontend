// import React, { useState } from 'react';

// const BookingApp = () => {
//   const [passengerCount, setPassengerCount] = useState(2);
//   const [passengerNames, setPassengerNames] = useState(['', '']);
//   const [email, setEmail] = useState('');
//   const [selectedSeats, setSelectedSeats] = useState([]);
//   const [bookedSeats] = useState(['S3', 'S7', 'S12']); 

//   const flightDetails = {
//     flightNumber: 'AI302',
//     from: 'Delhi',
//     to: 'Mumbai',
//     class: 'Economy',
//   };

//   const handleNameChange = (index, value) => {
//     const updated = [...passengerNames];
//     updated[index] = value;
//     setPassengerNames(updated);
//   };

//   const handleSeatClick = (seat) => {
//     if (bookedSeats.includes(seat)) return;

//     if (selectedSeats.includes(seat)) {
//       setSelectedSeats(selectedSeats.filter(s => s !== seat));
//     } else if (selectedSeats.length < passengerCount) {
//       setSelectedSeats([...selectedSeats, seat]);
//     }
//   };

//   const handleBooking = () => {
   
//     if (passengerNames.some(name => !name.trim()) || !email.trim()) {
//       alert('Please fill all passenger names and email.');
//       return;
//     }

//     if (selectedSeats.length !== passengerCount) {
//       alert(`Please select exactly ${passengerCount} seat(s).`);
//       return;
//     }

   
//     const bookingData = {
//       flight: flightDetails,
//       passengers: passengerNames,
//       email,
//       seats: selectedSeats,
//     };

//     console.log('Booking Successful:', bookingData);
//     alert('Booking Successful!');
//   };

//   return (
//     <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
//       {/* Booking Form */}
//       <div style={{ flex: 1, padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
//         <h2>Booking Details</h2>
//         <p><strong>Flight:</strong> {flightDetails.flightNumber}</p>
//         <p><strong>From:</strong> {flightDetails.from}</p>
//         <p><strong>To:</strong> {flightDetails.to}</p>
//         <p><strong>Class:</strong> {flightDetails.class}</p>
//         <p><strong>Passengers:</strong> {passengerCount}</p>

//         <h4>Passenger Names:</h4>
//         {[...Array(passengerCount)].map((_, i) => (
//           <input
//             key={i}
//             placeholder={`Passenger ${i + 1} Name`}
//             value={passengerNames[i]}
//             onChange={(e) => handleNameChange(i, e.target.value)}
//             style={{ display: 'block', marginBottom: '10px', padding: '5px', width: '100%' }}
//           />
//         ))}

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={{ display: 'block', marginBottom: '20px', padding: '5px', width: '100%' }}
//         />

//         <div style={{ background: '#eee', padding: '10px', borderRadius: '5px' }}>
//           <h4>Booking Summary:</h4>
//           <p>Flight: {flightDetails.flightNumber}</p>
//           <p>Class: {flightDetails.class}</p>
//           <p>Passengers: {passengerNames.join(', ')}</p>
//           <p>Seats: {selectedSeats.join(', ')}</p>
//           <p>Email: {email}</p>
//         </div>

//         <button
//           style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
//           onClick={handleBooking}
//         >
//           Create Booking
//         </button>
//       </div>

//       {/* Seat Map */}
//       <div style={{ flex: 1 }}>
//         <h2>Seat Map</h2>
//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
//           {Array.from({ length: 30 }, (_, i) => {
//             const seat = `S${i + 1}`;
//             const isBooked = bookedSeats.includes(seat);
//             const isSelected = selectedSeats.includes(seat);

//             return (
//               <div
//                 key={seat}
//                 onClick={() => handleSeatClick(seat)}
//                 style={{
//                   padding: '10px',
//                   textAlign: 'center',
//                   borderRadius: '5px',
//                   background: isBooked
//                     ? 'red'
//                     : isSelected
//                     ? 'green'
//                     : '#ddd',
//                   color: isBooked ? 'white' : 'black',
//                   cursor: isBooked ? 'not-allowed' : 'pointer',
//                 }}
//               >
//                 {seat}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };





// export default BookingApp; 





import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedFlightAtom, passengerCountAtom } from '../../store/bookingAtom';
import { getFlightByFlightNumber } from '../../api/flightApi';

const BookingApp = () => {
  const flight = useRecoilValue(selectedFlightAtom);
  const passengerCount = useRecoilValue(passengerCountAtom);

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengerNames, setPassengerNames] = useState(Array(passengerCount).fill(''));
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const res = await getFlightByFlightNumber(flight.flightNumber);
        const seatData = res.data.data[0].airplane.seats;

        const formattedSeats = seatData.map(seat => ({
          id: seat.id,
          label: `${seat.row}${seat.col}`,
          booked: seat.booked,
        }));

        setSeats(formattedSeats);
      } catch (err) {
        console.error('Failed to load flight seats', err);
      }
    };

    if (flight?.flightNumber) {
      fetchFlight();
    }
  }, [flight]);

  const toggleSeat = (label) => {
    if (selectedSeats.includes(label)) {
      setSelectedSeats(prev => prev.filter(seat => seat !== label));
    } else if (selectedSeats.length < passengerCount) {
      setSelectedSeats(prev => [...prev, label]);
    }
  };

  const handleNameChange = (index, value) => {
    const updatedNames = [...passengerNames];
    updatedNames[index] = value;
    setPassengerNames(updatedNames);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingData = {
      flightNumber: flight.flightNumber,
      email,
      passengerNames,
      selectedSeats,
    };
    console.log("Booking Details:", bookingData);
    alert('Booking submitted!');
    // TODO: send bookingData to backend here
  };

  return (
    <div style={{ display: 'flex', gap: '40px', padding: '30px' }}>
      {/* Left Panel - Form */}
      <form onSubmit={handleSubmit} style={{ flex: 1 }}>
        <h2>Flight Booking</h2>

        <div>
          <p><strong>Flight:</strong> {flight?.flightNumber}</p>
          <p><strong>From:</strong> {flight?.departureAirport?.cityName}</p>
          <p><strong>To:</strong> {flight?.arrivalAirport?.cityName}</p>
          <p><strong>Passengers:</strong> {passengerCount}</p>
        </div>

        <div>
          <h3>Enter Passenger Details</h3>
          {passengerNames.map((name, idx) => (
            <div key={idx}>
              <input
                type="text"
                placeholder={`Passenger ${idx + 1} Name`}
                value={name}
                onChange={(e) => handleNameChange(idx, e.target.value)}
                required
                style={{ padding: '8px', marginBottom: '10px', width: '100%' }}
              />
            </div>
          ))}
          <input
            type="email"
            placeholder="Contact Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '8px', marginBottom: '20px', width: '100%' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px' }}>
          Submit Booking
        </button>
      </form>

      {/* Right Panel - Seat Layout */}
      <div style={{ flex: 1 }}>
        <h3>Select Seats</h3>
        <p style={{ fontSize: '14px' }}>Booked seats are disabled. Select exactly {passengerCount} seats.</p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 60px)',
            gap: '10px',
            marginTop: '20px'
          }}
        >
          {seats.map(seat => {
            const isSelected = selectedSeats.includes(seat.label);
            return (
              <button
                key={seat.id}
                disabled={seat.booked}
                onClick={() => toggleSeat(seat.label)}
                style={{
                  padding: '10px',
                  backgroundColor: seat.booked
                    ? '#999'
                    : isSelected
                    ? 'green'
                    : '#add8e6',
                  color: seat.booked ? '#fff' : '#000',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: seat.booked ? 'not-allowed' : 'pointer'
                }}
              >
                {seat.label}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: '20px' }}>
          <p><strong>Selected Seats:</strong> {selectedSeats.join(', ') || 'None'}</p>
        </div>
      </div>
    </div>
  );
};

export default BookingApp;
