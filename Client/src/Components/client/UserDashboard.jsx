import * as React from "react";
import { Divider, Steps, TimePicker } from "antd";
import { Button, Modal, Input, Select, Space, DatePicker } from "antd";
import { useState } from "react";
import { PlusCircleFilled } from "@ant-design/icons";
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
  // const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

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
    setCurrentStep(currentStep - 1);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const stepsContent = [
    <div>
      <div className="flex items-center justify-center gap-5 mt-5">
        <Input placeholder="Event Title"></Input>
        <Space wrap>
          <Select
            defaultValue="Event type"
            style={{
              width: 250,
            }}
            onChange={handleChange}
            options={[
              {
                value: "wedding",
                label: "Wedding",
              },
              {
                value: "funeral",
                label: "Funeral",
              },
              {
                value: "Birthday",
                label: "birthday",
              },
              {
                value: "anniversary",
                label: "Anniversary",
              },
              {
                value: "ceremony",
                label: "Ceremony",
              },
              {
                value: "conference",
                label: "Conference",
              },
            ]}
          />
        </Space>
      </div>
      <div className="my-3">
        <Space direction="vertical" size={12}>
          <DatePicker onChange={onChange} className="w-56" />
        </Space>
        <Space direction="vertical" size={12}>
          <TimePicker
            onChange={onChange}
           
            className="w-53 mx-4"
          />
        </Space>

        <Space wrap>
          <Select
            defaultValue="State"
            style={{ width: 170 }}
            onChange={handleChange}
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
          <Input type="text" placeholder="Venue address" className="p-2" />
        </div>
      </div>
    </div>,

    <div>
      
    </div>
  ];

  return (
    <>
      <section className="px-2 h-screen">
        <main className="bg-white px-5 py-10 lg:w-full flex justify-center mt-5">
          <Button
            className="bg-blue-700 flex items-center gap-2"
            type="primary"
            onClick={showModal}
          >
            Create event <PlusCircleFilled />
          </Button>
          <Modal
            title="Creating a New Event"
            className="w96"
            okType=""
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
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
