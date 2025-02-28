import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      // Admin sayfalarına erişim kontrolü
      if (req.nextUrl.pathname.startsWith('/admin')) {
        // Token yoksa veya role admin değilse reddet       
        if (!token || token.role !== 'admin') {
          return false;
        }
      }
      return !!token;
    }
  },
  pages: {
    signIn: '/girisyap',
  },
});

// Yalnızca bu route'ları koruyun
export const config = {
  matcher: ['/admin/:path*', '/profil/:path*'], // Korunan sayfalar
};