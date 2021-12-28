import React, { useState } from 'react';
import './styles/styles.scss';
import ChatView from './views/ChatView';
import LoginView from './views/LoginView';
import { useAuthIn, refreshTokenSetup } from './utils/auth/useAuth';
import socket from './utils/socket/socket';

function App () {
  const [view, setView] = useState('login');
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const onSuccessLogin = async (res: any) => {
    refreshTokenSetup(res);
    setUser(res.profileObj);
    socket.auth.token = res.tokenId;
    socket.connect();
    setView('chat');
    setLoading(false);
    console.log(user);
  };
  // eslint-disable-next-line
  const onFailureLogin = (res: any) => {console.log(res); setLoading(false);};
  // eslint-disable-next-line
  const onRequestLogin = () => { setLoading(true); };

  const onAutoLoadFinished = (res: any) => { if (res === false) setLoading(false); };

  const signIn = useAuthIn(onSuccessLogin, onFailureLogin, onRequestLogin, onAutoLoadFinished);

  return (
    <div className="container">
      { view === 'login' ? <LoginView signIn={signIn} loading={loading} /> : <ChatView user={user} /> }
    </div>
  );
}

export default App;
