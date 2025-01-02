"use client";

import React from 'react';
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import  Link  from 'next/link';


const NavBarRoutes = () => {
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith('/teacher');
  const isPlayerPage = pathname?.includes('/chapter');

  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <div className='flex gap-x-2 ml-auto'>
      {/* {isAdminPage ? (
        <Link href="/">
        <Button size="sm" variant="ghost" >
          <LogOut className="h-4 w-4 mr-2"/>
        </Button>
      </Link>
      ) : (
        (
          <Link href="/admin">
            <Button size="sm" variant="ghost">
              Vista de adminstrador
            </Button>
          </Link>
        )
      )} */}

      {isTeacherPage || isPlayerPage ? (
        <Link href="/">
          <Button size="sm" variant="ghost" >
            <LogOut className="h-4 w-4 mr-2"/>
          </Button>
        </Link>

      ): (
        <Link href="/teacher/courses">
          <Button size="sm" variant="ghost">
            Vista de Profesor
          </Button>
        </Link>
      )}
      <UserButton 
        afterSignOutUrl='/'
      />
    </div>
  )
}

export default NavBarRoutes