import Image from "next/image";
import Link from "next/link";
import { prisma } from '@/lib/db/prisma';



export default async function Home() {
  const events = await prisma.event.findMany({
    where: {
      eventDate: {
        gte: new Date() 
      }
    },
    orderBy: {
      eventDate: 'asc'
    }
  });

  const blogs = await prisma.blog.findMany({
    where: {
      isPublished: true
    },
    take: 3,
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section - Parallax efekti ile */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={'/HeroImage.jpeg'}
            alt="Hero Image"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Ege Üniversitesi Mağara Araştırma Topluluğu
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Yeraltı dünyasının keşifçileri
          </p>
        </div>
      </section>

      {/* Etkinlikler Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">Yaklaşan Etkinlikler</h2>
            <button className="btn btn-outline">Tüm Etkinlikler</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.map((event) => (
              <div key={event.id} 
                   className="card bg-base-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <figure className="relative h-48">
                  <Image
                    src={'/eventimage.jpeg'}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white text-sm">
                      {event.eventDate.toLocaleDateString()}
                    </p>
                  </div>
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-lg">{event.title}</h3>
                  <div 
                    className="text-base-content/70 line-clamp-2"
                    dangerouslySetInnerHTML={{ 
                      __html: (event.description) 
                    }}
                  />
                  <Link href={`/event/${event.slug}`} className="btn btn-primary btn-sm mt-4">Detaylar</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KKDD Section - Modern Grid Layout */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Kişisel Koruyucu Donanım
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Kafa Koruma */}
            <div className="bg-primary text-primary-content rounded-lg p-6 hover:scale-105 transition-transform">
              <h3 className="text-xl font-bold mb-4">Kafa Koruma</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  Petzl Vertex Kask
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  Kafa Feneri
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                  </svg>
                  Yedek Aydınlatma
                </li>
              </ul>
            </div>

            {/* Diğer KKDD kartları benzer şekilde... */}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">Son Yazılar</h2>
            <Link href={'/blog'} className="btn btn-outline">Tüm Yazılar</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <div key={blog.id} 
                   className="group cursor-pointer">
                <div className="relative h-64 mb-4 overflow-hidden rounded-xl">
                  {
                    blog.image ? (
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <Image
                        src={'/HeroImage.jpeg'}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )
                  }
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-base-content/70">{blog.date}</p>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>
                  <Link href={`/blog/${blog.slug}`} className="text-primary font-semibold group-hover:underline">
                    Devamını Oku →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
