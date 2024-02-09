import { NextApiRequest, NextApiResponse } from 'next';
import { TJob } from '@/lib/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


  try {
      const response = await fetch(`https://api.airtable.com/v0/${process.env.API_BASE_ID}/Jobs?`, {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`
        }
      });
      const record = await response.json();

  
    res.status(200).json({ record });
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ error: 'Error fetching records' });
  }
}