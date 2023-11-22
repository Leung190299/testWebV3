// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getListProduct } from '@/services/product/product';
import type { Model } from '@/types/model';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  data: Model.Product[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const limit = Number(req.query.limit);
  res.status(200).json({ data: await getListProduct({ limit: isNaN(limit) ? 10 : limit }) });
}
