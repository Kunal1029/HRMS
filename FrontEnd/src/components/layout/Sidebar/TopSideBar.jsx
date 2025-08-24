import React from "react";
import "./sidebar.css";
import Logo from "../../logo/Logo";
import Input from "../../forms/Input";
import "./sidebar.css"

function TopSideBar() { 
  return ( 
    <div className="topside">
      <div className="">
        <Logo classLogo={"sidelogo"} logo="LOGO" />
      </div>

      <div className="searchBar">
        <img src="/search.png" alt="" />
        <Input
          type="search"
          name="search"
          placeholder="Search"
          classInput="search-input"
          // value=""
          formType="search"
          onChange={() => {}}
        />
      </div>
    </div>
  );
}

export default TopSideBar;
