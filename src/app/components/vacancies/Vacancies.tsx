'use client'

import s from './Vacancies.module.scss';
import { vacancies } from '@/mock/vacancies';
import { VacancyCard } from './vacancyCard/VacancyCard';
import { FollowUs } from '../followUs/FollowUs';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useEffect, useState } from 'react';

export const Vacancies = () => {

  const currentJob = useSelector(
    (state: RootState) => state.job.job
  );

  const [filtered, setFiltered] = useState(vacancies.filter(vacancy => currentJob === '' ? vacancies : vacancy.title.toLowerCase().includes(currentJob.toLowerCase())))

  useEffect(() => {
    setFiltered(vacancies.filter(vacancy => currentJob === '' ? vacancies :  vacancy.title.toLowerCase().includes(currentJob.toLowerCase())))
  }, [currentJob])



  return (
    <section className='container'>
      <p className={s.vacancies__title}>
        {currentJob === '' ? 'All' : currentJob} jobs, All locations
      </p>
      <div className={s.vacancies}>
        {filtered.slice(0, 2).map((vacancy => (
          <VacancyCard key={vacancy.date} cardInfo={vacancy} />
        )))}
        <FollowUs mode='light' />
        {filtered.slice(2).map((vacancy => (
          <VacancyCard key={vacancy.date} cardInfo={vacancy} />
        )))}

      </div>
    </section>
  )
}