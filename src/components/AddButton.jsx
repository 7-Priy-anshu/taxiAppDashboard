import { FaPlus } from "react-icons/fa";

export default function AddButton(props) {
    return (
        <div>
            {/* <button className='m-2 bg-blue-500 w-64 hover:bg-blue-700 text-white font-bold px-2'>  */}
            <button className='bg-blue-500 text-white px-2 py-2 cursor-pointer rounded flex items-center gap-2 hover:bg-blue-600'> 
                {props.text}<FaPlus/>
            </button>
        </div>
    )
}


