import Editepage from "@/app/components/admin/Editepage";
import prisma from "@/app/lib/db";

import { notFound } from "next/navigation";

async function getData(pageId: string) {
  const data = await prisma.page.findUnique({
    where: {
      id: pageId,
    },
    select: {
      id: true,
      title: true,
      body: true,
      status: true,
      createAt: true,
      author: true,
    },
  });
  if (!data) {
    return notFound();
  }
  return data;
}

async function EditProduct({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  return <Editepage data={data} />;
}

export default EditProduct;
