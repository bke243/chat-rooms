import "./WelcomePage.scss";

import React from "react";
import WhiteBox from "../../templates/WhiteBox/WhiteBox";

const WelcomePage: React.FC = () => {
  return (
    <div className={"welcome-page"}>
      <WhiteBox additionalStyle={{ width: "fit-content" }}>Hello</WhiteBox>
    </div>
  );
};

export default WelcomePage;
