import React from "react";
import Banner from "../../components/Banner";
import { Helmet } from "react-helmet-async";
import OurServices from "../../components/OurServices";
import DashBoard from "../../test/DashBoard";
import Testimonials from "../../components/Testimonials";
import Achievements from "../../components/Achievements";
import FAQ from "../../components/FAQ";
import FeaturesOverview from "../../components/FeaturesOverview";
import ContactUs from "../contact/ContactUs";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Home | WorkForce Pro</title>
      </Helmet>
      <Banner></Banner>
      <OurServices></OurServices>
      <FeaturesOverview></FeaturesOverview>
      {/* <DashBoard></DashBoard> */}
      <Testimonials></Testimonials>
      <Achievements></Achievements>
      <FAQ></FAQ>
      <ContactUs></ContactUs>
    </div>
  );
}
