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
import { useFormik } from "formik";
import { RegisterSchema } from "../schema/plannerSignup";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  borderRadius: "10px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Navbar = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
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
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVisibilityConfirm = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { handleChange, handleSubmit, values, errors } = useFormik({
    initialValues,
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      setSigningUp(true);
      if (values.password !== values.confirmPassword) {
        {
          errors.confirmPassword = "Password does not match";
        }
        setTimeout(() => {
          setSigningUp(false);
          errors.confirmPassword = "";
        }, 2500);
      } else {
        axios
          .post(URL, values)
          .then((response) => {
            if (response.data.status == 200) {
              navigate("/user/verifyEmail");
            } else {
              navigate("/user/register");
            }
          })
          .catch((error) => {
            console.error("Registration failed:", error);
          })
          .finally(() => {
            setTimeout(() => {
              setSigningUp(false);
            }, 3000);
          });
      }
    },
  });

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
            className="lg:block hidden"
          >
            <Fade in={open} 
            
            >
              <Box sx={style}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
                >
                  Sign up
                </Typography>
                <div className="px-5">
                  {(errors.firstName ||
                    errors.lastName ||
                    errors.email ||
                    errors.password ||
                    errors.confirmPassword) && (
                    <Alert sx={{ width: "100%" }} severity="warning">
                      {errors.firstName ||
                        errors.lastName ||
                        errors.email ||
                        errors.password ||
                        errors.confirmPassword}
                    </Alert>
                  )}
                </div>
                <form onSubmit={handleSubmit} className="lg:p-5 px-2">
                  <div className="border flex items-center bg-white p-2 mb-3 rounded-md outline-1 outline-slate-400">
                    <input
                      type="text"
                      placeholder="First Name"
                      onChange={handleChange}
                      name="firstName"
                      value={values.firstName}
                      className="w-full outline-none text-black"
                      autoFocus
                    />
                    <span class="material-symbols-outlined text-black">
                      info
                    </span>
                  </div>

                  <div className="border flex items-center bg-white p-2 mb-3 rounded-md outline-1 outline-slate-400">
                    <input
                      type="text"
                      placeholder="Last Name"
                      onChange={handleChange}
                      name="lastName"
                      value={values.lastName}
                      className="w-full outline-none text-black"
                    />
                    <span class="material-symbols-outlined text-black">
                      info
                    </span>
                  </div>

                  <div className="border flex items-center bg-white p-2 mb-3 rounded-md outline-1 outline-slate-400">
                    <input
                      type="email"
                      placeholder="Email address"
                      onChange={handleChange}
                      name="email"
                      value={values.email}
                      className="w-full  text-black outline-none"
                    />
                    <span class="material-symbols-outlined text-black">
                      mail
                    </span>
                  </div>
                  <div className="border flex items-center bg-white p-2 mb-3 rounded-md outline-1 outline-slate-400">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      onChange={handleChange}
                      name="password"
                      value={values.password}
                      className="w-full outline-none text-black"
                    />
                    <span
                      className="material-symbols-outlined text-black cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? "visibility" : "visibility_off"}
                    </span>
                  </div>
                  <div className="border flex items-center bg-white p-2 mb-3 rounded-md outline-1 outline-slate-400">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      onChange={handleChange}
                      name="confirmPassword"
                      value={values.confirmPassword}
                      className="w-full outline-none text-black"
                    />
                    <span
                      className="material-symbols-outlined text-black cursor-pointer"
                      onClick={togglePasswordVisibilityConfirm}
                    >
                      {showConfirmPassword ? "visibility" : "visibility_off"}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="w-full p-3 font-bold bg-blue-600 my-5 text-white rounded-md"
                    disabled={signingUp}
                  >
                    {signingUp ? "Signing up..." : "Signup"}
                  </button>
                  <p className="text-center">
                    you already have an account?{" "}
                    <Link to="/user/login" className="text-blue-800">
                      Login
                    </Link>
                  </p>
                </form>
               
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
          <Link to="/blog">
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
