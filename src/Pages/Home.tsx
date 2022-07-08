import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../Context/ContextProvider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import styles from "./Home.module.scss";

const Home = () => {
  const [spaces, setSpaces] = useState<string>("");
  const contexts: any = useContext(Context);
  const navigation = useNavigate();

  const handleSubmit = async () => {
    let array = [];
    for (let i = 0; i < parseInt(spaces); i++) {
      let object = {
        id: i + 1,
        RegNo: "",
        SpaceNo: "",
        checkIn: "",
        checkOut: "",
        available: true,
      };
      await array.push(object);
    }
    await contexts.setParking(array);
    navigation("/dashboard");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <TextField
          data-testid="Parking-create-text-input"
          variant="outlined"
          label="Enter a number"
          value={spaces}
          onChange={(e) => {
            setSpaces(e.target.value);
          }}
        />
        <Button
          data-testid="Parking-create-submit-button"
          variant="contained"
          color="primary"
          disabled={!spaces}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Home;
