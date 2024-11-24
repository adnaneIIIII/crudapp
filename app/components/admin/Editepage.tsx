"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-dropdown-menu";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { useActionState, useEffect, useState } from "react";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

import { SubmiteBotton } from "@/app/components/submitebutton";
import Tiptap from "./Tiptap";
import { pageschema } from "@/app/lib/ZodSchema";
import { pageedite } from "@/app/action";


type IAppProps = {
  data: {
    id: string;
    title: string;
    body: string;
    status: any;
    createAt: Date;
    author: string;
  };
};

function Editepage({ data }: IAppProps) {



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




  const [lastResult, action] = useActionState(pageedite, undefined);
  const [from, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: pageschema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });



  return (
    <form id={from.id} onSubmit={from.onSubmit} action={action}>
              <input type="hidden" name="pageId" value={data.id} />
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
                  defaultValue={fields.title.initialValue}
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
                  defaultValue={fields.author.initialValue}
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
                defaultValue={fields.author.initialValue}
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
  );
}

export default Editepage;

function uuidv4() {
    throw new Error("Function not implemented.");
}
