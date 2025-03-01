'use client'
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { CgProfile, CgLogIn, CgLogOut } from "react-icons/cg";
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { data: session } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  console.log(isScrolled);
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="drawer  fixed top-0 left-0 right-0 z-50">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className={`navbar  w-full ${isScrolled ? 'bg-base-300/50' : 'bg-transparent'}`}>
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <Link href="/" className="mx-2 flex-1 px-2 font-sigmar">
            <Image
              src="/logo.png"
              alt="Logo"
              width={100}
              height={40}
              priority
            />
          </Link>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal text">
              <li><Link href="/">Ana Sayfa</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/hakkimizda">Hakkımızda</Link></li>
              <li><Link href="/iletisim">İletişim</Link></li>

            </ul>
          </div>
          {session ? (

              <ul className='flex gap-3 items-center justify-center '>
              <li className='cursor-pointer btn btn-ghost'><Link href="/profil">
                <CgProfile size={25} />
              </Link></li>
              <li className='cursor-pointer btn btn-ghost'>
                <CgLogOut onClick={() => signOut()} size={25} />
              </li>
              </ul>
        
          ) : (
            <li className='cursor-pointer btn btn-ghost'><Link href="/girisyap">
              <CgLogIn size={30} />
            </Link></li>
          )}
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          <li><Link href="/">Ana Sayfa</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/hakkimizda">Hakkımızda</Link></li>
          <li><Link href="/iletisim">İletişim</Link></li>
        </ul>
      </div>
    </div>
  );
} 