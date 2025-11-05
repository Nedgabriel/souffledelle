"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { useEffect } from "react";
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  List,
  ListOrdered,
  Quote,
  Code,
  Minus,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
} from "lucide-react";

interface Props {
  content: string;
  setContent: (value: string) => void;
}

export default function TiptapEditor({ content, setContent }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Heading,
      Paragraph,
      Bold,
      Italic,
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      CodeBlock,
      HorizontalRule,
    ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content]);

  if (!editor) return null;

  return (
    <div className="rounded-lg p-3 text-black">
      {/* --- Toolbar --- */}
      <div className="flex flex-wrap gap-4 mb-3 rounded">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-1 rounded ${
            editor.isActive("bold") ? "bg-gray-200" : ""
          }`}
          title="Gras"
        >
          <BoldIcon size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-1 rounded ${
            editor.isActive("italic") ? "bg-gray-200" : ""
          }`}
          title="Italique"
        >
          <ItalicIcon size={18} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`p-1 rounded ${
            editor.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""
          }`}
          title="Titre H1"
        >
          <Heading1 size={18} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-1 rounded ${
            editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""
          }`}
          title="Titre H2"
        >
          <Heading2 size={18} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`p-1 rounded ${
            editor.isActive("heading", { level: 3 }) ? "bg-gray-200" : ""
          }`}
          title="Titre H3"
        >
          <Heading3 size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-1 rounded ${
            editor.isActive("bulletList") ? "bg-gray-200" : ""
          }`}
          title="Liste à puces"
        >
          <List size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-1 rounded ${
            editor.isActive("orderedList") ? "bg-gray-200" : ""
          }`}
          title="Liste ordonnée"
        >
          <ListOrdered size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-1 rounded ${
            editor.isActive("blockquote") ? "bg-gray-200" : ""
          }`}
          title="Citation"
        >
          <Quote size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-1 rounded ${
            editor.isActive("codeBlock") ? "bg-gray-200" : ""
          }`}
          title="Bloc de code"
        >
          <Code size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className="p-1 rounded"
          title="Ligne horizontale"
        >
          <Minus size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          className="p-1 rounded"
          title="Annuler"
        >
          <Undo size={18} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          className="p-1 rounded"
          title="Rétablir"
        >
          <Redo size={18} />
        </button>
      </div>

      {/* --- Zone de texte --- */}
      <div className="rounded shadow-sm bg-gray-50 min-h-[150px] p-3">
        <EditorContent
          editor={editor}
          className="w-full min-h-[150px] whitespace-pre-wrap break-words focus:outline-none"
        />
      </div>
    </div>
  );
}
