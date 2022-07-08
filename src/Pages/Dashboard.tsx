import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../Context/ContextProvider";
import Button from "@mui/material/Button";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const navigate = useNavigate();
  const contexts: any = useContext(Context);

  const handleRegister = async () => {
    let parkedVehicle = await contexts.parking.filter((data: any) => data.available === false);
    if (parkedVehicle.length === contexts.parking.length) {
      alert("Full: No Parking Space is available");
    } else {
      navigate("/register");
    }
  };

  const handleCheckout = async (id: any) => {
    await contexts.setParking(
      contexts.parking.map((data: any) => {
        if (id === data.id) {
          return {
            ...data,
            checkOut: new Date(),
          };
        } else return data;
      })
    );
    navigate(`/checkout`, {
      state: {
        id: id,
      },
    });
  };

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <div className={styles.header}>
          <Button
            name="Back"
            size="small"
            style={{
              textTransform: "none",
              position: "relative",
            }}
            variant="contained"
            color="primary"
            onClick={() => {
              navigate("/");
            }}
            data-testid="back-btn-dashboard"
          >
            Back
          </Button>
          <Button
            name="Vehicle Registration"
            size="small"
            style={{
              textTransform: "none",
              position: "relative",
            }}
            variant="contained"
            color="primary"
            onClick={() => {
              handleRegister();
            }}
          >
            Vehicle Registration
          </Button>
        </div>
        <div className={styles.card}>
          {contexts.parking?.length > 0 &&
            contexts.parking.map((data: any, index: number) => {
              return (
                <div className={styles.background} key={index} data-testid={`parking-drawing-space-${index}`}>
                  <div
                    className={styles.parkingSlotContainer}
                    data-testid={`parking-drawing-space-number-${index}`}
                  >
                    <div>lot ID: {data.id}</div>
                    <div> {data.RegNo ? data.RegNo : "Not Registered"}</div>
                  </div>
                  {!data.available && (
                    <Button
                      data-testid={`checkOutBtn-${index}`}
                      variant="contained"
                      color="primary"
                      style={{
                        width: "15px",
                        height: "30px",
                        bottom: "10%",
                        fontSize: "8px",
                        textTransform: "none",
                      }}
                      onClick={async () => {
                        await handleCheckout(data.id);
                      }}
                    >
                      Check out
                    </Button>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
