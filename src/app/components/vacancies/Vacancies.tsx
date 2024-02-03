'use client'

import s from './Vacancies.module.scss';
import { vacancies } from '@/mock/vacancies';
import { VacancyCard } from './vacancyCard/VacancyCard';
import { FollowUs } from '../followUs/FollowUs';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useEffect, useState } from 'react';
import { Tag } from '../tag/Tag';
import { TVacancy } from '@/mock/vacancies';

export const Vacancies = () => {

  const currentJob = useSelector(
    (state: RootState) => state.job.job
  );

  const filteredFunc = (vacancy: TVacancy) => {
    if (currentJob === '') {
      return vacancies
    } else if (currentJob !== '') {
      const filteredTitle = vacancy.title.toLowerCase().includes(currentJob.toLowerCase());
      const filteredTag = vacancy.tags.some(tag => {
        return tag === currentJob
      });
      return filteredTitle || filteredTag;
    }
  }

  const [filtered, setFiltered] = useState(
    vacancies.filter(filteredFunc)
  )

  useEffect(() => {
    const filtered = vacancies.filter(filteredFunc)
    setFiltered(filtered)
  }, [currentJob])



  return (
    <section className={`${s.container} container`}>
      <p className={s.vacancies__title}>
        {currentJob === '' ? 'All' : currentJob} jobs, All locations
      </p>
      {currentJob !== '' &&
        <div className={s.vacancies__tag}>
          <Tag value={currentJob} />
        </div>
      }
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