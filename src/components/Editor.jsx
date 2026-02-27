// components/Editor.jsx

import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import {Table} from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import '../App.css'

import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Highlighter, Heading1, Heading2, Heading3,
  List, ListOrdered, ImageIcon, Link2,
  Table as TableIcon, Trash2, Brush
} from 'lucide-react';

import '../App.css';
import { toast } from 'react-toastify';

const Editor = () => {
  const { setValue, watch } = useFormContext();
  const savedContent = watch('content');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        underline: false,
        link: false,
      }),
      Heading.configure({ levels: [1, 2, 3] }),
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      Highlight,
      TaskList,
      TaskItem.configure({ nested: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: savedContent || '',
    onUpdate: ({ editor }) => {
      setValue('content', editor.getHTML());
    },
  });
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
const addImage = useCallback(() => {
  if (!editor) return;
  const url = window.prompt('Enter image URL');
  if (url?.trim() && isValidUrl(url)) {
    editor.chain().focus().setImage({ src: url.trim() }).run();
  } else {
    toast.error('Invalid URL');
  }
}, [editor]);

const addLink = useCallback(() => {
  if (!editor) return;
  const url = window.prompt('Enter link URL');
  if (url?.trim() && isValidUrl(url)) {
    editor.chain().focus().setLink({ href: url.trim(), target: '_blank' }).run();
  } else {
    toast.error('Invalid URL');
  }
}, [editor]);

  if (!editor) return null;

  const Button = ({ icon: Icon, action, isActive, label }) => (
    <button
      type="button"
      onClick={action}
      title={label}
      className={`p-2 rounded hover:bg-gray-200 transition ${
        isActive ? 'bg-blue-600 text-white' : 'text-gray-700'
      }`}
    >
      <Icon size={16} />
    </button>
  );

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-100 border rounded-md">
        <Button icon={Bold} label="Bold" isActive={editor.isActive('bold')} action={() => editor.chain().focus().toggleBold().run()} />
        <Button icon={Italic} label="Italic" isActive={editor.isActive('italic')} action={() => editor.chain().focus().toggleItalic().run()} />
        <Button icon={UnderlineIcon} label="Underline" isActive={editor.isActive('underline')} action={() => editor.chain().focus().toggleUnderline().run()} />
        <Button icon={Strikethrough} label="Strikethrough" isActive={editor.isActive('strike')} action={() => editor.chain().focus().toggleStrike().run()} />
        <Button icon={Highlighter} label="Highlight" isActive={editor.isActive('highlight')} action={() => editor.chain().focus().toggleHighlight().run()} />

        <Button icon={Heading1} label="Heading 1" isActive={editor.isActive('heading', { level: 1 })} action={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} />
        <Button icon={Heading2} label="Heading 2" isActive={editor.isActive('heading', { level: 2 })} action={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} />
        <Button icon={Heading3} label="Heading 3" isActive={editor.isActive('heading', { level: 3 })} action={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} />

        <Button icon={List} label="Bullet List" isActive={editor.isActive('bulletList')} action={() => editor.chain().focus().toggleBulletList().run()} />
        <Button icon={ListOrdered} label="Ordered List" isActive={editor.isActive('orderedList')} action={() => editor.chain().focus().toggleOrderedList().run()} />

        <Button icon={ImageIcon} label="Insert Image" action={addImage} />
        <Button icon={Link2} label="Insert Link" action={addLink} />
        <Button icon={TableIcon} label="Insert Table" action={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} />
        <Button icon={Trash2} label="Delete Table" action={() => editor.chain().focus().deleteTable().run()} />
        <Button icon={Brush} label="Clear Formatting" action={() => editor.chain().focus().unsetAllMarks().clearNodes().run()} />
      </div>

      {/* Editor Content */}
      <div className="prose max-w-none border p-4 rounded-md min-h-[200px] bg-white">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
