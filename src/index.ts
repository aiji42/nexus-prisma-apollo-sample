import { ApolloServer } from "apollo-server-fastify"
import fastify from "fastify"
import { schema } from "./schema"
import { createContext } from "./context"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import { GraphQLSchema } from "graphql"

const server = new ApolloServer({
  context: createContext,
  schema: schema as unknown as GraphQLSchema,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
})

const app = fastify()

const port = process.env.PORT || "3000"

;(async function () {
  await server.start()
  app.register(
    server.createHandler({
      path: "/graphql",
    })
  )
  await app.listen(port, "0.0.0.0", (err, address) => {
    if (err) throw err
    console.log(`🚀 Server ready at ${address}${server.graphqlPath}`)
  })
})()
