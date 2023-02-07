import React from "react";
import {GetStaticPaths, GetStaticProps} from "next";

import {ISale} from "types/ISale";
import {client} from "lib/apollo";
import Queries from "client/graphql/Queries";

interface Props {
  sale: ISale;
}

const SalePage: React.FC<Props> = ({sale}) => {
  if (!sale)
    return (
      <>
        <p>Sale not found</p>
      </>
    );

  return (
    <>
      <pre>
        <code>{JSON.stringify(sale, null, 4)}</code>
      </pre>
    </>
  );
};

export default SalePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const {data} = await client.query({query: Queries.GET_SALES, fetchPolicy: "no-cache"});

  return {
    paths: data.sales.map((sale) => ({params: {slug: sale.slug}})),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const {data} = await client.query({
    query: Queries.GET_SALE_SLUG,
    variables: {slug: params?.slug},
    fetchPolicy: "no-cache",
  });

  return {
    props: {
      sale: data.sale,
    },
    revalidate: 10,
  };
};
