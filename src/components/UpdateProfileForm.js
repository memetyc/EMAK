'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { signOut } from 'next-auth/react';

export default function UpdateProfileForm({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name || '');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      if (image) {
        formData.append('image', image);
      }

      const response = await fetch(`/api/user/${user.id}`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Profil başarıyla güncellendi');
        setIsEditing(false);
        signOut({ callbackUrl: '/girisyap' });
      } else {
        toast.error('Profil güncellenirken bir hata oluştu');
      }
    } catch (error) {
      toast.error('Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isEditing) {
    return (
      <button 
        onClick={() => setIsEditing(true)}
        className="btn btn-outline btn-sm mt-4"
      >
        Profili Düzenle
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full mt-4 space-y-4">
      <div>
        <label className="label">İsim</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full"
        />
      </div>

      <div>
        <label className="label">Profil Resmi</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
          className="file-input file-input-bordered w-full"
        />
      </div>

      <div className="flex gap-2">
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading && <span className="loading loading-spinner loading-xs" />}
          Kaydet
        </button>
        <button 
          type="button"
          onClick={() => setIsEditing(false)}
          className="btn btn-ghost"
        >
          İptal
        </button>
      </div>
    </form>
  );
} 