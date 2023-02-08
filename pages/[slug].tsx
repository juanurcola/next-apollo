import React from "react";
import {GetStaticPaths, GetStaticProps} from "next";

import {ISale} from "types/ISale";

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
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_SITE}/api/sales`);
  const sales = await res.json();

  return {
    paths: sales.map((sale) => ({params: {slug: sale.slug}})),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({params}) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_SITE}/api/sales/${params?.slug}`);
  const sale = await res.json();

  return {
    props: {
      sale: sale,
    },
  };
};
