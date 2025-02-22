import {
  Bars3BottomRightIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleModal } from "../../store/LoginSlice";
import { toggleSignupModal } from "../../store/signupSlice";

import UserPhoto from "./UserPhoto";
function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const Links = [
    { name: "Investor Relations", link: "#", active: true },
    {
      name: "Add resturant",
      link: "/add-resturant",
      active: true,
    },
    {
      name: "Log in",
      action: () => dispatch(toggleModal()),
      active: !authStatus,
    },
    {
      name: "Sign up",
      action: () => dispatch(toggleSignupModal()),
      active: !authStatus,
    },
    {
      name: "Cart",
      link: "/cart",
      active: authStatus,
      icon: <ShoppingCartIcon className="h-8 w-8 text-blue-500" />,
    },
  ];

  const [isNavOpen, setIsNavOpen] = useState(false);
  const modalIsOpen = useSelector((state) => state.login.modalIsOpen);
  const dispatch = useDispatch();
  return (
    <div className=" w-full md:absolute fixed top-0 left-0 z-[99] mb-20 bg-red-800 md:bg-transparent ">
      <div className="md:flex justify-between items-center py-4 px-7 md:px-24">
        <div className="flex cursor-pointer items-center">
          {/* <Logo height="8" /> */}
          <Link to="/">
            {" "}
            <img
              src="/images/Zomato-Logo.png"
              alt="Zomato Logo"
              className={`h-7 w-auto`}
            />
          </Link>
        </div>

        {/* MOBILE SCREEN VIEW BUTTON */}
        <div
          className="w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden text-white "
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          {isNavOpen ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>

        {/* DESKTOP SCREEN VIEW NAV LIST */}
        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto pl-9 md:pl-0  transition-all md:bg-transparent bg-red-800 text-white duration-500 ease-in py-14 md:py-0 ${
            isNavOpen ? "top-0" : "top-[-490px] "
          }`}
        >
          {Links.map((link) =>
            link.active ? (
              <li
                className="text-xl my-7 md:my-0 md:ml-8 transition-all duration-200 ease-in"
                key={link.name}
                onClick={link.action}
              >
                <span className="flex gap-1">
                  {link.icon ? <div>{link.icon}</div> : ""}
                  <Link to={link.link}>{link.name}</Link>
                </span>
              </li>
            ) : null
          )}
          {authStatus && (
            <li className="md:ml-8 ml-0 flex">
              <UserPhoto />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Header;
