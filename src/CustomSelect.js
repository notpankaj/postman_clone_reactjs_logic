import React, { useState } from "react";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
const CustomSelect = () => {
  const [selectMethod, setSelectMethod] = useState("GET");

  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const toggleOptions = (bool) => setIsOptionsVisible(bool);
  const handleSelectMethod = (Method = "GET") => {
    setSelectMethod(Method);
    toggleOptions(false);
  };
  return (
    <>
      <div style={{ padding: "50px" }}>
        {/* lable */}
        <div
          style={{
            position: "relative",
            width: "100px",
            height: "50px",
            background: "blue",
          }}
        >
          <span
            style={{
              opacity: 0.5,
              background: "pink",
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
            <span>{selectMethod}</span>
            <div
              style={{
                position: "absolute",
                right: 10,
              }}
            >
              {isOptionsVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
          </span>

          {isOptionsVisible && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#fff",
                position: "absolute",
                left: 0,
                right: 0,
                top: 50,
              }}
            >
              <span onClick={() => handleSelectMethod("GET")}>GET</span>
              <span onClick={() => handleSelectMethod("POST")}>POST</span>
              <span onClick={() => handleSelectMethod("PUT")}>PUT</span>
              <span onClick={() => handleSelectMethod("DELETE")}>DELETE</span>
            </div>
          )}
        </div>
        {/* options */}
      </div>
    </>
  );
};

export default CustomSelect;
