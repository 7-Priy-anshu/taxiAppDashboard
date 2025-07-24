import { FaPlus } from "react-icons/fa";

export default function AddButton(props) {
    return (
        <div>
            {/* <button className='m-2 bg-blue-500 w-64 hover:bg-blue-700 text-white font-bold px-2'>  */}
           <button className="bg-blue-500 text-white px-3 py-2 sm:px-4 sm:py-2.5 md:px-4 md:py-2 md:text-[15px] rounded flex items-center gap-1.5 sm:gap-2 md:gap-3 hover:bg-blue-600 text-sm sm:text-base md:text-lg">
  {props.text}
  <FaPlus className="text-xs sm:text-sm md:text-base" />
</button>

        </div>
    )
}


