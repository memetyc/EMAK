'use client';
import { useRouter } from 'next/navigation';
import EventAdmin from '@/components/EventAdmin';

export default function EditEventModal({event}) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-base-300 p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Etkinlik Düzenle</h2>
          <button 
            onClick={() => router.back()}
            className="btn btn-ghost btn-sm"
          >
            ✕
          </button>
        </div>
        <EventAdmin event={event} />
      </div>
    </div>
  );
} 