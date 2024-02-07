'use client'

import s from './Vacancies.module.scss';
import { vacancies } from '@/mock/vacancies';
// import { VacancyCard } from './vacancyCard/VacancyCard';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useEffect, useState } from 'react';
import { Tag } from '../tag/Tag';
import { TVacancy } from '@/mock/vacancies';
import { VacanciesList } from './VacanciesList';
import { FollowUs } from '../followUs/FollowUs';
import { VacancyCard } from './vacancyCard/VacancyCard';

import { Pagination } from '../pagination/Pagination';
import { useRouter } from 'next/router';
import { ON_PAGE } from '@/utils/constants';

export const Vacancies = () => {
  const router = useRouter();
  const jobsArray = useSelector(
    (state: RootState) => state.jobs.jobs
  );
  const filteredJobsArray = useSelector(
    (state: RootState) => state.filteredJobs.filteredJobs
  );

  const [currentJobsArray, setCurrentJobsArray] = useState(jobsArray.slice(0, ON_PAGE))

  const currentJob = useSelector(
    (state: RootState) => state.job.job
  );
  const currentPage = useSelector(
    (state: RootState) => state.currentPage.currentPage
  );

  useEffect(() => {
    setCurrentJobsArray(filteredJobsArray);
  }, [filteredJobsArray])

  // const filteredFunc = (vacancy: TVacancy) => {
  //   if (currentJob === '') {
  //     return vacancies
  //   } else if (currentJob !== '') {
  //     const filteredTitle = vacancy.title.toLowerCase().includes(currentJob.toLowerCase());
  //     const filteredTag = vacancy.tags.some(tag => {
  //       return tag === currentJob
  //     });
  //     return filteredTitle || filteredTag;
  //   }
  // }

  // const [filtered, setFiltered] = useState(
  //   vacancies.filter(filteredFunc)
  // )

  // useEffect(() => {
  // const filtered = vacancies.filter(filteredFunc)
  // setFiltered(filtered)

  // const filteredJobs = jobsArray.filter(job => {
  //   return job.fields.Tags.some(tag => tag.toLowerCase() === value.toLowerCase())
  // })

  // dispatch(setfilteredJobs(filteredJobs));
  // }, [currentJob])

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
        {
          currentJobsArray.slice(0, 2).map((vacancy => (
            <VacancyCard key={vacancy.id} cardInfo={vacancy} />
          )))
        }
        {
          currentPage === 1
          && < FollowUs mode='light' />
        }
        {
          currentJobsArray.slice(2, 15).map((vacancy => (
            <VacancyCard key={vacancy.id} cardInfo={vacancy} />
          )))
        }

      </div>

      {filteredJobsArray.length > 15 &&
        <Pagination />
      }
    </section>
  )
}
