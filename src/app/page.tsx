import { Hero } from "@/components/hero/Hero";
import { Vacancies } from "@/components/vacancies/Vacancies";
import { Suspense } from "react";
import { getVacancies } from "./api/getVacancies";
import { Loading } from "@/components/loading";

const getData = async () => {
  const response = await getVacancies();
  const { allRecords, uniqueTags } = response.props;
  return {
    allRecords,
    uniqueTags
  };
};

// export async function load() {
//   const data = await getVacancies();
//   return { data };
// }

export default function Home() {
  return (
    <main>
      <Suspense>

        <Hero />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <VacanciesWrapper />
      </Suspense>
    </main>
  );
}

async function VacanciesWrapper() {
  const data = await getData();
  return <Vacancies data={data} />;
}


// import { Hero } from "@/components/hero/Hero";
// import { Vacancies } from "@/components/vacancies/Vacancies";
// import { Suspense } from "react";
// import { getVacancies } from "./api/getVacancies";
// import { Loading } from "@/components/loading";
// import dynamic from 'next/dynamic'
// // const Vacancies = dynamic(
// //   () => import('./../components/vacancies/Vacancies'), {
// //     ssr: false,
// // })

// const getData = async () => {
//   const response = await getVacancies();
//   const { allRecords, uniqueTags } = response.props;
//   return {
//     allRecords,
//     uniqueTags
//   }
// }



// export async function load() {
//   const data = await getVacancies();
//   return { data };
// }

// export default async function Home() {

//   const data = await getData();
//   // console.log(data.uniqueTags)

//   return (
//     <Suspense fallback={<Loading />}>
//       <main>
//         {/* <Suspense> */}
//         <Hero />
//         {/* </Suspense> */}
//         <Vacancies data={data} />

//       </main>
//     </Suspense>
//   );
// }


{/* <Head>
  <meta name="description"
    content="Find jobs and talents in Cosmos Blockchain" />
  <meta name="title"
    content="Jobs in Cosmos Blockchain" />

  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Jobs in Cosmos Blockchain</title>
  <meta property="og:url" content="https://cosmos-sandy.vercel.app/" />
  <meta property="og:title" content="Jobs in Cosmos Blockchain" />
  <meta property="og:description" content="Find jobs and talents in Cosmos Blockchain" />
  <meta property="og:image" content="https://cosmos-sandy.vercel.app/og.png" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="https://cosmos-sandy.vercel.app/" />
  <meta property="twitter:url" content="https://cosmos-sandy.vercel.app/" />
  <meta name="twitter:title" content="Jobs in Cosmos Blockchain" />
  <meta name="twitter:description" content="Find jobs and talents in Cosmos Blockchain" />
  <meta name="twitter:image" content="" />
</Head> */}