import { NextApiRequest, NextApiResponse } from 'next';
import {
  ERROR_METHOD_NOT_ALLOWED,
  ERROR_POSTS_NOT_FOUND,
  posts,
} from '@/data/mockData';
import { Post, ErrorMessage } from '@/data/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[] | ErrorMessage>
) {
  if (req.method === 'GET') {
    if (posts.length > 0) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: ERROR_POSTS_NOT_FOUND });
    }
  } else {
    res.status(405).json({ message: ERROR_METHOD_NOT_ALLOWED });
  }
}
