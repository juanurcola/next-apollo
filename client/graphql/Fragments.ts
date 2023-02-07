import {gql} from "@apollo/client";

export const SALE_FIELDS = gql`
  fragment SaleFields on Sale {
    _id
    slug
    title
  }
`;
