'use client'

import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';




export default function AllBlogs({ posts }) {
  const router = useRouter()
  const deleteBlog = async (id) => {
    const response = await fetch(`/api/blog/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json()

    if (res.success) {
      toast.success(res.message)
      router.refresh()
    } else if (!res.success) {
      toast.success(res.message)
    }

  }
  const publishBlog = async (id) => {
    const response = await fetch(`/api/blog/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const res = await response.json()

    if (res.success) {
      toast.success(res.message)
      router.refresh()
    } else if (!res.success) {
      toast.success(res.message)
    }

  }

  console.log(posts);
  


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Yazıları</h1>
        <Link
          href="/admin/blog/addBlog"
          className="btn btn-primary"
        >
          Yeni Blog Yazısı
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Görsel</th>
              <th>Başlık</th>
              <th>Tarih</th>
              <th>Yazar</th>
              <th>Yayınlandı</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>
                  {post.image ? (
                    <div className="relative bg-base-200 rounded-md w-20 h-20">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20  bg-base-300 rounded-md flex items-center justify-center">
                      Görsel Yok
                    </div>
                  )}
                </td>
                <td className="font-medium">{post.title}</td>
                <td className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                </td>
                <td>
                  {post.author.name}
                </td>
                <td>
                  {post.isPublished ? (
                    <span className="text-green-500">Yayınlandı</span>
                  ) : (
                    <span className="text-red-500">Yayınlanmadı</span>
                  )}
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                    onClick={() => document.getElementById(`${post.id}-edit`).showModal()}
                      className="btn btn-sm btn-ghost"
                    >
                      {post.isPublished ? 'Yayından Kaldır' : 'Yayınla'}
                    </button>
                    <dialog id={`${post.id}-edit`} className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">{post.title} başlıklı blog yazısını {post.isPublished ? 'yayından kaldırmak' : 'yayınlamak'} istediğinize emin misiniz?</h3>       
                        <div className="modal-action">
                          <form method="dialog" className='flex gap-2'>
                          <button onClick={() => publishBlog(post.id)} className="btn btn-success btn-outline">{post.isPublished ? 'Yayından Kaldır' : 'Yayınla'}</button>
                            <button className="btn">Vazgeç</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                    <button onClick={() => document.getElementById(`${post.id}-delete`).showModal()} className="btn btn-sm btn-ghost text-error">
                      Sil
                    </button>
                    <dialog id={`${post.id}-delete`} className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">{post.title} başlıklı yazıyı silmek istediğinize emin misiniz?</h3>
                        <p className="py-4">Bu işlem geri alınamaz.</p>
                        
                        <div className="modal-action">
                          <form method="dialog" className='flex gap-2'>
                          <button onClick={() => deleteBlog(post.id)} className="btn btn-error btn-outline">Sil</button>
                            <button className="btn">Vazgeç</button>
                          </form>
                        </div>
                      </div>
                    </dialog>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
}