'use client'

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Tag } from '../tag/Tag';
import { FollowUs } from '../followUs/FollowUs';
import { VacancyCard } from './vacancyCard/VacancyCard';
import { Pagination } from '../pagination/Pagination';
import { RootState } from '@/lib/store';
import { Loading } from '@/pages/loading';
import { ON_PAGE } from '@/utils/constants';
import { TJob } from '@/lib/types';
import s from './Vacancies.module.scss';

export const Vacancies = () => {

  const router = useRouter();
  const jobsArray = useSelector((state: RootState) => state.jobs.jobs);
  const isFetched = useSelector((state: RootState) => state.isFetched.isFetched);

  const filtering = (arr: TJob[]) => {
    return arr.slice(
      currentPage === 1 ? 0 : (currentPage * ON_PAGE) - ON_PAGE,
      currentPage === 1 ? ON_PAGE : (currentPage * ON_PAGE)
    );
  };

  const [isLoading, setIsLoading] = useState(!isFetched);
  const [currentTag, setCurrentTag] = useState<string | string[]>(router.query.tag || '');
  const [currentPage, setCurrentPage] = useState<number>(
    router.query.page ? Number(router.query.page) : 1
  );
  const [filteredArray, setFilteredArray] = useState<TJob[]>(jobsArray);
  const [currentJobsArray, setCurrentJobsArray] = useState<TJob[]>([]);

  useEffect(() => {

    setCurrentPage(router.query.page ? Number(router.query.page) : 1);
    setCurrentTag(router.query.tag || '');

    const queryTag: string | string[] = router.query.tag || '';
    const filteredByTag = jobsArray.filter(job => {
      if (typeof queryTag === 'string') {
        return queryTag !== '' ?
          job.fields.Tags.some(tag => tag.toLowerCase() === queryTag.toLowerCase()) :
          true;
      } else {
        return queryTag.length > 0 ?
          job.fields.Tags.some(tag => queryTag.includes(tag.toLowerCase())) :
          true;
      }
    });

    setFilteredArray(filteredByTag);
  }, [router.query, jobsArray]);

  useEffect(() => {
    setCurrentJobsArray(filtering(filteredArray));
  }, [currentPage, filteredArray]);

  useEffect(() => {
    if (isFetched) setIsLoading(false)
  }, [isFetched])



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

      {isLoading ? <Loading /> : <div className={s.vacancies}>

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

      </div>}

      {filteredArray.length > 15 &&
        <Pagination />
      }
    </section>
  )
}
