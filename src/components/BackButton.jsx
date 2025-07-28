import { FaArrowLeft } from "react-icons/fa";

export default function BackButton(props) {
  return (
      <button
              onClick={() => navigate(-1)}
              className="flex items-center bg-white px-4 py-2 rounded-md shadow cursor-pointer text-blue-600 border hover:bg-gray-100"
            >
              <FaArrowLeft className="mr-2" />
              Back
            </button>
    // <button
    //   className="
    //     m-2
    //     w-34
    //     h-10
    //     flex items-center justify-center gap-2
    //     bg-blue-500
    //     cursor-pointer
    //     rounded
    //     hover:bg-blue-700
    //     text-white
    //     font-bold
    //     px-2
    //   "
    // >
    //   <FaArrowLeft className="text-white" />
    //   {props.text}
    // </button>
  );
}
