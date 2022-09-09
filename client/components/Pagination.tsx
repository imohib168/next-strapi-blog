import React from 'react';
import { useRouter } from 'next/router';
import qs from 'qs';

interface IPaginationProps {
  page: number;
  pageCount: number;
  currentURL?: string;
}

const Pagination = ({
  page,
  pageCount,
  currentURL = '/',
}: IPaginationProps) => {
  const router = useRouter();

  const isPrevDisabled = () => page <= 1;
  const isNextDisabled = () => page >= pageCount;

  const handlePagination = (direction: 1 | -1) => {
    if (direction === 1 && isNextDisabled()) return;
    if (direction === -1 && isPrevDisabled()) return;

    const queryString = qs.stringify({
      page: page + direction,
    });

    router.push(`${currentURL}?${queryString}`);
  };

  return (
    <div className='flex justify-center mt-12'>
      <button
        disabled={isPrevDisabled()}
        onClick={() => handlePagination(-1)}
        className={`${
          isPrevDisabled() && 'opacity-40'
        } bg-primary-dark px-8 py-2 text-white font-bold text-xl rounded-md mr-3`}
      >
        Prev
      </button>
      <button
        disabled={isNextDisabled()}
        onClick={() => handlePagination(1)}
        className={`${
          isNextDisabled() && 'opacity-40'
        } bg-primary-dark px-8 py-2 text-white font-bold text-xl rounded-md`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
