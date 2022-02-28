import { nonNull, objectType, queryField, intArg } from "nexus";
import * as Prisma from "nexus-prisma";

export const Post = objectType({
  name: Prisma.Post.$name,
  description: Prisma.Post.$description,
  definition: (t) => {
    t.field(Prisma.Post.id);
    t.field(Prisma.Post.title);
    t.field(Prisma.Post.content);
    t.field(Prisma.Post.author);
    t.field(Prisma.Post.published);
    t.field(Prisma.Post.viewCount);
  },
});

export const getPostById = queryField("getPostById", {
  type: Post,
  args: {
    id: nonNull(intArg()),
  },
  resolve: (parent, args, ctx) => {
    return ctx.prisma.post.findUnique({ where: { id: args.id } });
  },
});
