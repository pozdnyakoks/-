'use client'

import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { Hero } from "@/components/hero/Hero";
import { Vacancies } from "@/components/vacancies/Vacancies";
import { setTags } from "@/lib/slices/tagsSlice";
import { setJobs } from "@/lib/slices/jobsSlice";

import { GetServerSideProps } from 'next';

import { TJob } from "@/lib/types";
import { setfilteredJobs } from "@/lib/slices/filteredJobsSlice";
import { useEffect } from "react";

interface Props {
  allRecords: TJob[];
  uniqueTags: string[];
}

export default function Home() {

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/jobs'); // Отправляем HTTP запрос к API роуту
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const {allRecords, uniqueTags} = await response.json(); // Получаем данные из ответа
         // Выводим данные в консоль
          dispatch(setTags(uniqueTags));
          dispatch(setJobs(allRecords))
          dispatch(setfilteredJobs(allRecords))
        // Далее можете использовать данные в вашем компоненте или функции
      } catch (error) {
        console.error('Error fetching data:', error);
        // Обработка ошибок
      }
    };
    
    // Вызываем функцию для получения данных
    fetchData();
  }, [])




  return (
    <>
      <Hero />
      <Vacancies />
    </>
  );
}



