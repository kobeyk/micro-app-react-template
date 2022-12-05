import { Button } from "antd";
import React from "react";
import {useNavigate, Link, Outlet } from "react-router-dom";
import "./index.scss";

const IndexPage = () => {
  const navigate = useNavigate();
  const path2Login = () => {
    navigate("/login")
  }
  const path2MapView = () => {
    navigate("/map")
  }

  return (
    <div className="index-page">
      <h1>IndexPage</h1>
      <Button className="btn" type="primary" onClick={path2Login}>跳转到用户登录</Button>
      <Link to="/users" className="btn" type="primary" >跳转到用户列表</Link>
      <Button className="btn" type="primary" onClick={path2MapView}>跳转到地图可视化</Button>
      <hr />
      <Outlet />
    </div>
  );
};

export default IndexPage;
