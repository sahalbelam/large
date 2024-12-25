import Avatar from "@/components/Avatar"
import Navbar from "@/components/Navbar"

export interface BlogProps {
    id: number,
    title: string,
    content: string,
    writer: string,
    createdAt: string
}

async function fetchBlog(id: string): Promise<BlogProps | null> {
    const response = await fetch(`http://localhost:3000/api/blog/${id}`, {
        cache: 'no-store',
    })

    if (!response.ok) {
        return null
    }

    const data = await response.json()
    return {
        id: data.id,
        title: data.title,
        content: data.content,
        createdAt: data.createdAt,
        writer: data.writer.username,
    }
}

// Remove the explicit typing of params as it can be inferred from Next.js's dynamic route
const Page = async ({ params }: { params: { id: string } }) => {
    const { id } = params
    const blog = await fetchBlog(id)

    if (!blog) {
        return <div>Blog not found</div>
    }

    return (
        <div className="bg-gradient-to-bl from-slate-800 to-slate-950 min-h-screen h-full">
            <Navbar />
            <div className="flex justify-center h-fit">
                <div className="flex max-w-6xl w-full m-8">
                    <div className="w-full max-w-5xl">
                        <div className="text-slate-300 p-5 font-bold text-4xl">{blog.title}</div>
                        <p className="text-slate-300 px-5" dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>
                    <div className="pt-10 max-w-xl">
                        <Avatar createdAt={blog.createdAt.slice(0, 10)} writer={blog.writer} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
