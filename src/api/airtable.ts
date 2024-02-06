// import { NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';
// // import Airtable, { FieldSet } from 'airtable';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   // Ваш токен авторизации для Airtable
//   const AIRTABLE_API_KEY = process.env.API_TOKEN;

//   // Идентификатор вашей базы данных в Airtable
//   const AIRTABLE_BASE_ID = process.env.API_BASE_ID;

//   // URL для запросов к Airtable API
//   const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Jobs`;

//   // Обработка запросов методом GET
//   if (req.method === 'GET') {
//     try {
//       const response = await axios.get(AIRTABLE_URL, {
//         headers: {
//           Authorization: `Bearer ${AIRTABLE_API_KEY}`,
//         },
//       });
//       if (res.status(200)) return (response.data);
//     } catch (error) {
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   } else {
//     // Обработка других методов (POST, PUT, DELETE) по желанию
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }


  // Airtable.configure({
  //         endpointUrl: 'https://api.airtable.com',
  //         apiKey: AIRTABLE_API_KEY
  //       });
  //       const base = Airtable.base(AIRTABLE_BASE_ID || '0');
  //       base('Jobs').select({
  //         // Selecting the first 3 records in Grid view:
  //         maxRecords: 15,
  //         view: "Grid view"
  //       }).eachPage(function page(records) {
  //         const fetchedJobs: FieldSet[] = [];
  //         records.forEach(record => {
  //           fetchedJobs.push(record.fields);
  //         });

  //         return fetchedJobs;
  //         // setJobs(prevJobs => [...prevJobs, ...fetchedJobs]);
  //         // fetchNextPage();
  //       });
  //     };
