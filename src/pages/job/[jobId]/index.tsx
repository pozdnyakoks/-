import { Developer } from "@/components/developer/Developer";
import { RootState } from "@/lib/store";
import { TJob } from "@/lib/types";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function DeveloperPage({ data }: { data: TJob[] }) {
  const [current, setCurrent] = useState<TJob[]>([])

  useEffect(() => {
     setCurrent(data)
  }, [data])

  // console.log(current)


  return (
    <Developer job={current[0]} />
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