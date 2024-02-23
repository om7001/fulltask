import Card from './Card';
import { useQuery } from '@apollo/client';
import { GET_ALL_POST_PAGINATION } from '../../GraphQL/query';
import Pagination from './Pagination';
import { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';


const MyLoader = () => (
  <div style={{ display: 'flex', flexWrap: 'wrap', height: '10em' }}>
    {[...Array(8)].map((_, index) => (
      <div key={index} style={{ width: '25%', padding: '10px' }}>
        <ContentLoader
          speed={2}
          width={300}
          height={250}
          viewBox={`0 0 ${100} ${50}`}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx={10} ry={10} width={100} height={50} />
        </ContentLoader>
      </div>
    ))}
  </div>
);

const UserDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showMessage, setShowMessage] = useState(false);
  const { loading, error, data, refetch } = useQuery(GET_ALL_POST_PAGINATION,
    {
      variables: {
        input: {
          limit: 2,
          page: currentPage,
        }
      },
      fetchPolicy: 'network-only'
    })

  const handlePageChange = (selected) => {
    setCurrentPage(selected);
  };

  const totalPages = data?.getPaginatedPosts?.totalPages || 0

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!data || !data.getPaginatedPosts || data.getPaginatedPosts.length === 0) {
        setShowMessage(true);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [data]);


  return (
    <>
      {showMessage && (
        <div className="fixed mt-16 top-0 left-0 w-full h-full flex justify-center items-center bg-white">
          <div className="text-center flex items-center">
            <h1 className="text-3xl ml-4 text-gray-400">Post Not Created By User</h1>
          </div>
        </div>
      )}
      {loading ? <MyLoader /> :
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-10 m-5">
          {data &&
            data.getPaginatedPosts &&
            data.getPaginatedPosts?.docs.map((res) => (
              <Card
                dataLength={data.getPaginatedPosts.docs.length}
                refetch={refetch}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                key={res._id}
                id={res._id}
                title={res.title}
                description={res.description}
                createdBy={`${res.createdBy?.firstName} ${res.createdBy?.lastName}`}
                className="bg-white p-4 rounded-lg shadow-md"
              />
            ))}
        </div>}

      {data &&
        <div className='fixed bottom-0 pb-5 left-0 right-0 mx-auto bg-white'>
          <Pagination pageCount={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>}
    </>
  );
};

export default UserDashboard;
