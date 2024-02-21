import { useParams } from 'react-router-dom'; // Import useParams
import { useQuery } from '@apollo/client';
import { GET_ALL_POST_PAGINATION_BY_ADMIN } from '../../GraphQL/query';
import { useState } from 'react';
import Pagination from '../User/Pagination';
import Input from '../useForm/Input';
import debounce from 'debounce';

function ViewPostByAdmin() {
  // const [sortBy, setSortBy] = useState({ column: 'title', order: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState();
  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_ALL_POST_PAGINATION_BY_ADMIN, {
    variables: {
      input: {
        limit: 8,
        page: currentPage,
        // sortBy: sortBy.column,
        // order: sortBy.order,
        _id: id,
        search
      }
    },
    fetchPolicy: 'network-only'
  });

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const totalPages = data?.getPaginatedPostsByAdmin?.totalPages || 0

  const handleDebounce = debounce((value) => {
    setSearch(value);
  }, 1000);

  const handleSearch = (e) => {
    const inputValue = e.target.value;
    handleDebounce(inputValue);
  };
  // if (loading) return <p>Loading...</p>;

  // if (error) return <p>Error: {error.message}</p>;

  // if (!data || !data.getPaginatedPostsByAdmin || data.getPaginatedPostsByAdmin.length === 0) return <div class="flex justify-center items-center h-screen">
  //   <div>
  //     <svg xmlns="http://www.w3.org/2000/svg" width="10em" height="10em" viewBox="0 0 24 24"><g fill="currentColor"><path d="M1 2h2.5L3.5 2h-2.5z"><animate fill="freeze" attributeName="d" dur="0.4s" values="M1 2h2.5L3.5 2h-2.5z;M1 2h2.5L18.5 22h-2.5z"></animate></path><path d="M5.5 2h2.5L7.2 2h-2.5z"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5.5 2h2.5L7.2 2h-2.5z;M5.5 2h2.5L23 22h-2.5z"></animate></path><path d="M3 2h5v0h-5z" opacity={0}><set attributeName="opacity" begin="0.4s" to={1}></set><animate fill="freeze" attributeName="d" begin="0.4s" dur="0.4s" values="M3 2h5v0h-5z;M3 2h5v2h-5z"></animate></path><path d="M16 22h5v0h-5z" opacity={0}><set attributeName="opacity" begin="0.4s" to={1}></set><animate fill="freeze" attributeName="d" begin="0.4s" dur="0.4s" values="M16 22h5v0h-5z;M16 22h5v-2h-5z"></animate></path><path d="M18.5 2h3.5L22 2h-3.5z" opacity={0}><set attributeName="opacity" begin="0.5s" to={1}></set><animate fill="freeze" attributeName="d" begin="0.5s" dur="0.4s" values="M18.5 2h3.5L22 2h-3.5z;M18.5 2h3.5L5 22h-3.5z"></animate></path></g></svg>
  //   </div>
  //   <div>
  //     <h1 className='text-3xl'>Post Not Created By User</h1>
  //   </div>
  // </div>
  //   ;

  return (
    <>
      <div className="flex items-center my-10 mx-12">
        <Input
          // label="Search"
          type="text"
          name="Search"
          id="Search"
          placeholder="Search..."
          className=""
          onChange={(e) => handleSearch(e)}
        // onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  p-10">
        {data &&
          data.getPaginatedPostsByAdmin &&
          data.getPaginatedPostsByAdmin?.docs.map((post) => (
            <div key={post._id} className="bg-slate-100 rounded-xl shadow-md overflow-hidden mx-2">
              <div className="p-10">
                <h2
                  // onClick={() => handleSort('title')}
                  className="text-xl font-semibold mb-2">
                  {post.title}
                </h2>
                <p
                  // onClick={() => handleSort('description')}
                  className="text-gray-600 mb-4">
                  {post.description}
                </p>
                <p
                  className="text-sm text-gray-500">
                  Created by: {post.createdBy.firstName} {post.createdBy.lastName}
                </p>
              </div>
            </div>
          ))}
        <div className='fixed bottom-0 pb-5 left-0 right-0 mx-auto bg-white'>
          <Pagination pageCount={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
    </>
  );
}

export default ViewPostByAdmin;
