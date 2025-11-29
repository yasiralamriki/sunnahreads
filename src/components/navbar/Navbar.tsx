'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ModeToggle } from './ModeToggle';
import { BookOpenText, Menu } from 'lucide-react';
import React from 'react';
import { usePathname } from 'next/navigation';

function Logo() {
  return (
    <div className='flex flex-row items-center gap-2 sm:gap-4'>
      <div className='w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-rose-400 rounded-lg flex flex-col items-center justify-center'>
        <BookOpenText className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
      </div>
      <span className='text-xl sm:text-2xl font-bold text-zinc-950 dark:text-zinc-50'>SunnahReads</span>
      <span className='text-sm text-amber-500 dark:amber-zinc-400 hidden sm:block'>Alpha (v0.0.0)</span>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className='w-full flex flex-row items-center justify-between px-8 sm-px-24 py-8'>
      <Logo />
      <div className='flex flex-row items-center justify-center text-center gap-4'>
        <NavigationMenu className='hidden lg:flex'>
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink href='/' className={`px-4 py-2 text-zinc-950 dark:text-zinc-50 hover:bg-amber-50 dark:hover:!bg-amber-950 hover:!text-amber-400 ${pathname === '/' ? '!text-amber-400' : ''}`}>
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href='/books' className={`px-4 py-2 text-zinc-950 dark:text-zinc-50 hover:bg-amber-50 dark:hover:!bg-amber-950 hover:!text-amber-400 ${pathname.startsWith('/book') ? '!text-amber-400' : ''}`}>
                Books
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href='/authors' className={`px-4 py-2 text-zinc-950 dark:text-zinc-50 hover:bg-amber-50 dark:hover:!bg-amber-950 hover:!text-amber-400 ${pathname.startsWith('/author') ? '!text-amber-400' : ''}`}>
                Authors
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
          <div className='flex flex-row items-center justify-center text-center gap-8 ml-4'>
            <Separator orientation='vertical' className='!h-6'/>
            <ModeToggle />
          </div>
        </NavigationMenu>
        <div className='lg:hidden'>
          <Sheet>
            <SheetTrigger>
              <Button variant='ghost' className='!p-2'>
                <Menu className='w-6 h-6 text-zinc-950 dark:text-zinc-50'/>
              </Button>
            </SheetTrigger>
            <SheetContent className='flex flex-col items-center justify-center'>
              <NavigationMenu className='flex flex-col justify-center items-center text-center w-full'>
                  <NavigationMenuList className="flex-col gap-4 w-full items-center">
                    <NavigationMenuItem className='w-full flex justify-center'>
                      <NavigationMenuLink href='/' className={`px-4 py-2 text-2xl text-zinc-950 dark:text-zinc-950 hover:bg-amber-50 dark:hover:!bg-amber-950 hover:!text-amber-400 ${pathname === '/' ? '!text-amber-400' : ''}`}>
                        Home
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className='w-full flex justify-center'>
                      <NavigationMenuLink href='/books' className={`px-4 py-2 text-2xl text-zinc-950 dark:text-zinc-50 hover:bg-amber-50 dark:hover:!bg-amber-950 hover:!text-amber-400 ${pathname.startsWith('/book') ? '!text-amber-400' : ''}`}>
                        Books
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem className='w-full flex justify-center'>
                      <NavigationMenuLink href='/authors' className={`px-4 py-2 text-2xl text-zinc-950 dark:text-zinc-50 hover:bg-amber-50 dark:hover:!bg-amber-950 hover:!text-amber-400 ${pathname.startsWith('/author') ? '!text-amber-400' : ''}`}>
                        Authors
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                  <div className='flex flex-col items-center justify-center text-center gap-8 mt-4'>
                    <Separator orientation='horizontal' className='!w-6'/>
                    <ModeToggle />
                  </div>
                </NavigationMenu>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}