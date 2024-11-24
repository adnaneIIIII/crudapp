"use server";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { categoryschima, pageschema, productSchema } from "./lib/ZodSchema";
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

  if (!user || user.email !== "adnane.elotmani@usmba.ac.ma") {
    return redirect("/");
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
      price: submission.value.price,
      category: submission.value.category,
      images: flattenUrls,
      isFeatured: submission.value.isFeatured,
      status: submission.value.status,
    },
  });
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "adnane.elotmani@usmba.ac.ma") {
    return redirect("/");
  }

  await prisma.product.delete({
    where: {
      id: formData.get("productId") as string,
    },
  });
  redirect("/admin/products");
}

export async function Edite(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "adnane.elotmani@usmba.ac.ma") {
    return redirect("/");
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
  const productId = formData.get("productId") as string;
  await prisma.product.update({
    where: {
      id: productId,
    },
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
  redirect("/admin/products");
}

export async function createpage(prevState: unknown, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || user.email !== "adnane.elotmani@usmba.ac.ma") {
    redirect("/");
  }
  const submission = parseWithZod(formData, {
    schema: pageschema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  await prisma.page.create({
    data: {
      title: submission.value.title,
      body: submission.value.body,
      status: submission.value.status,
      author: submission.value.author,
    },
  });
  redirect("/admin/pages");
}

export async function pageedite(prevState: any, formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "adnane.elotmani@usmba.ac.ma") {
    return redirect("/");
  }
  const submission = parseWithZod(formData, {
    schema: pageschema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  const pageId = formData.get("pageId") as string;

  await prisma.page.update({
    where: {
      id: pageId,
    },
    data: {
      title: submission.value.title,
      body: submission.value.body,
      status: submission.value.status,
      author: submission.value.author,
    },
  });
  redirect("/admin/pages");
}

export async function deletepage(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user.email !== "adnane.elotmani@usmba.ac.ma") {
    return redirect("/admin");
  }

  await prisma.page.delete({
    where: {
      id: formData.get("pageId") as string,
    },
  });
  redirect("/admin/pages");
}
