"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { categoryschima, productSchema } from "./lib/ZodSchema";
import prisma from "./lib/db";

export async function createCategory(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user.email !== "adnane.elotmani@usmba.ac.ma") {
    redirect("/");
  }
  const submission = parseWithZod(formData, {
    schema: categoryschima,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  await prisma.categories.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      images: submission.value.images,
    },
  });
  redirect("/admin/categories");
}




export async function deleteCategory(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "adnane.elotmani@usmba.ac.ma") {
    return redirect("/admin");
  }

  await prisma.categories.delete({
    where: {
      id: formData.get("categoryId") as string,
    },
  });
  redirect("/admin/categories");
}







export async function createProduct(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email === "admin@hog.com") {
    return redirect("/dashboard");
  }

  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  const flattenUrls = submission.value.images.flatMap((urlString) =>
    urlString.split(",").map((url) => url.trim())
  );

  await prisma.product.create({
    data: {
      name: submission.value.name,
      description: submission.value.description,
      status: submission.value.status,
      price: submission.value.price,
      images: flattenUrls,
      category: submission.value.category,
      isFeatured: submission.value.isFeatured === true ? true : false,
    },
  });
  redirect("/dashboard/products");
}
