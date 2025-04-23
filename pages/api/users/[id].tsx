import { NextApiRequest, NextApiResponse } from 'next';
import {
  ERROR_METHOD_NOT_ALLOWED,
  ERROR_USER_NOT_FOUND,
  users,
} from '@/data/mockData';
import { ErrorMessage, User } from '@/data/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | ErrorMessage>
) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const user = users.find((user) => user.id === id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: ERROR_USER_NOT_FOUND });
    }
  } else {
    res.status(405).json({ message: ERROR_METHOD_NOT_ALLOWED });
  }
}
