import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchFlights, getAirports } from '../../api/flightApi';
import { useSetRecoilState } from 'recoil';
import { passengerCountAtom, classAtom } from '../../store/bookingAtom';
import './HomeApp.css'


const HomeApp = () => {
  const navigate = useNavigate();

  const [tripType, setTripType] = useState('oneway');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [travellers, setTravellers] = useState(1);
  const [travelClass, setTravelClass] = useState('Economy');
  const [airports, setAirports] = useState([]);

  useEffect(() => {
    const loadAirports = async () => {
      try {
        const res = await getAirports();
        setAirports(res.data); 
      } catch (err) {
        alert('Failed to fetch airports');
      }
    };
    loadAirports();
  }, []);

const setPassengerRecoil = useSetRecoilState(passengerCountAtom);
const setClassRecoil = useSetRecoilState(classAtom);

const handleSearch = async () => {
  try {
    const fromAirport = airports.find(
      (airport) => airport.cityName.toLowerCase() === from.trim().toLowerCase()
    );
    const toAirport = airports.find(
      (airport) => airport.cityName.toLowerCase() === to.trim().toLowerCase()
    );

    if (!fromAirport || !toAirport) {
      alert('Invalid city names entered.');
      return;
    }

    const formattedDepartureDate = `${departureDate} 00:00:00`;

    setPassengerRecoil(travellers);
    setClassRecoil(travelClass);

    if (tripType === 'oneway') {
      const params = {
        departureId: fromAirport.id,
        arrivalId: toAirport.id,
        departureDate: formattedDepartureDate,
        passengers: travellers,
      };
      const flights = await searchFlights(params);
      navigate('/flights', { state: { flights, tripType } });

    } else if (tripType === 'roundtrip') {
      if (!returnDate) {
        alert('Please select a return date.');
        return;
      }

      const formattedReturnDate = `${returnDate} 00:00:00`;

      // Outbound flights
      const outboundParams = {
        departureId: fromAirport.id,
        arrivalId: toAirport.id,
        departureDate: formattedDepartureDate,
        passengers: travellers,
      };

      // Return flights
      const returnParams = {
        departureId: toAirport.id,
        arrivalId: fromAirport.id,
        departureDate: formattedReturnDate,
        passengers: travellers,
      };

      const [outboundFlights, returnFlights] = await Promise.all([
        searchFlights(outboundParams),
        searchFlights(returnParams)
      ]);

      navigate('/flights', { state: { outboundFlights, returnFlights, tripType } });
    }

  } catch (error) {
    console.error(error);
    alert('Error searching flights. Please try again.');
  }
};

// const handleSearch = async () => {
//   try {
//     const fromAirport = airports.find(
//       (airport) => airport.cityName.toLowerCase() === from.trim().toLowerCase()
//     );
//     const toAirport = airports.find(
//       (airport) => airport.cityName.toLowerCase() === to.trim().toLowerCase()
//     );

//     if (!fromAirport || !toAirport) {
//       alert('Invalid city names entered.');
//       return;
//     }

//     const formattedDate = `${departureDate} 00:00:00`;

//     const params = {
//       departureId: fromAirport.id,
//       arrivalId: toAirport.id,
//       departureDate: formattedDate,
//       passengers: travellers,
//     };

//     const flights = await searchFlights(params);

    
//     setPassengerRecoil(travellers);
//     setClassRecoil(travelClass);

//     navigate('/flights', { state: { flights } });
//   } catch (error) {
//     console.error(error);
//     alert('Error searching flights. Please try again.');
//   }
// };

  // const handleSearch = () => {
  //   // search API
  //   console.log({
  //     tripType,
  //     from,
  //     to,
  //     departureDate,
  //     returnDate,
  //     travellers,
  //     travelClass,
  //   });
  // };

  return (
    <div className='home-container'>
    <div className="homepage">
      <h2 className="form-title">Book Your Flight</h2>

      <div className="input-group trip-type-selector">
        <label className="radio-label">
          <input
            type="radio"
            name="tripType"
            value="oneway"
            checked={tripType === 'oneway'}
            onChange={() => setTripType('oneway')}
          />
             <span className="radio-custom"></span>
          One Way
        </label>
        <label className="radio-label">
          <input
            type="radio"
            name="tripType"
            value="roundtrip"
            checked={tripType === 'roundtrip'}
            onChange={() => setTripType('roundtrip')}
          />

        <span className="radio-custom"></span> 
          Round Trip
        </label>
      </div>

      <div className="input-group location-inputs">
        <input
          type="text"
          placeholder="From (e.g., Delhi)"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />
        <input
          type="text"
          placeholder="To (e.g., Mumbai)"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>

      <div className="input-group date-inputs">
        <label>
          Departure:
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
        </label>

        {tripType === 'roundtrip' && (
          <label>
            Return:
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </label>
        )}
      </div>

      <div className="input-group passenger-class-inputs">
        <label>
          Travellers:
          <input
            type="number"
            min="1"
            value={travellers}
            onChange={(e) => setTravellers(parseInt(e.target.value))}
          />
        </label>

        <label>
          Class:
          <select
            value={travelClass}
            onChange={(e) => setTravelClass(e.target.value)}
          >
            <option>Economy</option>
            <option>Business</option>
            <option>First</option>
          </select>
        </label>
      </div>

      <button className="search-button" onClick={handleSearch}>Search Flights</button>
    </div>

    </div>
  );
};



export default HomeApp;


