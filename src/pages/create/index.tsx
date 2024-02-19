import { PostJob } from "@/components/postJob/PostJob";
import Head from "next/head";

export default function Create() {
  return (
    <>
      <Head>
        <title>Post a Job</title>
      </Head>
      <PostJob />
    </>
  )
}

// import type { NextApiRequest, NextApiResponse } from 'next'

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {

//   try {
//       const response = await fetch(`https://api.airtable.com/v0/${process.env.API_BASE_ID}/Jobs`, {
//         headers: {
//           Authorization: `Bearer ${process.env.API_TOKEN}`,
//           'Content-Type': "application/json"
//         },
//         body: req.body
//       });
//       const data = await response.json();
  
//     res.status(200).json(data);
//   } catch (error) {
//     console.error('Error posting a job:', error);
//     res.status(500).json({ error: 'Error posting a job' });
//   }
// }