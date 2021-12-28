import { io } from 'socket.io-client';

const uri = 'http://localhost:5000/';

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
