import React, { useState } from 'react';
import './SeatMap.css';

const SeatMap = ({ seats, passengerCount, onSeatSelect }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatClick = (seatId) => {
    const seat = seats.find((s) => s.id === seatId);
    const seatLabel = `${seat.row}${seat.col}`;

    if (selectedSeats.includes(seatLabel)) {
      const updated = selectedSeats.filter((s) => s !== seatLabel);
      setSelectedSeats(updated);
      onSeatSelect(updated);
    } else {
      if (selectedSeats.length < passengerCount) {
        const updated = [...selectedSeats, seatLabel];
        setSelectedSeats(updated);
        onSeatSelect(updated);
      } else {
        alert(`Only ${passengerCount} seat(s) can be selected.`);
      }
    }
  };

  return (
    <div>
      <h3>Economy Seat Map</h3>
      <div className="seat-map-grid">
        {seats.map((seat) => {
          const seatLabel = `${seat.row}${seat.col}`;
          const isSelected = selectedSeats.includes(seatLabel);

          return (
            <button
              key={seat.id}
              disabled={seat.booked}
              className={`seat 
                ${seat.booked ? 'booked' : ''} 
                ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSeatClick(seat.id)}
            >
              {seatLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SeatMap;

