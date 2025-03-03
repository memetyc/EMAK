import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";
import UpdateProfileForm from "@/components/UpdateProfileForm";

async function getUserBlogs(userId) {
  return await prisma.blog.findMany({
    where: {
      authorId: userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export default async function ProfilePage() {
  const { user } = await getServerSession(authOptions);
  const blogs = await getUserBlogs(user.id);
 
  
  return (
    <div className="container mx-auto p-4 min-h-[90dvh]">
      <div className="space-y-5">
        {/* Sol Taraf - Profil Bilgileri */}
        <div className="">
          <div className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <div className="relative w-32 h-32 rounded-full overflow-hidden">
                <Image
                  src={user.image || "/default-avatar.png"}
                  alt={user.name || "Profil"}
                  fill
                  className="object-cover"
                />
              </div>
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{user.name || "İsimsiz Kullanıcı"}</h2>
              <p>{user.email}</p>
              <UpdateProfileForm user={user} />
            </div>
          </div>
        </div>

        {/* Sağ Taraf - Bloglar */}
  
            <div className="">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Bloglarım</h2>
                <Link href="/profil/addBlog" className="btn btn-primary">
                Yeni Blog Ekle
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blogs.length > 0 ? (
                blogs.map((blog) => (
                    <div key={blog.id} className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="flex justify-between items-start">
                        <div>
                            <h3 className="card-title">{blog.title}</h3>
                            <p className="text-sm text-gray-500">
                            {new Date(blog.createdAt).toLocaleDateString('tr-TR')}
                            </p>
                        </div>
                        <div className="badge badge-outline">
                            {blog.isPublished ? 'Yayında' : 'Taslak'}
                        </div>
                        </div>
                        <div className="card-actions justify-end mt-4">
                            {
                                blog.isPublished && (
                                    <Link href={`/blog/${blog.slug}`} className="btn btn-sm btn-ghost">
                                        Görüntüle
                                    </Link>
                                ) 
                            }
                        <Link href={`/profil/editBlog/${blog.id}`} className="btn btn-sm">
                            Düzenle
                        </Link>
                        </div>
                    </div>
                    </div>
                ))
                ) : (
                <div className="text-center py-10">
                    <p className="text-gray-500">Henüz blog yazınız bulunmuyor.</p>
                </div>
                )}
            </div>
            </div>
  
      </div>
    </div>
  );
}