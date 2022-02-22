import React, { useContext, useEffect, useRef, useState } from "react";
import { HttpRequestContext } from "../../context/HttpRequest";
import "./headerstabview.css";

function HeadersTabView() {
  const { reqObj, updateReqObj } = useContext(HttpRequestContext);

  const [refresh, setRefresh] = useState(false);
  const httpHeadersRef = useRef([
    {
      key: "",
      value: "",
    },
  ]);

  const handleKeyChange = (e) => {
    handleUpdateHttpHeadersRef({
      type: "key",
      payload: {
        key: e.target.value,
        index: e.target.dataset.idx,
      },
    });
  };
  const handleValueChange = (e) => {
    handleUpdateHttpHeadersRef({
      type: "value",
      payload: {
        value: e.target.value,
        index: e.target.dataset.idx,
      },
    });
  };

  // UPDATE HEADERS
  const handleUpdateHttpHeadersRef = ({ type, payload }) => {
    let prev = httpHeadersRef.current;
    if (type === "key") {
      prev[payload.index] = { ...prev[payload.index], key: payload.key };
    }
    if (type === "value") {
      prev[payload.index] = { ...prev[payload.index], value: payload.value };
    }
    httpHeadersRef.current = prev;
    setRefresh(!refresh);
  };

  // ADD HEADERS
  const handleAddMoreHttpHeader = () => {
    const prevHeaders = httpHeadersRef.current;
    prevHeaders.push({
      key: "",
      value: "",
    });

    httpHeadersRef.current = prevHeaders;
    setRefresh(!refresh);
  };

  // REMOVE HEADERS
  const handleRemoveHttpHeader = (deleteIdx) => {
    const prevQp = httpHeadersRef.current;
    httpHeadersRef.current = prevQp.filter((item, idx) => idx !== deleteIdx);
    setRefresh(!refresh);
  };

  useEffect(() => {
    updateReqObj(reqObj, { httpHeaders: httpHeadersRef.current });
  }, [refresh]);

  return (
    <>
      <div className="header">
        <span className="title">Http Headers</span>
        <div className="add-more-btn-box">
          <span onClick={handleAddMoreHttpHeader}>Add More</span>
        </div>
      </div>
      {/* list */}
      <section className="fields-section">
        {httpHeadersRef.current.map((item, idx) => (
          <div key={idx} className="field">
            <div className="row">
              <input
                type="text"
                placeholder="field Key"
                value={item?.key}
                data-idx={idx}
                onChange={handleKeyChange}
              />
              <input
                type="text"
                placeholder="field Value"
                value={item?.value}
                data-idx={idx}
                onChange={handleValueChange}
              />
            </div>
            <div className="delete-btn__box">
              <span onClick={() => handleRemoveHttpHeader(idx)}>x</span>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export default HeadersTabView;
