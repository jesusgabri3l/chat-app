import React from 'react';
import './styles/styles.scss';

function App () {
  return (
    <div className="container">
      <div className="chat">
        <div className="chat__messages">
          <div className="message">
            <div className="message__text"><span className="message__text__text text">Hello world!</span></div>
            <div className="message__info">
              <span className="message__info__img" />
              <p className="message__info__name text">Jesus Gabriel</p>
              <small className="message__info__time">12:30pm</small>
            </div>
          </div>
          <div className="message message--sent">
            <div className="message--sent__text"><span className="message--sent__text__text text">Hello world!</span></div>
            <div className="message--sent__info">
              <span className="message--sent__info__img" />
              <p className="message--sent__info__name text">You</p>
              <small className="message--sent__info__time">12:30pm</small>
            </div>
          </div>
          <div className="message message--sent">
            <div className="message--sent__text"><span className="message--sent__text__text text">Hello world!</span></div>
            <div className="message--sent__info">
              <span className="message--sent__info__img" />
              <p className="message--sent__info__name text">You</p>
              <small className="message--sent__info__time">12:30pm</small>
            </div>
          </div>
          <div className="message">
            <div className="message__text"><span className="message__text__text text">Hello world!</span></div>
            <div className="message__info">
              <span className="message__info__img" />
              <p className="message__info__name text">Jesus Gabriel</p>
              <small className="message__info__time">12:30pm</small>
            </div>
          </div>
          <div className="message">
            <div className="message__text"><span className="message__text__text text">Hello world!</span></div>
            <div className="message__info">
              <span className="message__info__img" />
              <p className="message__info__name text">Jesus Gabriel</p>
              <small className="message__info__time">12:30pm</small>
            </div>
          </div>
          <div className="message">
            <div className="message__text"><span className="message__text__text text">Hello world!</span></div>
            <div className="message__info">
              <span className="message__info__img" />
              <p className="message__info__name text">Jesus Gabriel</p>
              <small className="message__info__time">12:30pm</small>
            </div>
          </div>
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
    </div>
  );
}

export default App;
