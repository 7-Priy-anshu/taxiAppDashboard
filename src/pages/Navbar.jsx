import ProfileDropdown from "./ProfileDropdown";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

export default function Navbar({ onMenuClick }){
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const toggleDropdown = () => setIsDropdownVisible((prev) => !prev);

  return (
    <header className="w-full h-16 bg-gray-100 flex items-center justify-between px-4 sm:shrink-0 md:shrink-0 px-8 shadow-md">
      <div className="flex items-center gap-4">
        {/* Hamburger menu (only mobile) */}
        <button className="md:hidden text-2xl text-gray-600" onClick={onMenuClick}>
          <FaBars />
        </button>

        {/* Logo */}
        <img
          src="../images/taxiLogo.png"
          alt="Logo"
          className="rounded-full w-10 h-10 object-cover"
        />
        <div className="text-2xl font-bold text-gray-700">Taxi App</div>
      </div>

      {/* Profile icon */}
      <div className="flex items-center">
        <img
          src="../images/userIcon.png"
          alt="User"
          onClick={toggleDropdown}
          className="rounded-full w-10 h-10 object-cover cursor-pointer"
        />
        {isDropdownVisible && <ProfileDropdown />}
      </div>
    </header>
  );
};

