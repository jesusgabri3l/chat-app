import React from 'react';

export default function Message () {
  return (
    <div className="message">
      <div className="message__text"><span className="message__text__text text">Hello world!</span></div>
      <div className="message__info">
        <span className="message__info__img" />
        <p className="message__info__name text">Jesus Gabriel</p>
        <small className="message__info__time">12:30pm</small>
      </div>
    </div>
  );
}
