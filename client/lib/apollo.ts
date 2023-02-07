import {ApolloClient, HttpLink, InMemoryCache, from} from "@apollo/client";
import {onError} from "@apollo/client/link/error";

import {ERROR} from "i18n/constants";

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) {
    const error = graphQLErrors[0];
    const message = ERROR[error.message] ? `Error! ${ERROR[error.message]}` : ERROR["_DEFAULT"];

    console.log(message);
  }

  if (networkError) {
    console.log(ERROR["_NETWORK_ERROR"]);
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
