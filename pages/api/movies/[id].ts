import type { NextApiRequest, NextApiResponse } from 'next'
import { API_ROUTES } from '../../../constants/constants';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query
    const url = `${API_ROUTES.MOVIE}/${id}?api_key=${process.env.API_KEY}`;
    let statusCode = 200;
    try {
        const resObj = await fetch(url)
          .then(resData => {
            statusCode = resData.status;
            return resData.json();
          });
        res.status(statusCode).json(resObj);
    } catch (error) {
        res.status(500).json({ error: 'failed to fetch data' });
    }
}
