import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Context from "../Context/ContextProvider";
import Button from "@mui/material/Button";
import { postVehicleDetails } from "../actions/postAPI";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import styles from "./Checkout.module.scss";

const Checkout = () => {
  const [vehicle, setVehicle] = useState<any>([]);
  const [price, setPrice] = useState<number>();
  const location: any = useLocation();
  const { id } = location?.state;
  const contexts = useContext(Context);
  const navigation = useNavigate();

  async function priceCalculator(id: any) {
    const checkOut: any = contexts.parking[id - 1]["checkOut"];
    const checkIn: any = contexts.parking[id - 1]["checkIn"];
    await setVehicle(contexts.parking[id - 1]);
    let hours: number = Math.ceil((+checkOut - +checkIn) / 1000 / 60 / 60);

    if (hours <= 2) {
      setPrice(10);
    } else {
      setPrice((hours - 1) * 10);
    }
  }

  const navigateToPayment = () => {
    navigation(`/payment`, {
      state: {
        id: id,
      },
    });
  };
  useEffect(() => {
    priceCalculator(id);
  }, []);

  return (
    <div className={styles.container}>
      <Button
        data-testid="deregister-back-button"
        variant="contained"
        color="primary"
        onClick={() => navigation("/dashboard")}
        style={{
          position: "absolute",
          left: "4%",
          top: "4%",
          textTransform: "none",
        }}
      >
        Back
      </Button>
      {Object.keys(vehicle).length > 0 && (
        <div data-testid="deregister-car-registration" className={styles.card}>
          <Card sx={{ minWidth: 275, margin: 1 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Space ID: {vehicle?.spaceNo}
              </Typography>
              <Typography>Vehicle Reg No: </Typography>
              <Typography variant="h5" component="div" data-testid="vehicle_no">
                {vehicle?.RegNo}
              </Typography>

              <Typography variant="body2">Check In:{vehicle?.checkIn.toString()}</Typography>
              <Typography id="deregister-time-spent" variant="body2">
                Check Out:{vehicle?.checkOut.toString()}
              </Typography>

              <Typography data-testid="deregister-charge">Price: ${price}</Typography>
            </CardContent>
          </Card>
          <Button
            data-testid="deregister-payment-button"
            variant="contained"
            color="primary"
            style={{ textTransform: "none" }}
            onClick={async () => {
              await postVehicleDetails(vehicle?.RegNo, price);
              navigateToPayment();
            }}
          >
            Pay ${price}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Checkout;
