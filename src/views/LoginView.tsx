import { GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';

type LoginViewProps = {
  onSuccess: (credentialResponse: CredentialResponse) => void;
};

export default function LoginView({ onSuccess }: LoginViewProps) {
  return (
    <div className="login">
      <p className="login__text">
        Wanna
        <span> chat</span>
        ? Just log into your
        <span> Google </span>
        account
      </p>
      <div className="login__button">
        <GoogleLogin onSuccess={onSuccess} onError={() => console.error('Google login failed')} />
      </div>
    </div>
  );
}
