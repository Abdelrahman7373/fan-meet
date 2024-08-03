import React from 'react'
import {Sheet,SheetClose,SheetContent,SheetTrigger,} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { SidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
  

const MobileNav = () => {
    const pathname = usePathname();

  return (
    <section className='w-full max-w-[264px]'>
        <Sheet>
            <SheetTrigger>
                <Image src='/icons/hamburger.svg' alt='Menu' width={36} height={36} className='cursor-pointer md:hidden' />
            </SheetTrigger>
            <SheetContent side='left' className='border-none'>
                <Link href='/' className='flex items-center gap-1'>
                    <Image src='/images/Logo.png' alt='Fan Meet Logo' width={32} height={32} className='max-sm:size-10' />
                    <p className='font-extrabold text-[26px] pl-6'>Fan Meet</p>
                </Link>
                <div className='flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto'>
                    <SheetClose asChild>
                        <section className='flex h-full flex-col gap-6 pt-16'>
                            {SidebarLinks.map((link) => {
                                const isActive = pathname === link.route || pathname.startsWith(`${link.route}/`)

                                return(
                                    <SheetClose asChild key={link.route}>
                                        <Link href={link.route} key={link.label} className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {'bg-blue-1 text-white': isActive,})}>
                                            <Image src={link.imageUrl} alt={link.label} width={20} height={20} />
                                            <p className='font-semibold'>{link.label}</p>
                                        </Link>
                                    </SheetClose>
                                )
                            })}
                        </section>
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    </section>
  )
}

export default MobileNav
