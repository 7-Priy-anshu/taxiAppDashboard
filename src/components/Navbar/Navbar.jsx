import { useState } from "react";
import { FaBars } from "react-icons/fa";
import ProfileDropdown from "../ProfileDropdown"

export default function Navbar({ onMenuClick }){
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);

  return (
    // <header className="w-full h-16 bg-blue-50 flex items-center justify-between px-4 sm:shrink-0 md:shrink-0 px-8 shadow-md">
    <header className="w-full h-16 bg-blue-50 flex items-center justify-between max-md:px-1  px-4 sm:shrink-0 md:shrink-0  shadow-md">
      {/* <div className="flex items-center gap-4"> */}
      <div className="flex items-center  sm:gap-2 gap-2">
        {/* Hamburger menu (only mobile) */}
        <button className="md:hidden text-2xl text-gray-600 m-4" onClick={onMenuClick}>
          <FaBars />
        </button>

        {/* Logo */}
        <img
          src="/images/taxiLogo.png"
          alt="Logo"
          className="rounded-full w-10 h-10 object-cover cursor-pointer"
        />
        <div className="text-2xl max-sm:text-lg font-bold text-gray-700 cursor-pointer">Taxi App</div>
      </div>

      {/* Profile icon */}
      <div className="flex items-center max-md:pr-2">
        <img
          src="/images/userIcon.png"
          alt="User"
          onClick={toggleDropdown}
          className="rounded-full w-10 h-10 object-cover cursor-pointer"
        />
        {isDropdownVisible && <ProfileDropdown />}
      </div>
    </header>
  );
};

