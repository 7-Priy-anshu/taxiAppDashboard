import { FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';
import BackButton from "./BackButton";

export default function SearchBar({searchTerm, setSearchTerm, title, addLink}){ 
  return (
    <>
    <div className="flex flex-col bg-white">
      {/* <div className="flex p-2  items-left">
        <h2 className="text-3xl font-semibold text-gray-800">Car List</h2>
      </div> */}
      <div className="flex  justify-between p-2 items-center mb-4">
        <input
          type="text"
          placeholder="Search cars..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded w-1/3"
        />

        <Link
          to={addLink}
       className="bg-blue-500 text-white px-2 py-2 rounded flex items-center gap-2 hover:bg-blue-600"
        >
           Add {title} <FaPlus />
        </Link>
      </div>
    </div>
</>
  )
}
