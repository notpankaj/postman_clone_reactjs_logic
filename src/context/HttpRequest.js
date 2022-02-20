import React, { useState, createContext } from "react";

const HttpRequestContext = createContext();

const HttpRequest = ({ children }) => {
  const [reqObj, setReqObj] = useState({
    httpMethod: "GET",
    endpoint: "",
    queryParams: {},
    formData: {},
    binaryData: {},
    httpHeaders: {},
  });

  const updateReqObj = (prevReqObj, newReqObj) => {
    setReqObj({ ...prevReqObj, ...newReqObj });
  };

  return (
    <HttpRequestContext.Provider value={{ reqObj, updateReqObj }}>
      {children}
    </HttpRequestContext.Provider>
  );
};

export default HttpRequest;
export { HttpRequestContext };
