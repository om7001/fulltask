import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount, onPageChange }) => {
    return (
        <>
            <ReactPaginate
                pageCount={pageCount}
                onPageChange={onPageChange}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                containerClassName={'flex justify-center mt-8'}
                activeClassName={'bg-teal-500 text-white border-teal-500'}
                pageClassName={'mx-2 rounded-full cursor-pointer transition-all duration-300 hover:bg-teal-500 hover:text-white'}
                breakClassName={'mx-2 text-gray-600'}
                previousClassName={'mx-2 text-teal-500 cursor-pointer'}
                nextClassName={'mx-2 text-teal-500 cursor-pointer'}
                disabledClassName={'mx-2 text-gray-300 cursor-not-allowed'}
            />
        </>
    );
};

export default Pagination;