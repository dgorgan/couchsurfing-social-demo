import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { Post, User } from '@/data/types';
import { BASE_URL, users } from '@/data/mockData';
import Avatar from '@/components/Avatar';
import BackButton from '@/components/BackButton';

type PostDetail = Post & { author: User };

type PostDetailProps = {
  post: PostDetail | null;
};

const PostDetail = ({ post }: PostDetailProps) => {
  if (!post) return <p className='text-center text-xl font-semibold mt-10'>Post not found!</p>;

  return (
    <div className='max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-8'>
      <BackButton />
      <h1 className='text-3xl font-bold text-gray-800 mt-4'>{post.title}</h1>
      <p className='text-gray-600 mt-4'>{post.body}</p>

      <div className='mt-6 p-4 bg-gray-50 rounded-lg'>
        <h3 className='text-lg font-semibold text-gray-700'>Posted by</h3>
        <Link href={`/profiles/${post.author.id}`}>
          <span className='text-blue-600 hover:underline'>
            <div className='flex items-center mt-2'>
              <Avatar src={post.author.avatar} size={48} />
              <p className='ml-3 text-lg font-medium text-gray-800'>{post.author.name}</p>
            </div>
          </span>
        </Link>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {};

  try {
    const res = await fetch(`${BASE_URL}/api/posts/${id}`);
    if (!res.ok) return { props: { post: null } };

    const post: Post = await res.json();
    const author = users.find((u) => u.id === post.authorId) || null;

    return {
      props: {
        post: { ...post, author },
      },
    };
  } catch (error: unknown) {
    console.error('Error fetching post due to unknown reason:', error);
    return { props: { post: null } };
  }
};

export default PostDetail;
