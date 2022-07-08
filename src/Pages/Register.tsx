import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../Context/ContextProvider";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import styles from "./Register.module.scss";

const Register = () => {
  const [input, setInput] = useState<string>("");
  const contexts: any = useContext(Context);
  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate("/dashboard");
  };

  const handleRegisterVehicle = async () => {
    let freeSpace: number = await contexts.parking.findIndex((data: any) => data.available === true);
    await contexts.setParking(
      contexts.parking.map((data: any, index: number) => {
        if (freeSpace + 1 === data.id) {
          return {
            ...data,
            spaceNo: data.id,
            available: false,
            checkIn: new Date(),
            RegNo: input,
          };
        } else return data;
      })
    );
    setInput("");
  };
  return (
    <div className={styles.container}>
      <Button
        data-testid="cancel_btn"
        name="Back"
        size="small"
        variant="contained"
        color="primary"
        style={{
          textTransform: "none",
          position: "absolute",
          top: "4%",
          left: "4%",
        }}
        onClick={async () => {
          await setInput("");
          navigateToDashboard();
        }}
      >
        Back
      </Button>
      <div
        style={{
          display: "flex",
        }}
      >
        <TextField
          data-testid="parking-drawing-registration-input"
          id="outlined-basic"
          variant="outlined"
          label="Enter Vehicle Number"
          autoComplete="off"
          value={input}
          style={{ margin: "5%" }}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <Button
          data-testid="parking-drawing-add-carbutton"
          variant="contained"
          color="primary"
          disabled={!input}
          style={{ margin: "5%" }}
          onClick={async () => {
            await handleRegisterVehicle();
            navigateToDashboard();
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Register;
