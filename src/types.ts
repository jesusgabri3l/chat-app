export type ChatUser = {
  googleId: string;
  name: string;
  email: string;
  imageUrl: string;
};

export type ChatMessage = {
  message: string;
  user: ChatUser;
  time: string;
};
