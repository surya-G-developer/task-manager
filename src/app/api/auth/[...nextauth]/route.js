import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const authOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Credential',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'admin@example.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {

        if (!credentials?.email || !credentials.password) {
          return null
        }
        const user = await prisma.user.findFirst({
          where: {
            AND: [
              { email: credentials.email },
              { password: credentials.password }
            ]
          }
        });
        if (!user) {
          return null
        }
        return user
      }
    })
  ],
  callbacks: {
    session: ({ session, token }) => {
     // console.log('Session Callback', { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role:token.role
        }
      }
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.role = user.role; 
        const u = user 
        return {
          ...token,
          id: u.id
        }
      }
      return token
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }