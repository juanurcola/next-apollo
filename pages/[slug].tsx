import React from "react";
import {GetStaticPaths, GetStaticProps} from "next";

import {ISale} from "types/ISale";
import queryGraphql from "shared/query-graphql";

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

export const getStaticProps: GetStaticProps = async ({params}) => {
  const query = `
  query GetSaleSlug($slug: String!) {
    sale: getSaleSlug(slug: $slug) {
      _id
      slug
      title
    }
  }
  `;
  const {data} = await queryGraphql(query, {slug: params?.slug});

  return {
    props: {
      sale: data?.sale,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const query = `
  query GetSales {
    sales : getSales {
      _id
      slug
      title
    }
  }`;

  const {data} = (await queryGraphql(query)) as {data: {sales: ISale[]}};

  return {
    paths: data.sales.map((sale) => ({params: {slug: sale.slug}})),
    fallback: "blocking",
  };
};
