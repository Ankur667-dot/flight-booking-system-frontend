import { atom } from 'recoil';

export const passengerCountAtom = atom({
  key: 'passengerCountAtom',
  default: 1,
});

export const classAtom = atom({
  key: 'classAtom',
  default: 'Economy',
});

export const selectedFlightAtom = atom({
  key: 'selectedFlightAtom',
  default: null,
});

export const passengerDetailsAtom = atom({
  key: 'passengerDetailsAtom',
  default: [],
});
export const returnFlightAtom = atom({
  key: 'returnFlightAtom',
  default: null, })

export const selectedSeatsAtom = atom({
  key: 'selectedSeatsAtom',
  default: [],
});

export const createBooking = async (bookingData) => {
  const res = await axiosInstance.post('/', bookingData);
  return res.data;
};

export const bookingDetailsAtom = atom({
  key: 'bookingDetailsAtom',
  default: null, // will store the booking data after submit
});
