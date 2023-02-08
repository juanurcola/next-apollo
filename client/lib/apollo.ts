import {ApolloClient, HttpLink, InMemoryCache, from} from "@apollo/client";
import {onError} from "@apollo/client/link/error";

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    console.log(graphQLErrors);
  }

  if (networkError) {
    console.log(networkError);
  }
});

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_URL_SITE}/api/graphql`,
  credentials: "same-origin",
});

export const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
