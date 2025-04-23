import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, Post } from '@/data/types';
import BackButton from '@/components/BackButton';

type ProfileProps = {
  user: User;
};

const Profile = ({ user }: ProfileProps) => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [userFriends, setUserFriends] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsResponse, usersResponse] = await Promise.all([
          fetch('/api/posts'),
          fetch('/api/users'),
        ]);

        const postsData = await postsResponse.json();
        const usersData = await usersResponse.json();

        const userPostsData = postsData.filter(
          (post: Post) => post.authorId === user.id
        );
        const userFriendsData = usersData.filter((friend: User) =>
          user.friends.includes(friend.id)
        );

        setUserPosts(userPostsData);
        setUserFriends(userFriendsData);
      } catch (error: unknown) {
        console.error('Error fetching profile to due unknown reason: ', error);
        setError('Profile not found');
      }
    };

    fetchData();
  }, [user.id, user.friends]);

  if (error)
    return (
      <div className='text-center text-xl font-semibold mt-10'>
        <p>{error}</p>
        <BackButton />
      </div>
    );

  return (
    <div className='max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-8'>
      <BackButton />

      <div className='flex items-center space-x-4 mt-6'>
        <Image
          src={user.avatar}
          alt={user.name}
          width={120}
          height={120}
          className='rounded-full border-4 border-gray-300'
          priority
        />
        <div>
          <h2 className='text-3xl font-semibold text-gray-800'>{user.name}</h2>
          <p className='text-gray-600 text-sm'>{user.email}</p>
        </div>
      </div>

      <div className='mt-8'>
        <h3 className='text-xl font-semibold text-gray-800'>My Posts</h3>
        <ul className='mt-4 space-y-4'>
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <li key={post.id} className='border-b pb-4'>
                <h4 className='text-lg font-medium text-gray-900'>
                  {post.title}
                </h4>
                <p className='text-gray-700 mt-1'>{post.body}</p>
              </li>
            ))
          ) : (
            <p className='text-gray-600'>
              {user.name} has not written any posts yet!
            </p>
          )}
        </ul>
      </div>

      <div className='mt-8'>
        <h3 className='text-xl font-semibold text-gray-800'>My Friends</h3>
        <ul className='mt-4 space-y-3'>
          {userFriends.length > 0 ? (
            userFriends.map((friend) => (
              <li key={friend.id} className='flex items-center'>
                <Link href={`/profiles/${friend.id}`} passHref>
                  <span className='flex items-center'>
                    <Image
                      src={friend.avatar}
                      alt={friend.name}
                      width={36}
                      height={36}
                      className='rounded-full mr-3'
                    />
                    <span className='text-gray-800'>{friend.name}</span>
                  </span>
                </Link>
              </li>
            ))
          ) : (
            <p className='text-gray-600'>
              {user.name} has no friends yet! How sad.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
