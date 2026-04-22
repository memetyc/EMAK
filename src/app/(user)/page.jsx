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
    take: 9,
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section - Parallax efekti ile */}
      {/* <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={'/logobeyaz.svg'}
            alt="Hero Image"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        </div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            MağaraLog
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Biraz mağara, biraz blog
          </p>
        </div>
      </section> */}

      {/* Etkinlikler Section */}
      {
        events.length > 0 && (
          <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">Yaklaşan Etkinlikler</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="card bg-base-200 hover:shadow-xl transition-all duration-300">
                <div className="card-body">
                  {/* Tarih Kısmı */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary text-primary-content rounded-lg p-3 text-center min-w-20">
                      <div className="text-2xl font-bold">
                        {new Date(event.eventDate).toLocaleString('tr-TR', { 
                          day: 'numeric',
                          timeZone: 'Europe/Istanbul'
                        })}
                      </div>
                      <div className="text-sm">
                        {new Date(event.eventDate).toLocaleString('tr-TR', { 
                          month: 'short',
                          timeZone: 'Europe/Istanbul'
                        })}
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">
                        {new Date(event.eventDate).toLocaleString('tr-TR', { 
                          hour: '2-digit', 
                          minute: '2-digit',
                          weekday: 'long',
                          timeZone: 'Europe/Istanbul'
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Etkinlik Başlığı */}
                  <h3 className="card-title text-lg">{event.title}</h3>

                  {/* Etkinlik Açıklaması */}
                  <div className="text-base-content/70 line-clamp-2 mt-2"
                    dangerouslySetInnerHTML={{ 
                      __html: (event.description) 
                    }}
                  />

                  {/* Alt Bilgiler */}
                  <div className="card-actions justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                      <div className="badge badge-outline">Etkinlik</div>
                      {/* Eğer etkinlik türü varsa */}
                      {event.type && (
                        <div className="badge badge-primary">{event.type}</div>
                      )}
                    </div>
                    <Link 
                      href={`/event/${event.slug}`} 
                      className="btn btn-primary btn-sm"
                    >
                      Detaylar
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
        )
      }
      


      {/* KKDD Section - Modern Grid Layout */}

      {/* Blog Section */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold">Bişiler bişiler</h2>
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
                        src={'/logobeyaz.svg'}
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
