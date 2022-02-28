import path from "path"
import { makeSchema } from "nexus"
import * as models from "./models"

export const schema = makeSchema({
  sourceTypes: {
    modules: [{ module: ".prisma/client", alias: "PrismaClient" }],
  },
  contextType: {
    module: path.join(__dirname, "context.ts"),
    export: "Context",
  },
  outputs: {
    schema: path.join(__dirname, "generated", "schema.graphql"),
    typegen: path.join(__dirname, "generated", "typing.ts"),
  },
  types: [models],
})
