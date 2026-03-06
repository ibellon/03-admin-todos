import prisma from "@/app/lib/prisma"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth, { User } from "next-auth"
import { Adapter } from "next-auth/adapters"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { signInEmailPassword } from "../actions/auth-actions"


export const authOptions = {

  adapter: PrismaAdapter(prisma) as Adapter,
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
      authorization: {
        params: {
          prompt: "login", // Fuerza a Github a pedir login de nuevo
        }
      },
      allowDangerousEmailAccountLinking: true
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: "select_account", // Fuerza a elegir cuenta de Google
          access_type: "offline",
          response_type: "code"
        }
      },
      allowDangerousEmailAccountLinking: true
    }),
    
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      credentials: {
        email: { label: "Correo", type: "email", placeholder: "jsmith" },
        password: { label: "Contraseña", type: "password", placeholder: "******" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await signInEmailPassword(credentials!.email, credentials!.password);

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        }
          // If you return null then an error will be displayed advising the user to check their details.
          return null
      }
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
        //throw 'El Usuario no está activo';
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