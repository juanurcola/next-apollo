import type {AppProps} from "next/app";

import {ApolloProvider} from "@apollo/client";
import Head from "next/head";

import {client} from "lib/apollo";

const App = ({Component, pageProps}: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>next-apollo-server-and-client</title>
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </ApolloProvider>
  );
};

export default App;
