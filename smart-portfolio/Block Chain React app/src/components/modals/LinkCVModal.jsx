import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Button,
  MenuItem,
  Select,
  Typography,
  Modal,
  Box,
} from "@mui/material";

import { getPersonCVs } from "../API_Ganache";
import { addLink } from "../API_Ganache";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: 400,
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function LinkCVModal(props) {
  const [valueSet, setvalueSet] = useState(false);
  const [allCVs, setallCVs] = useState([]);

  const [address, setaddress] = useState("");

  function handleAddressChange(event) {
    setaddress(event.target.value);
  }

  if (props.selectedrow === null && valueSet) {
    setvalueSet(false);
  }

  if (props.selectedrow !== null && !valueSet) {
    getPersonCVs(props.selectedrow.owner).then((result) => setallCVs(result));

    if (allCVs.length !== 0) setvalueSet(true);

    console.log(`All related CV's of ${props.selectedrow.name} are: `, allCVs);
  }

  // Handle what happens when clicked on add reference
  function handleLink() {
    // Link code here
    if (address === "") {
      console.log("Dont Link");
    } else {
      console.log("Link");
      addLink(props.selectedrow.cvid, address, props.selectedrow.owner).then(
        (result) => console.log(result)
      );
    }
  }

  return (
    <div>
      {props.selectedrow !== null ? (
        <Modal
          open={props.show}
          onClose={props.onHide}
          // onClose={setaddress("")}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h9" component="h2">
              Add Your Link here
            </Typography>
            <Typography id="modal-modal-title" sx={{ mt: 2 }}>
              <strong>Your Address: </strong>
              {props.selectedrow.owner}
            </Typography>
            <Typography id="modal-modal-title" sx={{ mt: 2 }}>
              <strong> Current CV Address: </strong>
              {props.selectedrow.cvid}
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ mt: 2 }}
            >
              <strong>Select CV to Link:</strong>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel id="demo-simple-select-label">
                  CV Address
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={address}
                  label="Address"
                  onChange={handleAddressChange}
                >
                  {allCVs.map((account, index) => {
                    return (
                      <MenuItem key={index} value={account}>
                        {account}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Typography>
            <Button
              style={{ top: "30%" }}
              color="primary"
              variant="contained"
              onClick={handleLink}
            >
              Link CV
            </Button>
          </Box>
        </Modal>
      ) : (
        <div></div>
      )}
    </div>
  );
}
