'use client'
import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";

interface Blog {
  id: number;
  title: string;
  content: string;
  writer: {
    username: string;
  };
}

const UsersBlog = () => {
  const { getToken } = useAuth();
  const [blogs, setBlogs] = useState<Blog[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const token = await getToken();
        if (!token) {
          console.error("No token found. User might not be signed in.");
          setBlogs([]);
          return;
        }

        const response = await fetch("http://localhost:3000/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Failed to fetch blogs:", response.status, response.statusText);
          setBlogs([]);
          return;
        }

        const data = await response.json();
        setBlogs(
          data.map((blog: Blog) => ({
            id: blog.id,
            title: blog.title,
            content: blog.content,
            writer: blog.writer,
          }))
        );
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [getToken]);

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id);
      const response = await fetch(`http://localhost:3000/api/blog/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error("Failed to delete blog:", response.statusText);
        return;
      }
      setBlogs((prevBlogs) => prevBlogs?.filter((blog) => blog.id !== id) || []);
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) {
    return <div className="text-center mt-10 text-slate-300">Loading...</div>;
  }

  if (!blogs || blogs.length === 0) {
    return <div className="text-slate-300 text-center mt-10">No blogs found.</div>;
  }

  return (
    <div className="mt-6">
      <div className="flex justify-center">
        <div className="w-full max-w-6xl space-y-2">
          {blogs.map((blog) => (
            <div className="p-3" key={blog.id}>
              <div className="flex items-center justify-between backdrop-filter backdrop-blur-md bg-opacity-50 bg-slate-800 border-2 rounded-xl border-slate-400 hover:scale-105 hover:shadow-xl transition-transform duration-200">
                <Link aria-label={`Read more about ${blog.title}`} href={`/blog/${blog.id}`} className="flex justify-between items-center p-4 cursor-pointer">
                  <div>
                    <h2 className="text-slate-200 font-bold text-2xl mb-2"> {blog.title}</h2>
                    <div
                      dangerouslySetInnerHTML={{ __html: blog.content.slice(0, 100) + "....." }}
                      className="text-slate-400 flex h-auto items-center"
                    />
                    <h4 className="text-slate-400 italic text-sm mt-4">✍️ {blog.writer.username}</h4>
                  </div>

                </Link>
                <div>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    disabled={deletingId === blog.id}
                    className="font-semibold gap-x-3 rounded-xl mr-3"
                  >
                    {deletingId === blog.id ? (
                      <div className="text-white">Deleting...</div>
                    ) : (
                      <Trash2 className="text-red-500 hover:text-red-600 hover:scale-110 transition-transform duration-300" />
                    )}
                  </button>;
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default UsersBlog;
