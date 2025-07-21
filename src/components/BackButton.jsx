import { FaArrowLeft } from "react-icons/fa";

export default function BackButton(props) {
  return (
    <button
      className="
        m-2
        w-34
        h-10
        flex items-center justify-center gap-2
        bg-blue-500
        cursor-pointer
        rounded
        hover:bg-blue-700
        text-white
        font-bold
        px-2
      "
    >
      <FaArrowLeft className="text-white" />
      {props.text}
    </button>
  );
}
