import React, { useState, useRef, useContext, useEffect } from "react";
import "./querytabview.css";
import { HttpRequestContext } from "../../context/HttpRequest";

function QueryTabView() {
  const { reqObj, updateReqObj } = useContext(HttpRequestContext);

  const [refresh, setRefresh] = useState(false);
  const queryParamsRef = useRef([
    {
      key: "",
      value: "",
    },
  ]);

  const handleKeyChange = (e) => {
    hanldePushToQp({
      type: "key",
      payload: {
        key: e.target.value,
        index: e.target.dataset.idx,
      },
    });
  };
  const handleValueChange = (e) => {
    hanldePushToQp({
      type: "value",
      payload: {
        value: e.target.value,
        index: e.target.dataset.idx,
      },
    });
  };

  const handleBuildQuery = () => {
    if (!queryParamsRef.current) return;
    let str = "?";
    queryParamsRef.current.forEach(({ key, value }) => {
      if (key) {
        str += `${key}=${value}&`;
      }
    });
    if (str[str.length - 1] === "&") {
      str = str.substring(0, str.length - 1);
    }

    let endpoint = reqObj.endpoint;
    if (endpoint.trim() !== "") {
      if (endpoint.indexOf("?")) {
        const newEndpoint = endpoint.slice(0, endpoint.indexOf("?"));
        updateReqObj(reqObj, { endpoint: `${newEndpoint}${str}` });
      } else {
        updateReqObj(reqObj, { endpoint: `${endpoint}${str}` });
      }
    }
  };
  const hanldePushToQp = ({ type, payload }) => {
    let prev = queryParamsRef.current;
    if (type === "key") {
      prev[payload.index] = { ...prev[payload.index], key: payload.key };
    }
    if (type === "value") {
      prev[payload.index] = { ...prev[payload.index], value: payload.value };
    }
    queryParamsRef.current = prev;
    setRefresh(!refresh);
    handleBuildQuery();
  };

  const handleAddMoreQueryParams = () => {
    const prevQp = queryParamsRef.current;
    prevQp.push({
      key: "",
      value: "",
    });

    queryParamsRef.current = prevQp;
    setRefresh(!refresh);
  };

  const handleRemoveQueryParam = (deleteIdx) => {
    const prevQp = queryParamsRef.current;
    queryParamsRef.current = prevQp.filter((item, idx) => idx !== deleteIdx);
    setRefresh(!refresh);
    handleBuildQuery();
  };

  useEffect(() => {
    updateReqObj(reqObj, { queryParams: queryParamsRef.current });
  }, [refresh]);

  return (
    <section>
      <div className="header">
        <span className="title">Query Parameters</span>
        <div className="add-more-btn-box">
          <span onClick={handleAddMoreQueryParams}>Add More</span>
        </div>
      </div>
      {/* list */}
      <section className="fields-section">
        {queryParamsRef.current.map((item, idx) => (
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
              <span onClick={() => handleRemoveQueryParam(idx)}>x</span>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}

export default QueryTabView;
