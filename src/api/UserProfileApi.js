import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const getUserProfile = (userId) =>
  axios.get(`${BASE_URL}/users/${userId}`);

export const getCurrentFlight = (userId) =>
  axios.get(`${BASE_URL}/currentFlights?userId=${userId}`).then(res => res.data[0]);

export const getPreviousFlights = (userId) =>
  axios.get(`${BASE_URL}/previousFlights?userId=${userId}`);

