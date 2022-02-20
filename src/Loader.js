import React from "react";
import { BoltLoader } from "react-awesome-loaders";

const Loader = () => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "transparent",
        zIndex: 10000000000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BoltLoader
        className={"loaderbolt"}
        // boltColor={"#6366F1"}
        boltColor={"red"}
        // backgroundBlurColor={"#E0E7FF"}
        backgroundBlurColor={"red"}
        // size={"64px"}
        desktopSize={"64px"}
        mobileSize={"64px"}
      />
    </div>
  );
};
export default Loader;
