import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, [accessToken, navigate]);

  return (
    <div>
      <div>
        <Link to="/login">Log out</Link>
      </div>
      <img
        alt="Very mysterious content"
        src="https://i-viaplay-com.akamaized.net/viaplay-prod/701/548/1565958307-721566eb8de7d3222993a5bc884f6719889facee.jpg?width=1600&height=900"
      />
      <h1>Welcome registered user......This is our secret content</h1>
    </div>
  );
};

export default Main;
