import {GetServerSideProps} from "next";
import Link from "next/link";

import dbConnect from "server/db";
import {getSales} from "services/SaleService";
import {ISale} from "types/ISale";

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

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();
  const sales = await getSales();

  return {
    props: {
      sales: JSON.parse(JSON.stringify(sales)),
    },
  };
};
