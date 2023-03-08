// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { Task } from "../../../types";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const prisma = new PrismaClient();

type Data = {
  message: string;
};

export async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Task | Data>
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
  }
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in" });
    return;
  }
  const task = JSON.parse(req.body);

  const userId = await prisma.user.findUnique({
    where: {
      email: session.user?.email!,
    },
    select: {
      id: true,
    },
  });

  const todo = {
    task: task,
    createdAt: new Date(),
    userId: userId!.id,
  };

  const todoAdded = await prisma.toDo.create({ data: todo });

  res.json(todoAdded);
}

export default handler;
