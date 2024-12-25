import Avatar from "@/components/Avatar";
import Navbar from "@/components/Navbar";

// Define the type of params directly without Promises
interface PageProps {
    params: Promise<{
      id: string;
    }>;
  }

export interface BlogProps {
  id: number;
  title: string;
  content: string;
  writer: string;
  createdAt: string;
}

// Function to fetch the blog using the given id
async function fetchBlog(id: string): Promise<BlogProps | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${id}`, {
      cache: "no-store", // Ensure fresh data
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return {
      id: data.id,
      title: data.title,
      content: data.content,
      createdAt: data.createdAt,
      writer: data.writer.username,
    };
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

// Page component
const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  // Fetch the blog data
  const blog = await fetchBlog(id);

  if (!blog) {
    return (
      <div className="bg-gradient-to-bl from-slate-800 to-slate-950 min-h-screen flex justify-center items-center">
        <div className="text-white text-xl">Blog not found</div>
      </div>
    );
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
  );
};

export default Page;
