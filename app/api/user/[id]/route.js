import { NextResponse } from "next/server";
import { prisma } from "@/utils/database";
// import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request, {params}) {
    try {
        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: 'User need to be logged in' }, { status: 401 })
        }
        // const token = await getToken({request})

        // if (!token) {
        //     return NextResponse.json({ error: 'User need to be logged in' }, { status: 401 })
        // }

        const id = parseInt(params.id)

        const getPosts = await prisma.post.findMany({
                where: {
                    authorId: id
                },
                include: {
                    author: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                }
            }
        )

        return NextResponse.json({data: getPosts}, {status: 200})
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Fail to fetch all posts' }, { status: 500 })
    }
}