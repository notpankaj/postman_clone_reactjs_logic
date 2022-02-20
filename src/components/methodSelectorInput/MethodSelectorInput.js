import React, { useState, useContext } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./methodSelectorInput.css";
import { HttpRequestContext } from "../../context/HttpRequest";
const MethodSelectorInput = () => {
  const { reqObj, updateReqObj } = useContext(HttpRequestContext);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const toggleOptions = (bool) => setIsOptionsVisible(bool);
  const handleSelectMethod = (Method = "GET") => {
    updateReqObj(reqObj, { httpMethod: Method });

    toggleOptions(false);
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          width: "100px",
          height: "38px",
          border: "1px solid #fff",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            paddingLeft: "15px",
            cursor: "pointer",
          }}
          onClick={() => toggleOptions(!isOptionsVisible)}
        >
          <span>{reqObj.httpMethod}</span>
          <div
            style={{
              position: "absolute",
              right: 10,
            }}
          >
            {isOptionsVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        </div>

        {isOptionsVisible && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#fff",
              position: "absolute",
              left: 0,
              right: 0,
              top: 38,
              border: "1px solid #fff",
              borderTop: "none",
            }}
          >
            <span
              style={{
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => handleSelectMethod("GET")}
            >
              GET
            </span>
            <span
              style={{
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => handleSelectMethod("POST")}
            >
              POST
            </span>
            <span
              style={{
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => handleSelectMethod("PUT")}
            >
              PUT
            </span>
            <span
              style={{
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => handleSelectMethod("DELETE")}
            >
              DELETE
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default MethodSelectorInput;
