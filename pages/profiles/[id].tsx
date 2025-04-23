import { GetServerSideProps } from 'next';
import { BASE_URL } from '@/data/mockData';
import { User } from '@/data/types';
import Profile from '@/components/Profile';

type ProfileDetailProps = {
  user: User | null;
};

const ProfileDetail = ({ user }: ProfileDetailProps) => {
  if (!user) return <p>User not found!</p>;

  return <Profile user={user} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params || {};

  try {
    const res = await fetch(`${BASE_URL}/api/users/${id}`);

    if (!res.ok) {
      return {
        notFound: true,
      };
    }

    const user = await res.json();

    return {
      props: {
        user,
      },
    };
  } catch (error: unknown) {
    console.error('Error fetching user due to unknown reason:', error);
    return {
      props: {
        user: null,
      },
    };
  }
};

export default ProfileDetail;
