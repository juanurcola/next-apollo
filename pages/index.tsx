import {GetStaticProps} from "next";
import Link from "next/link";

import {ISale} from "types/ISale";
import queryGraphql from "shared/query-graphql";

interface Props {
  sales: ISale[];
}

const HomePage: React.FC<Props> = ({sales}) => {
  if (!sales)
    return (
      <>
        <p>Sales not found</p>
      </>
    );

  return (
    <div>
      {sales.map((sale) => (
        <div key={sale._id}>
          <p>{sale.title}</p>
          <Link href={`/${sale.slug}`}>/{sale.slug}</Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const query = `
  query GetSales {
    sales : getSales {
      _id
      slug
      title
    }
  }`;

  const {data} = await queryGraphql(query);

  return {
    props: {
      sales: data?.sales,
    },
  };
};
