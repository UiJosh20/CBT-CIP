import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React from "react";

const UserDashboard = () => {
  return (
    <>
      <section className="px-2 h-screen">
        <main className="bg-white px-5 py-10 lg:w-full flex justify-center mt-5">
           <Button variant="contained" className="poppins-medium-sm">Create event <AddIcon className="ml-2 "/></Button>
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
