
export type Post = {
  id: string;
  title: string;
  body: string;
  authorId: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  friends: string[];
};
