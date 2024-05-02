  import { Box, Divider, Drawer, List } from "@mui/material";
  import { blue } from "@mui/material/colors";
  import DashboardSharpIcon from '@mui/icons-material/DashboardSharp';
  import WatchLaterSharpIcon from '@mui/icons-material/WatchLaterSharp';
  import EventAvailableSharpIcon from '@mui/icons-material/EventAvailableSharp';
  import FormatListNumberedSharpIcon from '@mui/icons-material/FormatListNumberedSharp';
  import BookmarksSharpIcon from '@mui/icons-material/BookmarksSharp';
  import React, { useState } from "react";
  import { useEffect } from "react";
  import { Link } from "react-router-dom";

  const UserNav = () => {

    const [open, setOpen] = React.useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };

    const handleMenuItemClick = (menu) => {
      setActiveMenuItem(menu);
      
    };
    

    useEffect(() => {
      setActiveMenuItem("dashboard");
    }, []);

    
  
    
    return (
      <>
        <nav className="custom-color lg:p-2 text-white poppins-medium-sm text-center">
          <p>Plan your event with ease</p>
        </nav>
        <nav className="bg-white shadow-md lg:py-3   lg:px-16 px-5 py-3 flex justify-between items-center poppins-medium sticky top-0 w-full">
          <div>
            <p>360Event</p>
          </div>
          <div>
            <span
              className="material-symbols-outlined cursor-pointer"
              onClick={toggleDrawer(true)}
            >
              menu
            </span>
          </div>
         
        </nav>

        <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 220, height: "100vh", }} role="presentation" onClick={toggleDrawer(false)} className="custom-color text-white">
            <List>
              <Link to='/user/dashboard' className={`flex items-center gap-4 p-5 mt-20 cursor-pointer ${activeMenuItem === "dashboard" ? "border-s-2 border-white" : ""}`} onClick={() => handleMenuItemClick("dashboard")}>
                <DashboardSharpIcon />
                <p className="poppins-medium-sm">Dashboard</p>
              </Link>
              <Link to='/user/ongoing' className={`flex items-center gap-4 px-5 py-3 mt-2 cursor-pointer ${activeMenuItem === "ongoing" ? "border-s-2 border-white" : ""}`} onClick={() => handleMenuItemClick("ongoing")}>
                <WatchLaterSharpIcon />
                <p className="poppins-medium-sm">New Events</p>
              </Link>
              <Link to='/user/completed' className={`flex items-center gap-4 px-5 py-3 mt-2 cursor-pointer ${activeMenuItem === "completed" ? "border-s-2 border-white" : ""}`} onClick={() => handleMenuItemClick("completed")}>
                <EventAvailableSharpIcon />
                <p className="poppins-medium-sm">Completed events</p>
              </Link>
              <Link to='/user/completed' className={`flex items-center gap-4 px-5 py-3 mt-2 cursor-pointer ${activeMenuItem === "guest" ? "border-s-2 border-white" : ""}`} onClick={() => handleMenuItemClick("guest")}>
                <FormatListNumberedSharpIcon/>
                <p className="poppins-medium-sm">Guests</p>
              </Link>
              <Link to='/user/completed' className={`flex items-center gap-4 px-5 py-3 mt-2 cursor-pointer ${activeMenuItem === "favorite" ? "border-s-2 border-white" : ""}`} onClick={() => handleMenuItemClick("favorite")}>
                <BookmarksSharpIcon/>
                <p className="poppins-medium-sm">Favorite</p>
              </Link>
            </List>
          </Box>
        </Drawer>
      </>
    );
  };

  export default UserNav;
