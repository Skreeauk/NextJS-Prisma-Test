import { NextResponse } from "next/server";
import { prisma } from "@/utils/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req, res) {
    try {

        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: 'User need to be logged in' }, { status: 401 })
        }

        // const token = await getToken({req})

        // if (!token) {
        //     return NextResponse.json({ error: 'User need to be logged in' }, { status: 401 })
        // }

        const getPosts = await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        })

        return NextResponse.json({data: getPosts}, {status: 200})
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Fail to fetch all posts' }, { status: 500 })
    }
}

export async function POST(request) {

    // const token = await getToken({request})

    // if (!token) {
    //     return NextResponse.json({ error: 'User need to be logged in' }, { status: 401 })
    // }

    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: 'User need to be logged in' }, { status: 401 })
    }

    const { title, prompt, userId } = await request.json()

    try {
        const newPost = await prisma.user.update({
            where: {
                id: parseInt(userId)
            },
            data: {
                posts: {
                    create: {
                        title: title,
                        content: prompt
                    }
                }
            },
        })

        return NextResponse.json({ action: 'Create New Post OK' }, {status: 201})
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}