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
import Link from '@tiptap/extension-link';

function formatToLocalDateTime(date) {
  const d = new Date(date);
  // Tarihi Istanbul saat dilimine göre formatla
  return new Date(d.getTime() - (d.getTimezoneOffset() * 60000))
    .toISOString()
    .slice(0, 16);
}

export default function EventAdmin({event}) {
  
  const [isLoading, setIsLoading] = useState(false);
  const [eventPost, setEventPost] = useState({
    title: event?.title || '',
    description: event?.description || '',
    location: event?.location || '',
    eventDate: event?.eventDate 
      ? formatToLocalDateTime(event.eventDate)
      : formatToLocalDateTime(new Date()),
    eventEndDate: event?.eventEndDate
      ? formatToLocalDateTime(event.eventEndDate)
      : formatToLocalDateTime(new Date())
  });


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
      Link.configure({
        defaultProtocol: 'https',
      })
    ],
    content: eventPost.description,
    editorProps: {
      attributes: {
        class: 'prose max-w-none p-4 focus:outline-none min-h-[200px]',
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setEventPost(prev => ({ ...prev, description: editor.getHTML() }));
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventPost.title) {
      toast.error('Başlık boş olamaz');
      return;
    }

    if (!eventPost.description) {
      toast.error('İçerik boş olamaz');
      return;
    }

    if (!eventPost.eventDate) {
      toast.error('Tarih seçilmedi');
      return;
    }

    try {
      setIsLoading(true);
      
      // Tarihi UTC'ye çevir
      const submissionData = {
        ...eventPost,
        eventDate: new Date(eventPost.eventDate).toISOString(),
        eventEndDate: new Date(eventPost.eventEndDate).toISOString()
      };

 
      const response = event?.id ? await fetch(`/api/event/${event.id}`, {
        method: 'PATCH',
        body: JSON.stringify(submissionData),
      }) : await fetch('/api/event', {
        method: 'POST',
        body: JSON.stringify(submissionData),
      });

      const res = await response.json();
      if (res.success) {
        toast.success(res.message);
        setEventPost({ 
          title: '', 
          description: '', 
          eventDate: formatToLocalDateTime(new Date()), 
          location: '',
          eventEndDate: formatToLocalDateTime(new Date())
        });
        editor.commands.setContent('');
        setIsLoading(false);
        router.refresh();
      } else {
        toast.error(res.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error( error);
      toast.error('Bir hata oluştu');
      setIsLoading(false);
    }
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Etkinlik Ekle</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Başlık</label>
          <input
            type="text"
            value={eventPost.title}
            onChange={(e) => setEventPost(prev => ({ ...prev, title: e.target.value }))}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Açıklama</label>
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

        <div>
          <label className="block text-sm font-medium mb-2">Konum</label>
          <input type="text" value={eventPost.location} onChange={(e) => setEventPost(prev => ({ ...prev, location: e.target.value }))} className="input input-bordered w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tarih</label>
          <div className="flex items-center gap-4">
            <input 
              type="datetime-local" 
              value={eventPost.eventDate}
              onChange={(e) => setEventPost(prev => ({ 
                ...prev, 
                eventDate: e.target.value 
              }))} 
              className="input input-bordered w-full" 
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Bitiş Tarihi</label>
          <div className="flex items-center gap-4">
            <input 
              type="datetime-local" 
              value={eventPost.eventEndDate}
              onChange={(e) => setEventPost(prev => ({ 
                ...prev, 
                eventEndDate: e.target.value 
              }))} 
              className="input input-bordered w-full" 
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          {isLoading && <span className="loading loading-spinner loading-xs"></span>}
          {event?.id ? 'Etkinlik Güncelle' : 'Etkinlik Ekle'}
        </button>
      </form>
    </div>
  );
}
