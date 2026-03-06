import prisma from "@/app/lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth, { User } from "next-auth"
import { Adapter } from "next-auth/adapters"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { signIn } from "next-auth/react"

export const authOptions = {

  adapter: PrismaAdapter(prisma) as Adapter,
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
      allowDangerousEmailAccountLinking: true
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      allowDangerousEmailAccountLinking: true
    }),
    // ...add more providers here
  ],

  session: {
    strategy: 'jwt'
  },

  callbacks: {
    async signIn({user, account, profile, email, credentials}:any) {
      //console.log('USUARIO:',user);
      return true;
    },

    async jwt({token, user, account, profile}:any) {
      
      const dbUser = 
        await prisma.user.findUnique({where:{email: token.email ?? 'No-email'}})
      
      if(!dbUser?.isActive) {
        throw 'El Usuario no está activo';
      } 

      token.roles = dbUser?.roles ?? 'No-roles';  
      token.id = dbUser?.id ?? 'No-UUID';
    
      return token;
    },

    async session({session, token, user}:any) {
      //console.log('SESSION:',session);
      console.log('TOKEN:',token);

      if(session && session.user) {
        session.user.roles = token.roles;
        session.user.id = token.id;
      }

      return session;
    }

  }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}