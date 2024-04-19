import * as React from "react";

import { useState } from "react";
import { PlusCircleFilled } from "@ant-design/icons";
import { useFormik } from "formik";
import eventSchema from "../../schema/eventSchema";
import axios from "axios";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Box,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const UserDashboard = () => {
  const detailURL = "http://localhost:3000/eventDetails";
  const [currentStep, setCurrentStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [type, setType] = React.useState("");

  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setCurrentStep(currentStep + 1);
      setModalText("The modal will be closed after two seconds");
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handlePrev = () => {
    if (currentStep === 0) {
      setCurrentStep(0);
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const initialValues = {
    eventTitle: "",
    eventType: "",
    eventDate: null,
    eventTime: null,
    eventState: "",
    venueAddress: "",
    file: null,
  };


  const { handleChange, handleSubmit: handleFormikSubmit, setFieldValue, values, isSubmitting } = useFormik({
    initialValues: initialValues,
    validationSchema: eventSchema,
    onSubmit: (values, { setSubmitting }) => {
      axios
        .post(detailURL, values)
        .then((response) => {
          console.log('Response from backend:', response.data);
          setOpen(false);
        })
        .catch((error) => {
          console.error('Error submitting form:', error);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const stepsContent = [
    <div>
      <div className="flex items-center justify-center gap-5 mt-5">
        <Input
          name="eventTitle"
          className="w-full p-3 poppins-medium-sm"
          placeholder="Event Title"
          onChange={handleChange}
          value={values.eventTitle}
        />

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              className="poppins-medium-sm"
            >
              Event type
            </InputLabel>
            <Select
              value={values.eventType}
              className="poppins-medium-sm"
              onChange={(event) =>
                setFieldValue("eventType", event.target.value)
              }
              label="Event Type"
              name="eventType"
            >
              <MenuItem value={"wedding"} className="poppins-medium-sm">
                Wedding
              </MenuItem>
              <MenuItem value={"funeral"} className="poppins-medium-sm">
                Funeral
              </MenuItem>
              <MenuItem value={"birthday"} className="poppins-medium-sm">
                Birthday
              </MenuItem>
              <MenuItem value={"anniversary"} className="poppins-medium-sm">
                Anniversary
              </MenuItem>
              <MenuItem value={"ceremony"} className="poppins-medium-sm">
                Ceremony
              </MenuItem>
              <MenuItem value={"conference"} className="poppins-medium-sm">
                Conference
              </MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel
              id="demo-simple-select-label"
              className="poppins-medium-sm"
            >
              State
            </InputLabel>
            <Select
              value={values.eventState}
              className="poppins-medium-sm"
              onChange={(event) =>
                setFieldValue("eventState", event.target.value)
              }
              label="State"
              name="eventState"
            >
              <MenuItem value={"wedding"} className="poppins-medium-sm">
                Wedding
              </MenuItem>
              <MenuItem value={"funeral"} className="poppins-medium-sm">
                Funeral
              </MenuItem>
              <MenuItem value={"birthday"} className="poppins-medium-sm">
                Birthday
              </MenuItem>
              <MenuItem value={"anniversary"} className="poppins-medium-sm">
                Anniversary
              </MenuItem>
              <MenuItem value={"ceremony"} className="poppins-medium-sm">
                Ceremony
              </MenuItem>
              <MenuItem value={"conference"} className="poppins-medium-sm">
                Conference
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
      <div>
        <Input
          name="venueAddress"
          className="w-full p-3 poppins-medium-sm"
          placeholder="Venue Address"
          onChange={handleChange}
          value={values.venueAddress}
        />
      </div>
      <Input
        type="date"
        name="eventDate"
        onChange={handleChange}
        value={values.eventDate}
        className="p-3 mt-5 poppins-medium-sm "
      />
      <Input
        type="time"
        name="eventTime"
        onChange={handleChange}
        value={values.eventTime}
        className="p-3 mt-5 poppins-medium-sm ms-2"
      />
      <Input
        type="file"
        name="file"
        onChange={handleChange}
        value={values.file}
        className="p-3 mt-5 poppins-medium-sm ms-5"
      />
    </div>,
  ];

  return (
    <>
      <section className="px-2 h-screen">
        <main className="bg-white px-5 py-10 lg:w-full flex justify-center mt-5">
          <Button
          variant="contained"
            className="bg-blue-500 flex items-center gap-2"
            type="primary"
            onClick={showModal}
          >
            Create event <PlusCircleFilled />
          </Button>
          <Modal
            open={open}
            onClose={handleCancel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <form onSubmit={handleFormikSubmit} sx={{ mt: 2 }}>
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                className="poppins-medium"
              >
            <Box sx={{ width: "100%" }}>
              <Stepper nonLinear activeStep={activeStep}>
                {steps.map((label, index) => (
                  <Step key={label} completed={completed[index]}>
                    <StepButton onClick={handleStep(index)} color="inherit">
                      {label}
                    </StepButton>
                  </Step>
                ))}
              </Stepper>
              
                {stepsContent[currentStep]}
               
           

              <div>
                {allStepsCompleted() ? (
                  <>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleReset}>Reset</Button>
                    </Box>
                  </>
                ) : (
                  <>
                   
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2, mt: 5, }}>
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleNext} sx={{ mr: 1 }}>
                        Next
                      </Button>
                      {activeStep !== steps.length &&
                        (completed[activeStep] ? (
                          <Typography
                            variant="caption"
                            sx={{ display: "inline-block", fontSize: 13, }}
                          >
                            Step {activeStep + 1} already completed
                          </Typography>
                        ) : (
                          <Button onClick={handleComplete} variant="contained">
                            {completedSteps() === totalSteps() - 1
                              ? "Finish"
                              : "Complete Step"}
                          </Button>
                        ))}
                    </Box>
                  </>
                )}

                
              </div>
              
            </Box>
               
              </Typography>
           
            </Box>
            </form>
          </Modal>
        </main>
        <main className="mt-10">
          <h6 className="text-center poppins-medium-sm">EVENT HISTORY</h6>
          <section className="flex  px-4 mt-2 justify-center items-center flex-wrap gap-5 py-5 border-t-2 border-gray-100 w96 mx-auto">
            <h4 className="noEvents poppins-medium mt-10">No events yet</h4>
          </section>
        </main>
      </section>
    </>
  );
};

export default UserDashboard;
