import React, { useContext } from "react";
import MethodSelectorInput from "../methodSelectorInput/MethodSelectorInput";
import "./urlBar.css";
import { HttpRequestContext } from "../../context/HttpRequest";
const UrlBar = () => {
  const { reqObj, updateReqObj } = useContext(HttpRequestContext);

  const handleEndpointChange = (e) => {
    updateReqObj(reqObj, { endpoint: e.target.value });
  };

  const handleSubmitHttpReq = () => {
    console.log({ reqObj });
    alert(JSON.stringify(reqObj));
  };

  return (
    <header className="urlbar">
      <div className="container">
        <MethodSelectorInput />
        <input
          value={reqObj?.endpoint}
          type="text"
          onChange={handleEndpointChange}
          className="urlbar__endpoint-input"
        />
        <button className="urlbar__sendbtn" onClick={handleSubmitHttpReq}>
          Send
        </button>
      </div>
    </header>
  );
};

export default UrlBar;
