import * as React from "react";

import { useState } from "react";
import { ConsoleSqlOutlined, PlusCircleFilled } from "@ant-design/icons";
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
import { useEffect } from "react";

const steps = ["Create an event", "Confirm event details", "Finish"];

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
  const displayDetail = "http://localhost:3000/confirmEventDetails";
  const initialValues = {
    eventTitle: "",
    eventType: "",
    eventDate: "",
    eventTime: "",
    eventState: "",
    venueAddress: "",
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [values, setValues] = useState(initialValues);
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [details, setDetails] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getAllEvents = () => {
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:3000/getAllEvents", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.data.events) {
            setEvents(res.data.events);
          } else {
            console.log("No events found");
          }
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    };
    getAllEvents();
  }, []);

  const showModal = () => {
    setOpen(true);
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // const changeFile = (e) =>{
  //   let reader = new FileReader()
  //   let myImage = e.target.files[0]
  //   reader.readAsDataURL(myImage)

  //   reader.onload = () =>{
  //     setMyFile(reader.result)
  //   }
  // }

  const handleStepCompletion = () => {
    const newCompleted = { ...completed };
    newCompleted[currentStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleSubmit = (event) => {
    if (currentStep === 0) {
      let token = localStorage.getItem("token");
      event.preventDefault();
      axios
        .post(detailURL, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res) {
            console.log(res.data.recentEvent);
            setDetails(res.data.recentEvent);
            handleComplete();
          } else {
            console.log("something went wrong");
          }
        });
    } else {
      handleStepCompletion();
    }
  };

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
   if (activeStep === 2) {
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      // getAllEvents();
      setOpen(false); 
    } else {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setCurrentStep(currentStep - 1);
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

  const NigerianStates = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "FCT - Abuja",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];

  const stepsContent = [
    <div>
      <div className="flex items-center justify-center gap-5 mt-5">
        <Input
          name="eventTitle"
          className="w-full p-3 poppins-medium-sm"
          placeholder="Event Title"
          onChange={handleChange}
        />

        <FormControl fullWidth>
          <InputLabel
            id="demo-simple-select-label"
            className="poppins-medium-sm"
          >
            Event type
          </InputLabel>
          <Select
            className="poppins-medium-sm"
            value={values.eventType || ""}
            onChange={handleChange}
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

        <FormControl fullWidth>
          <InputLabel
            id="demo-simple-select-label"
            className="poppins-medium-sm"
          >
            State
          </InputLabel>
          <Select
            className="poppins-medium-sm"
            onChange={handleChange}
            value={values.eventState || ""}
            label="State"
            name="eventState"
          >
            {NigerianStates.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div>
        <Input
          name="venueAddress"
          className="w-full p-3 poppins-medium-sm"
          placeholder="Venue Address"
          onChange={handleChange}
        />
      </div>
      <Input
        type="date"
        name="eventDate"
        onChange={handleChange}
        className="p-3 mt-5 poppins-medium-sm "
      />
      <Input
        type="time"
        name="eventTime"
        onChange={handleChange}
        className="p-3 mt-5 poppins-medium-sm ms-2"
      />
      {/* <Input
        type="file"
        name="file"
        onChange={(e)=>changeFile(e)}
        className="p-3 mt-5 poppins-medium-sm ms-2"
      /> */}
    </div>,
    <div>
      <div>
        <div className="flex gap-4 mt-2 justify-between">
          <p className="poppins-bold-md">Title : </p>
          <p className="poppins-medium-sm uppercase">{details.eventTitle}</p>
        </div>
        <div className="flex gap-4 justify-between">
          <p className="poppins-bold-md">Type : </p>
          <p className="poppins-medium-sm">{details.eventType}</p>
        </div>
        <div className="flex gap-4 justify-between">
          <p className="poppins-bold-md">State : </p>
          <p className="poppins-medium-sm">{details.eventState}</p>
        </div>
        <div className="flex gap-4  justify-between">
          <p className="poppins-bold-md">Venue Address : </p>
          <p className="poppins-medium-sm">{details.venueAddress}</p>
        </div>
        <div className="flex gap-4 justify-between">
          <p className="poppins-bold-md">Date : </p>
          <p className="poppins-medium-sm">{details.eventDate}</p>
        </div>
        <div className="flex gap-4 justify-between items-center">
          <p className="poppins-bold-md">Time : </p>
          <p className="poppins-medium-sm">{details.eventTime}</p>
        </div>
      </div>
    </div>,
    <div>
      <p className="poppins-regular font-bold">
        Your event has been created successfully, please proceed
      </p>
    </div>,
  ];

  return (
    <>
      <section className="px-2 h-screen">
        <main className="bg-white px-5 py-10 lg:w-full flex justify-center mt-5">
          <Button
            variant="contained"
            className="bgblue500 flex items-center gap-2"
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
            <form onSubmit={handleSubmit}>
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
                          <StepButton
                            onClick={handleStep(index)}
                            color="inherit"
                          >
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
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              pt: 2,
                            }}
                          >
                            <Box sx={{ flex: "1 1 auto" }} />
                            <Button onClick={handleReset}>Reset</Button>
                          </Box>
                        </>
                      ) : (
                        <>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              pt: 2,
                              mt: 5,
                            }}
                          >
                            <Button
                              color="inherit"
                              disabled={activeStep === 0 || activeStep === 1}
                              onClick={handleBack}
                              sx={{ mr: 1 }}
                            >
                              Back
                            </Button>
                            <Box sx={{ flex: "1 1 auto" }} />
                            <Button
                              onClick={handleNext}
                              sx={{ mr: 1 }}
                              disabled={activeStep === 0}
                            >
                              Next
                            </Button>
                            {activeStep !== steps.length &&
                              (completed[activeStep] ? (
                                <Typography
                                  variant="caption"
                                  sx={{ display: "inline-block", fontSize: 13 }}
                                >
                                  Step {activeStep + 1} already completed
                                </Typography>
                              ) : (
                                <Button
                                  type="submit"
                                  variant="contained"
                                  disabled={
                                    activeStep === 1 || activeStep === 2
                                  }
                                >
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

        {events.length > 0 ? (
          <main className="mt-10">
            <h6 className="text-center poppins-medium-sm">EVENT HISTORY</h6>
            <section className="flex  lg:px-4 lg:pb-10 mt-2 justify-center items-center flex-wrap gap-5 py-5  mx-auto minHeight">
              {events.map((event) => (
                <div key={event._id} className="flex flex-wrap">
                  <div class="card">
                    <p class="card-title">{event.eventTitle}</p>
                    <p class="small-desc">{event.venueAddress},</p>
                    <p class="small-desc">
                      {new Date(event.eventDate).toLocaleDateString()}
                    </p>
                    <p class="small-desc">{event.eventTime}</p>

                    <div class="go-corner">
                      <div class="go-arrow">
                        <span class="material-symbols-outlined">
                          arrow_forward
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </main>
        ) : (
          <main className="mt-10">
            <h6 className="text-center poppins-medium-sm">EVENT HISTORY</h6>
            <section className="flex  px-4 mt-2 justify-center items-center flex-wrap gap-5 py-5 border-t-2 border-gray-100 w96 mx-auto">
              <h4 className="noEvents poppins-medium mt-10">No events yet</h4>
            </section>
          </main>
        )}
      </section>
    </>
  );
};

export default UserDashboard;
