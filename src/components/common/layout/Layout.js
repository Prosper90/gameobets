import React from "react";
import Navbar from "../navbar/Navbar";
import Notifiy from "../../notify/Notifiy";
import Preloader from "../../preloader/Preloader";
import Footer from "../../footer/Footer";

function Layout({
  children,
  notify,
  notifyType,
  notifyMsg,
  provider,
  address,
  connect,
  loader,
  setLoading,
}) {
  return (
    <main className="bg-image h-full min-h-screen">
      <Navbar provider={provider} address={address} connect={connect} />

      {notify && (
        <Notifiy
          notify={notify}
          notifyType={notifyType}
          notifyMsg={notifyMsg}
        />
      )}

      {loader && <Preloader loader={loader} />}
      {children}
      <Footer />
    </main>
  );
}

export default Layout;
