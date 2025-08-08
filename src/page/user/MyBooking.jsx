// import React from 'react';
// import './MyBooking.css';
// import Barcode from '../../component/BarCode';
// const MyBooking = () => {

//   const ticket = {
//     airline: "Air India",
//     from: "DEL",
//     to: "PNQ",
//     departureTime: "02:04 am",
//     arrivalTime: "04:14 am",
//     duration: "2h 10m",
//     name: "Raj",
//     travelClass: "Business",
//     flightNumber: "AI123",
//     gate: "25",
//     terminal: "4",
//     seat: "2D",
//   };


//   return (
//     <div className="ticket-container">
//       <div className="ticket">
//         {/* Airline Name */}
//         <div className="ticket-header">{ticket.airline}</div>

//         {/* Route Info */}
//         <div className="ticket-route">
//           <div className="route-section">
//             <div className="airport-code">{ticket.from}</div>
//             <div className="time">{ticket.departureTime}</div>
//           </div>
//           <div className="plane-icon"><div className="duration">{ticket.duration}</div></div>
//           <div className="route-section">
//             <div className="airport-code">{ticket.to}</div>
//             <div className="time">{ticket.arrivalTime}</div>
//           </div>
//         </div>

//         {/* Passenger & Flight Info */}
//         <div className="ticket-details">
//           <div className="detail-block">
//             <span className="label">Name</span>
//             <span>{ticket.name}</span>
//           </div>
//           <div className="detail-block">
//             <span className="label">Class</span>
//             <span>{ticket.travelClass}</span>
//           </div>
//           <div className="detail-block">
//             <span className="label">Flight Number</span>
//             <span>{ticket.flightNumber}</span>
//           </div>
//           <div className="detail-block">
//             <span className="label">Seat</span>
//             <span>{ticket.seat}</span>
//           </div>
//           <div className="detail-block">
//             <span className="label">Gate</span>
//             <span>{ticket.gate}</span>
//           </div>
//           <div className="detail-block">
//             <span className="label">Terminal</span>
//             <span>{ticket.terminal}</span>
//           </div>
//         </div>

//         {/* Barcode */}
//         <div className="barcode">
//           <Barcode />
//         </div>
//       </div>
//     </div>
//   );
// };




// export default MyBooking;

