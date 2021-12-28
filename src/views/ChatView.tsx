import React, { createRef, useEffect, useState } from 'react';
import axios from 'axios';
import Message from '../components/Message';
import { useAuthOut } from '../utils/auth/useAuth';
import socket from '../utils/socket/socket';

export default function ChatView ({ user }: any) {
  const messageText = createRef<any>();
  const [messages, setMessages] = useState<any>([]);
  const onSuccess = () => { socket.disconnect(); window.location.reload(); };
  const signOut = useAuthOut(onSuccess);

  socket.on('hasANewMessage', (data: any) => setMessages([...messages, data]));

  const sendMessageHandler = () => {
    const newMessage = { message: messageText.current.value, user };
    socket.emit('newMessage', newMessage);
    setMessages([...messages, newMessage]);
    messageText.current.value = '';
  };

  useEffect(() => {
    const getAllMessages = async () => {
      const { data } = await axios('http://localhost:5000/api/messages');
      console.log(data);
    };
    getAllMessages();
  }, []);

  return (
    <div className="chat">
      <div className="chat__messages">
        {
          messages && messages.length > 0 && messages.map((message: any) => <Message message={message} sent={user.googleId === message.user.googleId && true} />)
        }
      </div>
      <div className="chat__actions">
        <textarea
          className="textarea"
          placeholder="Write your message"
          ref={messageText}
        />
        <button className="button button--file" type="button">
          <i className="fa fa-paperclip" />
        </button>
        <button
          className="button button--send"
          type="button"
          onClick={sendMessageHandler}
        >
          <span>Send</span>
          <i className="fa fa-paper-plane ml-i" />
        </button>
      </div>
      <button type="button" className="button" onClick={signOut}>
        Logout
      </button>
    </div>
  );
}
