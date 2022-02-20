import React from "react";
import MethodSelectorInput from "../methodSelectorInput/MethodSelectorInput";
import "./urlBar.css";
const UrlBar = () => {
  return (
    <header className="urlbar">
      <div className="container">
        <MethodSelectorInput />
        <input type="text" className="urlbar__endpoint-input" />
        <button className="urlbar__sendbtn">Send</button>
      </div>
    </header>
  );
};

export default UrlBar;
