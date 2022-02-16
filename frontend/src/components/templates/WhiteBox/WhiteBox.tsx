import "./WhiteBox.scss";

import React from "react";

interface Props {
  children?: React.ReactNode;
  additionalStyle?: Object;
}

const WhiteBox: React.FC<Props> = ({ children, additionalStyle }) => {
  return (
    <div className={"white-box"} style={additionalStyle}>
      {children}
    </div>
  );
};

export default WhiteBox;
