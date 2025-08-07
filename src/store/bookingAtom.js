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

export const selectedSeatsAtom = atom({
  key: 'selectedSeatsAtom',
  default: [],
});
