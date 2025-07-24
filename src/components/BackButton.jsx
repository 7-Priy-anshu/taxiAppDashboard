import { FaArrowLeft } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

export default function BackButton(props) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/superAdmin/dashboard')}
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
