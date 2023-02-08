import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_URL_SITE}/api/graphql`,
  credentials: "same-origin",
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
