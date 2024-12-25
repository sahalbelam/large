// app/api/blog/[id]/route.ts
import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {

  const blogId = Number(params.id);

  if (isNaN(blogId)) {
    return new NextResponse("Invalid blog ID", { status: 400 });
  }

  try {
    const oneBlog = await prisma.blog.findFirst({
      where: {
        id: blogId,
      },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        writer: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!oneBlog) {
      return new NextResponse("Blog not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(oneBlog), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest,
  { params }: { params: { id: string } }) {

  const blogId = Number(context.params.id);

  try {
    const blogCheck = await prisma.blog.findFirst({
      where: {
        id: blogId
      }
    })
    if (!blogCheck) {
      return new NextResponse('blog not found', { status: 404 })
    }
    await prisma.blog.delete({
      where: {
        id: blogId
      },
    })
    return new NextResponse("blog deleted", { status: 201 })

  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 })
  }
}