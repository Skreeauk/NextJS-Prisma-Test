import { NextResponse } from "next/server";
import { prisma } from "@/utils/database";
// import { getToken } from "next-auth/jwt";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request, {params}) {
    try {
        // const token = await getToken({request})

        // if (!token) {
        //     return NextResponse.json({ error: 'User need to be logged in' }, { status: 401 })
        // }

        const session = await getServerSession(authOptions)
        if (!session) {
            return NextResponse.json({ error: 'User need to be logged in' }, { status: 401 })
        }

        const id = parseInt(params.id)

        const getPost = await prisma.post.findUnique({
                where: {
                    id: id
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

        if (!getPost) {
            return NextResponse.json("Resource not found", {status: 404})
        }

        return NextResponse.json({data: getPost}, {status: 200})
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Fail to fetch post' }, { status: 500 })
    }
}

export async function PATCH(request, {params}) {

    // const token = await getToken({request})

    // if (!token) {
    //     return NextResponse.json({ error: 'User need to be logged in' }, { status: 401 })
    // }

    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: 'User need to be logged in' }, { status: 401 })
    }

    const id = parseInt(params.id)

    const { title, prompt } = await request.json()

    try {
        const updatePost = await prisma.post.update({
            where: {
                id: id
            },
            data: {
                title: title,
                content: prompt
            },
        })

        return NextResponse.json({ action: 'Post Updated' }, {status: 200})
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
    }
}

export async function DELETE(request, {params}) {

    // const token = await getToken({request})

    // if (!token) {
    //     return NextResponse.json({ error: 'User need to be logged in' }, { status: 401 })
    // }

    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: 'User need to be logged in' }, { status: 401 })
    }

    const id = parseInt(params.id)

    try {
        const delPost = await prisma.post.delete({
            where: {
                id: id
            }
        })

        return NextResponse.json({ action: 'Post Deleted' }, {status: 200})
    } catch (err) {
        console.log(err)
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
    }
}