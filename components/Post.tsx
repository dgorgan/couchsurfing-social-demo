import Link from 'next/link';
import { users } from '@/data/mockData';

interface PostProps {
  post: {
    id: string;
    title: string;
    body: string;
    authorId: string;
  };
}

const Post = ({ post }: PostProps) => {
  const user = users.find((user) => user.id === post.authorId);

  if (!user) {
    return <p>User not found!</p>;
  }

  return (
    <div className='border p-4 rounded-lg shadow'>
      <Link href={`/posts/${post.id}`}>
        <h2 className='text-lg font-semibold hover:underline'>{post.title}</h2>
      </Link>
      <p className='text-gray-600'>{post.body}</p>

      <div className='flex items-center mt-2'>
        <Link href={`/profiles/${user.id}`}>
          <p className='text-sm text-blue-600 hover:underline'>
            Posted by: {user.name}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Post;
