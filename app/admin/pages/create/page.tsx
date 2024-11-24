"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SubmiteBotton } from "@/app/components/submitebutton";
import Tiptap from "@/app/components/admin/Tiptap";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { useActionState, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { pageschema } from "@/app/lib/ZodSchema";
import { createpage } from "@/app/action";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function notePicker() {
  const [Content, setContent] = useState<String>("");
  const handleContentChange = (reson: any) => {
    setContent(reson);
  };
  useEffect(() => {
    handleSubmit({ preventDefault: () => {} });
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      id: uuidv4(),
      content: Content,
    };
    console.log(data);
  };

  const [lastResult, action] = useActionState(createpage, undefined);
  const [from, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: pageschema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div>
      <form id={from.id} onSubmit={from.onSubmit} action={action}>
        
        <div className="flex items-center gap-4">
          <Button variant={"outline"} size={"icon"} asChild>
            <Link href={"/admin/categories"}>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </Button>
          <h1 className="text-xl font-semi-bold tracking-tighter">New Page</h1>
        </div>
        <Card className="mt-5">
          <CardHeader>
            <CardTitle>Page Details</CardTitle>
            <CardDescription>Enter your Page details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Label>Title</Label>
                <Input
                  type="text"
                  key={fields.title.key}
                  name={fields.title.name}
                  defaultValue={fields.title.initialValue || ""}
                  className="w-full"
                  placeholder="Product Name"
                />
                <p className="text-red-500">{fields.title.errors}</p>
              </div>
              <div className=" flex-col gap-3 hidden">
                <Label>Description</Label>
                <Textarea
                  value={Content.toString()} // Controlled input
                  onChange={(e) => {
                    const newContent = e.target.value; // Get the input's value
                    setContent(newContent); // Update local state
                    fields.body.value = newContent; // Sync with the form's field
                  }}
                  key={fields.body.key}
                  name={fields.body.name}
                  placeholder="Product Description"
                />
                <p className="text-red-500">{fields.body.errors}</p>
              </div>
              <Label>Body</Label>
              <div className="">
                <Tiptap
                  content={Content}
                  onChange={(newContent: string) =>
                    handleContentChange(newContent)
                  }
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label>Author</Label>
                <Input
                  type="text"
                  key={fields.author.key}
                  name={fields.author.name}
                  defaultValue={fields.author.initialValue}
                  className="w-full"
                  placeholder="Product Name"
                />
                <p className="">{fields.author.errors}</p>
              </div>
              <Label>Status</Label>
              <Select
                key={fields.status.key}
                name={fields.status.name}
                defaultValue={fields.status.initialValue}
              >
                <SelectTrigger className="text-left py-2 pl-4">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.status.errors}</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-start">
            <SubmiteBotton text="Create Product" />
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
export default notePicker;
