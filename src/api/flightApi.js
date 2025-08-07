import axios from 'axios';

const BASE_URL = 'https://4da8f9e99447.ngrok-free.app/flights';


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true'
  }
});

export const getAirports = async () => {
  const res = await axiosInstance.get('/airports');
  return res.data;
};

export const searchFlights = async (params) => {
  const query = new URLSearchParams(params).toString();
  const res = await axiosInstance.get(`/search?${query}`);
  return res.data.data;
};


export const getFlightByFlightNumber = async (flightNumber) => {
  const res = await axiosInstance.get(`/${flightNumber}`);
  return res;
};