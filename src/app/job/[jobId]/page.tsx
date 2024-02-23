import { Developer } from "@/components/developer/Developer";
import { TJob } from "@/lib/types";
import { Metadata } from "next";


const getData = async (param: string) => {
  const jobId = param;
  const id = typeof jobId !== 'object' ? jobId.split('-').pop() : jobId[0];
  const filterByFormula = `{Job ID} = ${id}`;

  const response = await fetch(
    `https://api.airtable.com/v0/${process.env.API_BASE_ID}/Jobs?filterByFormula=${filterByFormula}`, {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`
    }
  });
  const data = await response.json();

  const cur = data.records[0].fields
  return {
    props: {
      data: data.records,
      title: `${cur['Job Title + Company']} - ${cur.Location}`
    }
  }

}


const makeTitle = (current: TJob[] | null) => {
  if (current !== null && current !== undefined) {
    const cur = current[0].fields
    const newTitle = `${cur['Job Title + Company']} - ${cur.Location}`
    return cur["Salary Short"] ? newTitle + ` - ${cur['Salary Short']}` : newTitle
  }
}

type Props = {
  params: { jobId: string }
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const id = params.jobId
  const data = await getData(id);

  return {
    title: makeTitle(data.props.data),
    description: data.props.data[0].fields.Details
  }
}

export default async function DeveloperPage({ params }: Props) {

  const { props: { data } } = await getData(params.jobId);

  return (
    <>
      <Developer job={(data !== undefined && data !== null) ? data[0] : null} />
    </>

  )
}

// console.log(data[0]);

// return (
//   <div style={{ color: 'white'}}>{params.jobId}</div>
// )
{/* <Head>
  <meta name="description"
    content={data ? data[0].fields.Details : ''} />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{makeTitle(data)}</title>
  <meta name="title"
    content={makeTitle(data)} />
  <meta property="og:title" content={makeTitle(data)} />
  <meta name="twitter:title" content={makeTitle(data)} />
  <meta property="og:description" content={data ? data[0].fields.Details : ''} />
  <meta property="og:image" content="https://cosmos-sandy.vercel.app/og.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="https://cosmos-sandy.vercel.app/" />
  <meta property="twitter:url" content="https://cosmos-sandy.vercel.app/" />
  <meta name="twitter:description" content={data ? data[0].fields.Details : ''} />
  <meta name="twitter:image" content="" />
</Head> */}