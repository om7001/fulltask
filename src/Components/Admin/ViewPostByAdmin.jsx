import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ALL_POST_PAGINATION_BY_ADMIN } from '../../GraphQL/query';
import { useEffect, useState } from 'react';
import Pagination from '../User/Pagination';
import Input from '../useForm/Input';
import debounce from 'debounce';
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

function ViewPostByAdmin() {
  const [showMessage, setShowMessage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_ALL_POST_PAGINATION_BY_ADMIN, {
    variables: {
      input: {
        limit: 8,
        page: currentPage,
        _id: id,
        search
      }
    },
    fetchPolicy: 'network-only'
  });

  const handlePageChange = (selected) => {
    setCurrentPage(selected);
  };

  const totalPages = data?.getPaginatedPostsByAdmin?.totalPages || 0;

  const handleDebounce = debounce((value) => {
    setSearch(value);
    setCurrentPage(1);
  }, 1000);

  const handleSearch = (e) => {
    const inputValue = e.target.value;
    handleDebounce(inputValue);
  };

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      if (!data || !data.getPaginatedPostsByAdmin || data.getPaginatedPostsByAdmin.docs.length === 0) {
        setShowMessage(true);
      }
    }, 1000);
  
    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      setShowMessage(false);
    };
  }, [data, setShowMessage]);
  

  return (
    <>
      {showMessage && (
        <div className="fixed mt-48 top-0 left-0 w-full h-full flex justify-center items-center bg-white">
          <div className="text-center flex items-center">
            <h1 className="text-3xl ml-4 text-gray-400">Post Not Created By User</h1>
          </div>
        </div>
      )}
      <div className="flex items-center my-5 mx-12">
        <Input
          type="text" 
          name="Search"
          id="Search"
          placeholder="Search..."
          className=""
          onChange={(e) => handleSearch(e)}
        />
      </div>
      {loading && currentPage === 1 ? (
        <MyLoader />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7  p-7">
          {data &&
            data.getPaginatedPostsByAdmin &&
            data.getPaginatedPostsByAdmin.docs.map((post) => (
              <div key={post._id} className="bg-slate-100 rounded-xl shadow-md overflow-hidden mx-2">
                <div className="p-10">
                  <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-gray-600 mb-4">{post.description}</p>
                  <p className="text-sm text-gray-500">
                    Created by: {post.createdBy.firstName} {post.createdBy.lastName}
                  </p>
                </div>
              </div>
            ))}
          {data && data.getPaginatedPostsByAdmin && data.getPaginatedPostsByAdmin.docs.length === 0 && (
            <div className="text-center w-full">No posts found.</div>
          )}
          <div className="fixed bottom-0 pb-5 left-0 right-0 mx-auto bg-white">
            <Pagination pageCount={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
          </div>
        </div>
      )}
    </>
  );
}

export default ViewPostByAdmin;
