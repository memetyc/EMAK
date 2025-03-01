import Image from "next/image";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      {/* Başlık */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">EMAK</h1>
        <p className="text-xl text-gray-400">Ege Üniversitesi Mağara Araştırma Topluluğu</p>
      </div>

      {/* Ana Bölüm */}
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Hakkımızda */}
        <section className="space-y-4">
          <p className="text-xl leading-relaxed">
            Ege Üniversitesi Mağara Araştırma Topluluğu (EMAK) 1996 yılınında kurulmuştur. 
            Topluluğumuz üniversitemizin köklü topluluklarından birisi olup ülkemiz genelinde 
            de mağaracılık sporuna yıllardır mağaracılar ve yeni mağaralar katmaktadır.
          </p>
        </section>

        {/* Görsel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative h-64 rounded-lg overflow-hidden">
            <Image
              src="/hakkimizda-1.jpeg"
              alt="Mağara Faaliyeti 1"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="relative h-64 rounded-lg overflow-hidden">
            <Image
              src="/hakkimizda-2.jpeg"
              alt="Mağara Faaliyeti 2"
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Yıllık İşleyiş */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Topluluğun Yıllık İşleyişi</h2>
          <p className="text-lg leading-relaxed">
            Yeni üyelerimiz ile başladığımız bu yolda ilk adımımız temel kampçılık ve 
            mağaracılık eğitimlerini vermektir. Ardından yaptığımız yatay mağara faaliyetimiz 
            ile öğrendiklerimizi pekiştiriyoruz. Dikey mağaralar için ip ve düğüm teknikleri 
            eğitiminden sonra dikey mağara faaliyeti düzenliyoruz. Sportif ya da keşif amaçlı 
            başka mağaralara gitmeye devam etmekteyiz. Yıl içinde diğer üniversitelerin 
            mağaracılık toplulukları ile ortak faaliyetler düzenliyoruz.
          </p>
        </section>

        {/* Amaçlarımız */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Amaçlarımız</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title text-primary">Eğitim</h3>
                <p>Üyelerimizin yatay ve dikey mağaralar için gerekli eğitimini sağlayarak güvenle mağaracılığı deneyimlemesi</p>
              </div>
            </div>
            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title text-primary">Katkı</h3>
                <p>Türkiye&apos;deki mağara veri tabanlarını güçlendirip akademik olarak çalışmak isteyen öğrencilere fırsat tanımak</p>
              </div>
            </div>
            <div className="card bg-base-200 md:col-span-2">
              <div className="card-body">
                <h3 className="card-title text-primary">Araştırma</h3>
                <p>Yaz döneminde mağara araştırma faaliyetlerine devamlılık için alan taraması ve mağara araştırması faaliyetlerine devam etmek</p>
              </div>
            </div>
          </div>
        </section>

        {/* Neden EMAK */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold">Neden EMAK?</h2>
          <p className="text-lg leading-relaxed">
            EMAK, sadece bir spor topluluğu olmanın ötesinde, bilimsel araştırmalar ve 
            haritalama çalışmaları ile Türkiye yeraltı veri tabanına önemli katkılar sağlar. 
            Ayrıca, mağaracılık sporunun heyecanını ve bilgisini paylaşarak, macera 
            meraklılarına kapı aralar. Faaliyetler dışında okuldan artta kalan zamanlarımızda 
            gerek topluluk içerisinde gerek diğer üniversitelerin mağaracılık topluluklarından 
            arkadaşlarımız ile bir arada olmaya devam etmekteyiz.
          </p>
        </section>

        {/* İstatistikler */}
        <div className="stats shadow w-full bg-base-200">
          <div className="stat place-items-center">
            <div className="stat-title">Kuruluş</div>
            <div className="stat-value">1996</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Aktif Üye</div>
            <div className="stat-value">50+</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Keşif</div>
            <div className="stat-value">100+</div>
          </div>
        </div>
      </div>
    </div>
  );
} 