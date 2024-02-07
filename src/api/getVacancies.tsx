import { TJob } from "@/lib/types";

export const getVacancies = async () => {

  const pageSize = 100;
  let offset = '';
  let allRecords: TJob[] = [];
  try {
    let shouldFetchMore = true;
    while (shouldFetchMore) {
      const response = await fetch(`https://api.airtable.com/v0/${process.env.API_BASE_ID}/Jobs?pageSize=${pageSize}&offset=${offset}`, {
        headers: {
          Authorization: `Bearer ${process.env.API_TOKEN}`
        }
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


    return {
      props: {
        allRecords,
        uniqueTags
      }
    };
  } catch (error) {
    console.error('Error fetching records:', error);

    return {
      props: {
        allRecords: [],
        uniqueTags: [],
      }
    };
  }

}