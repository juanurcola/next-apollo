import {gql} from "@apollo/client";

import {SALE_FIELDS} from "./Fragments";

const GET_SALES = gql`
  query GetSales {
    sales: getSales {
      ...SaleFields
    }
  }
  ${SALE_FIELDS}
`;

const GET_SALE_SLUG = gql`
  query GetSaleSlug($slug: String!) {
    sale: getSaleSlug(slug: $slug) {
      ...SaleFields
    }
  }
  ${SALE_FIELDS}
`;

export default {
  GET_SALE_SLUG,
  GET_SALES,
};
