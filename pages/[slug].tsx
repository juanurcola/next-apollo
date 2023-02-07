import React from "react";
import {GetStaticPaths, GetStaticProps} from "next";

import {ISale} from "types/ISale";
import {getSales, getSaleSlug} from "services/SaleService";
// import db from "server/db";
import dbConnect from "server/db";

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
  await dbConnect();
  const sales = await getSales();

  return {
    paths: sales.map((sale) => ({params: {slug: sale.slug}})),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  await dbConnect();
  const sale = await getSaleSlug(null, {slug: params?.slug});

  return {
    props: {
      sale: JSON.parse(JSON.stringify(sale)),
    },
  };
};
