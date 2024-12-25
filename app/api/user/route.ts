import prisma from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
    const { userId } = await auth(); // `userId` from Clerk is mapped to `clerk_id` in the database.
    
    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const userBlogs = await prisma.blog.findMany({
            where: {
                userId: userId , // Matches the `clerk_id` field in the User model.
            },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                writer: {
                    select: {
                        username: true, // Include the username of the blog writer.
                    },
                },
            },
        });

        return new NextResponse(JSON.stringify(userBlogs), { status: 200 });

    } catch (error) {
        console.error("Error fetching user blogs:", error);
        return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
