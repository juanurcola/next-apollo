import {mergeTypeDefs} from "@graphql-tools/merge";

import sales from "./SaleSchema";

const types = [sales];

export default mergeTypeDefs(types);
