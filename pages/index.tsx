import {GetServerSideProps} from "next";

import {ISale} from "types/ISale";
import {client} from "lib/apollo";
import Queries from "client/graphql/Queries";

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
    <>
      <pre>
        <code>{JSON.stringify(sales, null, 4)}</code>
      </pre>
    </>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async () => {
  const {data} = await client.query({query: Queries.GET_SALES, fetchPolicy: "no-cache"});

  return {
    props: {
      sales: data.sales,
    },
  };
};
