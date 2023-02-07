import React from "react";
import {GetStaticPaths, GetStaticProps} from "next";

import {ISale} from "types/ISale";
import {getSales, getSaleSlug} from "services/SaleService";
import db from "server/db";

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
  await db.connect();
  const sales = await getSales();

  //await db.disconnect();

  return {
    paths: sales.map((sale) => ({params: {slug: sale.slug}})),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  await db.connect();
  const sale = await getSaleSlug(null, {slug: params?.slug});

  //await db.disconnect();

  return {
    props: {
      sale: JSON.parse(JSON.stringify(sale)),
    },
    revalidate: 10,
  };
};
