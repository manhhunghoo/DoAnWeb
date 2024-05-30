import React from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Footer from "../Footer/Footer";

const DefaultLayout = ({ children }) => {
  return (
    <div className="flex flex-col bg-[#F0F7FF]">
      <header>
        <Navbar />
      </header>
      <div className="max-h-[calc(100vh-100px)] overflow-y-scroll mt-[100px]">
        <div className="flex">
          <Sidebar />
          <main>{children}</main>
        </div>
        <Footer />
      </div>
    </div >
  );
};

export default DefaultLayout;