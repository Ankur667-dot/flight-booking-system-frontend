import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import HomeApp from '../src/page/user/HomeApp';
import FlightApp from '../src/page/user/FlightApp';
import BookingApp from '../src/page/user/BookingApp';
import MyBooking from '../src/page/user/MyBooking';
// import UserProfile from '../src/page/user/UserProfile';
import SignIn from './page/SingIn';
import SignUp from './page/SignUp';


function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeApp />} />
          <Route path="/flights" element={<FlightApp />} />
          <Route path="/booking" element={<BookingApp />} />d
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/signin" />} />
           <Route path="/my-booking" element={<MyBooking />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
    // <UserProfile/>
    // <MyBooking />
  );
}

export default App;