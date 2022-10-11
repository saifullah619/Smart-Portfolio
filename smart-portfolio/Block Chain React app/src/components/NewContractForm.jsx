import React, { useState, useEffect } from "react";

// Material UI Imports
import {
  FormControl,
  Input,
  InputLabel,
  Container,
  Grid,
  Button,
  MenuItem,
  Select,
  Box,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

// Importing Web3, ABI and bytecode
import Web3 from "web3";
import { CV_Storage_ABI, bytecode } from "../abi/config";

// Importing Timing library and Allaccounts from ganache api
import moment from "moment";
import { AllAccounts } from "./API_Ganache";

import { makeStyles } from "@mui/styles";

const ariaLabel = { "aria-label": "description" };

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #fdfbfb   10%, #ebedee 90%)",
    padding: "2px",
  },
});

export default function NewContractForm() {
  // variable to store all accounts
  const [accounts, setaccounts] = useState([]);
  // Defining varibles that the user will can add
  const [address, setaddress] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [experience, setexperience] = useState("");
  const [skills, setskills] = useState("");

  // Call useEffect to get and store all the accounts

  useEffect(() => {
    async function getAllAccounts() {
      await AllAccounts().then((value) => setaccounts(value));
    }

    getAllAccounts();
  }, []);

  // Defining handler methods for input
  function handleAddressChange(event) {
    setaddress(event.target.value);
  }
  function handleNameChange(event) {
    setname(event.target.value);
  }

  function handleDescriptionChange(event) {
    setdescription(event.target.value);
  }

  function handleExperienceChange(event) {
    setexperience(event.target.value);
  }

  function handleSkillsChange(event) {
    setskills(event.target.value);
  }

  async function uploadContract() {
    if (
      address === "" ||
      name === "" ||
      description === "" ||
      experience === "" ||
      skills === ""
    )
      return;

    console.log("Uploading Contract");

    const web3 = new Web3("http://localhost:7545");

    const newContract = new web3.eth.Contract(CV_Storage_ABI);
    const instance = await newContract
      .deploy({
        data: bytecode,
        arguments: [],
      })
      .send({
        from: address,
        gas: 6721975,
        gasPrice: "20000000000",
      });

    // const instance = newContract;

    const dateTime = moment().format("MMMM Do YYYY, h:mm:ss a").toString();

    await instance.methods
      .addCV(name, description, experience, skills, dateTime)
      .send({
        from: address,
        gas: 6721975,
        gasPrice: "20000000000",
      });
  }

  const classes = useStyles();
  return (
    <>
      <Container className={classes.root} maxWidth="sm">
        <h1
          style={{
            textAlign: "center",
            background: "#5b4f8b",
            color: "#ff66ff",
            margin: "0",
          }}
        >
          Upload New CV
        </h1>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          {/* Input Address of the User */}
          <Grid>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Address</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={address}
                label="Address"
                onChange={handleAddressChange}
              >
                {accounts.map((account, index) => {
                  return (
                    <MenuItem key={index} value={account}>
                      {account}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          {/* Input Name of the User */}
          <Grid>
            <FormControl fullWidth>
              <InputLabel htmlFor="component-simple" required={true}>
                Name
              </InputLabel>
              <Input
                inputProps={ariaLabel}
                value={name}
                onChange={handleNameChange}
              />
            </FormControl>
          </Grid>
          {/* Input Description of the User */}
          <Grid>
            <FormControl fullWidth>
              <InputLabel htmlFor="component-simple" required={true}>
                Description
              </InputLabel>
              <Input
                value={description}
                inputProps={ariaLabel}
                onChange={handleDescriptionChange}
              />
            </FormControl>
          </Grid>
          {/* Input Experience of the User */}
          <Grid>
            <FormControl fullWidth>
              <InputLabel htmlFor="component-simple" required={true}>
                Experience
              </InputLabel>
              <Input
                value={experience}
                inputProps={ariaLabel}
                onChange={handleExperienceChange}
              />
            </FormControl>
          </Grid>
          {/* Input Skills of the User */}
          <Grid>
            <FormControl fullWidth>
              <InputLabel htmlFor="component-simple" required={true}>
                Skills
              </InputLabel>
              <Input
                value={skills}
                inputProps={ariaLabel}
                onChange={handleSkillsChange}
              />
            </FormControl>
          </Grid>
          <Button
            variant="contained"
            onClick={uploadContract}
            endIcon={<SendIcon />}
          >
            Upload
          </Button>
        </Box>
      </Container>
    </>
  );
}
