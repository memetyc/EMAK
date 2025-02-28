"use client";
import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { getSession, signIn} from "next-auth/react";
import { useRouter } from 'next/navigation';
export default function Register() {
  const router = useRouter();
  async function getUser(){
    const session = await getSession();
    console.log(session);
  }
  getUser();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        toast.success("Kullanıcı oluşturuldu");
        router.push('/girisyap');
      } else {
        console.log(data.message);
        
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Bir hata oluştu:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (type) => {
    // Giriş yaptıktan sonra yönlendirilecek URL'yi tanımla
    const callbackUrl = new URLSearchParams(window.location.search).get('callbackUrl') || '/';

    // Facebook ile giriş yap
    signIn(type, { callbackUrl });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card bg-base-200 shadow-xl w-full max-w-4xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold mb-6">Kayıt Ol</h2>
          
          <div className="flex flex-col justify-center items-center md:flex-row gap-8">
            {/* Sol Sütun - Sosyal Medya Butonları */}
            <div className="flex-1 w-full space-y-4">
              <h3 className="text-lg font-semibold mb-4">Sosyal Medya ile Kayıt Ol</h3>
              <button onClick={() => handleLogin("google")} className="btn btn-outline w-full">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
                </svg>
                Google ile Devam Et
              </button>
            </div>

            {/* Dikey Ayırıcı */}
            <div className="hidden md:flex flex-col items-center">
              <div className="h-full w-px bg-base-300"></div>
            </div>

            {/* Sağ Sütun - Kayıt Formu */}
            <div className="flex-1 w-full">
              <h3 className="text-lg font-semibold mb-4">E-posta ile Kayıt Ol</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Ad Soyad</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ad Soyad"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="ornek@email.com"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Şifre</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="********"
                    className="input input-bordered"
                    required
                  />
                </div>

                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">Kayıt Ol</button>
                </div>
              </form>
            </div>
          </div>

          <p className="text-center mt-6">
            Zaten hesabın var mı?{' '}
            <Link href="/login" className="link link-primary">
              Giriş Yap
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
} 