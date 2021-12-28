import React from 'react';
import moment from 'moment';

export default function Message ({ message, sent }: any) {
  const date = moment(message.time).format('LT');
  return (
    <div className={`message ${sent && 'message--sent'}`}>
      <div className="message__text">
        <span className="message__text__text text">{message.message}</span>
      </div>
      <div className="message__info">
        <img className="message__info__img" src={message.user.imageUrl} alt="" />
        <p className="message__info__name text">{message.user.name}</p>
        <small className="message__info__time">{date}</small>
      </div>
    </div>
  );
}
