import Link from 'next/link';
import Image from 'next/image';
import { LOGO_URL } from '@/data/mockData';

const Navbar = () => {
  return (
    <header className='bg-gray-800 text-white p-4 flex justify-between items-center'>
      <Link href='/'>
        <Image
          src={LOGO_URL}
          alt='Logo'
          width={120}
          height={40}
          objectFit='contain'
        />
      </Link>

      <Link href='/profiles'>
        <span className='text-sm hover:underline'>All Profiles</span>
      </Link>
    </header>
  );
};

export default Navbar;
