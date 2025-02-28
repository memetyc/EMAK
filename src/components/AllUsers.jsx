'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

function AllUsers({users}) {
  const router = useRouter()
  const changeRole = async (id,role) => {
    const response = await fetch(`/api/user/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role: role
      })
    });
    const res = await response.json()

    if (res.success) {
      toast.success(res.message)
      router.refresh()
    } else if (!res.success) {
      toast.success(res.message)
    }

  }
  const banUser = async (id) => {
    const response = await fetch(`/api/user/${id}`, {
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
  
  return (
    <div className="container mx-auto p-4">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Kullanıcılar</h1>
    </div>

    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Görsel</th>
            <th>Ad Soyad</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Oluşturulma Tarihi</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {user.image ? (
                  <div className="relative bg-base-200 rounded-md w-20 h-20">
                    <Image
                      src={user.image}
                      alt={user.name}
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
              <td className="font-medium">{user.name}</td>
              <td className="text-sm text-gray-500">
                {user.email}
              </td>
              <td>
                {user.role}
              </td>
              <td>
                {new Date(user.createdAt).toLocaleDateString('tr-TR')}
              </td>
              <td>
                <div className="flex gap-2">
                  <button
                  onClick={() => document.getElementById(`${user.id}-changeRole`).showModal()}
                    className="btn btn-sm btn-ghost"
                  >
                    {user.role === 'admin' ? 'Kullanıcı Yap' : 'Admin Yap'}
                  </button>
                  <dialog id={`${user.id}-changeRole`} className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">{user.name} adlı kullanıcıyı {user.role === 'admin' ? 'kullanıcı yapmak' : 'admin yapmak'} istediğinize emin misiniz?</h3>       
                      <div className="modal-action">
                        <form method="dialog" className='flex gap-2'>
                        <button onClick={() => changeRole(user.id,user.role === 'admin' ? 'user' : 'admin')} className="btn btn-success btn-outline">{user.role === 'admin' ? 'Kullanıcı Yap' : 'Admin Yap'}</button>
                          <button className="btn">Vazgeç</button>
                        </form>
                      </div>
                    </div>
                  </dialog>
                  <button onClick={() => document.getElementById('my_modal_1').showModal()} className="btn btn-sm btn-ghost text-error">
                    {user.isBanned ? 'Yasaktan Kurtar' : 'Yasakla'}
                  </button>
                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">{user.name} adlı kullanıcıyı silmek istediğinize emin misiniz?</h3>
                      <p className="py-4">Bu işlem geri alınamaz.</p>
                      
                      <div className="modal-action">
                        <form method="dialog" className='flex gap-2'>
                        <button onClick={() => banUser(user.id)} className="btn btn-error btn-outline">Yasakla</button>
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
  )
}

export default AllUsers