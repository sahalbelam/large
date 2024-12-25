import Link from "next/link"

interface Blog {
  id: number;
  title: string;
  content: string;
  writer: {
    username: string;
  };
}

async function fetchBlog(): Promise<Blog[] | null> {
  const response = await fetch('http://localhost:3000/api/blog')
  if (!response.ok) {
    return null
  }

  const data = await response.json()
  return data.map((blog: Blog) => ({
    id:blog.id,
    title: blog.title,
    content: blog.content,
    writer:blog.writer
  }))
}

const Blogs = async () => {
  const blogs = await fetchBlog();

  if (!blogs || blogs.length === 0) {
    return <div className="text-slate-300 text-center mt-10">No blogs found.</div>;
  }
  if (!blogs) {
    return <div className="text-center mt-10 text-slate-300">Loading...</div>;
  }

  return (
    <div className="mt-5">
      <div className="flex justify-center">
        <div className="w-full max-w-6xl space-y-2">
          {blogs.map((blog) => (
            <div
              className="p-3"
              key={blog.id}
            >
              <div className=" backdrop-filter backdrop-blur-md bg-opacity-50 bg-slate-800 border-2 rounded-xl border-slate-400 hover:scale-105 hover:shadow-xl transition-transform duration-200" >
                <Link aria-label={`Read more about ${blog.title}`} href={`/blog/${blog.id}`} className="block p-4 cursor-pointer">
                <div>
                    <h2 className="text-slate-200 font-bold text-2xl mb-2"> {blog.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 100)+"....." }}  className="text-slate-400 flex h-auto items-center" />
                    <h4 className="text-slate-400 italic text-sm mt-4">✍️ {blog.writer.username}</h4>
                </div>
                  </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs
