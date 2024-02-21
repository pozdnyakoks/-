import { Developer } from "@/components/developer/Developer";
import { TJob } from "@/lib/types";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function DeveloperPage({ data }: { data: TJob[] }) {
  const [current, setCurrent] = useState<TJob[] | null>(null)

  useEffect(() => {

    setCurrent(data)

  }, [data])

  const makeTitle = () => {
    if (current !== null) {
      const cur = current[0].fields
      const newTitle = `${cur['Job Title + Company']} - ${cur.Location}`
      return cur["Salary Short"] ? newTitle + ` - ${cur['Salary Short']}` : newTitle
    }
  }

  return (
    <>
      <Head>
        <meta name="description"
          content={current ? current[0].fields.Details : ''} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{makeTitle()}</title>
        <meta name="title"
          content={makeTitle()} />
        <meta property="og:title" content={makeTitle()} />
        <meta name="twitter:title" content={makeTitle()} />
          <meta property="og:description" content={current ? current[0].fields.Details : ''} />
          <meta property="og:image" content="https://cosmos-sandy.vercel.app/og.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="https://cosmos-sandy.vercel.app/" />
          <meta property="twitter:url" content="https://cosmos-sandy.vercel.app/" />
          <meta name="twitter:description" content={current ? current[0].fields.Details : ''} />
          <meta name="twitter:image" content="" />
      </Head>
      <Developer job={current === null ? null : current[0]} />
    </>
  )
}


export async function getServerSideProps(context: GetServerSidePropsContext) {

  try {
    const jobId = context.params?.jobId || '';
    const id = typeof jobId !== 'object' ? jobId.split('-').pop() : jobId[0];
    const filterByFormula = `{Job ID} = ${id}`;

    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.API_BASE_ID}/Jobs?filterByFormula=${filterByFormula}`, {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`
      }
    });
    const data = await response.json();

    return {
      props: {
        data: data.records
      }
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        data: null,
        error: 'Error fetching data'
      }
    };
  }
}