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
