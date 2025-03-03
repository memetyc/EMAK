import Image from "next/image";
import { prisma } from "@/lib/db/prisma";

async function getPost(slug) {
  const post = await prisma.blog.findUnique({
    where: {
      slug: slug
    },
    include: {
      author: true
    }
  });

  return post;
}
function stripHtml(html) {
  if (!html) return '';
  // Önce basit HTML etiketlerini kaldır
  let text = html.replace(/<[^>]*>/g, ' ');
  // Fazla boşlukları temizle
  text = text.replace(/\s+/g, ' ').trim();
  // HTML entities'i decode et
  text = text.replace(/&amp;/g, '&')
             .replace(/&lt;/g, '<')
             .replace(/&gt;/g, '>')
             .replace(/&quot;/g, '"')
             .replace(/&#039;/g, "'")
             .replace(/&nbsp;/g, ' ');
  return text;
}
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  const plainDescription = stripHtml(post.content);
  if (!post) {
    return {
      title: 'Yazı Bulunamadı',
      description: 'Aradığınız blog yazısı bulunamadı.'
    }
  }  

  
  return {
    title: `EMAK - ${post.title}`,
    description: plainDescription || `${post.title} - ${post.author.name}`,
    openGraph: {
      title: post.title,
      description: plainDescription || `${post.title} - ${post.author.name}`,
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      authors: [post.author.name],
      images: post.image ? [post.image] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: plainDescription || `${post.title} - ${post.author.name}`,
      images: post.image ? [post.image] : [],
    },
  }
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Yazı Bulunamadı</h1>
        <p className="text-gray-400">Aradığınız blog yazısı bulunamadı.</p>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-8 min-h-[65vh] mt-20">
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
        <div className="">
          {
            post.image && (
              <Image
                src={post.image}
                alt={post.title}
                width={1000}
                height={1000}
                className="w-full h-full object-cover rounded-xl"
                priority
              />
            ) 
          }
        </div>

        {/* İçerik */}
        <div 
          className="prose prose-lg max-w-none mt-10  break-words"
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