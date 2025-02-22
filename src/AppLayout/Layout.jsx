import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authServiceAppwrite from "../appwrite/auth";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Loading from "../components/common/Loading";
import { login as storeLogin } from "../store/authSlice";
function Layout() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    authServiceAppwrite
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(storeLogin({ userData }));
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <Header />
      {loading ? <Loading /> : <Outlet />}
      <ToastContainer />
      <Footer />
    </>
  );
}

export default Layout;
