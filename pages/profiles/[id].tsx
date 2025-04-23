import { useRouter } from 'next/router';
import { users } from '@/data/mockData';
import Profile from '@/components/Profile';
import BackButton from '@/components/BackButton';

const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;

  const user = users.find((user) => user.id === id);

  if (!user) return <p>User not found!</p>;

  return (
    <>
      <BackButton />
      <Profile user={user} />
    </>
  );
};

export default ProfilePage;
