import type { NextApiRequest, NextApiResponse } from 'next'
import { API_ROUTES } from '../../../constants/constants';
import axios from 'axios';
import { z } from 'zod';

const schema = z.object({
  id: z.preprocess((id) => parseInt(String(id)), z.number())
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = schema.parse(req.query);

    const { id } = data;
    const url = `${API_ROUTES.MOVIE}/${id}?api_key=${process.env.API_KEY}`;

    axios.get(url, { params: req.query })
    .then((resObj) => {
      res.status(resObj.status).json(resObj.data);
    })
    .catch((error) => {
      if(error.response) {
        res.status(error.response.status).json(error.response.data);
      } else {
        res.status(500).json({ error: 'failed to fetch data' });
      }
    });
  } catch(e) {
    return res.status(400).json({ error: 'invalid query params' });
  }
}
