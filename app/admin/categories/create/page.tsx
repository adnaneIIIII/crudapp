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
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { SubmiteBotton } from "@/app/components/submitebutton";
import { useActionState, useState } from "react";
import { createCategory } from "@/app/action";
import { categoryschima } from "@/app/lib/ZodSchema";
import Image from "next/image";
import { UploadDropzone } from "@/app/lib/uploadthing";

function CreateRoot() {
  const [Images, setImages] = useState<string | undefined>(undefined);

  const [lastResult, action] = useActionState(createCategory, undefined);
  const [from, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: categoryschima });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="p-4">
      <form id={from.id} onSubmit={from.onSubmit} action={action}>
        <div className="flex items-center gap-4 ">
          <Button variant={"outline"} size={"icon"} asChild>
            <Link href={"/admin/categories"}>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </Button>
          <h1 className="text-xl font-semi-bold tracking-tighter">
            New Category
          </h1>
        </div>
        <Card className="mt-5">
          <CardHeader>
            <CardTitle>Category Details</CardTitle>
            <CardDescription>Enter your Category details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Label>Name</Label>
                <Input
                  type="text"
                  key={fields.name.key}
                  name={fields.name.name}
                  defaultValue={fields.name.initialValue || ""}
                  className="w-full"
                  placeholder="Product Name"
                />
                <p className="text-red-500">{fields.name.errors}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Description</Label>
                <Textarea
                  
                  key={fields.description.key}
                  name={fields.description.name}
                  defaultValue={fields.name.initialValue || ""}
                  placeholder="Product Description"
                />
                <p className="text-red-500">{fields.name.errors}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Images</Label>
                <Input
                  name={fields.images.name}
                  key={fields.images.key}
                  defaultValue={fields.images.initialValue || ""}
                  type="hidden"
                  value={Images as string}
                />
                {Images !== undefined ? (
                  <Image
                    src={Images || ""}
                    width={200}
                    height={200}
                    defaultValue={fields.images.initialValue || ""}
                    alt="Product Image"
                    className="w-[200px] h-[200px] object-cover border rounded-lg"
                  />
                ) : (
                  <UploadDropzone
                    onClientUploadComplete={(res) => {
                       setImages(res[0].url);
                    }}
                    onUploadError={() => {
                      alert("Image upload failed");
                    }}
                    endpoint="bannerImageRoute"
                  />
                )}
                <p className="text-red-500">{fields.images.errors}</p>
              </div>
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

export default CreateRoot;
