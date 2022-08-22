import React, { useState } from "react";
import "../pages/css/modal.css";

function Popup(props: string) {
  if (props === "success") {
    return (
      <div className="popup">
        <div className="popup-inner">
          <h3>Login successful!</h3>
          <button className="close.btn">Close</button>
        </div>
      </div>
    );
  } else if (props === "fail") {
    return (
      <div className="popup">
        <div className="popup-inner">
          <h3>Invalid details.</h3>
          <button className="close.btn">Close</button>
        </div>
      </div>
    );
  }
}

export { Popup };
