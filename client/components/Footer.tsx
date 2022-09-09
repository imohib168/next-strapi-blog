import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-white pb-5 pt-2 w-full mt-6 flex items-center justify-between'>
      <div className='flex items-center'>
        <Link href='/'>
          <div className='flex items-center cursor-pointer'>
            <Image src='/logo.png' alt='logo' width={40} height={35} />
            <span className='font-bold ml-2 text-primary'>
              Coder&apos;s Blog
            </span>
          </div>
        </Link>

        <div className='mx-3 border-r-2 h-7 border-r-primary'></div>

        <p className='text-sm text-primary'>
          &copy; {new Date().getFullYear()} Coder&apos;s Blog
        </p>
      </div>
    </footer>
  );
};

export default Footer;
