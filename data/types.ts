export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  friends: string[];
}

export interface Post {
  id: string;
  title: string;
  body: string;
  authorId: string;
  user?: User;
}

export type ErrorMessage = {
  message: string;
};
