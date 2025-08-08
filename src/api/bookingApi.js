import axios from 'axios';
const BASE_URL = 'https://2a143b69be9d.ngrok-free.app/flights';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'ngrok-skip-browser-warning': 'true'
  }
});
export const createBooking = async (data) => {
  const res = await axiosInstance.post('/bookings', data);
  return res.data;
};
