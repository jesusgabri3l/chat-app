import React from 'react';
import Message from '../components/Message';

export default function ChatView () {
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
          Send
          <i className="fa fa-paper-plane ml-i" />
        </button>
      </div>
    </div>
  );
}
