import Airtable, { FieldSet } from "airtable";

export const getVacancies = async () => {


  Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.NEXT_PUBLIC_API_TOKEN
  });

  const base = Airtable.base('appuWSjhfaZZZfaRo');
  const records: FieldSet[] = await new Promise((resolve, reject) => {
    const fetchedJobs: FieldSet[] = [];
    base('Jobs').select({
      // maxRecords: 15,
      view: "Grid view"
    }).eachPage(function page(pageRecords, fetchNextPage) {
      pageRecords.forEach(record => {
        fetchedJobs.push(record.fields);
      });
      fetchNextPage();
    }, function done(err) {
      if (err) {
        reject(err);
      } else {
        resolve(fetchedJobs);
      }
    });
  });

  return {
    props: {
      fetchedJobs: records,
    },
  };
}