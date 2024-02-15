import { useMemo } from "react";

type TPage = {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  width: number;
}

export const DOTS = '...'

const range = (start: number, end: number) => {
  let length = end - start + 1;
  /*
  	Create an array of certain length and set the elements within it from
    start value to end value.
  */
  return Array.from({ length }, (_, idx) => idx + start);
};

const calculateNumberOfElements = (width: number) => {
  // Рассчитываем общую ширину элемента вместе с промежутком
  const totalWidthPerElement = 47 + 8;

  // Находим количество элементов, которые могут поместиться в заданную ширину
  const numberOfElements = Math.floor((width >= 880 ? 560 : width) / totalWidthPerElement);
  return numberOfElements;
};

export const usePagination = ({
  totalCount,
  pageSize,
  width,
  currentPage
}: TPage) => {
  const elements = calculateNumberOfElements(width)
  let siblingCount = 1;
  let count = 5
  const isSmall = width < 500;
  const isMedium  = width < 880 && width > 500;
  let countPagesWidth = 3

  if (totalCount <= 12 && width > 880) {
    siblingCount = 7;
  } else if (totalCount <= 12 && width <= 880) {
    siblingCount = 1;
  }
  
  else {
    if (width < 550) {
      siblingCount = 1
    } else if ( width < 650) {
      siblingCount = 1
      // siblingCount = 2
    } else if ( width < 750) {
        siblingCount = 2
    } else if ( width < 880) {
        siblingCount = 3
    } else {
      count = 3
      siblingCount = 2
    }
  
    if (isSmall) {
      countPagesWidth = 3
    } else if (isMedium) {
      countPagesWidth = 4
    } else {
      countPagesWidth = 4
    }
  }

  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
   

    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = elements;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }
	
    /*
    	Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );
    /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */

    const shouldShowLeftDots = leftSiblingIndex > (isSmall ? 2 :3);
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - (isSmall ? 2 : 3);


    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = countPagesWidth + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    /*
    	Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      
      let rightItemCount = countPagesWidth + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );

      return [firstPageIndex, DOTS, ...rightRange];
    }
     
    /*
    	Case 4: Both left and right dots to be shown
    */
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);

      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};