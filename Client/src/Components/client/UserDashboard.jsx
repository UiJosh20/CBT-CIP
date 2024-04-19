import * as React from "react";

import { useState } from "react";
import { PlusCircleFilled } from "@ant-design/icons";
import { useFormik } from "formik";
import eventSchema from "../../schema/eventSchema";
import axios from "axios";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Box, FormControl, Input, InputLabel, MenuItem, Select } from "@mui/material";


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
  const [isSubmitting, setSubmitting] = useState(false);
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

  const { handleChange, handleSubmit, setFieldValue, values } = useFormik({
    initialValues: initialValues,
    validationSchema: eventSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const stepsContent = [
    <div>
    <div className="flex items-center justify-center gap-5 mt-5">
      <Input
        name="eventTitle"
        className="w-full p-3"
        placeholder="Event Title"
        onChange={handleChange}
        value={values.eventTitle}
      />

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Event type</InputLabel>
          <Select
            value={values.eventType}
            onChange={(event) => setFieldValue("eventType", event.target.value)}
            label="Event Type"
            name="eventType"
          >
            <MenuItem value={"wedding"}>Wedding</MenuItem>
            <MenuItem value={"funeral"}>Funeral</MenuItem>
            <MenuItem value={"birthday"}>Birthday</MenuItem>
          <MenuItem value={"anniversary"}>Anniversary</MenuItem>
          <MenuItem value={"ceremony"}>Ceremony</MenuItem>
          <MenuItem value={"conference"}>Conference</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">State</InputLabel>
          <Select
            value={values.eventState}
            onChange={(event) => setFieldValue("eventState", event.target.value)}
            label="State"
            name="eventState"
          >
            <MenuItem value={"wedding"}>Wedding</MenuItem>
            <MenuItem value={"funeral"}>Funeral</MenuItem>
            <MenuItem value={"birthday"}>Birthday</MenuItem>
          <MenuItem value={"anniversary"}>Anniversary</MenuItem>
          <MenuItem value={"ceremony"}>Ceremony</MenuItem>
          <MenuItem value={"conference"}>Conference</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
    </div>
    <div>
      <Input
        name="eventTitle"
        className="w-full p-3"
        placeholder="Event Title"
        onChange={handleChange}
        value={values.eventTitle}
      />
      </div>
     <Input type="date" name="eventDate" onChange={handleChange} value={values.eventDate}  className="p-3 mt-5" />
  
    </div>,
      
  ];

  return (
    <>
      <section className="px-2 h-screen">
        <main className="bg-white px-5 py-10 lg:w-full flex justify-center mt-5">
          <Button
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
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {stepsContent[currentStep]}
              </Typography>
            </Box>
          </Modal>

          {/* <Modal
            title="Creating a New Event"
            className="w96"
            open={open} 
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            footer={[
              <div className="flex justify-between mt-4">
                <Button onClick={handleCancel}>Cancel</Button>
                <div className="flex gap-5">
                  <Button onClick={handlePrev}>Previous</Button>
                </div>
              </div>,
            ]}
          >
            <Steps
              size="small"
              current={currentStep}
              items={[
                {
                  title: "Event details",
                },
                {
                  title: "Confirming event details",
                },
                {
                  title: "Create",
                },
              ]}
            />

            <form onSubmit={handleSubmit}>
              {stepsContent[currentStep]}

              <Button>Next</Button>
            </form>
          </Modal> */}
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
