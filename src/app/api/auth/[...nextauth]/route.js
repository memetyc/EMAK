import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db/prisma"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        if (!credentials.email || !credentials.password) {
          throw new Error("Email ve parola gereklidir.");
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          throw new Error("Kullanıcı mevcut değil");
        }
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Yanlış parola");
        }
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          isBanned: user.isBanned,
          image: user.image,
          
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {        
        token.role = user.role;
        token.sub = user.id;
        token.isBanned = user.isBanned;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
        session.user.role = token.role;
        session.user.isBanned = token.isBanned;
      }
      return session;
    }
  },
  pages: {
    signIn: '/girisyap',
    signOut: '/cikis',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };