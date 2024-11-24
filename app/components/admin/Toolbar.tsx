"use client";

import React from "react";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Quote,
  Undo,
  Redo,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Props = {
  editor: Editor | null;
  content: string;
};
export default function Toolbar({ editor, content }: Props) {
  if (!editor) {
    return null;
  }
  return (
    <Card
      className=" py-3 flex justify-between items-center
  gap-5 w-full flex-wrap border border-gray-200 border-r"
    >
      <div className="flex justify-center items-center gap-4 w-full  flex-wrap  ">
        <Button variant={"outline"}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold") ? " text-gray-700 bg-gray-200" : ""
          }
        >
          <Bold className="w-5 h-5" />
        </Button>
        <Button variant={"outline"}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic") ? " text-gray-700 bg-gray-200" : ""
          }
        >
          <Italic className="w-5 h-5" />
        </Button>
        <Button  variant={"outline"}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? " text-gray-700 bg-gray-200"
              : ""
          }
        >
          <Strikethrough className="w-5 h-5" />
        </Button>
        <Button  variant={"outline"}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? " text-gray-700 bg-gray-200"
              : ""
          }
        >
          <Underline className="w-5 h-5" />
        </Button>
        <Button   variant={"outline"}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? " text-black bg-gray-200"
              : ""
          }
        >
          <Heading2 className="w-5 h-5" />
        </Button>
        <Button  variant={"outline"}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? " text-gray-700 bg-gray-200"
              : ""
          }
        >
          <List className="w-5 h-5" />
        </Button>
        <Button  variant={"outline"}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? " text-gray-700 bg-gray-200 bg-gray-200"
              : ""
          }
        >
          <ListOrdered className="w-5 h-5" />
        </Button>
        <Button  variant={"outline"}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? " text-gray-700 bg-gray-200"
              : ""
          }
        >
          <Quote className="w-5 h-5" />
        </Button>
        <Button  variant={"outline"}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCode().run();
          }}
          className={
            editor.isActive("code")
              ? " text-gray-700 bg-gray-200"
              : ""
          }
        >
          <Code className="w-5 h-5" />
        </Button>
        <Button   variant={"outline"}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? " text-gray-700 bg-gray-200"
              : " hover:text-gray-700 "
          }
        >
          <Undo className="w-5 h-5" />
        </Button>
        <Button   variant={"outline"}
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? " text-gray-700 bg-gray-200"
              : " hover: hover:text-gray-700"
          }
        >
          <Redo className="w-5 h-5" />
        </Button>
      </div>
    </Card>
  );
}
