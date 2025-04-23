import { useEffect, useState } from 'react';
import Link from 'next/link';
import Avatar from '@/components/Avatar';
import BackButton from '@/components/BackButton';
import { User } from '@/data/types';

const ProfilesPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');

        if (!res.ok) {
          throw new Error('Failed to load profiles');
        }

        const data: User[] = await res.json();

        setUsers(data);
      } catch (error: unknown) {
        setError('Failed to fetch profiles due to some unknown error');
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return (
      <div className='p-6 bg-white min-h-screen'>
        <BackButton />
        <h1 className='text-3xl font-bold text-red-500'>{error}</h1>
      </div>
    );
  }

  return (
    <div className='p-6 bg-white min-h-screen'>
      <BackButton />
      <h1 className='text-3xl font-bold'>User Profiles</h1>
      <div className='mt-6 grid grid-cols-3 gap-6'>
        {users.map((user) => (
          <Link href={`/profiles/${user.id}`} key={user.id}>
            <span className='flex flex-col items-center text-center cursor-pointer'>
              <Avatar src={user.avatar} size={72} />
              <p className='text-sm mt-2'>{user.name}</p>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfilesPage;
