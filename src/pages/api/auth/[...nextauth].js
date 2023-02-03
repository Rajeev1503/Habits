import NextAuth from "next-auth";
import dbConnect from "../../../../database/database";
import UserModel from "../../../../model/UserModel";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
export default NextAuth({
  session: {
     strategy: "jwt" 
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {

    async jwt({ token, user }) {
      if(user?._id) token.id = user._id;
      return token
    },
      async session({ session, token }) {
        if(token?.id) session.user.id=token.id
      return session
    }
},
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        await dbConnect();
        let user = await UserModel.findOne({
          username: credentials?.usernameoremail,
        }).collation({
          locale: "en",
          strength: 2,
        });
        if (!user) {
          user = await UserModel.findOne({
            email: credentials?.usernameoremail,
          }).collation({
            locale: "en",
            strength: 2,
          });
          if (!user) {
            return null;
          }
        }

        else{
          if(bcrypt.compareSync(credentials?.password, user.password)){
            return user;
          }
          return null;
        }
        
      },
    }),
  ],
});
