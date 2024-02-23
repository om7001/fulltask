import { useState } from 'react';
import { Link } from 'react-router-dom';
import DeletePost from './DeletePost';

function Card({ id, title, description, createdBy, refetch, setCurrentPage, currentPage, dataLength }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="bg-slate-100 rounded-xl shadow-md overflow-hidden">
            <div className="p-5">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-gray-600 mb-4">{description}</p>
                <p className="text-sm text-gray-500">Created by: {createdBy}</p>
                <div className="flex">
                    <Link to={`updatepost/${id}`} className="flex justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-gray-700 shadow-sm hover:bg-indigo-500 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-3 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 32 32">
                            <path fill="currentColor" d="M2 26h28v2H2zM25.4 9c.8-.8.8-2 0-2.8l-3.6-3.6c-.8-.8-2-.8-2.8 0l-15 15V24h6.4zm-5-5L24 7.6l-3 3L17.4 7zM6 22v-3.6l10-10l3.6 3.6l-10 10z" />
                        </svg>
                    </Link>
                    <button onClick={() => setShowModal(true)} className="flex justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-gray-700 shadow-sm hover:bg-red-500 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 28 28">
                            <path fill="currentColor" d="M11.5 6h5a2.5 2.5 0 0 0-5 0M10 6a4 4 0 0 1 8 0h6.25a.75.75 0 0 1 0 1.5h-1.31l-1.217 14.603A4.25 4.25 0 0 1 17.488 26h-6.976a4.25 4.25 0 0 1-4.235-3.897L5.06 7.5H3.75a.75.75 0 0 1 0-1.5zM7.772 21.978a2.75 2.75 0 0 0 2.74 2.522h6.976a2.75 2.75 0 0 0 2.74-2.522L21.436 7.5H6.565zM11.75 11a.75.75 0 0 1 .75.75v8.5a.75.75 0 0 1-1.5 0v-8.5a.75.75 0 0 1 .75-.75m5.25.75a.75.75 0 0 0-1.5 0v8.5a.75.75 0 0 0 1.5 0z" />
                        </svg>
                    </button>
                </div>
            </div>


            {showModal && <DeletePost refetch={refetch} dataLength={dataLength} currentPage={currentPage} setCurrentPage={setCurrentPage} onClose={() => setShowModal(false)} id={id} />} {/* Pass id prop to DeletePost */}
        </div>
    );
}

export default Card;
