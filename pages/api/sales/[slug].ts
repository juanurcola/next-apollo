import connectDB from "db/config";
import {getSaleSlug} from "services/SaleService";

export default async function handler(req, res) {
  const {
    query: {slug},
  } = req;

  await connectDB();
  try {
    const sale = await getSaleSlug(null, {slug});

    res.status(200).json(sale);
  } catch (error) {
    res.status(400).json({success: false});
  }
}
