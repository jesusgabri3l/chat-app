import { createRef, useEffect, useState } from 'react';
import socket from '../../utils/socket/socket';
import api from '../../utils/api/api';
import Message from './Message';
import Loader from '../Loader';
import type { ChatMessage, ChatUser } from '../../types';

type ChatProps = {
  user: ChatUser;
};

const getTime = () => new Date().toISOString();

export default function Chat({ user }: ChatProps) {
  const messageText = createRef<HTMLTextAreaElement>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const onNewMessage = (data: ChatMessage) => setMessages((prev) => [...prev, data]);
    socket.on('hasANewMessage', onNewMessage);
    return () => {
      socket.off('hasANewMessage', onNewMessage);
    };
  }, []);

  const sendMessageHandler = () => {
    const text = messageText.current?.value.trim();
    if (text) {
      const newMessage: ChatMessage = { message: text, user, time: getTime() };
      socket.emit('newMessage', newMessage);
      setMessages((prev) => [...prev, newMessage]);
      messageText.current!.value = '';
    }
  };

  const onEnterHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      sendMessageHandler();
      e.preventDefault();
    }
  };

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        const { data } = await api.getMessages();
        setMessages((prev) => [...prev, ...data]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    getAllMessages();
  }, []);

  useEffect(() => {
    const chat = document.querySelector('.chatContainer');
    if (chat) chat.scrollTop = chat.scrollHeight;
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat__messages chatContainer">
        {loading && <Loader />}
        {messages.map((message, i) => (
          <Message key={`${message.time}-${i}`} message={message} sent={user.googleId === message.user.googleId} />
        ))}
      </div>
      <div className="chat__actions">
        <textarea
          className="textarea"
          placeholder="Write your message"
          ref={messageText}
          onKeyDown={onEnterHandler}
        />
        <button className="button button--send" type="button" onClick={sendMessageHandler}>
          <span>Send</span>
          <i className="fa fa-paper-plane ml-i" />
        </button>
      </div>
    </div>
  );
}
