import React, { useState } from "react";
import FormDataBodyView from "../formDataBodyView/FormDataBodyView";
import JsonBodyBox from "../jsonBodyBox/JsonBodyBox";
import TextBodyView from "../textBodyView/TextBodyView";
import "./bodytabview.css";

const dataTypeTab = ["JSON", "TEXT", "FROMDATA"];
function BodyTabView() {
  const [activeDataTypeTab, setActiveDataTypeTab] = useState(dataTypeTab[0]);

  const handleActiveDataTabChange = (tabName) => setActiveDataTypeTab(tabName);
  return (
    <>
      <div className="body-box">
        <ul className="row">
          <li
            onClick={() => handleActiveDataTabChange(dataTypeTab[0])}
            className="row-item"
          >
            JSON
          </li>
          <li
            onClick={() => handleActiveDataTabChange(dataTypeTab[1])}
            className="row-item"
          >
            Text
          </li>
          <li
            onClick={() => handleActiveDataTabChange(dataTypeTab[2])}
            className="row-item"
          >
            FormData
          </li>
        </ul>
        <div className="data-box">
          {activeDataTypeTab === dataTypeTab[0] && <JsonBodyBox />}
          {activeDataTypeTab === dataTypeTab[1] && <TextBodyView />}
          {activeDataTypeTab === dataTypeTab[2] && <FormDataBodyView />}
        </div>
      </div>
    </>
  );
}

export default BodyTabView;
