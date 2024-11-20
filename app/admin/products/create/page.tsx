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
import { Switch } from "@/components/ui/switch";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { UploadDropzone } from "@/utils/uploadthing";
import { SubmiteBotton } from "@/app/components/submitebutton";


function CreateRoot() {
  return (
    <div className="p-4">
      <form>
        <div className="flex items-center gap-4 ">
          <Button variant={"outline"} size={"icon"} asChild>
            <Link href={"/admin/products"}>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          </Button>
          <h1 className="text-xl font-semi-bold tracking-tighter">
            New Product
          </h1>
        </div>
        <Card className="mt-5">
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>Enter your Product details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <Label>Name</Label>
                <Input
                  type="text"
                  className="w-full"
                  placeholder="Product Name"
                />
                <p className=""></p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Description</Label>
                <Textarea placeholder="Product Description" />
                <p className="text-red-500"></p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Price</Label>
                <Input type="number" step="0.01" min="0" placeholder="Price" />
                <p className="text-red-500"></p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Featured Product</Label>
                <Switch />
                <p className="text-red-500"></p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Status</Label>
                <Select>
                  <SelectTrigger className="text-left py-2 pl-4">
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-red-500"></p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger className="text-left py-2 pl-4">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent></SelectContent>
                </Select>
                <p className="text-red-500"></p>
              </div>
              <div className="flex flex-col gap-3">
                <Label>Image</Label>
                <UploadDropzone endpoint="imageUploader" />

                <p className="text-red-500"></p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-start">
            <SubmiteBotton text="Create Product"/>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}

export default CreateRoot;
