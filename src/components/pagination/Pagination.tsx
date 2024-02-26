import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { DOTS, usePagination } from '@/utils/usePagination';
import { ON_PAGE, mobile } from '@/utils/constants';
import { useGetWindowDimensions } from '@/utils/use-get-window-dimensions';
import { TJob } from '@/lib/types'
import { setIsLoading } from '@/lib/slices/isLoadingSlice';
import s from './Pagination.module.scss';

export const PaginationComp = ({ arr }: { arr: TJob[] }) => {
  const router = useRouter();
  const pathname = usePathname()
  const { width } = useGetWindowDimensions();
  const isMobile = width <= mobile
  const dispatch = useDispatch()

const searchParams = useSearchParams();
  const [array, setArray] = useState(arr)

  const [currentPage, setCurrentPage] = useState(searchParams.get('page') === null ? 1 : Number(searchParams.get('page')))
  const [pagesCount, setPageCount] = useState(Math.ceil(array?.length / ON_PAGE))
  const paginationEls = usePagination({
    currentPage: currentPage,
    totalCount: pagesCount,
    pageSize: 1,
    width: width,
  })


  const paginationHandler = (page: number | string) => {
    if (typeof page === 'number') {
      if (currentPage !== page) {
        const tag = searchParams.get('tag');
        dispatch(setIsLoading(true))
        router.push(`${pathname}?page=${page}${tag === null ? '' : `&tag=${tag}`}`)
      }
    }
  }

  useEffect(() => {
    setArray(arr);
    setPageCount(Math.ceil(arr?.length / ON_PAGE))
  }, [arr])


  useEffect(() => {
    dispatch(setIsLoading(false))
    setCurrentPage(searchParams.get('page') === null ? 1 : Number(searchParams.get('page')))
  }, [searchParams])


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