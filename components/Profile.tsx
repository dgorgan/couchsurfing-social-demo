import { User } from '@/data/types';
import Image from 'next/image';

type ProfileProps = {
  user: User;
};

const Profile = ({ user }: ProfileProps) => {
  return (
    <div className='bg-white shadow-lg rounded-xl p-8 mt-6'>
      <Image
        src={user.avatar}
        alt={user.name}
        width={180}
        height={38}
        priority
      />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

export default Profile;
