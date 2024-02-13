import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { ON_PAGE, mobile } from '@/utils/constants';
import { useGetWindowDimensions } from '@/utils/use-get-window-dimensions';
import s from './Pagination.module.scss';
import { DOTS, usePagination } from '@/utils/usePagination';

export const PaginationComp = () => {
  const router = useRouter();
  const { width } = useGetWindowDimensions();
  const isMobile = width <= mobile
  const jobsArray = useSelector(
    (state: RootState) => state.jobs.jobs
  );

  

  const [currentPage, setCurrentPage] = useState(router.query.page === undefined ? 1 : Number(router.query.page))
  const [pagesCount, setPageCount] = useState(Math.ceil(jobsArray.length / ON_PAGE))
  const paginationEls = usePagination({
    currentPage: currentPage,
    totalCount: pagesCount,
    pageSize: 1,
    width: width,
  })

  const paginationHandler = (page: number | string) => {
    if (typeof page === 'number') {
      if (currentPage !== page) {
        const currentParams = { ...router.query };
        const newParams = { ...currentParams, page };

        router.push({
          pathname: router.pathname,
          query: newParams
        });
      }
    }
  }

  useEffect(() => {
    setPageCount(Math.ceil(jobsArray.length / ON_PAGE))
  }, [jobsArray])


  useEffect(() => {
    setCurrentPage(router.query.page === undefined ? 1 : Number(router.query.page))
  }, [router.query.page])


  return (

    <div className={s.pagination}>

      {!isMobile && <button
        onClick={() => paginationHandler(currentPage - 1)}
        className={`${s.pagination__btn} ${s.pagination__btn_prev}`}
        disabled={currentPage === 1}
      >
        Previous Page
      </button>
      }

      {!(currentPage === 0 || (paginationEls && paginationEls.length < 2)) &&
        <>
          {paginationEls?.map((pageNumber, ind) => {

            if (pageNumber === DOTS) {
              return <button key={ind} className={`${s.pagination__btn} ${s.pagination__btn_dots}`} disabled>&#8230;</button>;
            }
            return (
              <button
                key={ind}
                className={`${s.pagination__btn} ${pageNumber === currentPage && s.active}`}
                onClick={() => paginationHandler(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          })}
        </>
      }

      {!isMobile &&
        <button
          onClick={() => paginationHandler(currentPage + 1)}
          className={`${s.pagination__btn} ${s.pagination__btn_next}`}
          disabled={currentPage === pagesCount}
        >
          Next Page
        </button>
      }
    </div>
  )
}