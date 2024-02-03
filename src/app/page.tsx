'use client'

import { Hero } from "./components/hero/Hero";
import store from "@/lib/store";
import { Provider } from 'react-redux';
import { Vacancies } from "./components/vacancies/Vacancies";

export default function Home() {
  return (
    <Provider store={store}>
      <main >
        <Hero />
        <Vacancies />
      </main>
    </Provider>
  );
}