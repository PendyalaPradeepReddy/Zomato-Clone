import React, { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import LogoutMenu from "./LogoutMenu";

function UserPhoto() {
  const userData = useSelector((state) => state.auth.userData);

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="relative cursor-pointer" onClick={toggleMenu}>
      <div className=" flex justify-center items-center gap-1">
        <div className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full text-xl">
          {userData.name[0].toUpperCase()}
        </div>
        <div className="flex justify-center items-center">
          <h2 className=" text-lg">
            {userData.name.split(" ")[0].toUpperCase()}{" "}
            {/* name.split(" ")[0]userData.name string by space (' ') and returns an array of parts. Then it selects the first part ([0]) */}
          </h2>
          {showMenu ? (
            <RiArrowUpSLine className="h-6 w-6" />
          ) : (
            <RiArrowDownSLine className="h-6 w-6" />
          )}
        </div>
      </div>
      {showMenu && <LogoutMenu />}
    </div>
  );
}

export default UserPhoto;
