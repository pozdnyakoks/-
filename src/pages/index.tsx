'use client'

import store from "@/lib/store";
import { Provider } from "react-redux";
import { Hero } from "@/components/hero/Hero";
import { Vacancies } from "@/components/vacancies/Vacancies";
import { getVacancies } from "@/api/vacancies";

export default function Home() {
  // getVacancies();

  return (
    <Provider store={store}>
        <Hero />
        <Vacancies />
    </Provider>
  );
}



