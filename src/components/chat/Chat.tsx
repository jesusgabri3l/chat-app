import React, { createRef, useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import socket from '../../utils/socket/socket';
import Message from './Message';
import Loader from '../Loader';

export default function Chat ({ user }: any) {
  const messageText = createRef<any>();
  const [messages, setMessages] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const getTime = () => moment().format('LLL');

  socket.on('hasANewMessage', (data: any) => setMessages([...messages, data]));

  const sendMessageHandler = () => {
    if (messageText.current.value.trim().length > 0) {
      const newMessage = { message: messageText.current.value, user, time: getTime() };
      socket.emit('newMessage', newMessage);
      setMessages([...messages, newMessage]);
      messageText.current.value = '';
    }
  };

  const onEnterHandler = (e: any) => {
    if (e.key === 'Enter') { sendMessageHandler(); e.preventDefault(); }
  };

  useEffect(() => {
    const getAllMessages = async () => {
      const { data } = await axios('http://localhost:5000/api/messages');
      setMessages([...messages, ...data]);
      setLoading(false);
    };
    getAllMessages();
  }, []);

  useEffect(() => {
    const chat = document.querySelector('.chatContainer')!;
    chat.scrollTop = chat.scrollHeight;
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat__messages chatContainer">
        {loading && <Loader />}
        {messages.length > 0 && messages.map((message: any) => (
          <Message
            message={message}
            sent={user.googleId === message.user.googleId && true}
          />
        ))}
      </div>
      <div className="chat__actions">
        <textarea
          className="textarea"
          placeholder="Write your message"
          ref={messageText}
          onKeyDown={onEnterHandler}
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
    </div>
  );
}
