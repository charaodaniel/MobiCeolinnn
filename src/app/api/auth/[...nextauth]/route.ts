import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import type { NextAuthConfig } from 'next-auth';
import { UserRole } from '@prisma/client';

export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: {  label: "Password", type: "password" },
        role: { label: "Role", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          return null;
        }
        
        // Ensure user has the required role to log in through this flow
        // For example, driver login page requires DRIVER role.
        if (credentials.role && user.role !== credentials.role) {
            console.log(`Role mismatch: Expected ${credentials.role}, got ${user.role}`);
            return null; 
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);

        if (!isValidPassword) {
          return null;
        }

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
        if (user) {
            token.id = user.id;
            // @ts-ignore
            token.role = user.role;
        }
        return token;
    },
    async session({ session, token }) {
        if (session.user) {
            session.user.id = token.id as string;
            // @ts-ignore
            session.user.role = token.role as UserRole;
        }
        return session;
    }
  },
  pages: {
    signIn: '/driver/login', // Redirect to driver login if unauthorized
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
