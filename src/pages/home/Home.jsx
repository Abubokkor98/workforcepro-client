import React from "react";
import Banner from "../../components/Banner";
import { Helmet } from "react-helmet-async";
import OurServices from "../../components/OurServices";
import DashBoard from "../../test/DashBoard";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Home | WorkForce Pro</title>
      </Helmet>
      <Banner></Banner>
      <OurServices></OurServices>
      {/* <DashBoard></DashBoard> */}
    </div>
  );
}
