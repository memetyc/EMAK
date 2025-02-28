import React from 'react'

function Loading() {
  return (
    <div>
       <div className="container mx-auto p-4">
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-2xl font-bold">Kullanıcılar</h1>
  </div>

  <div className="overflow-x-auto">
    <table className="table table-zebra">
      <thead>
        <tr>
          <th>Görsel</th>
          <th>Başlık</th>
          <th>Tarih</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, index) => (
          <tr key={index}>
            <td>
              <div className="w-20 h-20 skeleton rounded"></div>
            </td>
            <td>
              <div className="w-40 h-6 skeleton rounded"></div>
            </td>
            <td>
              <div className="w-24 h-4 skeleton rounded"></div>
            </td>
            <td>
              <div className="flex gap-2">
                <div className="w-16 h-8 skeleton rounded"></div>
                <div className="w-16 h-8 skeleton rounded"></div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
    </div>
  )
}

export default Loading