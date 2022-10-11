import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { getConnectedCV } from "../API_Ganache";

// Modal to link a new cv
import LinkCVModal from "./LinkCVModal";

import { useAlert } from "react-alert";

import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #614385 30%, #516395 90%)",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "#ff66ff",
  },
  style: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: 800,
    width: 800,
    background: "linear-gradient(45deg, #614385 30%, #516395 90%)",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    color: "Menu",
  },
});

const style = {
  p: 4,
};
export default function CVInfoModal(props) {
  // Variables to access the nested model
  const [modalShow, setModalShow] = useState(false);
  const [modelProps, setmodelProps] = useState(null);

  // Variable to stored the linked cv id
  const [linkedCV, setlinkedCV] = useState("");

  const alert = useAlert();

  if (props.selectedrow.cvid !== "") {
    getConnectedCV(props.selectedrow.cvid, props.selectedrow.owner).then(
      (result) => setlinkedCV(result)
    );
  }

  function handleClick() {
    if (linkedCV === "0x0000000000000000000000000000000000000000") {
      // Handle Creating a new cv
      setModalShow(true);
      setmodelProps(props.selectedrow);
    } else {
      // Handle going to the linked cv
      console.log("Linked CV: ", linkedCV);
      navigator.clipboard.writeText(linkedCV);
      alert.show("Copied To Clipboard", {
        timeout: 2000,
        type: "success",
      });
    }
  }
  const classes = useStyles();

  return (
    <div>
      <Modal
        open={props.show}
        onClose={props.onHide}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes.style} sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            align="center"
            component="h2"
            fontFamily={"cursive"}
            fontStyle={"initial"}
            fontSize={50}
          >
            CV Details
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            fontStyle={"normal"}
          >
            <strong>CV Address: </strong> {props.selectedrow.cvid}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            <strong> Owner Address: </strong>
            {props.selectedrow.owner}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            <strong> Upload Date: </strong>
            {props.selectedrow.date}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 10 }}>
            <strong>Name: </strong> {props.selectedrow.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            <strong> About Me </strong>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            {props.selectedrow.description}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            <strong> My Skills </strong>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            {props.selectedrow.skills}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            <strong> My Experience </strong>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1 }}>
            {props.selectedrow.experience}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 10 }}>
            <strong>Previous Link: </strong>
            {linkedCV === "0x0000000000000000000000000000000000000000"
              ? "No Linked CV"
              : linkedCV}
          </Typography>
          <Button
            style={{ top: "10%", right: "20px" }}
            color="primary"
            variant="contained"
            onClick={handleClick}
          >
            {linkedCV === "0x0000000000000000000000000000000000000000"
              ? "Create Link"
              : "Copy Linked Address"}
          </Button>
          <Button
            style={{ top: "10%" }}
            color="error"
            variant="contained"
            onClick={props.onHide}
          >
            Close Details
          </Button>
        </Box>
      </Modal>
      <LinkCVModal
        selectedrow={modelProps}
        show={modalShow}
        onHide={() => {
          setmodelProps(null);
          setModalShow(false);
        }}
      />
    </div>
  );
}
