import React, { useState } from "react";
import LoadingScren from "react-loading-screen";

import loadingGif1 from "./loading1.gif";
// import loadingGif2 from "./loading2.gif";
// import loadingGif3 from "./loading3.gif";

export default function LoadingScreen() {
  const [loadingGif] = useState(loadingGif1);

  return (
    <LoadingScren
      loading={true}
      bgColor="#f1f1f1"
      spinnerColor="orange"
      textColor="#676767"
      logoSrc={loadingGif}
      text={
        "Oh No!!! We couldn't connect to your ganache blockchain. Maybe try restarting your ganache client."
        // "Oh No!!! We couldn't connect with your mental facilities. Maybe try some sleep."
      }
    ></LoadingScren>
  );
}
