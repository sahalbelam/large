import { Editor } from '@tiptap/core'
import React from 'react'
import { BubbleMenu } from '@tiptap/react';
import { Bold, Code, Heading, Italic, List, Quote } from 'lucide-react';

interface types {
    editor: Editor
}
const Menubar = ({ editor }: types) => {
    
    return (
        <div>
            {editor && <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
                <div className='flex w-fit bg-slate-800 border-2 border-black rounded-2xl gap-x-3 p-3 '>
                    <button
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={`rounded-lg text-white ${editor.isActive('codeBlock') ? 'bg-slate-950 rounded-3xl scale-x-125' : ''} hover:scale-x-125 duration-300`}
                    >
                        <Code></Code>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={` rounded-lg text-white ${editor.isActive('blockquote') ? 'bg-slate-950 rounded-3xl' : ''} hover:scale-x-125 duration-300`}
                    >
                        <Quote></Quote>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`text-white rounded-lg ${editor.isActive('bold') ? 'bg-slate-950 rounded-3xl' : ' '} hover:scale-x-125 duration-300`}
                    >
                        <Bold></Bold>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`text-white rounded-lg ${editor.isActive('italic') ? 'bg-slate-950 rounded-3xl ' : ''} hover:scale-x-125 duration-300`}
                    >
                        <Italic></Italic>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={`text-white rounded-lg ${editor.isActive('bulletList') ? 'bg-slate-950 rounded-3xl' : ' '} hover:scale-x-125 duration-300`}
                    >
                        <List></List>
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={`text-white rounded-lg ${editor.isActive('heading', { level: 1 }) ? 'bg-slate-950 rounded-3xl ' : ''} hover:scale-x-125 duration-300`}
                    >
                        <Heading></Heading>
                    </button>
                </div>

            </BubbleMenu>}

        </div>
    )
}

export default Menubar
