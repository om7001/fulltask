import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_USER_PAGINATION } from '../../GraphQL/query';
import Pagination from '../User/Pagination';
import DeleteUserByAdmin from './DeleteUserByAdmin';
import { Link } from 'react-router-dom';
import Input from '../useForm/Input'
import debounce from 'debounce';
import Loader from '../Loader';


function UserTable() {
    const [sortBy, setSortBy] = useState({ column: 'createdAt', order: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);

    const { loading, data, refetch } = useQuery(GET_ALL_USER_PAGINATION,
        {
            variables: {
                input: {
                    limit: 7,
                    page: currentPage,
                    sortBy: sortBy.column,
                    order: sortBy.order,
                    search
                }
            },
            fetchPolicy: 'network-only'
        });

    useEffect(() => {
        refetch();
        // console.log(sortBy);
    }, [refetch]);

    const handleSort = (column) => {
        setSortBy({
            column,
            order: sortBy.column === column ? sortBy.order === 'asc' ? 'desc' : 'asc' : 'asc',
        });
        setCurrentPage(1)
    };

    
    
    // if (!data || !data.getPaginatedUsers || !data.getPaginatedUsers.length === 0) return <div class="flex justify-center items-center h-screen">
    //     <div>
    //         <svg xmlns="http://www.w3.org/2000/svg" width="10em" height="10em" viewBox="0 0 24 24"><g fill="currentColor"><path d="M1 2h2.5L3.5 2h-2.5z"><animate fill="freeze" attributeName="d" dur="0.4s" values="M1 2h2.5L3.5 2h-2.5z;M1 2h2.5L18.5 22h-2.5z"></animate></path><path d="M5.5 2h2.5L7.2 2h-2.5z"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5.5 2h2.5L7.2 2h-2.5z;M5.5 2h2.5L23 22h-2.5z"></animate></path><path d="M3 2h5v0h-5z" opacity={0}><set attributeName="opacity" begin="0.4s" to={1}></set><animate fill="freeze" attributeName="d" begin="0.4s" dur="0.4s" values="M3 2h5v0h-5z;M3 2h5v2h-5z"></animate></path><path d="M16 22h5v0h-5z" opacity={0}><set attributeName="opacity" begin="0.4s" to={1}></set><animate fill="freeze" attributeName="d" begin="0.4s" dur="0.4s" values="M16 22h5v0h-5z;M16 22h5v-2h-5z"></animate></path><path d="M18.5 2h3.5L22 2h-3.5z" opacity={0}><set attributeName="opacity" begin="0.5s" to={1}></set><animate fill="freeze" attributeName="d" begin="0.5s" dur="0.4s" values="M18.5 2h3.5L22 2h-3.5z;M18.5 2h3.5L5 22h-3.5z"></animate></path></g></svg>
    //     </div>
    //     <div>
    //         <h1 className='text-3xl'>User Not Available</h1>
    //     </div>
    // </div>;
    
    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected + 1);
    };
    
    const totalPages = data?.getPaginatedUsers?.totalPages || 0
    
    
    const handleEditClick = () => {
        refetch();
    };

    const handleDeleteClick = (userId) => {
        setUserIdToDelete(userId);
        setShowModal(true);
        refetch();
    };
    
    const handleDebounce = debounce((value) => {
        setSearch(value);
        setCurrentPage(1)
    }, 1000);
    
    const handleSearch = (e) => {
        const inputValue = e.target.value;
        handleDebounce(inputValue);
    };
       
    // let timeoutId;
    // const handleInputChange = (e) => {
    //     clearTimeout(timeoutId); // Clear previous timeout if exists
        
    //     timeoutId = setTimeout(() => {
    //         setSearch(e.target.value);
    //     }, 1000); // 1000 milliseconds = 1 second
    // };
    
    // if (currentPage == 1 && loading) {
    //     return (<Loader />)
    // }

    if (currentPage === 1 && search === '' && loading) {
        return (<Loader />)
    }

    if (!data || !data.getPaginatedUsers || data.getPaginatedUsers.length === 0) {
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
              <h1 className="text-3xl ml-4">User Not Available.</h1> {/* Added margin to create space between svg and h1 */}
            </div>
          </div>
        );
      }
    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-0">
                <div className="overflow-x-auto">
                    <div className="flex items-center ml-3 mb-3">
                        <Input
                            type="text"
                            name="Search"
                            id="Search"
                            placeholder="Search..."
                            className=""
                            onChange={(e)=>{handleSearch(e)}}
                            // onChange={handleInputChange}
                            // value={search}

                        // onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className='bg-slate-400'>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-black uppercase tracking-wider">No</th>
                                <th onClick={() => handleSort('firstName')} className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-black uppercase tracking-wider">
                                    First Name
                                    {sortBy.column === 'firstName' && sortBy.order === 'asc' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                        </svg>
                                    )}
                                    {sortBy.column === 'firstName' && sortBy.order === 'desc' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    )}
                                </th>
                                <th onClick={() => handleSort('lastName')} className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-black uppercase tracking-wider">
                                    Last Name
                                    {sortBy.column === 'lastName' && sortBy.order === 'asc' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                        </svg>
                                    )}
                                    {sortBy.column === 'lastName' && sortBy.order === 'desc' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    )}
                                </th>
                                <th onClick={() => handleSort('email')} className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-black uppercase tracking-wider">
                                    Email
                                    {sortBy.column === 'email' && sortBy.order === 'asc' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                        </svg>
                                    )}
                                    {sortBy.column === 'email' && sortBy.order === 'desc' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    )}
                                </th>
                                <th onClick={() => handleSort('active')} className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-black uppercase tracking-wider">
                                    Active
                                    {sortBy.column === 'active' && sortBy.order === 'asc' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                        </svg>
                                    )}
                                    {sortBy.column === 'active' && sortBy.order === 'desc' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    )}
                                </th>
                                <th onClick={() => handleSort('gender')} className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-black uppercase tracking-wider">
                                    Gender
                                    {sortBy.column === 'gender' && sortBy.order === 'asc' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                        </svg>
                                    )}
                                    {sortBy.column === 'gender' && sortBy.order === 'desc' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    )}
                                </th>
                                <th onClick={() => handleSort('createdAt')} className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-black uppercase tracking-wider">
                                    Created At
                                    {sortBy.column === 'createdAt' && sortBy.order === 'asc' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                                        </svg>
                                    )}
                                    {sortBy.column === 'createdAt' && sortBy.order === 'desc' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    )}
                                </th>
                                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-black uppercase tracking-wider">post</th>
                                <th colSpan={2} className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 font-medium text-black uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {data &&
                                data.getPaginatedUsers &&
                                data.getPaginatedUsers?.docs.map((res, index) => (
                                    <tr key={res._id} className='hover:bg-gray-300'>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-900">{(index + 1) + (currentPage - 1) * 7}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-900">{res.firstName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-900">{res.lastName}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-900">{res.email}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-900">{res.active === true ? "Active" : "Deactive"}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-900">{res.gender}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                            <div className="text-sm leading-5 text-gray-900">{res.createdAt}</div>
                                        </td>
                                        <td className="whitespace-no-wrap border-b border-gray-200">
                                            <Link to={`viewpostbyadmin/${res._id}`}
                                                className="flex justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-gray-700 shadow-sm hover:bg-gray-600 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                {/* View Post */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}><rect width={40} height={36} x={4} y={6} rx={3}></rect><path d="M4 14h40M20 24h16m-16 8h16m-24-8h2m-2 8h2"></path></g></svg>
                                            </Link>
                                        </td>
                                        <td className="whitespace-no-wrap border-b border-gray-200">
                                            <Link to={`updateuserbyadmin/${res._id}`} onClick={handleEditClick} className="flex justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-gray-700 shadow-sm hover:bg-gray-600 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}><path d="M7 7H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1"></path><path d="M20.385 6.585a2.1 2.1 0 0 0-2.97-2.97L9 12v3h3zM16 5l3 3"></path></g></svg>
                                            </Link>

                                        </td>
                                        <td className="whitespace-no-wrap border-b border-gray-200">
                                            <button type="submit"
                                                className="flex justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-gray-700 shadow-sm hover:bg-gray-600 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                onClick={() => handleDeleteClick(res._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 20 20">
                                                    <path fill="currentColor" d="m9.129 0l1.974.005c.778.094 1.46.46 2.022 1.078c.459.504.7 1.09.714 1.728h5.475a.69.69 0 0 1 .686.693a.689.689 0 0 1-.686.692l-1.836-.001v11.627c0 2.543-.949 4.178-3.041 4.178H5.419c-2.092 0-3.026-1.626-3.026-4.178V4.195H.686A.689.689 0 0 1 0 3.505c0-.383.307-.692.686-.692h5.47c.014-.514.205-1.035.554-1.55C7.23.495 8.042.074 9.129 0m6.977 4.195H3.764v11.627c0 1.888.52 2.794 1.655 2.794h9.018c1.139 0 1.67-.914 1.67-2.794zM6.716 6.34c.378 0 .685.31.685.692v8.05a.689.689 0 0 1-.686.692a.689.689 0 0 1-.685-.692v-8.05c0-.382.307-.692.685-.692m2.726 0c.38 0 .686.31.686.692v8.05a.689.689 0 0 1-.686.692a.689.689 0 0 1-.685-.692v-8.05c0-.382.307-.692.685-.692m2.728 0c.378 0 .685.31.685.692v8.05a.689.689 0 0 1-.685.692a.689.689 0 0 1-.686-.692v-8.05a.69.69 0 0 1 .686-.692M9.176 1.382c-.642.045-1.065.264-1.334.662c-.198.291-.297.543-.313.768l4.938-.001c-.014-.291-.129-.547-.352-.792c-.346-.38-.73-.586-1.093-.635z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <div className='fixed bottom-0 pb-5 left-0 right-0 mx-auto bg-white'>
                    <Pagination pageCount={totalPages} onPageChange={handlePageChange} />
                </div>
            </div>
            {showModal && <DeleteUserByAdmin userId={userIdToDelete} onClose={() => setShowModal(false)} />}
        </>
    );
}

export default UserTable;
