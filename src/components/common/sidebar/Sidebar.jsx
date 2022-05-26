import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import Article from "../../pages/article/Article";
import { Space } from "../../pages/space/Space";
import LeftSide from "../left-side/LeftSide";


const Sidebar = () => {
  return (
    <>
      <div class="main-section container">
        <div class="left-side">
          <LeftSide/>
        </div>
        <div class="middle-side">
          <Article />
        </div>
        <div className="right-side">
          <Space />
        </div>
      </div>

    </>
  );
};

export default Sidebar;
