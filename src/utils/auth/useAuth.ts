import { useGoogleLogin, useGoogleLogout } from 'react-google-login';

const clientId = process.env.REACT_APP_CLIENT_ID !;

export function useAuthIn (onSuccess: any, onFailure: any, onRequest: any, onAutoLoadFinished: any) {
  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    onRequest,
    isSignedIn: true,
    accessType: 'offline',
    onAutoLoadFinished,
  });

  return signIn;
}

export function useAuthOut (onSucces: any) {
  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess: onSucces,
  });
  return signOut;
}
