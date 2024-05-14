import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import { API_ROUTES } from '../../constants/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = `${API_ROUTES.GENRES}?api_key=${process.env.API_KEY}`;

  axios.get(url)
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
}
