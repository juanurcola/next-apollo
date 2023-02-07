import mongoose, {Schema} from "mongoose";

import {ISale} from "types/ISale";

mongoose.Promise = global.Promise;

export const SaleSchema = new Schema<ISale>({
  status: {type: Number, default: -1},
  slug: {type: String, required: true},
  title: {type: String, required: true},
});

export default mongoose.models.Sale || mongoose.model("Sale", SaleSchema);
