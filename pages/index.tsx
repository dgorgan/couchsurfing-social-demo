import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Post } from '@/data/types';
import PostList from '@/components/PostList';
import { BASE_URL } from '@/data/mockData';

type HomePageProps = {
  posts: Post[];
};

const HomePage = ({ posts }: HomePageProps) => {
  return (
    <>
      <Head>
        <title>Home Feed | Couchsurfing Local</title>
      </Head>
      <main className='p-6'>
        <h1 className='text-2xl font-bold mb-4'>Home Feed</h1>
        <PostList posts={posts} />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/posts`);

    if (!res.ok) {
      return {
        notFound: true,
      };
    }

    const posts = await res.json();

    return {
      props: {
        posts,
      },
    };
  } catch (error: unknown) {
    console.error('Error fetching posts due to unknown reason:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
};

export default HomePage;