import React from 'react';
import './Mybooking.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const MyBooking = () => {
  const ticket = {
    airline: "Boeing 737",
    from: "Pune",
    to: "Mumbai",
    departureTime: "05:00 am",
    arrivalTime: " 07:00 am",
    duration: "2h 00m",
    passengerName: "",
    flightNumber: "AI101",
    seat: "2B",
    gate: "25",
    terminal: "4",
    travelClass: "Economic",
    date: "15 Aug 2025",
    barcodeUrl:
      "https://www.barcodesinc.com/generator/image.php?code=AI123&style=197&type=C128B&width=250&height=80&xres=1&font=3",
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById('ticket');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, imgHeight);
      pdf.save('boarding-pass.pdf');
    });
  };

  return (
    <div className="ticket-container">
      <div className="download-button-wrapper">
        <button onClick={handleDownloadPDF} className="download-button">
          Download as PDF
        </button>
      </div>

      <div id="ticket" className="ticket">
        {/* LEFT SIDE */}
        <div className="ticket-left">
          <div className="ticket-header">Boarding Pass</div>

          <div className="ticket-route">
            <div className="route-section">
              <div className="airport-code">{ticket.from}</div>
              <div className="city">Delhi, India</div>
              <div className="time">{ticket.departureTime}</div>
            </div>

            <div className="plane-icon">✈️</div>

            <div className="route-section">
              <div className="airport-code">{ticket.to}</div>
              <div className="city">Pune, India</div>
              <div className="time">{ticket.arrivalTime}</div>
            </div>
          </div>

          <div className="ticket-details">
            <div className="detail-block">
              <div className="label">Passenger</div>
              <div className="value">{ticket.passengerName}</div>
            </div>
            <div className="detail-block">
              <div className="label">Seat</div>
              <div className="value">{ticket.seat}</div>
            </div>
            <div className="detail-block">
              <div className="label">Flight</div>
              <div className="value">{ticket.flightNumber}</div>
            </div>
            <div className="detail-block">
              <div className="label">Class</div>
              <div className="value">{ticket.travelClass}</div>
            </div>
            <div className="detail-block">
              <div className="label">Gate</div>
              <div className="value">{ticket.gate}</div>
            </div>
            <div className="detail-block">
              <div className="label">Terminal</div>
              <div className="value">{ticket.terminal}</div>
            </div>
            <div className="detail-block">
              <div className="label">Date</div>
              <div className="value">{ticket.date}</div>
            </div>
            <div className="detail-block">
              <div className="label">Duration</div>
              <div className="value">{ticket.duration}</div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="ticket-right">
          <div className="flight-code">{ticket.flightNumber}</div>

          <div className="passenger-info">
            <div className="label">Passenger</div>
            <div className="value">{ticket.passengerName}</div>
            <div className="label">Seat</div>
            <div className="value">{ticket.seat}</div>
          </div>

          <div className="barcode">
            <img src={ticket.barcodeUrl} alt="Barcode" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBooking;

// import React from 'react';
// import './Mybooking.css';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import { useRecoilValue } from 'recoil';
// import {
//   selectedFlightAtom,
//   passengerCountAtom,
//   passengerNameAtom,
// } from '../../store/bookingAtom';

// const MyBooking = () => {
//   const flight = useRecoilValue(selectedFlightAtom);
//   const passengerCount = useRecoilValue(passengerCountAtom);
//   const passengerNames = useRecoilValue(passengerNameAtom); // Array

//   const handleDownloadPDF = () => {
//     const input = document.getElementById('ticket');
//     html2canvas(input, { scale: 2 }).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const imgProps = pdf.getImageProperties(imgData);
//       const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
//       pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, imgHeight);
//       pdf.save('boarding-pass.pdf');
//     });
//   };

//   const ticket = flight
//     ? {
//         airline: flight.airplane?.modelNumber || 'N/A',
//         from: flight.departureAirport?.code || '',
//         to: flight.arrivalAirport?.code || '',
//         departureTime: flight.departureTime
//           ? new Date(flight.departureTime).toLocaleTimeString([], {
//               hour: '2-digit',
//               minute: '2-digit',
//             })
//           : '',
//         arrivalTime: flight.arrivalTime
//           ? new Date(flight.arrivalTime).toLocaleTimeString([], {
//               hour: '2-digit',
//               minute: '2-digit',
//             })
//           : '',
//         duration: flight.duration || '',
//         flightNumber: flight.flightNumber || '',
//         seat: flight.selectedSeat || 'Not Assigned',
//         gate: flight.gate || 'TBD',
//         terminal: flight.terminal || 'TBD',
//         travelClass: flight.travelClass || 'Economy',
//         date: flight.departureTime
//           ? new Date(flight.departureTime).toLocaleDateString()
//           : '',
//         barcodeUrl: `https://www.barcodesinc.com/generator/image.php?code=${
//           flight.flightNumber || 'UNKNOWN'
//         }&style=197&type=C128B&width=250&height=80&xres=1&font=3`,
//       }
//     : null;

//   return (
//     <div className="ticket-container">
//       <div className="download-button-wrapper">
//         <button onClick={handleDownloadPDF} className="download-button">
//           Download as PDF
//         </button>
//       </div>

//       {ticket ? (
//         <div id="ticket" className="ticket">
//           {/* LEFT SIDE */}
//           <div className="ticket-left">
//             <div className="ticket-header">Boarding Pass</div>

//             <div className="ticket-route">
//               <div className="route-section">
//                 <div className="airport-code">{ticket.from}</div>
//                 <div className="city">{ticket.airline}</div>
//                 <div className="time">{ticket.departureTime}</div>
//               </div>

//               <div className="plane-icon">✈️</div>

//               <div className="route-section">
//                 <div className="airport-code">{ticket.to}</div>
//                 <div className="city">{ticket.airline}</div>
//                 <div className="time">{ticket.arrivalTime}</div>
//               </div>
//             </div>

//             <div className="ticket-details">
//               <div className="detail-block">
//                 <div className="label">Passengers</div>
//                 <div className="value">
//                   {passengerNames.length > 0
//                     ? passengerNames.join(', ')
//                     : 'N/A'}
//                 </div>
//               </div>
//               <div className="detail-block">
//                 <div className="label">Seat</div>
//                 <div className="value">{ticket.seat}</div>
//               </div>
//               <div className="detail-block">
//                 <div className="label">Flight</div>
//                 <div className="value">{ticket.flightNumber}</div>
//               </div>
//               <div className="detail-block">
//                 <div className="label">Class</div>
//                 <div className="value">{ticket.travelClass}</div>
//               </div>
//               <div className="detail-block">
//                 <div className="label">Gate</div>
//                 <div className="value">{ticket.gate}</div>
//               </div>
//               <div className="detail-block">
//                 <div className="label">Terminal</div>
//                 <div className="value">{ticket.terminal}</div>
//               </div>
//               <div className="detail-block">
//                 <div className="label">Date</div>
//                 <div className="value">{ticket.date}</div>
//               </div>
//               <div className="detail-block">
//                 <div className="label">Duration</div>
//                 <div className="value">{ticket.duration}</div>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDE */}
//           <div className="ticket-right">
//             <div className="flight-code">{ticket.flightNumber}</div>

//             <div className="passenger-info">
//               <div className="label">Passengers</div>
//               {passengerNames.length > 0 ? (
//                 passengerNames.map((name, index) => (
//                   <div key={index} className="value">
//                     {name}
//                   </div>
//                 ))
//               ) : (
//                 <div className="value">N/A</div>
//               )}
//               <div className="label">Seat</div>
//               <div className="value">{ticket.seat}</div>
//             </div>

//             <div className="barcode">
//               <img src={ticket.barcodeUrl} alt="Barcode" />
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p>No booking found.</p>
//       )}
//     </div>
//   );
// };

// export default MyBooking;
