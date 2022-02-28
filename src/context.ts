import { ContextFunction } from "apollo-server-core"
import { FastifyReply, FastifyRequest } from "fastify"
import { PrismaClient } from "@prisma/client"

type FastifyContext = { request: FastifyRequest; reply: FastifyReply }

export interface Context extends FastifyContext {
  prisma: PrismaClient
}

const prisma = new PrismaClient()

export const createContext: ContextFunction<FastifyContext, Context> = (ctx) => {
  return { ...ctx, prisma }
}
