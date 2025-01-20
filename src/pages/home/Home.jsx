import React from "react";
import Banner from "../../components/Banner";
import { Helmet } from "react-helmet-async";
import OurServices from "../../components/OurServices";
import DashBoard from "../../test/DashBoard";
import Testimonials from "../../components/Testimonials";
import Achievements from "../../components/Achievements";
import FAQ from "../../components/FAQ";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Home | WorkForce Pro</title>
      </Helmet>
      <Banner></Banner>
      <OurServices></OurServices>
      {/* <DashBoard></DashBoard> */}
      <Testimonials></Testimonials>
      <Achievements></Achievements>
      <FAQ></FAQ>
    </div>
  );
}
