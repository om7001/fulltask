import Card from './Card';
// import Navbar from './Navbar';
import { useQuery } from '@apollo/client';
import { GET_ALL_POST_PAGINATION } from '../../GraphQL/query';
import Pagination from './Pagination';
import { useState } from 'react';

const UserDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data, refetch } = useQuery(GET_ALL_POST_PAGINATION,
    {
      variables: {
        input: {
          limit: 8,
          page: currentPage,
        }
      },
      fetchPolicy: 'network-only'
    })

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const totalPages = data?.getPaginatedPosts?.totalPages || 0

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-10 m-5">
        {data &&
          data.getPaginatedPosts &&
          data.getPaginatedPosts?.docs.map((res) => (
            <Card
              refetch={refetch}
              key={res._id}
              id={res._id}
              title={res.title}
              description={res.description}
              createdBy={`${res.createdBy?.firstName} ${res.createdBy?.lastName}`}
              className="bg-white p-4 rounded-lg shadow-md"
            />
          ))}
      </div>

      <div className='fixed bottom-0 pb-5 left-0 right-0 mx-auto bg-white'>
        <Pagination pageCount={totalPages} onPageChange={handlePageChange} />
      </div>

    </>
  );
};

export default UserDashboard;
