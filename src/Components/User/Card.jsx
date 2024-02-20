import { useState } from 'react';
import { Link } from 'react-router-dom';
import DeletePost from './DeletePost';

function Card({ id, title, description, createdBy, refetch }) {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="bg-slate-100 rounded-xl shadow-md overflow-hidden">
            <div className="p-5">
                <h2 className="text-xl font-semibold">{title}</h2>
                <p className="text-gray-600 mb-4">{description}</p>
                <p className="text-sm text-gray-500">Created by: {createdBy}</p>
                <Link to={`updatepost/${id}`} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-3">Edit</Link>
                <button onClick={() => setShowModal(true)} className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-3">Delete</button>
            </div>
            {showModal && <DeletePost refetch={refetch} onClose={() => setShowModal(false)} id={id} />} {/* Pass id prop to DeletePost */}
        </div>
    );
}

export default Card;
