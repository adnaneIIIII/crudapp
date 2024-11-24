import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table } from "@/components/ui/table";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import prisma from "@/app/lib/db";

async function getData() {
  const data = await prisma.page.findMany({
    orderBy: {
      createAt: "desc",
    },
  });
  return data;
}

 async function Orders() {
  const data = await getData();
  return (
    <>
      <div className="flex items-center justify-start">
        <Button asChild className="flex items-center gap-x-2 ">
          <Link href="./pages/create" className="flex items-center">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Page</span>
          </Link>
        </Button>
      </div>
      <Card className="mt-5">
        <CardHeader className="px-7">
          <CardTitle>Pages</CardTitle>
          <CardDescription>View your site Pages</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>

                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.author}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>{item.createAt.toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size={"icon"}>
                          <MoreHorizontal className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className=" text-left py-2 border border-gray-300 border-opacity-50 rounded-lg"
                      >
                        <DropdownMenuLabel>Action</DropdownMenuLabel>
                        <DropdownMenuSeparator className="mt-1" />
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/pages/${item.id}`}>
                            Edite
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/pages/${item.id}/delete`}>
                            delete
                          </Link></DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export default Orders;
