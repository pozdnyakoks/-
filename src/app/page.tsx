import { Suspense } from "react";
import { Hero } from "@/components/hero/Hero";
import { Vacancies } from "@/components/vacancies/Vacancies";
import { Loading } from "@/components/loading";
import { getVacancies } from "./api/getVacancies";

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
        <VacanciesWrapper />
      </Suspense>
    </main>
  );
}

async function VacanciesWrapper() {
  const data = await getData();
  return <Vacancies data={data} />;
}

