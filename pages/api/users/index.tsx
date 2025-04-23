import { NextApiRequest, NextApiResponse } from 'next';
import {
  ERROR_METHOD_NOT_ALLOWED,
  ERROR_USERS_NOT_FOUND,
  users,
} from '@/data/mockData';
import { ErrorMessage, User } from '@/data/types';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User[] | ErrorMessage>
) {
  if (req.method === 'GET') {
    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: ERROR_USERS_NOT_FOUND });
    }
  } else {
    res.status(405).json({ message: ERROR_METHOD_NOT_ALLOWED });
  }
}
