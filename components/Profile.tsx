import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { User, Post } from '@/data/types';

type ProfileProps = {
  user: User;
};

const Profile = ({ user }: ProfileProps) => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [userFriends, setUserFriends] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
        setLoading(false);
      } catch (error: unknown) {
        console.error('Error fetching data to due unknown reason: ', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user.id, user.friends]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='bg-white shadow-lg rounded-xl p-8 mt-6'>
      <Image
        src={user.avatar}
        alt={user.name}
        width={180}
        height={180}
        priority
      />
      <h2 className='text-2xl font-bold'>{user.name}</h2>
      <p>{user.email}</p>

      <div className='mt-6'>
        <h3 className='text-xl font-semibold'>My Posts</h3>
        <ul className='mt-4 space-y-4'>
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <li key={post.id} className='border-b pb-4'>
                <h4 className='text-lg font-semibold'>{post.title}</h4>
                <p>{post.body}</p>
              </li>
            ))
          ) : (
            <p>{user.name} has not written any posts yet!</p>
          )}
        </ul>
      </div>

      <div className='mt-6'>
        <h3 className='text-xl font-semibold'>My Friends</h3>
        <ul className='mt-4 space-y-2'>
          {userFriends.length > 0 ? (
            userFriends.map((friend) => (
              <li key={friend.id} className='flex items-center'>
                <Link href={`/profiles/${friend.id}`} passHref>
                  <Image
                    src={friend.avatar}
                    alt={friend.name}
                    width={30}
                    height={30}
                    className='rounded-full mr-3'
                  />
                </Link>
                <span>{friend.name}</span>
              </li>
            ))
          ) : (
            <p>{user.name} has no friends yet! How sad.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
