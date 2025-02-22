import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authServiceAppwrite from "../../appwrite/auth";
import { logout as storeLogout } from "../../store/authSlice";

function LogoutMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const confirmation = confirm("Are you sure logout this session?");
      if (confirmation) {
        const sessionDeleted = await authServiceAppwrite.deleteSessions();
        if (sessionDeleted) {
          dispatch(storeLogout());
          toast.success("Logout Successfully");
          navigate("/");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="absolute md:right-0 left-0 mt-2 w-48 bg-white text-gray-800 border rounded shadow-lg">
        <div className="py-2 flex flex-col ">
          <Link to="/profile" className="hover:bg-gray-100 py-2 px-2">
            Profile
          </Link>
          <Link to="/orderView" className="hover:bg-gray-100 py-2 px-2">
            Order
          </Link>
          <Link className="hover:bg-gray-100 py-2 px-2" onClick={logout}>
            Logout
          </Link>
        </div>
      </div>
    </>
  );
}

export default LogoutMenu;
