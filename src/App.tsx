import { ContextProvider } from "./Context/ContextProvider";
import styles from "./App.module.scss";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import Checkout from "./Pages/Checkout";
import Payment from "./Pages/Payment";
import Register from "./Pages/Register";

const App = () => {
  return (
    <div className={styles.background}>
      <header>
        <ContextProvider>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/checkout" element={<Checkout />}></Route>
            <Route path="/payment" element={<Payment />}></Route>
          </Routes>
        </ContextProvider>
      </header>
    </div>
  );
};

export default App;
