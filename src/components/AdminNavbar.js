'use client'
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function AdminNavbar() {
  const { data: session } = useSession();
  return (
    <div className="drawer z-50">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>

            </label>
          </div>
          <div className="mx-2 flex-1 px-2">Emak Admin Panel</div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              {/* Navbar menu content here */}
              <li><Link href={'/admin/blog'}>Blog yönetimi</Link></li>
              <li><Link href={'/admin/user'}>Kullanıcı yönetimi</Link></li>
              <li><Link href={'/admin/event'}>Etkinlik yönetimi</Link></li>
              <li><Link href={'/'}>Siteye Dön</Link></li>

            </ul>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
      
        <ul className="menu bg-base-200 min-h-full w-80 p-4 ">
          {/* Sidebar content here */}
          <Image src={'/logo.png'} width={200} height={100} className='w-full object-cover my-10' alt='Logo'/>
          <li><Link href={'/admin/blog'}>Blog yönetimi</Link></li>
          <li><Link href={'/admin/user'}>Kullanıcı yönetimi</Link></li>
          <li><Link href={'/admin/event'}>Etkinlik yönetimi</Link></li>
          <li><Link href={'/'}>Siteye Dön</Link></li>
        </ul>
      </div>
    </div>
  );
} 