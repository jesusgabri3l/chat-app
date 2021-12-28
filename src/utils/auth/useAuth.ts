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

export const refreshTokenSetup = (res: any) => {
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
  const refreshToken = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    setTimeout(refreshToken, refreshTiming);
  };
  setTimeout(refreshToken, refreshTiming);
};
