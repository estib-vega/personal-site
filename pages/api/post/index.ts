import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import * as Auth from "../../../lib/auth";
import prisma from "../../../lib/prisma";
import * as Session from "../../../lib/session";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { title, content } = req.body;

  const session = await getServerSession(req, res, Auth.authOptions);
  const sessionValidity = Session.validateSession(session);

  if (sessionValidity !== Session.SessionValidity.Admin) {
    res.status(401).json({ message: "Unauthorized to create post" });
    return;
  }

  const email = session?.user?.email;
  if (!email) {
    throw new Error(`Session validated but email is undefined ${session}`);
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
