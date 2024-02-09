import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { ON_PAGE, mobile } from '@/utils/constants';
import { createNumbersArray } from '@/lib/createNumbersArray';
import { createMobileNumbersArray } from '@/lib/createMobileNumbersArray';
import { useGetWindowDimensions } from '@/utils/use-get-window-dimensions';
import s from './Pagination.module.scss';

export const Pagination = () => {
  const router = useRouter();
  const { width } = useGetWindowDimensions();
  const isMobile = width < mobile
  const jobsArray = useSelector(
    (state: RootState) => state.jobs.jobs
  );

  const [currentPage, setCurrentPage] = useState(router.query.page === undefined ? 1 : Number(router.query.page))
  const [pagesCount, setPageCount] = useState(Math.ceil(jobsArray.length / ON_PAGE))
  const [pagesToShow, setPagesToShow] = useState<(number | string)[]>([]);

  const paginationHandler = (page: number) => {
    if (currentPage !== page) {
      const currentParams = { ...router.query };
      const newParams = { ...currentParams, page };

      router.push({
        pathname: router.pathname,
        query: newParams
      });
    }
  }

  useEffect(() => {
    setPageCount(Math.ceil(jobsArray.length / ON_PAGE))
  }, [jobsArray])

  useEffect(() => {
    const pages = isMobile ? createMobileNumbersArray(currentPage, pagesCount) : createNumbersArray(currentPage, pagesCount)
    setPagesToShow(pages);
  }, [currentPage, pagesCount, isMobile]);


  useEffect(() => {
    setCurrentPage(router.query.page === undefined ? 1 : Number(router.query.page))
  }, [router.query.page])


  return (
    <div className={s.pagination}>
      <button
        onClick={() => paginationHandler(currentPage - 1)}
        className={s.pagination__btn}
        disabled={currentPage === 1}
      >
        Previous Page
      </button>
      {isMobile && pagesToShow.map((pageNumber, index) => (
        <button
          key={index}
          className={`${s.pagination__btn} ${router.query.page === `${pageNumber}` && s.active}
          ${router.query.page === undefined && pageNumber === 1 && s.active}`}
          disabled={pageNumber === '...'}
          onClick={() => paginationHandler(typeof pageNumber === 'number' ? pageNumber : 1)}>
          {pageNumber}
        </button>
      ))}


      {!isMobile && <>
        {Number(pagesToShow[0]) > 2 && (
          <button className={`
        ${s.pagination__btn} `} disabled>...</button>
        )}
        {pagesToShow.map(pageNumber => (
          <button
            key={pageNumber}
            className={`
        ${s.pagination__btn} 
        ${router.query.page === `${pageNumber}` && s.active}
        ${router.query.page === undefined && pageNumber === 1 && s.active}
        
        `}
            onClick={() => paginationHandler(Number(pageNumber))}
          >
            {pageNumber}
          </button>
        ))}
        {pagesCount - Number(pagesToShow[pagesToShow.length - 1]) > 1 && (
          <>
            <button className={`
        ${s.pagination__btn}         
        `} disabled>...</button>

            <button className={`
        ${s.pagination__btn} 
        ${router.query.page === `${pagesCount - 1}` && s.active}        
        `} onClick={() => paginationHandler(pagesCount - 1)}>{pagesCount - 1}</button>
            <button className={`
        ${s.pagination__btn} 
        ${router.query.page === `${pagesCount}` && s.active}
        
        `} onClick={() => paginationHandler(pagesCount)}>{pagesCount}</button>
          </>
        )}
      </>}
      <button
        onClick={() => paginationHandler(currentPage + 1)}
        className={s.pagination__btn}
        disabled={currentPage === pagesCount}
      >
        Next Page
      </button>

    </div>
  )
}