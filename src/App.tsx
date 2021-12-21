import React, { useState } from 'react';
import './styles/styles.scss';
import ChatView from './views/ChatView';
import LoginView from './views/LoginView';
import { useAuthIn } from './utils/auth/useAuth';

function App () {
  const [view, setView] = useState('login');
  const [loading, setLoading] = useState(true);

  const onSuccessLogin = async (res: any) => {
    setLoading(false);
    // eslint-disable-next-line
    console.log(res);
    setView('chat');
  };
    // eslint-disable-next-line
  const onFailureLogin = (res: any) => console.log(res);
    // eslint-disable-next-line
  const onRequestLogin = () => { console.log('loading'); };

  const onAutoLoadFinished = (res: any) => {
    setLoading(false);
    // eslint-disable-next-line
    console.log(res);
  };

  const signIn = useAuthIn(onSuccessLogin, onFailureLogin, onRequestLogin, onAutoLoadFinished);

  return (
    <div className="container">
      { view === 'login' ? <LoginView signIn={signIn} loading={loading} /> : <ChatView /> }
    </div>
  );
}

export default App;
