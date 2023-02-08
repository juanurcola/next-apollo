import {makeExecutableSchema} from "@graphql-tools/schema";
import {graphql} from "graphql";

import typeDefs from "server/graphql/schemas";
import resolvers from "server/graphql/resolvers";
import connectDB from "db/config";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default async function queryGraphql(query, variableValues = {}) {
  await connectDB();
  const data = await graphql({schema, source: query, variableValues});

  return data || {};
}
