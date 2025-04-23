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
    <div className='bg-gray-50 min-h-screen p-6'>
      <div className='max-w-5xl mx-auto'>
        <BackButton />

        <h1 className='text-3xl font-bold text-gray-800 mt-6'>User Profiles</h1>
        
        <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
          {users.map((user) => (
            <Link href={`/profiles/${user.id}`} key={user.id}>
              <span className='flex flex-col items-center text-center bg-white p-4 rounded-lg shadow-md hover:shadow-lg'>
                <Avatar src={user.avatar} size={96} />
                <p className='text-lg mt-4 font-semibold text-gray-700'>{user.name}</p>
                <p className='text-sm text-gray-500'>{user.email}</p>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilesPage;
