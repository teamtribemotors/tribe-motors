'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { useEffect } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[150px] px-4 py-3 bg-surface-container-low border border-outline-variant rounded-b-md text-on-surface font-body-md',
      },
    },
  });

  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full flex flex-col rounded shadow-sm">
      <div className="flex flex-wrap items-center gap-1 p-2 bg-surface-container-high border border-outline-variant border-b-0 rounded-t-md">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            editor.isActive('bold')
              ? 'bg-primary text-on-primary font-label-bold'
              : 'text-on-surface-variant hover:bg-surface-container-highest'
          }`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            editor.isActive('italic')
              ? 'bg-primary text-on-primary font-label-bold'
              : 'text-on-surface-variant hover:bg-surface-container-highest'
          }`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            editor.isActive('heading', { level: 3 })
              ? 'bg-primary text-on-primary font-label-bold'
              : 'text-on-surface-variant hover:bg-surface-container-highest'
          }`}
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            editor.isActive('bulletList')
              ? 'bg-primary text-on-primary font-label-bold'
              : 'text-on-surface-variant hover:bg-surface-container-highest'
          }`}
        >
          Bullets
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
