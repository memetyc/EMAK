"use client";
import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const callbackUrl = new URLSearchParams(window.location.search).get('callbackUrl') || '/';

    try {
     await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: callbackUrl,
      });
    
      
    } catch (error) {
      console.error("Giriş hatası:", error);
      toast.error("Giriş yapılırken bir hata oluştu");
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
          <h2 className="card-title justify-center text-2xl font-bold mb-6">Giriş Yap</h2>
          
          <div className="flex justify-center items-center flex-col md:flex-row gap-8">
            {/* Sol Sütun - Sosyal Medya Butonları */}
            <div className="flex-1 space-y-4 w-full">
              <h3 className="text-lg font-semibold mb-4">Sosyal Medya ile Giriş Yap</h3>
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

            {/* Sağ Sütun - Giriş Formu */}
            <div className="flex-1 w-full">
              <h3 className="text-lg font-semibold mb-4">E-posta ile Giriş Yap</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <label className="label">
                    <Link href="/sifremi-unuttum" className="label-text-alt link link-hover">
                      Şifremi Unuttum
                    </Link>
                  </label>
                </div>

                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-primary">Giriş Yap</button>
                </div>
              </form>
            </div>
          </div>

          <p className="text-center mt-6">
            Hesabın yok mu?{' '}
            <Link href="/kayitol" className="link link-primary">
              Kayıt Ol
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
