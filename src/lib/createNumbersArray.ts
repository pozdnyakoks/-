import { MAX_VISIBLE_PAGE, MAX_VISIBLE_PAGE_MOBILE } from "@/utils/constants";

export const createNumbersArray = (currentPage: number, pagesCount: number, width: number) => {

  const pages = [];
  let maxVisiblePage = MAX_VISIBLE_PAGE;
  let startPage = currentPage - Math.floor(maxVisiblePage / 2);
  let endPage = currentPage + Math.floor(maxVisiblePage / 2);
  
  if (startPage < 1) {
    endPage += 1 - startPage;
    startPage = 1;
  }
  
  if (endPage > pagesCount) {
    startPage -= endPage - pagesCount;
    endPage = pagesCount;
  }
  
  if (startPage < 1) {
    startPage = 1;
  }
  
  if ((endPage - startPage + 1) > MAX_VISIBLE_PAGE_MOBILE) {
    const excessPages = (endPage - startPage + 1) - MAX_VISIBLE_PAGE_MOBILE;
    if (startPage <= excessPages) {
      startPage = 1;
      endPage = MAX_VISIBLE_PAGE_MOBILE;
    } else {
      startPage -= excessPages;
      endPage -= excessPages;
    }
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  
  return pages;
}