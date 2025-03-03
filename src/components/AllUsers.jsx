'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'
import { toast } from 'react-toastify';

function AllUsers({ users }) {
  const router = useRouter()
  const changeRole = async (id, role) => {
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
                  <div className="dropdown dropdown-left ">
                    <div tabIndex={0} role="button" className="btn m-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>

                    </div>
                    <ul tabIndex={0} className="dropdown-content z-50 menu bg-base-300 space-y-2 rounded-box z-1 w-52 p-2 shadow-sm">
                      <li>
                        <button
                          onClick={() => document.getElementById(`${user.id}-changeRole`).showModal()}
                          className="btn "
                        >
                          {user.role === 'admin' ? 'Kullanıcı Yap' : 'Admin Yap'}
                        </button>
                      </li>
                      <li>
                        <button onClick={() => document.getElementById('my_modal_1').showModal()} className="btn   text-error">
                          {user.isBanned ? 'Yasaktan Kurtar' : 'Yasakla'}
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div className="flex gap-2">

                    <dialog id={`${user.id}-changeRole`} className="modal">
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">{user.name} adlı kullanıcıyı {user.role === 'admin' ? 'kullanıcı yapmak' : 'admin yapmak'} istediğinize emin misiniz?</h3>
                        <div className="modal-action">
                          <form method="dialog" className='flex gap-2'>
                            <button onClick={() => changeRole(user.id, user.role === 'admin' ? 'user' : 'admin')} className="btn btn-success btn-outline">{user.role === 'admin' ? 'Kullanıcı Yap' : 'Admin Yap'}</button>
                            <button className="btn">Vazgeç</button>
                          </form>
                        </div>
                      </div>
                    </dialog>

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