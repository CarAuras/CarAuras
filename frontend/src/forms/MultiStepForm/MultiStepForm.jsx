import React, { useEffect, useState } from "react";
import BasicInformation from "./BasicInformation";
import Specifications from "./Specifications";
import AdditionalInformation from "./AdditionalInformation";
import { Provider } from "./MultiStepFormContext";
// import { Steps } from "antd";
import Steps from "antd/es/steps";

import Review from "./Review";
import { useParams } from "react-router-dom";
import { CAR_DETAILS_API } from "../../config/api";
import axios from "axios";
const { Step } = Steps;

const basicInformationState = {
  car_name: "",
  brand: "",
  model: "",
  year: "",
  price: "",
  mileage: "",
  condition: "",
};

const specificationState = {
  fuel_type: "",
  transmission: "",
  body_type: "",
  color: "",
  engine_size: "",
  seats: "",
  is_negotiable: false,
};

const additionalInformationState = {
  features: [],
  description: "",
  place: "",
  images: [],
};

const renderStep = (step) => {
  switch (step) {
    case 0:
      return <BasicInformation />;
    case 1:
      return <Specifications />;
    case 2:
      return <AdditionalInformation />;
    case 3:
      return <Review />;
    default:
      return null;
  }
};

function MultiStepForm() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [basicDetails, setBasicDetails] = useState(basicInformationState);
  const [specificationDetails, setSpecificationDetails] =
    useState(specificationState);
  const [additionalInformations, setAdditionalInformations] = useState(
    additionalInformationState
  );
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (id) {
      const fetchCar = async () => {
        const url = `${CAR_DETAILS_API}/${id}`;

        const res = await axios.get(url);
        setLoading(false);
        if (res && res.data) {
          const data = res.data.data;
          setBasicDetails({
            car_name: data.car_name || "",
            brand: data.brand || "",
            model: data.model || "",
            year: data.year || "",
            price: data.price || "",
            mileage: data.mileage || "",
            condition: data.condition || "",
          });
          setSpecificationDetails({
            fuel_type: data.fuel_type || "",
            transmission: data.transmission || "",
            body_type: data.body_type || "",
            color: data.color || "",
            engine_size: data.engine_size || "",
            seats: data.seats || "",
            is_negotiable: data.is_negotiable || false,
          });
          setAdditionalInformations({
            features: data.features || [],
            description: data.description || "",
            place: data.place || "",
            images: data.images || [],
          });
        }
      };
      fetchCar();
    }
  }, [id]);

  const next = () => {
    if (currentStep === 3) {
      setCurrentStep(0);
      setBasicDetails(basicInformationState);
      setSpecificationDetails(specificationState);
      setAdditionalInformations(additionalInformationState);
      return;
    }
    setCurrentStep(currentStep + 1);
  };
  const prev = () => setCurrentStep(currentStep - 1);

  return (
    <div className="mt-5">
      <Provider
        value={{
          basicDetails,
          setBasicDetails,
          next,
          prev,
          specificationDetails,
          setSpecificationDetails,
          additionalInformations,
          setAdditionalInformations,
        }}
      >
        <Steps current={currentStep}>
          <Step title={"Basic information"} />
          <Step title={"Specifications"} />
          <Step title={"Additional Informations"} />
          <Step title={"Review and submit"} />
        </Steps>
        <main className="mt-5">{renderStep(currentStep)}</main>
      </Provider>
    </div>
  );
}

export default MultiStepForm;
