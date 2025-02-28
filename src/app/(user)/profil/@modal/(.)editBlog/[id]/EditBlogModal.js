'use client';
import { useRouter } from 'next/navigation';
import BlogAdmin from '@/components/BlogAdmin';

export default function EditBlogModal({blog}) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-base-300 p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Yeni Blog Yazısı</h2>
          <button 
            onClick={() => router.back()}
            className="btn btn-ghost btn-sm"
          >
            ✕
          </button>
        </div>
        <BlogAdmin blog={blog} />
      </div>
    </div>
  );
} 