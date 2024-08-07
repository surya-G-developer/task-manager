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
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com'
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
        console.log(user)

        // const user = await prisma.user.findUnique({
        //   where: {
        //     email: credentials.email
        //   }
        // })

        if (!user) {
          return null
        }


        // if (!isPasswordValid) {
        //   return null
        // }

        return user
      }
    })
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log('Session Callback', { session, token })
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey
        }
      }
    },
    jwt: ({ token, user }) => {
      console.log('JWT Callback', { token, user })
      if (user) {
        const u = user 
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey
        }
      }
      return token
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }