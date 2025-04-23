import { NextApiRequest, NextApiResponse } from 'next';
import {
  ERROR_METHOD_NOT_ALLOWED,
  ERROR_POST_NOT_FOUND,
  posts,
} from '@/data/mockData';
import { ErrorMessage, Post } from '@/data/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post | ErrorMessage>
) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const post = posts.find((post) => post.id === id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: ERROR_POST_NOT_FOUND });
    }
  } else {
    res.status(405).json({ message: ERROR_METHOD_NOT_ALLOWED });
  }
}
