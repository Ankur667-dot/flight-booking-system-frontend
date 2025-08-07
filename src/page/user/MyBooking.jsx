import React from 'react';
import './MyBooking.css';
import Barcode from '../../component/BarCode';
const MyBooking = () => {

  const ticket = {
    airline: "Air India",
    from: "DEL",
    to: "PNQ",
    departureTime: "02:04 am",
    arrivalTime: "04:14 am",
    duration: "2h 10m",
    name: "Raj",
    travelClass: "Business",
    flightNumber: "AI123",
    gate: "25",
    terminal: "4",
    seat: "2D",
  };

  return (
    <div className="ticket-container">
      <div className="ticket">
        {/* Airline Name */}
        <div className="ticket-header">{ticket.airline}</div>

        {/* Route Info */}
        <div className="ticket-route">
          <div className="route-section">
            <div className="airport-code">{ticket.from}</div>
            <div className="time">{ticket.departureTime}</div>
          </div>
          <div className="plane-icon"><div className="duration">{ticket.duration}</div></div>
          <div className="route-section">
            <div className="airport-code">{ticket.to}</div>
            <div className="time">{ticket.arrivalTime}</div>
          </div>
        </div>

        {/* Passenger & Flight Info */}
        <div className="ticket-details">
          <div className="detail-block">
            <span className="label">Name</span>
            <span>{ticket.name}</span>
          </div>
          <div className="detail-block">
            <span className="label">Class</span>
            <span>{ticket.travelClass}</span>
          </div>
          <div className="detail-block">
            <span className="label">Flight Number</span>
            <span>{ticket.flightNumber}</span>
          </div>
          <div className="detail-block">
            <span className="label">Seat</span>
            <span>{ticket.seat}</span>
          </div>
          <div className="detail-block">
            <span className="label">Gate</span>
            <span>{ticket.gate}</span>
          </div>
          <div className="detail-block">
            <span className="label">Terminal</span>
            <span>{ticket.terminal}</span>
          </div>
        </div>

        {/* Barcode */}
        <div className="barcode">
          <Barcode />
        </div>
      </div>
    </div>
  );
};




export default MyBooking;