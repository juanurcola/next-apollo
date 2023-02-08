// import {PageConfig} from "next";
import {ApolloServer} from "@apollo/server";
import {startServerAndCreateNextHandler} from "@as-integrations/next";
import {makeExecutableSchema} from "@graphql-tools/schema";
import {NextApiRequest, NextApiResponse} from "next";

import typeDefs from "server/graphql/schemas";
import resolvers from "server/graphql/resolvers";
import connectDB from "db/config";

connectDB();

type Context = {
  req: NextApiRequest;
  res: NextApiResponse;
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer<Context>({schema});

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => ({req, res}),
});
