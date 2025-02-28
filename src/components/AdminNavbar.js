'use client'
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function AdminNavbar() {
  const { data: session } = useSession();
  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <Link href="/admin" className="btn btn-ghost text-xl">Admin Panel</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/admin/blog">Blog Yönetimi</Link></li>
          <li><Link href="/admin/user">Kullanıcı Yönetimi</Link></li>
          <li><Link href="/admin/event">Etkinlik Yönetimi</Link></li>
          <li><button onClick={() => signOut()}>Çıkış Yap</button></li>
        </ul>
      </div>
    </div>
  );
} 