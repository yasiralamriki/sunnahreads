'use client';

import { TypeAnimation } from 'react-type-animation';

interface HeroSectionProps {
  totalBooks: number;
  totalAuthors: number;
  totalReaders?: number;
}

export default function HeroSection({ totalBooks, totalAuthors, totalReaders }: HeroSectionProps) {
  return (
    <div className='flex flex-col text-center'>
      <h1 className='text-4xl md:text-5xl text-amber-500 pt-16'>
        Discover, Track, and Share Authentic Islamic Books
      </h1>
      <TypeAnimation
        sequence={[
          `Explore over ${totalBooks}+ Islamic books`,
          1000,
          `Over ${totalAuthors}+ authors`,
          1000,
          `Join a community of ${totalReaders ?? 0}+ readers`,
          1000,
          'Start your journey today',
          1000,
        ]}
        wrapper="div"
        speed={50}
        className='text-3xl md:text-4xl bg-gradient-to-r from-amber-500 to-rose-500 bg-clip-text text-transparent mt-8'
        repeat={Infinity}
      />
    </div>
  );
}
