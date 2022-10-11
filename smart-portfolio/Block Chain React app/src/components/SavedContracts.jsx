import React, { Suspense, useEffect, useState } from "react";
import { Container } from "@mui/material";

import { getContractInfo } from "./API_Ganache";

import SavedContractsTable from "./SavedContractsTable";

export default function SavedContracts() {
  // const [allContracts, setAllContracts] = useState([]);
  const [contractValues, setcontractValues] = useState([]);

  useEffect(() => {
    // Reading all Contracts from the blockchain
    // AllContracts().then((value) => setAllContracts(value));

    // Reading all Contracts Values from the blockchain
    getContractInfo().then((value) => setcontractValues(value));
  }, []);

  return (
    <>
      <Suspense>
        <Container maxWidth="">
          <h1 style={{ textAlign: "center" }}>All CV's in blockchain</h1>
          <div>
            <SavedContractsTable data={contractValues} />
          </div>
        </Container>
      </Suspense>
    </>
  );
}
