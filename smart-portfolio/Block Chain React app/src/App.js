import "./App.css";
import { useState } from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import NewContractForm from "./components/NewContractForm";
import SavedContracts from "./components/SavedContracts";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import { checkConnection } from "./components/API_Ganache";

import LoadingScreen from "./components/assets/Loading Screen/LoadingScreen";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #614385 30%, #516395 90%)",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "#ff66ff",
  },
});

function App() {
  const [apiConnected, setapiConnected] = useState(false);

  console.log(checkConnection().then((value) => setapiConnected(value)));

  const classes = useStyles();
  return (
    <AlertProvider
      template={AlertTemplate}
      containerStyle={{ zIndex: 100000 }}
      position="bottom center"
      transition="fade"
      offset="80px"
    >
      <StyledEngineProvider injectFirst>
        {apiConnected ? (
          <div className={classes.root}>
            <NewContractForm />
            <SavedContracts />
          </div>
        ) : (
          <LoadingScreen />
        )}
      </StyledEngineProvider>
    </AlertProvider>
  );
}

export default App;
