import { useState } from "react";

import { AlertBoxContext } from "./context/AlertBoxContext";
import AlertComponent from "./component/alertComponent";
import RouterComponent from "./router/routerComponent";

function App() {
  const [message, setMessage] = useState({
    displayMessage: "",
    type: "success",
    isOpen: false,
  });

  const closeAlert = (): void => {
    setMessage({
      displayMessage: "",
      type: "success",
      isOpen: false,
    });
  };

  return (
    <AlertBoxContext.Provider value={{ message, setMessage }}>
      <RouterComponent></RouterComponent>
      <AlertComponent
        message={message}
        closeAlert={closeAlert}
      ></AlertComponent>
    </AlertBoxContext.Provider>
  );
}

export default App;
