'use server'

import Airtable, { FieldSet } from "airtable";

export async function getVacancies() {
    Airtable.configure({
      endpointUrl: 'https://api.airtable.com',
      apiKey: process.env.API_TOKEN
    });
    const base = Airtable.base('appuWSjhfaZZZfaRo');
    base('Jobs').select({
      maxRecords: 15,
      view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
      const fetchedJobs: FieldSet[] = [];
      records.forEach(record => {
        fetchedJobs.push(record.fields);
      });
      fetchNextPage();
      return fetchedJobs;
    });
  };