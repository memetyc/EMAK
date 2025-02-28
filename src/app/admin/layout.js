
import 'react-toastify/dist/ReactToastify.css';
import AdminNavbar from "@/components/AdminNavbar";
import { Suspense } from 'react';





export default async function RootLayout({ children}) {

  return (

      <>
      <AdminNavbar />
       <session className="flex-grow">
          <Suspense fallback={
            <div className="flex justify-center items-center h-screen">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          }>
            {children}
          </Suspense>
 
        </session>
      </>
       


  );
}
