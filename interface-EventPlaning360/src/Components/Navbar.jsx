import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Link, NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  borderRadius: "10px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const opening = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlingClose = () => {
    setAnchorEl(null);
  };

  let linkers = [
    {
      path: "/blog",
      name: "Blog",
    },
    {
      path: "/about",
      name: "About",
    },
    {
      path: "/login",
      name: "Login",
    },
  ];

  return (
    <>
      <nav className="custom-color lg:p-2">
        <marquee
          behavior="scroll"
          scrollamount="3"
          className="lg:text-white text-black  poppins-medium-sm"
        >
          <p>
            Welcome to 360Event, the ultimate platform for event management and
            planning. Join us today and take your event to the next level!
          </p>
        </marquee>
      </nav>
      <nav className="bg-white shadow-md lg:py-5 lg:px-16 px-5 py-3 flex justify-between items-center poppins-medium sticky top-0 w-full">
        <Link to="/">
          <h1>360Event</h1>
        </Link>
        <div className="lg:flex gap-7 items-center hidden">
          {linkers.map((link, index) => (
            <NavLink
              to={link.path}
              key={index}
              className={({ isActive }) =>
                isActive
                  ? "text-black border-b-2 border-black rounded-sm p-1 poppins-medium-sm"
                  : "text-gray-400 poppins-medium-sm"
              }
            >
              {link.name}
            </NavLink>
          ))}

          <Button variant="contained" onClick={handleOpen}>
            <p className="poppins-medium-sm">Get Started</p>
          </Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open}>
              <Box sx={style}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Sign up
                </Typography>
                <input type="text" placeholder="Name" className="mt-5 p-2" />
              </Box>
            </Fade>
          </Modal>
        </div>
        <div className="hide !block">
          <MoreVertIcon
            aria-controls={opening ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className="!text-black cursor-pointer "
          />
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={opening}
          onClose={handlingClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <Link to='/blog'>
          <MenuItem onClick={handlingClose}>Blog</MenuItem>
          </Link>
          <Link to="/about">
          <MenuItem onClick={handlingClose}>About</MenuItem>
          </Link>
          <MenuItem onClick={handlingClose}>Login</MenuItem>
        </Menu>
      </nav>
    </>
  );
};

export default Navbar;
