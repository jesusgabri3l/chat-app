import React from 'react';

export default function Message ({ message, sent }: any) {
  return (
    <div className={`message ${sent && 'message--sent'}`}>
      <div className="message__text">
        <span className="message__text__text text">{message.message}</span>
      </div>
      <div className="message__info">
        <img className="message__info__img" src={message.user.imageUrl} alt="profile" />
        <p className="message__info__name text">{message.user.name}</p>
        <small className="message__info__time">12:30pm</small>
      </div>
    </div>
  );
}
