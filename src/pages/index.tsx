'use client'

import store, { RootState } from "@/lib/store";
import { Provider, useSelector } from "react-redux";
import { Hero } from "@/components/hero/Hero";
import { Vacancies } from "@/components/vacancies/Vacancies";
import { getVacancies } from "@/api/vacancies";
import Airtable, { FieldSet } from "airtable";
import { GetServerSideProps } from 'next';

interface Props {
  fetchedJobs: FieldSet[];
}

export default function Home({ fetchedJobs }: { fetchedJobs: FieldSet[] }) {
  const currentJob = useSelector(
    (state: RootState) => state.job.job
  );
 
  console.log(currentJob)
  console.log(fetchedJobs)

  return (
    <>
      <Hero />
      <Vacancies />
    </>

  );
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
 Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: process.env.API_TOKEN
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
};



