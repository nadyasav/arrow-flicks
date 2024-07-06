import type { NextApiRequest, NextApiResponse } from 'next'
import { API_ROUTES } from '../../../constants/constants';
import axios from 'axios';
import { z } from 'zod';
import { appendToResponse } from '../../../types/types';

const schema = z.object({
  id: z.preprocess((id) => parseInt(String(id)), z.number()),
  append_to_response: z.nativeEnum(appendToResponse).optional()
}).strict();

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
        res.status(500).json({ status_code: 500, status_message: 'failed to fetch data' });
      }
    });
  } catch(e) {
    return res.status(404).json({ status_code: 404, status_message: 'Not found' });
  }
}
