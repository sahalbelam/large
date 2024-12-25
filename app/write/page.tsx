'use client'

import Navbar from "@/components/Navbar";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Youtube from '@tiptap/extension-youtube';
import { useState } from 'react';
import Menubar from "@/components/Menubar";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

const LoadingIndicator = () => (
  <div className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 z-50">
    <div className="text-center">
      <div className="border-t-4 border-b-4 border-white rounded-full w-12 h-12 animate-spin mx-auto"></div>
      <p className="mt-4 text-white text-lg">Submitting your blog...</p>
    </div>
  </div>
);

export default function Home() {
  const [title, setTitle] = useState('');
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          HTMLAttributes: { class: 'list-disc pl-5 space-y-2' },
        },
        blockquote: {
          HTMLAttributes: { class: 'border-l-4 border-gray-300 pl-4 italic my-4' },
        },
        codeBlock: {
          defaultLanguage: 'Javascript',
          HTMLAttributes: { class: 'inline-block bg-slate-700 p-2 rounded-lg' },
        },
        heading: {
          HTMLAttributes: { class: 'text-xl font-semibold px-2 py-3' },
        },
      }),
      Youtube.configure({ controls: true }),
    ],
    content: '<h2>Write something...</h2>',
    autofocus: true,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl text-slate-300 mx-auto focus:outline-none min-h-[calc(100vh-150px)] bg-slate-800 text-lg font-semibold h-fit rounded-lg shadow-md subpixel-antialiased p-6',
      },
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("Title is required.");
      return;
    }

    try {
      setLoading(true);
      const token = await getToken();

      const response = await fetch('http://localhost:3000/api/blog', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`,
        },
        body: JSON.stringify({
          title,
          content: editor.getHTML(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit blog");
      }

      console.log("Blog submitted successfully");
      router.push('/');
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-bl from-slate-800 to-slate-950 min-h-screen">
      <Navbar />
      <div className="flex justify-center min-h-screen h-fit">
        <div className="w-full max-w-6xl mt-5 space-y-5 mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-slate-800 text-white py-2 px-4 text-3xl font-semibold w-full rounded-lg focus:outline-none focus:ring focus:ring-slate-600"
            placeholder="What's the title?"
            type="text"
          />
          <div>
            <Menubar editor={editor} />
            <EditorContent editor={editor} />
          </div>
          <button
            onClick={handleSubmit}
            className="text-slate-200 text-lg w-full bg-slate-800 p-2 rounded-lg hover:bg-slate-700 focus:outline-none focus:ring focus:ring-slate-600"
          >
            Submit
          </button>
        </div>
      </div>
      {loading && <LoadingIndicator />}
    </div>
  );
}
