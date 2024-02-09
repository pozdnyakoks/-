'use client'

import s from './Vacancies.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useEffect, useState } from 'react';
import { Tag } from '../tag/Tag';
import { FollowUs } from '../followUs/FollowUs';
import { VacancyCard } from './vacancyCard/VacancyCard';
import { Pagination } from '../pagination/Pagination';
import { ON_PAGE } from '@/utils/constants';
import { useRouter } from 'next/router';
import { TJob } from '@/lib/types';

export const Vacancies = () => {
  const router = useRouter();
  const jobsArray = useSelector(
    (state: RootState) => state.jobs.jobs
  );
  const filtering = (arr: TJob[]) => {
    return arr.slice(
      currentPage === 1 ? 0 : (currentPage * ON_PAGE) - ON_PAGE,
      currentPage === 1 ? ON_PAGE : (currentPage * ON_PAGE))
  }
// console.log(jobsArray)
  const [currentTag, setCurrentTag] = useState(router.query.tag === undefined ? '' : router.query.tag)
  const [currentPage, setCurrentPage] = useState(router.query.page === undefined ? 1 : Number(router.query.page))
  const [filteredArray, setFilteredArray] = useState(jobsArray)
  const [currentJobsArray, setCurrentJobsArray] = useState(filtering(filteredArray))

  useEffect(() => {
    setCurrentPage(router.query.page === undefined ? 1 : Number(router.query.page))
    setCurrentTag(router.query.tag === undefined ? '' : router.query.tag)
  }, [router.query])

  useEffect(() => {
    const queryTag = router.query.tag === undefined ? '' : typeof router.query.tag === 'object' ? router.query.tag[0] : router.query.tag;

    if (queryTag !== '') {
      const filteredByTag = jobsArray.filter(job =>  job.fields.Tags.some(tag => tag.toLowerCase() === queryTag.toLowerCase()))
      setFilteredArray(filteredByTag);
      setCurrentJobsArray(filtering(filteredByTag));
    }
    if (queryTag === '') {
      setFilteredArray(jobsArray)
      setCurrentJobsArray(jobsArray)
    }
  }, [router.query])

  useEffect(() => {
    setFilteredArray(jobsArray)
    setCurrentJobsArray(jobsArray)
  }, [jobsArray])


  return (
    <section className={`${s.container} container`}>
      <p className={s.vacancies__title}>
        {currentTag === '' ? 'All' : currentTag} jobs, All locations
      </p>
      {currentTag !== '' &&
        <div className={s.vacancies__tag}>
          <Tag value={typeof currentTag === 'object' ? currentTag[0] : currentTag} />
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

      {filteredArray.length > 15 &&
        <Pagination />
      }
    </section>
  )
}
