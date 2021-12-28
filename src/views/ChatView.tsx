import React, { useState } from 'react';
import socket from '../utils/socket/socket';
import { useAuthOut } from '../utils/auth/useAuth';
import Chat from '../components/chat/Chat';

export default function ChatView ({ user }: any) {
  const [showOptions, setShowOptions] = useState(false);
  //  Auth handle for Logout
  const onSuccess = () => { socket.disconnect(); window.location.reload(); };
  const signOut = useAuthOut(onSuccess);
  return (
    <>
      <Chat user={user} />
      <div className="profile">
        <button className="profile__button" type="button" onClick={() => setShowOptions(!showOptions)}>
          <img src={user.imageUrl} alt="" className="profile__button__img" />
        </button>
        <ul className={`options ${showOptions && 'active'}`}>
          <li className="options__item">
            <button className="options__item__button" type="button" onClick={signOut}>
              Logout
              <i className="fa fa-sign-out-alt ml-i" />
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
