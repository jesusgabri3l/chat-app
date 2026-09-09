import { useState } from 'react';
import Chat from '../components/chat/Chat';
import type { ChatUser } from '../types';

type ChatViewProps = {
  user: ChatUser;
  onLogout: () => void;
};

export default function ChatView({ user, onLogout }: ChatViewProps) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <>
      <Chat user={user} />
      <div className="profile">
        <button
          className="profile__button"
          type="button"
          onClick={() => setShowOptions(!showOptions)}
        >
          <img src={user.imageUrl} alt="" className="profile__button__img" />
        </button>
        <ul className={`options ${showOptions ? 'active' : ''}`}>
          <li className="options__item">
            <button className="options__item__button" type="button" onClick={onLogout}>
              Logout
              <i className="fa fa-sign-out-alt ml-i" />
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
