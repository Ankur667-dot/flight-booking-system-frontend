import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import HomeApp from '../src/page/user/HomeApp';
import FlightApp from '../src/page/user/FlightApp';
import BookingApp from '../src/page/user/BookingApp';
import MyBooking from '../src/page/user/MyBooking';
// import UserProfile from '../src/page/user/UserProfile';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeApp />} />
          <Route path="/flights" element={<FlightApp />} />
          <Route path="/booking" element={<BookingApp />} />
           <Route path="/my-booking" element={<MyBooking />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
    // <UserProfile/>
    // <MyBooking />
  );
}

export default App;