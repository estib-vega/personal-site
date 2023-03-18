import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, content } = req.body;

  const session = await getSession({ req });
  const email = session?.user?.email;
  if (typeof email !== "string") {
    throw new Error(`Could not get author email: ${session}`);
  }
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email } },
    },
  });
  res.json(result);
}
