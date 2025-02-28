import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";




export const metadata = {
  title: "Ege Üniversitesi Mağara Araştırma Topluluğu",
  description: "Ege Üniversitesi Mağara Araştırma Topluluğu blog sitesi",
};

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
