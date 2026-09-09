import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import App from '../App';

const fakeCredential = (payload: object) => {
  const base64url = (obj: object) =>
    btoa(JSON.stringify(obj)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return `${base64url({ alg: 'RS256' })}.${base64url(payload)}.signature`;
};

const credential = fakeCredential({
  sub: 'google-123',
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  picture: 'https://example.com/avatar.png',
});

vi.mock('@react-oauth/google', () => ({
  GoogleOAuthProvider: ({ children }: { children: React.ReactNode }) => children,
  GoogleLogin: ({ onSuccess }: { onSuccess: (r: { credential: string }) => void }) => (
    <button type="button" onClick={() => onSuccess({ credential })}>
      Sign in with Google
    </button>
  ),
  googleLogout: vi.fn(),
}));

vi.mock('../utils/socket/socket', () => ({
  default: { connect: vi.fn(), disconnect: vi.fn(), on: vi.fn(), off: vi.fn(), emit: vi.fn(), auth: {} },
}));

vi.mock('../utils/api/api', () => ({
  default: { setToken: vi.fn(), getMessages: vi.fn().mockResolvedValue({ data: [] }) },
}));

describe('App', () => {
  it('shows the login screen before authenticating', () => {
    render(<App />);
    expect(screen.getByText(/just log into your/i)).toBeInTheDocument();
  });

  it('shows the chat once Google login succeeds', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /sign in with google/i }));

    expect(await screen.findByPlaceholderText('Write your message')).toBeInTheDocument();
  });
});
