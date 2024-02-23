// import React, { useEffect, useState } from 'react';
// import ReactPaginate from 'react-paginate';

// const Pagination = ({ pageCount, onPageChange }) => {
//     return (
//         <>
//             <ReactPaginate
//                 pageCount={pageCount}
//                 onPageChange={onPageChange}
//                 pageRangeDisplayed={3}
//                 marginPagesDisplayed={1}
//                 containerClassName={'flex justify-center mt-8'}
//                 activeClassName={'bg-teal-500 text-white border-teal-500'}
//                 pageClassName={'mx-2 rounded-full cursor-pointer transition-all duration-300 hover:bg-teal-500 hover:text-white'}
//                 breakClassName={'mx-2 text-gray-600'}
//                 previousClassName={'mx-2 text-teal-500 cursor-pointer'}
//                 nextClassName={'mx-2 text-teal-500 cursor-pointer'}
//                 disabledClassName={'mx-2 text-gray-300 cursor-not-allowed'}
//             />
//         </>
//     );
// };

// export default Pagination;

import React from 'react';

const Pagination = ({ pageCount, currentPage, onPageChange, pageRange = 2 }) => {
  const rangeToShow = pageRange * 2 + 1;
  let startPage = Math.max(1, currentPage - pageRange);
  let endPage = Math.min(pageCount, startPage + rangeToShow - 1);

  if (endPage - startPage + 1 < rangeToShow) {
    startPage = Math.max(1, endPage - rangeToShow + 1);
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <div className="flex justify-center space-x-2">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-2 border border-gray-300 rounded-md transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
        >
          Previous
        </button>
      )}

      {startPage > 1 && (
        <button
          onClick={() => onPageChange(1)}
          className={`px-3 py-2 border border-gray-300 rounded-md transition duration-300 ease-in-out ${
            currentPage === 1 ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300'
          }`}
        >
          1
        </button>
      )}

      {startPage > 2 && (
        <span className="px-3 py-2">...</span>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 border border-gray-300 rounded-md transition duration-300 ease-in-out ${
            currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300'
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < pageCount - 1 && (
        <span className="px-3 py-2">...</span>
      )}

      {endPage < pageCount && (
        <button
          onClick={() => onPageChange(pageCount)}
          className={`px-3 py-2 border border-gray-300 rounded-md transition duration-300 ease-in-out ${
            currentPage === pageCount ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300'
          }`}
        >
          {pageCount}
        </button>
      )}

      {currentPage < pageCount && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-2 border border-gray-300 rounded-md transition duration-300 ease-in-out hover:bg-gray-100 focus:outline-none focus:ring focus:border-blue-300"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;