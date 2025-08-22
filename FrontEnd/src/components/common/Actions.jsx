import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./common.css";

function Actions({ items = [] }) {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const ref = useRef(null);

  useEffect(() => {
    if (show && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const dropdownWidth = 180; // fixed min width
      const spaceRight = window.innerWidth - rect.right;

      let left = rect.left + window.scrollX;
      if (spaceRight < dropdownWidth) {
        // not enough space on right → flip to left
        left = rect.right - dropdownWidth + window.scrollX;
      }

      setCoords({
        top: rect.bottom + window.scrollY + 6,
        left,
        width: dropdownWidth,
      });
    }
  }, [show]);

  const portalRoot = document.getElementById("portal-root");

  return (
    <>
      <div className="dropdown" ref={ref} onClick={() => setShow(!show)}>
        <div className="actions">
          <img src="/Iconactions.png" alt="actions" />
        </div>
      </div>

      {show &&
        portalRoot &&
        ReactDOM.createPortal(
          <ul
            className="action-dropdown"
            style={{
              position: "absolute",
              top: coords.top,
              left: coords.left,
              minWidth: coords.width,
              zIndex: 9999,
            }}
          >
            {items.map((x, i) =>
              x.item ? (
                <li
                  key={i}
                  className="action-option"
                  onClick={() => {
                    setShow(false);
                    x.item ? x.fn() : "";
                  }}
                >
                  {x.item }
                </li>
              ) : (
                <li
                  key={i}
                  className="action-option"
                  
                >
                  {x.compo}
                </li>
              )
            )}
          </ul>,
          portalRoot
        )}
    </>
  );
}

export default Actions;
