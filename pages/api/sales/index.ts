import connectDB from "db/config";
import {getSales} from "services/SaleService";

export default async function handler(_, res) {
  await connectDB();

  try {
    const sales = await getSales();

    res.status(200).json(sales);
  } catch (error) {
    res.status(400).json({success: false});
  }
}
