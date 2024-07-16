// @ts-check
import PropTypes from "prop-types";
import React from "react";

import { getCurrentScriptPath } from "../../../../../shared";
import {
  setClientId,
  pushDataLayerEventToGa,
} from "../../core/utils/google-analytics";
import { useRfiContext } from "../../core/utils/rfiContext";
import {
  submissionFormFieldPrep,
  submissionSetHiddenFields,
} from "../../core/utils/submission-helpers";
import { aboutMeForm } from "../steps/AboutMe";
import { optionalForm } from "../steps/Optional";
import { programInterestForm } from "../steps/ProgramInterest";
import { successForm } from "../steps/Success";
import { RfiStepper } from "./RfiStepper";
import RfiImage from "../../assets/img/WS2-DefaultImagev01-Final.png";

const currentScript = getCurrentScriptPath();

const RfiMainForm = () => {
  const {
    appPathFolder,
    campus,
    actualCampus,
    college,
    department,
    studentType,
    areaOfInterest,
    programOfInterest,
    programOfInterestOptional,
    isCertMinor,
    country,
    stateProvince,
    successMsg,
    test,
    dataSourceDegreeSearch,
    dataSourceAsuOnline,
    dataSourceCountriesStates,
    submissionUrl
  } = useRfiContext();
  // const RfiImage = `${
  //   appPathFolder || currentScript
  // }/assets/img/WS2-DefaultImagev01-Final.png`;

const RfiMainForm = ({ rfiImage, children }) => {
  return (
    <div className="container rfi-container-inner">
      <div className="row">
        <div className="col col-12 ">
          <div className="uds-image-text-block-container">
            <div className="uds-image-text-block-image-container">
              <img src={rfiImage} className="img-fluid" alt="" />
            </div>
            <div className="uds-image-text-block-text-container">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

RfiMainForm.propTypes = {
  rfiImage: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export { RfiMainForm };
