"use server"
import prisma from "../lib/db";

export async function getcateData() {
    const data = await prisma.categories.findMany({
      orderBy: {
        createAt: "desc",
      },
    });
    return data;
  }
