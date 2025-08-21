import React, { useState } from "react";
import "./common.css";

function Actions({ items = [] }) {
  const [show, setShow] = useState(false);


  return (
    <div className="dropdown">
      <div className="actions" onClick={() => setShow(!show)}>
        <img src="/Iconactions.png" alt="" />
      </div>

      {show &&
        items.map((x, i) => (
          <div key={i}>
            <button onClick={() => x.fn()}>{x.item}</button>
          </div>
        ))}
    </div>
  );
}

export default Actions;
