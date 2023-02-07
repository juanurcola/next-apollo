import {saleResolvers} from "./SaleResolver";

const resolvers = {
  Query: {
    ...saleResolvers.Query,
  },
};

export default resolvers;
