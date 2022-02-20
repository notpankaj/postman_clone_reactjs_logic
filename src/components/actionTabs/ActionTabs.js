import React, { useState } from "react";
import BodyTabView from "../bodytabview/BodyTabView";
import HeadersTabView from "../headerstabview/HeadersTabView";
import QueryTabView from "../querytabview/QueryTabView";
import "./actionTabs.css";

const Tabs = ["Query", "Headers", "Body"];
const ActionTabs = () => {
  const [activeTab, setActiveTab] = useState(Tabs[0]);

  console.log({ activeTab });
  return (
    <div className="action-tabs__conatiner">
      <div className="action-tabs__tab-box">
        <ul className="action-tab__list">
          {Tabs.map((item) => (
            <li
              key={item}
              onClick={() => setActiveTab(item)}
              className={`action-tab__list-item ${
                activeTab === item && "active"
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="tab-view">
        {activeTab === Tabs[0] && <QueryTabView />}
        {activeTab === Tabs[1] && <HeadersTabView />}
        {activeTab === Tabs[2] && <BodyTabView />}
      </div>
    </div>
  );
};
export default ActionTabs;
