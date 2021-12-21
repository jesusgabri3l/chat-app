import React from 'react';
import googleLogo from '../assets/google.png';
import Loading from '../components/Loader';

export default function LoginView ({ signIn, loading }: any) {
  return (
    <div className="login">
      {
        loading
          ? <Loading />
          : (
            <>
              <p className="login__text">
                Wanna
                <span> chat</span>
                ? Just log into your
                <span> Google </span>
                account
              </p>
              <button className="login__button" type="button" onClick={signIn}>
                Sign In with Google
                <img alt="Google logo" src={googleLogo} className="login__button__img" />
              </button>
            </>
          )
      }
    </div>
  );
}
