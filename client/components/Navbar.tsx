import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { menuItems } from '../utils/mock';
import Hamburger from './Hamburger';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleHamburger = () => setOpen((prev) => !prev);

  return (
    <header className='flex justify-between items-center py-6 relative'>
      <Link href='/'>
        <div className='flex items-center cursor-pointer'>
          <Image src='/logo.png' alt='logo' width={40} height={35} />
          <span className='font-bold ml-2 text-primary'>Coder&apos;s Blog</span>
        </div>
      </Link>

      {/* Desktop Navbar */}
      <nav className='hidden md:block'>
        <ul className='flex items-center'>
          {menuItems.map((item) => (
            <li key={item.id} className='list-item'>
              <a href={item.link}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`${open ? 'sidebar show-sidebar' : 'sidebar'}`}>
        <nav className='flex flex-col items-center justify-center h-full w-full px-8'>
          <ul className='flex flex-col items-end justify-center w-full'>
            {menuItems.map((item) => (
              <li
                key={item.id}
                className='text-right pb-2 font-medium text-gray-600 hover:text-green-900 text-hover mb-3 w-full border-b-2 border-gray-400'
              >
                <a href={item.link}>{item.label}</a>
              </li>
            ))}
          </ul>

          <div className='flex flex-col items-center w-full'>
            <button className='nav-btn-mobile'>Login</button>
            <button className='nav-btn-mobile'>Signup</button>
          </div>
        </nav>
      </div>

      {/* Hamburger */}
      <Hamburger handleHamburger={handleHamburger} open={open} />

      <div className='hidden md:block font-medium'>
        <button className='mr-5 text-primary-dark hover:text-primary text-hover'>
          Log in
        </button>
        <button className='bg-primary p-2 px-3 rounded-sm text-white hover:bg-primary-dark text-hover hover:text-white'>
          Sign up
        </button>
      </div>
    </header>
  );
};

export default Navbar;
