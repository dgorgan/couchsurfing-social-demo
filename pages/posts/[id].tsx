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
  if (!post) return <p>Post not found!</p>;

  return (
    <div className='p-6 bg-white min-h-screen'>
      <BackButton />
      <h1 className='text-3xl font-bold'>{post.title}</h1>
      <p className='text-gray-600 mt-4'>{post.body}</p>

      <div className='mt-4'>
        <Link href={`/profiles/${post.author.id}`}>
          <span className='text-sm text-blue-600 hover:underline'>
            Posted by {post.author.name}
          </span>
        </Link>
        <div className='flex items-center mt-2'>
          <Avatar src={post.author.avatar} size={48} />
          <p className='ml-2'>{post.author.name}</p>
        </div>
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
