import * as React from "react";
import { Divider, Steps, TimePicker } from 'antd';
import { Button, Modal, Input, Select, Space , DatePicker, } from 'antd';
import { useState } from "react";
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
  const handleClose = () => setOpen(false)

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
 
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };


  return (
    <>
      <section className="px-2 h-screen">
        <main className="bg-white px-5 py-10 lg:w-full flex justify-center mt-5">

          <Button className="bg-blue-700" type="primary" onClick={showModal}>
        Create event
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
    current={0}
    items={[
      {
        title: 'Event details',
      },
      {
        title: 'COnfirming event details',
      },
      {
        title: 'Waiting',
      },
    ]}
  />
  <div className="flex items-center justify-center gap-5 mt-5">
  <Input placeholder="Event Theme" ></Input>
  <Space wrap>
    <Select
      defaultValue="Event type"
      style={{
        width: 250,
      }}
      onChange={handleChange}
      options={[
        {
          value: 'wedding',
          label: 'Wedding',
        },
        {
          value: 'funeral',
          label: 'Funeral',
        },
        {
          value: 'Birthday',
          label: 'birthday',
        },
        {
          value: 'anniversary',
          label: 'Anniversary',
        },
        {
          value: 'ceremony',
          label: 'Ceremony',
        },
        {
          value: 'conference',
          label: 'Conference',
        },
      ]}
    />
   
  </Space>
  
  </div>
  <div className="my-3">
  <Space direction="vertical" size={12}>
    <DatePicker onChange={onChange}  needConfirm={true}  className="w-56"/>
  </Space>
  <Space direction="vertical" size={12}>
    <TimePicker onChange={onChange}  needConfirm={true}  className="w-53 mx-4"/>
  </Space>
  
  </div>



      </Modal>
         
        </main>
        <main className="mt-10">
          <h6 className="text-center poppins-medium-sm">EVENT HISTORY</h6>
          <section className="flex  px-4 mt-2 justify-center items-center flex-wrap gap-5 py-5 border-t-2 border-gray-100 w96 mx-auto">
            <h4 className="noEvents poppins-medium mt-10">No events yet</h4>
            {/* <div className="w-96 bg-white  shadow-md border firstEvent rounded-md"></div>
         <div className="w-96 bg-white  shadow-md border secondEvent rounded-md"></div>
         <div className="w-96 bg-white  shadow-md border thirdEvent rounded-md"></div>

         <div className="w-96 bg-white  shadow-md border firstEvent rounded-md"></div>
         <div className="w-96 bg-white  shadow-md border secondEvent rounded-md"></div>
         <div className="w-96 bg-white  shadow-md border thirdEvent rounded-md"></div> */}
          </section>
        </main>
      </section>
    </>
  );
};

export default UserDashboard;
