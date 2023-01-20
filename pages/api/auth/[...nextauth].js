import NextAuth from "next-auth";
import dbConnect from "../../../database/database";
import UserModel from "../../../model/user-model";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs'
export default NextAuth({
  session: {
    jwt: true,
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    CredentialsProvider({
      credentials:{
        usernameoremail : {
          label: 'usernameoremail',
          type: 'text'
        },
        password: {
          label:'password',
          type:'password'
        }
      },
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
            throw new Error("Invalid Username or Password");
          }
        }

        if(bcrypt.compareSync(credentials?.password, user.password)){
          return user;
        }
        
        return;
      },
    }),
  ],
});
