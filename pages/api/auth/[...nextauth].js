import NextAuth from "next-auth";
import dbConnect from "../../../database/database";
import UserModel from "../../../model/user-model";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
export default NextAuth({
  session: {
     strategy: "jwt" 
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
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
