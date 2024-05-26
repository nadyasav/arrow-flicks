import type { NextApiRequest, NextApiResponse } from 'next'
import { API_ROUTES } from '../../../constants/constants';
import axios from 'axios';
import { z } from 'zod';
import { Language, RELEASE_YEAR_START, SortByKeysEnum } from '../../../types/types';

const schema = z.object({
  language: z.literal(Language.EN).optional(),
  with_genres: z.string().regex(/^[0-9]+(,[0-9]+)*$/).optional(),
  primary_release_year: z.coerce.number().int().min(RELEASE_YEAR_START).max(new Date().getFullYear()).optional(),
  'vote_average.lte': z.coerce.number().int().min(0).max(10).optional(),
  'vote_average.gte': z.coerce.number().int().min(0).max(10).optional(),
  sort_by: z.nativeEnum(SortByKeysEnum).optional(),
  page: z.coerce.number().int().min(1).max(500).optional(),
}).strict().optional();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = `${API_ROUTES.MOVIES}?api_key=${process.env.API_KEY}`;

  try {
    const data = schema.parse(req.query);

    axios.get(url, { params: data })
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
