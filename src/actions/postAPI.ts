import axios from "axios";

export const postVehicleDetails: any = async (vehicle: any, price: number) => {
  const response = await fetch("https://httpstat.us/200", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: `{ "car-registration": ${vehicle}, "charge": ${price} }`,
  });
  response.json().then((data) => {
    alert(`${data.code}, ${data.description}`);
  });
};
