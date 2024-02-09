export const createMobileNumbersArray = (currentPage: number, pageCount: number, isMobile?: boolean) => {
  const pages: Array<string | number> = [];

  if (pageCount <= 6) {
    for (let i = 1; i < pageCount; i++) {
      pages.push(i);
    }
    return pages;
  }

  if (currentPage <= 3) {
    for (let i = 1; i < 5; i++) {
      pages.push(i);
    }
    pages.push('...');
    pages.push(pageCount);
    return pages;
  }

  if (currentPage > 3 && currentPage < pageCount - 2) {
    pages.push('...');
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      pages.push(i);
    }
    pages.push('...');
    pages.push(pageCount);
    return pages;
  }

  if (currentPage >= pageCount - 2) {
    pages.push('...');
    for (let i = pageCount - 4; i <= pageCount; i++) {
      pages.push(i);
    }
    return pages;
  }

  return pages;

};