import {GraphQLError} from "graphql";

import Sale from "db/models/SaleModel";

export const getSales = async () => {
  try {
    const sales = await Sale.find({status: 1});

    return sales;
  } catch (error) {
    return error;
  }
};

export const getSaleSlug = async (_, args) => {
  try {
    console.log(args);
    const {slug} = args;
    const sale = await Sale.findOne({slug: slug});

    if (!sale) {
      throw new GraphQLError("SALE_NOT_FOUND");
    }

    return sale;
  } catch (error) {
    return error;
  }
};
