import Image from "next/image";
import { prisma } from "@/lib/db/prisma";


export default async function BlogPost({ params }) {
  const post = await prisma.blog.findUnique({
    where: {
      slug: (await params).slug
    },
    include: {
      author: true
    }
  });

  console.log(post)
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Yazı Bulunamadı</h1>
        <p className="text-gray-400">Aradığınız blog yazısı bulunamadı.</p>
      </div>
    );
  }


  return (
    <article className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Başlık Bölümü */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <div className="flex justify-center items-center gap-4 text-gray-400">
            <span>{post.createdAt.toLocaleDateString()}</span>
            <span>•</span>
            <span>{post.author.name}</span>

          </div>
        </header>

        {/* Ana Görsel */}
        <div className="relative h-[60vh] mb-12 rounded-xl overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* İçerik */}
        <div 
          className="prose prose-lg max-w-none dark:prose-invert break-words"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Alt Bilgi */}
        <div className="mt-12 pt-8 border-t border-base-300">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-gray-400">#{(await params).slug}</span>
            </div>
            
          </div>
        </div>

      </div>
    </article>
  );
} 