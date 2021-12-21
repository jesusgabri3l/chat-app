import React from 'react';
import Message from '../components/Message';
import { useAuthOut } from '../utils/auth/useAuth';

export default function ChatView () {
  const onSuccess = () => { window.location.reload(); };
  const signOut = useAuthOut(onSuccess);
  return (
    <div className="chat">
      <div className="chat__messages">
        <Message />
      </div>
      <div className="chat__actions">
        <textarea className="textarea" placeholder="Write your message" />
        <button className="button button--file" type="button">
          <i className="fa fa-paperclip" />
        </button>
        <button className="button button--send" type="button">
          <span>Send</span>
          <i className="fa fa-paper-plane ml-i" />
        </button>
      </div>
      <button type="button" className="button" onClick={signOut}>Logout</button>
    </div>
  );
}
