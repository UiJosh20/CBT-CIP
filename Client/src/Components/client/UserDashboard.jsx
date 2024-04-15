import { Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React from "react";

const UserDashboard = () => {
  return (
    <>
      <section className="px-2 h-screen">
        <main className="bg-white px-5 py-10 lg:w-full flex justify-center">
           <Button variant="contained" className="poppins-medium-sm">Create event <AddIcon className="ml-2 "/></Button>
        </main>
        <main>
          <h6 className="text-center poppins-medium-sm">EVENT HISTORY</h6>
         <div className="shadow-md w-20">

         </div>
        </main>
      </section>
    </>
  );
};

export default UserDashboard;
