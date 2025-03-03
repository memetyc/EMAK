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

      {/* KKDD Section - Modern Grid Layout */}
      <section className="py-20 bg-base-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4 text-center">
            Mağaracılık Ekipman ve Teknikleri
          </h2>
          <p className="text-center text-base-content/70 mb-12 max-w-2xl mx-auto">
            Güvenli bir mağara keşfi için gerekli olan temel ekipmanlar ve teknikler hakkında bilgi edinin.
          </p>

          {/* Ana Kategoriler */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Ekipmanlar */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl mb-6 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  Ekipmanlar
                </h3>

                <div className="space-y-4">
                  {/* Kask */}
                  <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="equipment" /> 
                    <div className="collapse-title text-xl font-medium">
                      Kask
                    </div>
                    <div className="collapse-content">
                      <div className="flex gap-4 items-start">
                        <div className="prose">
                          <p>Düşen taşlara ve darbelere karşı koruma sağlar. Özellikler:</p>
                          <ul>
                            <li>Darbe emici dış kabuk</li>
                            <li>Kafa lambası montaj noktaları</li>
                            <li>Ayarlanabilir çene kayışı</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Baş Feneri */}
                  <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="equipment" />
                    <div className="collapse-title text-xl font-medium">
                      Baş Feneri
                    </div>
                    <div className="collapse-content">
                      <div className="prose">
                        <p>Mağara içinde aydınlatma için kullanılır. Önemli özellikler:</p>
                        <ul>
                          <li>Yüksek lümen değeri</li>
                          <li>Su geçirmezlik</li>
                          <li>Uzun pil ömrü</li>
                          <li>Yedek pil taşıma zorunluluğu</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* İniş ve Tırmanış Halatları */}
                  <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="equipment" />
                    <div className="collapse-title text-xl font-medium">
                      İniş ve Tırmanış Halatları
                    </div>
                    <div className="collapse-content">
                      <div className="prose">
                        <p>Mağara inişlerinde ve çıkışlarında kullanılan özel ipler:</p>
                        <ul>
                          <li>Statik ipler: İniş için tercih edilir</li>
                          <li>Dinamik ipler: Tırmanış için kullanılır</li>
                          <li>Su geçirmez özellik</li>
                          <li>Yüksek dayanıklılık</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Diğer ekipmanlar... */}
                </div>
              </div>
            </div>

            {/* Teknikler */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-2xl mb-6 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Teknikler
                </h3>

                <div className="space-y-4">
                  {/* SRT */}
                  <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="technique" />
                    <div className="collapse-title text-xl font-medium">
                      Single Rope Technique (SRT)
                    </div>
                    <div className="collapse-content">
                      <div className="prose">
                        <p>Tek ip ile iniş ve çıkış yöntemi:</p>
                        <ul>
                          <li>Güvenli iniş teknikleri</li>
                          <li>Çıkış manevraları</li>
                          <li>İp değiştirme</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Düğüm Teknikleri */}
                  <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="technique" />
                    <div className="collapse-title text-xl font-medium">
                      Düğüm Teknikleri
                    </div>
                    <div className="collapse-content">
                      <div className="prose">
                        <p>Temel mağaracılık düğümleri:</p>
                        <ul>
                          <li>Sekizli düğüm: Ana bağlantı düğümü</li>
                          <li>Prusik düğümü: Emniyet için</li>
                          <li>Kelebek düğümü: Ara bağlantılar için</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Yön Bulma */}
                  <div className="collapse collapse-plus bg-base-200">
                    <input type="radio" name="technique" />
                    <div className="collapse-title text-xl font-medium">
                      Mağarada Yön Bulma
                    </div>
                    <div className="collapse-content">
                      <div className="prose">
                        <p>Mağara içinde yön bulma teknikleri:</p>
                        <ul>
                          <li>İşaretleme sistemleri</li>
                          <li>Harita kullanımı</li>
                          <li>Referans noktaları belirleme</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Diğer teknikler... */}
                </div>
              </div>
            </div>
          </div>

          {/* Bilgi Notu */}
          <div className="alert alert-info shadow-lg max-w-2xl mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <h3 className="font-bold">Önemli Not!</h3>
              <div className="text-sm">Bu ekipmanların kullanımı eğitim gerektirir. Lütfen deneyimli mağaracılarla birlikte hareket edin.</div>
            </div>
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
