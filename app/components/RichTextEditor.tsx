'use client';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { 
  ssr: false,
  loading: () => <div className="min-h-[150px] p-4 text-on-surface-variant bg-surface-container-low rounded-md border border-outline-variant">Loading editor...</div>
});

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const modules = {
  toolbar: [
    [{ 'header': [2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['link'],
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'link'
];

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  return (
    <div className="w-full bg-surface-container-low border border-outline-variant rounded-md overflow-hidden font-body-md text-on-surface">
      <style jsx global>{`
        .quill {
          display: flex;
          flex-direction: column;
        }
        .ql-toolbar.ql-snow {
          border: none;
          border-bottom: 1px solid var(--color-outline-variant, #cac4d0);
          background-color: var(--color-surface-container-high, #ece6f0);
          padding: 8px;
        }
        .ql-container.ql-snow {
          border: none;
          min-height: 150px;
          font-family: inherit;
        }
        .ql-editor {
          min-height: 150px;
          padding: 1rem;
        }
      `}</style>
      <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={onChange} 
        modules={modules}
        formats={formats}
      />
    </div>
  );
}
