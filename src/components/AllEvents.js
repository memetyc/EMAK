'use client'
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';




export default function AllEvents({ events }) {
  const router = useRouter()
  const deleteEvent = async (id) => {
    const response = await fetch(`/api/event/${id}`, {
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


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Etkinlikler</h1>
        <Link
          href="/admin/event/addEvent"
          className="btn btn-primary"
        >
          Yeni Etkinlik
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Başlık</th>
              <th>Açıklama</th>
              <th>Tarih</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td className="font-medium">{event.title}</td>
                <td>
                  {event.description}
                </td>
                <td className="text-sm">
                  {new Date(event.eventDate).toLocaleDateString('tr-TR')}
                </td>
                
                <td>

                  <div className="flex gap-2">
                  <Link href={`/admin/event/editEvent/${event.id}`} className="btn btn-sm btn-ghost">Düzenle</Link>
                    <button onClick={() => document.getElementById(`${event.id}-delete`).showModal()} className="btn btn-sm btn-ghost text-error">
                      Sil
                    </button>
                    <dialog id={`${event.id}-delete`} className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">{event.title} başlıklı etkinliği silmek istediğinize emin misiniz?</h3>
                        <p className="py-4">Bu işlem geri alınamaz.</p>
                        
                        <div className="modal-action">
                          <form method="dialog" className='flex gap-2'>
                          <button onClick={() => deleteEvent(event.id)} className="btn btn-error btn-outline">Sil</button>
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