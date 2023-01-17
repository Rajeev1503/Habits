import NextAuth from "next-auth";
import dbConnect from "../../../database/database";
import UserModel from "../../../model/user-model";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
export default NextAuth({
  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      return token;
    },

    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      return session;
    },
  },

  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await dbConnect();
        let user = await UserModel.findOne({
          username: credentials.usernameoremail,
        }).collation({
          locale: "en",
          strength: 2,
        });
        if (!user) {
          user = await UserModel.findOne({
            email: credentials.usernameoremail,
          }).collation({
            locale: "en",
            strength: 2,
          });
          if (!user) {
            throw new Error("Invalid Username or Password");
          }
        }

        if(bcrypt.compareSync(credentials.password, user.password)){
          return user;
        }
        
        throw new Error("Invalid Username or Password");
      },
    }),
  ],
});
