import { prisma } from '@/lib/db/prisma';
import AllBlogs from '@/components/AllBlogs';

async function getBlogPosts() {
  const posts = await prisma.blog.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      author: true
    }
  });
  return posts;
}



export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div>
        <AllBlogs posts={posts} />
    </div>
  );
}