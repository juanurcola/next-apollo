import {getSales, getSaleSlug} from "services/SaleService";

export const saleResolvers = {
  Query: {
    getSales,
    getSaleSlug,
  },
};
