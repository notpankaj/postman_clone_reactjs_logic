import React from "react";

const defaultValue = `raw text...`;
const TextBodyView = () => {
  const [jsonData, setJsonData] = React.useState(defaultValue);
  return (
    <>
      <textarea
        style={{
          width: "100%",
          height: "70%",
          outline: "none",
          border: "none",
        }}
        value={jsonData}
        onChange={(e) => setJsonData(e.target.value)}
      ></textarea>
    </>
  );
};
export default TextBodyView;
