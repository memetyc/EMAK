import BlogList from "@/components/BlogList";
import { prisma } from "@/lib/db/prisma";

export const metadata = {
  title: 'EMAK - Mağara Keşifleri ve Deneyimlerimiz',
  description: 'EMAK ekibinin mağara keşifleri, mağaracılık deneyimleri ve teknik bilgiler içeren blog yazıları.',
  openGraph: {
    title: 'EMAK - Mağara Keşifleri ve Deneyimlerimiz',
    description: 'EMAK ekibinin mağara keşifleri, mağaracılık deneyimleri ve teknik bilgiler içeren blog yazıları.',
    type: 'website',
    images: [
      {
        url: '/HeroImage.jpeg',
        width: 1200,
        height: 630,
        alt: 'EMAK Blog'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',  
    title: 'EMAK - Mağara Keşifleri ve Deneyimlerimiz',
    description: 'EMAK ekibinin mağara keşifleri, mağaracılık deneyimleri ve teknik bilgiler içeren blog yazıları.',
  }
};

export default async function Blog() {
  const posts = await prisma.blog.findMany({
    where: {
      isPublished: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="container mx-auto px-4 py-8 min-h-[65vh] mt-20">
      {/* Başlık */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Blog</h1>
        <p className="text-xl text-gray-400">Mağara keşifleri ve deneyimlerimiz</p>
      </div>

      {/* Blog Listesi Komponenti */}
      <BlogList posts={posts} />
    </div>
  );
} 