import type { NextApiRequest, NextApiResponse } from 'next'
import { API_ROUTES } from '../../../constants/constants';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
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
}
