import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/utils/database";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({session, token, user}) {
            session.accessToken = token.accessToken;
            // session.user.id = token.id;

            const sessionUser = await prisma.user.findUnique({
                where: {
                    email: session.user.email
                }
            })
    
            session.user.id = sessionUser.id.toString();

            // console.log(session);
    
            return session;
        },
        async signIn({user, account, profile, email, credentials}) {
            try {
                // Check if user exists
                const userExist = await prisma.user.findUnique({
                    where: {
                        email: profile.email
                    }
                })

                if (!userExist) {
                    await prisma.user.create({
                        data: {
                            email: profile.email,
                            name: profile.name
                        }
                    })
                } else {
                    // console.log("User Exists");
                }
    
                return true;
            } catch (err) {
                console.log(err);
                return false;
            }
        },
        async jwt({ token, account, profile }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
                token.accessToken = account.access_token
                token.id = profile.id
            }

            token.role = "admin"
            return token
        }
    }
}

// const handler = NextAuth({
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET
//         })
//     ],
//     callbacks: {
//         async session({session, token, user}) {
//             session.accessToken = token.accessToken;
//             // session.user.id = token.id;

//             // console.log("Session Data")
//             // console.log(session);
//             // console.log('---');
//             // console.log(token);
//             // console.log('---');
//             // console.log(user);
//             // console.log('---');

//             const sessionUser = await prisma.user.findUnique({
//                 where: {
//                     email: session.user.email
//                 }
//             })
    
//             session.user.id = sessionUser.id.toString();

//             // console.log(session);
    
//             return session;
//         },
//         async signIn({user, account, profile, email, credentials}) {
//             try {
//                 // console.log(user);
//                 // console.log('----');
//                 // console.log(account);
//                 // console.log('----');
//                 // console.log(profile);
//                 // console.log('----');
//                 // console.log(email);
//                 // console.log('----');
//                 // console.log(credentials);
//                 // console.log('----');
    
//                 // Check if user exists
//                 const userExist = await prisma.user.findUnique({
//                     where: {
//                         email: profile.email
//                     }
//                 })

//                 if (!userExist) {
//                     await prisma.user.create({
//                         data: {
//                             email: profile.email,
//                             name: profile.name
//                         }
//                     })
//                 } else {
//                     // console.log("User Exists");

//                     // await prisma.user.update({
//                     //     where: {
//                     //         email: profile.email
//                     //     },
//                     //     data: {
//                     //         posts: {
//                     //             create: {
//                     //                 title: 'Post Title Test',
//                     //                 content: 'Post Content Test'
//                     //             }
//                     //         }
//                     //     }
//                     // })
//                 }
    
//                 return true;
//             } catch (err) {
//                 console.log(err);
//                 return false;
//             }
//         },
//         async jwt({ token, account, profile }) {
//             // console.log("New Token")
//             // console.log(token);
//             // console.log('---');
//             // console.log(account);
//             // console.log('---');
//             // console.log(profile);
//             // console.log('---');

//             // Persist the OAuth access_token and or the user id to the token right after signin
//             if (account) {
//                 token.accessToken = account.access_token
//                 token.id = profile.id
//             }

//             token.role = "admin"
//             return token
//         }
//     }
// })

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };