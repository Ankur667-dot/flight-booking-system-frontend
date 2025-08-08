
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { selectedFlightAtom } from '../../store/bookingAtom';
import './FlightApp.css';

const FlightApp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const setSelectedFlight = useSetRecoilState(selectedFlightAtom);

  // Data from navigation
  const tripType = location.state?.tripType || 'oneway';
  const outboundFlights = location.state?.outboundFlights || [];
  const returnFlights = location.state?.returnFlights || [];
  const oneWayFlights = location.state?.flights || [];

  // For round trip selection
  const [selectedOutbound, setSelectedOutbound] = useState(null);
  const [selectedReturn, setSelectedReturn] = useState(null);

  const handleSelectOneWay = (flight) => {
    setSelectedFlight(flight);
    navigate('/booking');
  };

  const handleConfirmRoundTrip = () => {
    if (!selectedOutbound || !selectedReturn) {
      alert('Please select both outbound and return flights.');
      return;
    }

    // You could store both in Recoil or handle differently depending on booking logic
    setSelectedFlight({ outbound: selectedOutbound, return: selectedReturn });
    navigate('/booking');
  };

  const FlightTable = ({ flights, onSelect, selectedFlight }) => (
    <table border="1">
      <thead>
        <tr>
          <th>Flight</th>
          <th>Airline</th>
          <th>Departure</th>
          <th>Departure Time</th>
          <th>Arrival</th>
          <th>Arrival Time</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {flights.length > 0 ? (
          flights.map((flight) => (
            <tr
              key={flight.id}
              style={{
                backgroundColor:
                  selectedFlight?.id === flight.id ? 'rgba(0,255,255,0.2)' : 'transparent',
              }}
            >
              <td>{flight.flightNumber}</td>
              <td>{flight.airplane.modelNumber}</td>
              <td>{flight.departureAirport.cityName}</td>
              <td>
                {flight.departureTime
                  ? new Date(flight.departureTime).toLocaleString()
                  : 'N/A'}
              </td>
              <td>{flight.arrivalAirport.cityName}</td>
              <td>
                {flight.arrivalTime
                  ? new Date(flight.arrivalTime).toLocaleString()
                  : 'N/A'}
              </td>
              <td>
                <button onClick={() => onSelect(flight)}>
                  {selectedFlight?.id === flight.id ? 'Selected' : 'Select'}
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">No flights available</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  return (
    <div>
      {tripType === 'roundtrip' ? (
        <>
          <h2>Select Outbound Flight</h2>
          <FlightTable
            flights={outboundFlights}
            onSelect={setSelectedOutbound}
            selectedFlight={selectedOutbound}
          />

          <h2>Select Return Flight</h2>
          <FlightTable
            flights={returnFlights}
            onSelect={setSelectedReturn}
            selectedFlight={selectedReturn}
          />

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={handleConfirmRoundTrip}>Confirm Round Trip</button>
          </div>
        </>
      ) : (
        <>
          <h2>Available Flights</h2>
          <FlightTable
            flights={oneWayFlights}
            onSelect={handleSelectOneWay}
            selectedFlight={null}
          />
        </>
      )}
    </div>
  );
};

export default FlightApp;
