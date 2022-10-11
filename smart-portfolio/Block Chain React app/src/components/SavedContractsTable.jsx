import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import CVInfoModal from "./modals/CVInfoModal";

import "./styles/style.css";

const columns = [
  { field: "id", headerName: "S.No :", width: 70 },
  { field: "cvid", headerName: "CV id", width: 400 },
  { field: "owner", headerName: "Owner Address", width: 400 },
  { field: "name", headerName: "Owner Name", width: 150 },
  {
    field: "experience",
    headerName: "Experience",
    width: 100,
  },
  {
    field: "skills",
    headerName: "Skills",
    width: 450,
  },
  {
    field: "date",
    headerName: "Upload Date",
    width: 250,
  },
];

export default function SavedContractsTable(props) {
  const [dummyData] = useState({
    id: "",
    cvid: "",
    owner: "",
    name: "",
    description: "",
    experience: "",
    skills: "",
    date: "",
  });

  const [modalShow, setModalShow] = useState(false);
  const [selectedRow, setselectedRow] = useState(dummyData);

  var rows = props.data;

  var data = [];
  let iter = 1;
  for (const property in rows) {
    data.push({
      id: iter++,
      cvid: property,
      owner: rows[property].owner,
      name: rows[property].name,
      description: rows[property].description,
      experience: rows[property].experience,
      skills: rows[property].skills,
      date: rows[property].date,
    });
  }
  return (
    <div style={{ height: 630, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick={true}
        rowsPerPageOptions={[10]}
        onRowClick={(selected) => {
          setModalShow(true);
          setselectedRow(selected.row);
        }}
      />
      <CVInfoModal
        selectedrow={selectedRow}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}
