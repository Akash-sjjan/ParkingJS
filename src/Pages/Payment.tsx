import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import Context from "../Context/ContextProvider";
import Button from "@mui/material/Button";
import styles from "./Payment.module.scss";

const Payment = () => {
  const location: any = useLocation();
  const { id } = location?.state;
  const contexts = useContext(Context);
  const navigate = useNavigate();

  const updateParking = async (id: any) => {
    await contexts.setParking(
      contexts.parking?.map((data: any, index: number) => {
        if (id === data.id) {
          return {
            ...data,
            RegNo: "",
            spaceNo: "",
            checkIn: "",
            checkOut: "",
            available: true,
          };
        } else {
          return data;
        }
      })
    );
  };

  const navigateToDashboard: any = () => {
    navigate("/dashboard");
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Typography>Payment Successful.</Typography>
        <Button
          data-testid="goto-dashboard-btn"
          style={{ textTransform: "none" }}
          variant="contained"
          color="primary"
          onClick={async () => {
            await updateParking(id);
            navigateToDashboard();
          }}
        >
          Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Payment;
