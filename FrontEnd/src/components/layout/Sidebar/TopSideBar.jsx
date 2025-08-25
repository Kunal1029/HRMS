import React, { useState } from "react";
import "./sidebar.css";
import Logo from "../../logo/Logo";
import Input from "../../forms/Input";
import "./sidebar.css";
import Debounce from "../../common/Debounce";

function TopSideBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const dummySearchData = ["ks", "ps", "js", "ss", "pks", "s"];

  return (
    <div className="topside">
      <div className="">
        <Logo classLogo={"sidelogo"} logo="LOGO" />
      </div>
      <div>
        <div className="searchBar">
          <img src="/search.png" alt="" />
          <Input
            type="search"
            name="search"
            placeholder="Search"
            classInput="search-input"
            value={searchTerm}
            formType="search"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {searchTerm.length > 0 && (
          <div className="filterData">
            <Debounce
              inputText={searchTerm}
              data={dummySearchData}
              delay={500}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default TopSideBar;
