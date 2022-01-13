import React, { useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import user from '../reducers/user'

const Main = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const logout = () => {
    batch(() => {
        dispatch(user.actions.setUsername(null))
        dispatch(user.actions.setAccessToken(null))

        //localStorage.removeItem('user')
    })
}
  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken, navigate]);

  
  return (
    <div>
      <div>
        <Link to="/" onClick={logout}>Log out</Link>
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
