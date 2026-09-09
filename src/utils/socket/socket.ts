import { io } from 'socket.io-client';

const uri = import.meta.env.VITE_API_URL as string;

const socket = io(uri, {
  autoConnect: false,
  auth: {
    token: '',
  },
});

socket.on('connect_error', (err) => {
  if (err.message === 'invalid credentials') {
    socket.disconnect();
  }
});

export default socket;
