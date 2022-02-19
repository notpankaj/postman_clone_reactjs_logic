import React, { useRef, useState } from "react";

const Main = () => {
  const [uri, setUri] = useState("");

  const queryParamsRef = useRef([
    {
      key: "",
      value: "",
    },
  ]);
  const [refresh, setRefresh] = useState(false);

  const handleUriChange = (e) => {
    setUri(e.target.value);
  };

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

    let endpoint = uri;
    if (endpoint.trim() !== "") {
      if (endpoint.indexOf("?")) {
        const newEndpoint = endpoint.slice(0, endpoint.indexOf("?"));
        setUri(`${newEndpoint}${str}`);
      } else {
        setUri(`${endpoint}${str}`);
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
  };

  return (
    <>
      <div>
        <button onClick={handleAddMoreQueryParams}>ADD MORE</button>
        <input
          type="text"
          value={uri}
          placeholder="endpoint"
          onChange={handleUriChange}
          style={{ width: "100%", margin: "10px" }}
        />
      </div>
      {/* query params */}
      <div>
        {queryParamsRef.current.map((item, idx) => (
          <div key={idx}>
            <span>Key</span>
            <input
              type="text"
              value={item?.key}
              data-idx={idx}
              onChange={handleKeyChange}
            />
            <span>Value</span>
            <input
              type="text"
              value={item?.value}
              data-idx={idx}
              onChange={handleValueChange}
            />
            <button onClick={() => handleRemoveQueryParam(idx)}>DELETE</button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Main;
