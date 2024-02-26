import { NextApiRequest, NextApiResponse } from 'next';
import { TJob } from '@/lib/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const pageSize = 100;
  let offset = '';
  let allRecords: TJob[] = [];
  let shouldFetchMore = true;
  try {
    while (shouldFetchMore) {
      const response = await
        fetch(
          `https://api.airtable.com/v0/${process.env.API_BASE_ID}/Jobs?pageSize=${pageSize}&offset=${offset}&sortField=Job%20ID&sortDirection=desc`, {
          headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`
          },
          next: {revalidate: 1}
        });
      const data = await response.json();
      allRecords = allRecords.concat(data.records);
      offset = data.offset;
      if (!data.offset) {
        shouldFetchMore = false;
      }
    }

    const uniqueTags = allRecords.reduce<string[]>((tags, record) => {
      if (record.fields.Tags) {
        tags.push(...record.fields.Tags);
      }
      return tags;
    }, []).filter((tag, index, array) => array.indexOf(tag) === index).sort();

    res.status(200).json({ allRecords, uniqueTags });
  } catch (error) {
    console.error('Error fetching records:', error);
    res.status(500).json({ error: 'Error fetching records' });
  }
}