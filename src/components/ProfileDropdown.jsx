import { useNavigate } from "react-router-dom";
export default function ProfileDropdown(){
    const navigate = useNavigate(); 
    const handleLogout =  () => {
         localStorage.removeItem('isAuthenticated'); // Remove auth flag
         navigate('/');
    };

    return (
    <div className='flex flex-col w-36 bg-blue-300 p-2 top-12 right-2 m-2 absolute rounded text-black'>
       <ul className='flex flex-col'>
          <li className='flex-col p-1 hover:bg-blue-500 rounded text-white'>Profile</li>
          <li className='flex-col p-1 hover:bg-blue-500 rounded text-white'>Setting</li>
          <li className='flex-col p-1 cursor-pointer hover:bg-blue-500 rounded text-white' type="submit" onClick={handleLogout}>Logout</li>
       </ul>
    </div>
  )
}

