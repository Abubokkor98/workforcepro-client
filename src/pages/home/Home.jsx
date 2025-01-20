import React from "react";
import Banner from "../../components/Banner";
import { Helmet } from "react-helmet-async";
import OurServices from "../../components/OurServices";
import Testimonials from "../../components/Testimonials";
import Achievements from "../../components/Achievements";
import FAQ from "../../components/FAQ";
import FeaturesOverview from "../../components/FeaturesOverview";
import ContactUs from "../../components/ContactUs";

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>Home | WorkForce Pro</title>
      </Helmet>
      <Banner></Banner>
      <OurServices></OurServices>
      <FeaturesOverview></FeaturesOverview>
      <Achievements></Achievements>
      <Testimonials></Testimonials>
      <FAQ></FAQ>
      <ContactUs></ContactUs>
    </div>
  );
}
