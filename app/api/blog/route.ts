import prisma from "@/utils/db"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
    try {
        console.log("Fetching blogs...");
        const allBlogs = await prisma.blog.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                writer: true
            }
        })
        
        return new NextResponse(JSON.stringify(allBlogs), { status: 200 })

    } catch (error) {
        console.log(error)  
        return new NextResponse(JSON.stringify(error), { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    const { userId } = await auth()

    if (!userId) {
        return new NextResponse('unauthorized', { status: 401 })
    }

    console.log(userId)
    const body = await req.json()

    try {
        const newBlog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                userId: userId
            }
        })
        return new NextResponse(JSON.stringify(newBlog), { status: 201 })

    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 })
    }
}