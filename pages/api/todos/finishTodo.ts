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
  if (req.method !== "PUT") {
    res.status(405).json({ message: "Method not allowed" });
  }
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "You must be logged in" });
    return;
  }
  const id = JSON.parse(req.body);

  await prisma.toDo.delete({
    where: {
      id: id,
    },
  });

  res.status(200).json({ message: "Todo updated!" });
}

export default handler;
