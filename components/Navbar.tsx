'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import MobileNav from './MobileNav';
import { ModeToggle } from './ModeToggle';
import { SignedIn, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  return (
    <nav className='dark:bg-dark-1 flex-between fixed z-50 w-full bg-[#FDFCFA] px-6 py-4 lg:px-10'>
      <Link href='/' className='flex items-center gap-1'>
        <Image src='/images/Logo.png' alt='Fan Meet Logo' width={32} height={32} className='max-sm:size-10' />
        <p className='font-extrabold text-[26px] max-sm:hidden pl-6'>Fan Meet</p>
      </Link>
      <div className='relative max-sm:left-[35%] left-[40%]'>
        <ModeToggle />
      </div>
      <div className='flex-between gap-5'>
        <div className='relative right-28 top-[3px] md:right-52'>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar;
