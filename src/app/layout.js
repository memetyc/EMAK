import { Quicksand } from "next/font/google";
import "@/app/globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AllProvider from "@/components/AllProviders";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://emak-drab.vercel.app'),
  title:  'EMAK - Ege Üniversitesi Mağara Araştırma Topluluğu',
  description: 'Ege Üniversitesi Mağara Araştırma Topluluğu (EMAK), yeraltı dünyasının keşifçileri olarak mağara keşifleri, mağaracılık eğitimleri ve doğa sporları konusunda faaliyet göstermektedir.',
  keywords: ['mağara', 'mağaracılık', 'ege üniversitesi', 'öğrenci topluluğu', 'doğa sporları', 'mağara keşfi', 'mağara araştırma', 'izmir'],
  authors: [{ name: 'EMAK' }],
  creator: 'EMAK',
  publisher: 'EMAK',
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://emak-drab.vercel.app',
    siteName: 'EMAK - Ege Üniversitesi Mağara Araştırma Topluluğu',
    title: 'EMAK - Ege Üniversitesi Mağara Araştırma Topluluğu',
    description: 'Ege Üniversitesi Mağara Araştırma Topluluğu (EMAK), yeraltı dünyasının keşifçileri olarak mağara keşifleri, mağaracılık eğitimleri ve doğa sporları konusunda faaliyet göstermektedir.',
    images: [
      {
        url: '/HeroImage.jpeg',
        width: 1200,
        height: 630,
        alt: 'EMAK - Ege Üniversitesi Mağara Araştırma Topluluğu'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EMAK - Ege Üniversitesi Mağara Araştırma Topluluğu',
    description: 'Ege Üniversitesi Mağara Araştırma Topluluğu (EMAK), yeraltı dünyasının keşifçileri olarak mağara keşifleri, mağaracılık eğitimleri ve doğa sporları konusunda faaliyet göstermektedir.',
    images: ['/HeroImage.jpeg']
  },
  viewport: {
    width: 'device-width',
    initialScale: 1
  },
  verification: {
    google: 'google-site-verification-code', // Google Search Console doğrulama kodu
  }
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  
  return (
    <html lang="tr">
      <body className={`${quicksand.className} flex flex-col min-h-screen`}>
        <AllProvider session={session}>
        <main className="flex-grow">
          {children}
        </main>
        <ToastContainer />
        </AllProvider>
      </body>
    </html>
  );
}
