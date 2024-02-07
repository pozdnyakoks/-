import { useDispatch, useSelector } from 'react-redux';
import s from './Pagination.module.scss';
import { RootState } from '@/lib/store';
import { useEffect, useState } from 'react';
import { setCurrentPage } from '@/lib/slices/currentPageSlice';
import { useRouter } from 'next/router';
import { MAX_VISIBLE_PAGE, ON_PAGE } from '@/utils/constants';

export const Pagination = () => {
  const router = useRouter();
  const filteredJobsArray = useSelector(
    (state: RootState) => state.jobs.jobs
  );

  const currentPage = useSelector(
    (state: RootState) => state.currentPage.currentPage
  );

  const dispatch = useDispatch();

  const paginationHandler = (page: number) => {
    if (currentPage !== page) {
      router.push(`/?page=${page}`);
      dispatch(setCurrentPage(page))
    }
  }

 
  const [pagesCount, setPageCount] = useState(Math.ceil(filteredJobsArray.length / 15))
  const [pagesToShow, setPagesToShow] = useState<number[]>([]);

  useEffect(() => {
    setPageCount(Math.ceil(filteredJobsArray.length / ON_PAGE))
  }, [filteredJobsArray])

  useEffect(() => {
    const pages = [];
    let startPage = currentPage - Math.floor(MAX_VISIBLE_PAGE / 2);
    let endPage = currentPage + Math.floor(MAX_VISIBLE_PAGE / 2);

    if (startPage < 1) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }

    if (endPage > pagesCount) {
      startPage -= endPage - pagesCount;
      endPage = pagesCount;
    }

    if (startPage < 1) {
      startPage = 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    setPagesToShow(pages);
  }, [currentPage, pagesCount]);


  return (
    <div className={s.pagination}>
      <button
        onClick={() => paginationHandler(currentPage - 1)}
        className={s.pagination__btn}
        disabled={currentPage === 1}
      >
        Previous Page
      </button>
      {pagesToShow[0] > 2 && (
        <button className={`
        ${s.pagination__btn} `} disabled>...</button>
      )}
      {pagesToShow.map(pageNumber => (
        <button
          key={pageNumber}
          className={`
        ${s.pagination__btn} 
        ${router.query.page === `${pageNumber}` && s.active}
        ${router.query.page === undefined && pageNumber === 0 && s.active}
        
        `}
          onClick={() => paginationHandler(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      {pagesCount - pagesToShow[pagesToShow.length - 1] > 1 && (
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
      {/* {new Array(pagesCount).fill(0).map((el, ind) => (
        <button className={`
        ${s.pagination__btn} 
        ${router.query.page === `${pageNumber}` && s.active}
        ${router.query.page === undefined && ind === 0 && s.active}
        
        `}
          onClick={() => paginationHandler(ind + 1)} key={ind}>{ind + 1}</button>
      ))} */}
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