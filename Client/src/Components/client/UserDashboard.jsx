import * as React from "react";
import {  Divider, Steps, TimePicker ,Button, Modal, Input, Select, Space, DatePicker, Popover } from "antd";
import { useState } from "react";
import { PlusCircleFilled } from "@ant-design/icons";
import { useFormik } from "formik";
import eventSchema from "../../schema/eventSchema";
import axios from "axios";
const customDot = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);

const UserDashboard = () => {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const detailURL = "http://localhost:3000/eventDetails";


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
  }
  const handleSubmit = (values) =>{
    axios.post(detailURL, values)
    .then((res) => {
      console.log(res);
      handleOk()
    }) .catch((error) => {
      console.error("Error submitting form:", error);
      // Handle error
    });
}
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: eventSchema,
    onSubmit: handleSubmit,
  });

 

  const stepsContent = [
    <div>
      <div className="flex items-center justify-center gap-5 mt-5">
        <Input
          name="eventTitle"
          placeholder="Event Title"
          onChange={formik.handleChange}
          value={formik.values.eventTitle}
        />
        <Space wrap>
          <Select
            defaultValue="Event type"
            style={{ width: 250 }}
            onChange={(value) => formik.setFieldValue("eventType", value)}
            value={formik.values.eventType || "Event type"}
            name="eventType"
            options={[
              { value: "wedding", label: "Wedding" },
              { value: "funeral", label: "Funeral" },
              { value: "Birthday", label: "Birthday" },
              { value: "anniversary", label: "Anniversary" },
              { value: "ceremony", label: "Ceremony" },
              { value: "conference", label: "Conference" },
            ]}
          />
        </Space>
      </div>
      <div className="my-3">
        <Space direction="vertical" size={12}>
          <DatePicker
         onChange={(value) => formik.setFieldValue("eventDate", value)}
         value={formik.values.eventDate}
            className="w-56"
          />
        </Space>
        <Space direction="vertical" size={12}>
          <TimePicker
            onChange={(value) => formik.setFieldValue("eventTime", value)}
           value={formik.values.eventTime}
            className="w-53 mx-4"
          />
        </Space>

        <Space wrap>
          <Select
            defaultValue="State"
            style={{ width: 170 }}
            name="eventState"
            onChange={(value) => formik.setFieldValue("eventState", value)}
            value={formik.values.eventState || "Event State"}

            options={[
              { value: "Abia", label: "Abia" },
              { value: "Adamawa", label: "Adamawa" },
              { value: "Akwa Ibom", label: "Akwa Ibom" },
              { value: "Anambra", label: "Anambra" },
              { value: "Bauchi", label: "Bauchi" },
              { value: "Bayelsa", label: "Bayelsa" },
              { value: "Benue", label: "Benue" },
              { value: "Borno", label: "Borno" },
              { value: "Cross River", label: "Cross River" },
              { value: "Delta", label: "Delta" },
              { value: "Ebonyi", label: "Ebonyi" },
              { value: "Edo", label: "Edo" },
              { value: "Ekiti", label: "Ekiti" },
              { value: "Enugu", label: "Enugu" },
              { value: "FCT", label: "Federal Capital Territory" },
              { value: "Gombe", label: "Gombe" },
              { value: "Imo", label: "Imo" },
              { value: "Jigawa", label: "Jigawa" },
              { value: "Kaduna", label: "Kaduna" },
              { value: "Kano", label: "Kano" },
              { value: "Katsina", label: "Katsina" },
              { value: "Kebbi", label: "Kebbi" },
              { value: "Kogi", label: "Kogi" },
              { value: "Kwara", label: "Kwara" },
              { value: "Lagos", label: "Lagos" },
              { value: "Nasarawa", label: "Nasarawa" },
              { value: "Niger", label: "Niger" },
              { value: "Ogun", label: "Ogun" },
              { value: "Ondo", label: "Ondo" },
              { value: "Osun", label: "Osun" },
              { value: "Oyo", label: "Oyo" },
              { value: "Plateau", label: "Plateau" },
              { value: "Rivers", label: "Rivers" },
              { value: "Sokoto", label: "Sokoto" },
              { value: "Taraba", label: "Taraba" },
              { value: "Yobe", label: "Yobe" },
              { value: "Zamfara", label: "Zamfara" },
            ]}
          />
        </Space>
        <div className="my-4">
          <Input
            type="text"
          placeholder="Venue address"
          onChange={formik.handleChange}
            name="venueAddress"
            value={formik.values.venueAddress}
            className="p-2"
          />
        </div>

        <div className="my-4">
          <Input 
          type="file"
            onChange={(event) => formik.setFieldValue("eventFile", event.target.files[0])}
          name="eventFile"
            className="p-2"
          />
        </div>
      </div>
    </div>,

    <div></div>,
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
                  <Button onClick={formik.handleSubmit}>Next</Button>
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
                  title: "COnfirming event details",
                },
                {
                  title: "Create",
                },
              ]}
            />

            {stepsContent[currentStep]}
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
