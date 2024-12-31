"use client";
import React, { useEffect } from "react";
import { usePageTitle } from "@/contexts/PageTitleContext";
import "moment/locale/tr";
import { useCustomFormik } from "@/helpers/FormikHelpers";
import { FormikProvider } from "formik";
import InputBox from "@/components/FormItems/InputBox";


const bodyMeasurementsInital = {
  height: "",
  weight: "",
  chest: "",
  waist: "",
  hips: ""
};

const Dashboard = ({ t }) => {
  const { setPageTitle } = usePageTitle();

  useEffect(() => {
    setPageTitle("home");
  }, []);


  const handleFormikSubmit = (values) => {

  };

  const formik = useCustomFormik(bodyMeasurementsInital, handleFormikSubmit);


  return <div className="home-page">
    <div className="grid grid-cols-2">
      <div className="form-group">
        <FormikProvider value={formik}>
          <InputBox label="Boy (cm)" inputName="height" type="number" />
          <InputBox label="Kilo (kg)" inputName="weight" type="number" />
          <InputBox label="Gögüs Çevresi (cm)" inputName="chest" type="number" />
          <InputBox label="Bel Çevresi (cm)" inputName="waist" type="number" />
          <InputBox label="Kalça Çevresi (cm)" inputName="hips" type="number" />
        </FormikProvider>

      </div>
      <div>2</div>
    </div>
  </div>;
};

export default Dashboard;



