import React, { useEffect, useState } from "react";
import "./Profile.css";
import config from "../../config.json";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/");
      }
      const {request} = await axios.post(
        `${config.apiUrl}`,
        {},
        { withCredentials: true }
      );
      const { status, user } = request;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/");
  };
  return (
    <>
      <div className="Profile">
        <div className="home_page">
          <h4>
            Welcome <span>{username}</span>
          </h4>
          <button onClick={Logout}>LOGOUT</button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Profile;
