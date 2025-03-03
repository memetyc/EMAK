import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";




export default async function RootLayout({ children }) {
  return (
    <>


        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />

    </>
  );
}
