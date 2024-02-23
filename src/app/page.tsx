import { Hero } from "@/components/hero/Hero";
import { Vacancies } from "@/components/vacancies/Vacancies";
import { Suspense, useMemo } from "react";
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

export default function Home() {

  
  return (
    <main>
      <Suspense>
        <Hero />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <VacanciesWrapper  />
      </Suspense>
    </main>
  );
}

async function VacanciesWrapper() {
  const data = await getData();
  return <Vacancies data={data}   />;
}

