import Image from 'next/image';

interface AvatarProps {
  src: string | undefined;
  size?: number;
}

const Avatar = ({ src, size = 48 }: AvatarProps) => {
  return (
    <div
      className='relative rounded-full overflow-hidden'
      style={{ width: size, height: size }}
    >
      {src ? (
        <Image src={src} alt='Avatar' width={size} height={size} />
      ) : (
        <div className='bg-gray-300 text-white flex items-center justify-center text-sm'>
          {src ? '' : '?'}
        </div>
      )}
    </div>
  );
};

export default Avatar;
