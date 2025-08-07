import React from 'react';

const FlightCard = ({ flight }) => (
  <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
    <p><strong>Flight:</strong> {flight.flightNumber}</p>
    <p><strong>From:</strong> {flight.from} → <strong>To:</strong> {flight.to}</p>
    <p><strong>Date:</strong> {flight.date}</p>
    <p><strong>Time:</strong> {flight.time}</p>
    <p><strong>Status:</strong> {flight.status}</p>
  </div>
);

export default FlightCard;
