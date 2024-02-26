import { TJob } from "@/lib/types";

let cachedData: { props: { allRecords: TJob[]; uniqueTags: string[] } } | null = null;

export const getVacancies = async () => {

  if (cachedData) return cachedData

  const pageSize = 100;
  let offset = '';
  let allRecords: TJob[] = [];
  let shouldFetchMore = true;
  while (shouldFetchMore) {
    const response = await fetch(`https://api.airtable.com/v0/${process.env.NEXT_PUBLIC_API_BASE_ID}/Jobs?pageSize=${pageSize}&offset=${offset}&sortField=Job%20ID&sortDirection=desc`, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
      },
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
  }, []).filter((tag, index, array) => array.indexOf(tag) === index).sort()

  cachedData = {
    props: {
      allRecords,
      uniqueTags
    }
  }

  return cachedData
}