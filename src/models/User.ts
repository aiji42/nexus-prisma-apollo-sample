import { nonNull, objectType, queryField, stringArg } from "nexus";
import * as Prisma from "nexus-prisma";

export const User = objectType({
  name: Prisma.User.$name,
  description: Prisma.User.$description,
  definition: (t) => {
    t.field(Prisma.User.id);
    t.field(Prisma.User.email);
    t.field(Prisma.User.posts);
  },
});

export const getUserByEmail = queryField("getUserByEmail", {
  type: User,
  args: {
    email: nonNull(stringArg()),
  },
  resolve: (parent, args, ctx) => {
    return ctx.prisma.user.findUnique({ where: { email: args.email } });
  },
});
