'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useEditor, EditorContent } from '@tiptap/react';

import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation'
import Image from 'next/image';
import { usePathname } from 'next/navigation';


export default function BlogAdmin({blog}) {
  const pathname = usePathname();
  console.log(pathname,'pathname');

  const [isLoading, setIsLoading] = useState(false);
  const [blogPost, setBlogPost] = useState({
    title: blog?.title || '',
    content: blog?.content || '',
    image: undefined,
  });
  const fileInputRef = useRef(null);

  const router = useRouter()
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      StarterKit.configure({
        document: false,
        paragraph: false,
        text: false
      }),
    ],
    content: blogPost.content,
    editorProps: {
      attributes: {
        class: 'prose max-w-none p-4 focus:outline-none min-h-[200px]',
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setBlogPost(prev => ({ ...prev, content: editor.getHTML() }));
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!blogPost.title) {
      toast.error('Başlık boş olamaz');
      return;
    }

    if (!blogPost.content) {
      toast.error('İçerik boş olamaz');
      return;
    }

    if (!blogPost.image && !blog?.image) {
      toast.error('Görsel seçilmedi');
      return;
    }

 


    try {
      const formData = new FormData();  
      formData.append('title', blogPost.title);
      formData.append('content', blogPost.content);
      formData.append('image', blogPost.image);
      setIsLoading(true);
      const response = blog?.id ? await fetch(`/api/blog/${blog.id}`, {
        method: 'PATCH',
        body: formData,
      }) : await fetch('/api/blog', {
        method: 'POST',
        body: formData,
      });

      const res = await response.json()
      if (res.success) {
        toast.success(res.message);
        setBlogPost({ title: '', content: '', image: null });
        editor.commands.setContent('');
        setIsLoading(false);
        fileInputRef.current.value = null;
        router.refresh()
        // router.back()
      } else {
        toast.error(res.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Hata:', error);
      toast.error('Bir hata oluştu');
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBlogPost(prev => ({ ...prev, image: file }));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Blog Yazısı Ekle</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Başlık</label>
          <input
            type="text"
            value={blogPost.title}
            onChange={(e) => setBlogPost(prev => ({ ...prev, title: e.target.value }))}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">İçerik</label>
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-base-200 p-2 border-b flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`btn btn-sm ${editor?.isActive('bold') ? 'btn-primary' : ''}`}
              >
                Kalın
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`btn btn-sm ${editor?.isActive('italic') ? 'btn-primary' : ''}`}
              >
                İtalik
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`btn btn-sm ${editor?.isActive('heading', { level: 2 }) ? 'btn-primary' : ''}`}
              >
                Başlık 2
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`btn btn-sm ${editor?.isActive('heading', { level: 3 }) ? 'btn-primary' : ''}`}
              >
                Başlık 3
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`btn btn-sm ${editor?.isActive('bulletList') ? 'btn-primary' : ''}`}
              >
                Liste
              </button>
              <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`btn btn-sm ${editor?.isActive('orderedList') ? 'btn-primary' : ''}`}
              >
                Numaralı Liste
              </button>
            </div>
            <EditorContent editor={editor} className="prose max-w-none p-4" />
          </div>
        </div>

        {blog?.image  && blogPost?.image == undefined && (
          <div>
            <label className="block text-sm font-medium mb-2">MevcutGörsel</label>
            <div className="flex items-center gap-4">
              <Image src={blog.image} alt="Blog Görseli" className="w-48  object-cover" width={100} height={100} />
            </div>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-2">Görsel</label>
          <div className="flex items-center gap-4">
              <input   ref={fileInputRef} onChange={handleImageUpload} type="file" className="file-input file-input-bordered w-full" />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {isLoading && <span className="loading loading-spinner loading-xs"></span>}
          {blog?.id ? 'Blog Yazısı Güncelle' : 'Blog Yazısı Ekle'}
        </button>
      </form>
    </div>
  );
}
