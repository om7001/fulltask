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

  if (!data || !data.getPaginatedPosts || data.getPaginatedPosts.length === 0) {
    return (
      <div className="fixed mt-16 top-0 left-0 w-full h-full flex justify-center items-center bg-gray-100">
        <div className="text-center flex items-center"> {/* Added a container div with flex display */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10em"
            height="10em"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor">
              <path d="M1 2h2.5L3.5 2h-2.5z">
                <animate
                  fill="freeze"
                  attributeName="d"
                  dur="0.4s"
                  values="M1 2h2.5L3.5 2h-2.5z;M1 2h2.5L18.5 22h-2.5z"
                ></animate>
              </path>
              <path d="M5.5 2h2.5L7.2 2h-2.5z">
                <animate
                  fill="freeze"
                  attributeName="d"
                  dur="0.4s"
                  values="M5.5 2h2.5L7.2 2h-2.5z;M5.5 2h2.5L23 22h-2.5z"
                ></animate>
              </path>
              <path d="M3 2h5v0h-5z" opacity={0}>
                <set attributeName="opacity" begin="0.4s" to={1}></set>
                <animate
                  fill="freeze"
                  attributeName="d"
                  begin="0.4s"
                  dur="0.4s"
                  values="M3 2h5v0h-5z;M3 2h5v2h-5z"
                ></animate>
              </path>
              <path d="M16 22h5v0h-5z" opacity={0}>
                <set attributeName="opacity" begin="0.4s" to={1}></set>
                <animate
                  fill="freeze"
                  attributeName="d"
                  begin="0.4s"
                  dur="0.4s"
                  values="M16 22h5v0h-5z;M16 22h5v-2h-5z"
                ></animate>
              </path>
              <path d="M18.5 2h3.5L22 2h-3.5z" opacity={0}>
                <set attributeName="opacity" begin="0.5s" to={1}></set>
                <animate
                  fill="freeze"
                  attributeName="d"
                  begin="0.5s"
                  dur="0.4s"
                  values="M18.5 2h3.5L22 2h-3.5z;M18.5 2h3.5L5 22h-3.5z"
                ></animate>
              </path>
            </g>
          </svg>
          <h1 className="text-3xl ml-4">Post Not Created By User</h1> {/* Added margin to create space between svg and h1 */}
        </div>
      </div>
    );
  }

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

      {data &&
        <div className='fixed bottom-0 pb-5 left-0 right-0 mx-auto bg-white'>
          <Pagination pageCount={totalPages} onPageChange={handlePageChange} />
        </div>}

      

    </>
  );
};

export default UserDashboard;
