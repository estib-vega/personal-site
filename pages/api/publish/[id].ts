import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

// PUT /api/publish/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id;
  if (postId === undefined || Array.isArray(postId)) {
    throw new Error(`Invalid postId submitted: ${postId}`);
  }
  const post = await prisma.post.update({
    where: { id: postId },
    data: { published: true },
  });
  res.json(post);
}
