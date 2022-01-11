import { io } from 'socket.io-client';

const uri = process.env.REACT_APP_API_URL!;

const socket: any = io(uri, {
  auth: {
    token: '',
  },
});
socket.on('connect_error', (err: any) => {
  if (err.message === 'invalid credentials') {
    socket.disconnect();
  }
});
export default socket;
