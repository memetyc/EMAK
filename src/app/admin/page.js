import React from 'react'
import { prisma } from '@/lib/db/prisma';


const userCount = async () => {
  const userCount = await prisma.user.count({});
  return userCount
}
const blogCount = async () => {
  const blogCount = await prisma.blog.count({});
  return blogCount
}
const eventCount = async () => {
  const eventCount = await prisma.event.count({});
  return eventCount
}

async function page() {

  const allUserCount = await userCount();
  const allBlogCount = await blogCount();
  const allEventCount = await eventCount();



  return (
    <div className='container mx-auto p-4 flex justify-center items-start h-[60dvh]'>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20">
        {/* Kullanıcı Sayısı */}
        <div className="card bg-gradient-to-r from-primary to-secondary shadow-xl p-5 text-white transition-transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="bg-primary p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>

            </div>
            <div>
              <h2 className="text-lg font-semibold">Mevcut Kullanıcılar</h2>
              <p className="text-3xl font-bold">{allUserCount}</p>
            </div>
          </div>
        </div>

        {/* Blog Sayısı */}
        <div className="card bg-gradient-to-r from-secondary to-accent shadow-xl p-5 text-white transition-transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="bg-primary p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>

            </div>
            <div>
              <h2 className="text-lg font-semibold">Mevcut Bloglar</h2>
              <p className="text-3xl font-bold">{allBlogCount}</p>
            </div>
          </div>
        </div>

        {/* Etkinlik Sayısı */}
        <div className="card bg-gradient-to-r from-accent to-primary shadow-xl p-5 text-white transition-transform hover:scale-105">
          <div className="flex items-center space-x-4">
            <div className="bg-primary p-3 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
              </svg>

            </div>
            <div>
              <h2 className="text-lg font-semibold">Mevcut Etkinlikler</h2>
              <p className="text-3xl font-bold">{allEventCount}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default page