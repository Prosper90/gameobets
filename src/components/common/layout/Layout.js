import React, { useContext, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Notifiy from "../../notify/Notifiy";
import Preloader from "../../preloader/Preloader";
import Footer from "../../footer/Footer";
import Upcoming from "../../upcoming/Upcoming";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../../utils/contextShop";
import Result from "../../flipresult/Result";
import { useAddress } from "@thirdweb-dev/react";

function Layout({ children }) {
  const address = useAddress();
  const navigate = useNavigate();

  const { notify, loader, setNotify, setNotifyType, setNotifyMsg, flipResult } =
    useContext(ShopContext);
  useEffect(() => {
    if (!address) {
      setNotify(true);
      setNotifyType("warn");
      setNotifyMsg("Please connect your wallet to proceed");
      navigate("/");
    }
  }, [address]);

  return (
    <main className="bg-image h-full min-h-screen relative">
      <Navbar />

      {notify && <Notifiy />}

      {loader && <Preloader loader={loader} />}

      {flipResult && <Result />}
      {children}
      <Footer />
    </main>
  );
}

export default Layout;
