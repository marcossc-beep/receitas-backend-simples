import axios from 'axios';

// Troque pelo IP do seu PC na rede local
const api = axios.create({
  baseURL: 'http://10.23.16.58:3000', // IP do adaptador Wi-Fi
});

export default api;