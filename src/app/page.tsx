import { Hero } from "@/components/hero/Hero";
import { Vacancies } from "@/components/vacancies/Vacancies";
import { Suspense } from "react";


export default async function Home() {

  return (
    <main>
      <Suspense>
        <Hero />
        <Vacancies />

      </Suspense>
    </main>
  );
}


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