
function Card({ title, description, createdBy }) {

    return (
        <div className="bg-slate-100 rounded-xl shadow-md overflow-hidden m-2">
            <div className="p-10">
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <p className="text-gray-600 mb-4">{description}</p>
                <p className="text-sm text-gray-500">Created by: {createdBy}</p>
            </div>
            
        </div>
    );
}

export default Card;
