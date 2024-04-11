import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useState } from "react";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
import { useFormik } from "formik";
import { loginSchema } from "../schema/plannerLogin";
import { RegisterSchema } from "../schema/plannerSignup";
import Alert from "@mui/material/Alert";
import axios from "axios";

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

const Home = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const URL = "http://localhost:3000/register";
  const handleOpen = () => setOpen(true);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const opening = Boolean(anchorEl);

  const handleClose = () => {
    setOpen(false);
    setShowLoginModal(false);
    setShowSignupModal(false);
  };

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

  const initialValuesSignup = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const initialValuesLogin = {
    email: "",
    password: "",
  };

  const {
    handleChange: handleChangeSignup,
    handleSubmit: handleSubmitSignup,
    values: valuesSignup,
    errors: errorsSignup,
  } = useFormik({
    initialValues: initialValuesSignup,
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      setSigningUp(true);
      if (values.password !== values.confirmPassword) {
        errorsSignup.confirmPassword = "Password does not match";
        setTimeout(() => {
          setSigningUp(false);
          errorsSignup.confirmPassword = "";
        }, 2500);
      } else {
        axios
          .post(URL, values)
          .then((response) => {
            if (response.data.status === 200) {
              values.firstName = "";
              values.lastName = "";
              values.email = "";
              values.password = "";
              values.confirmPassword = "";
              setShowLoginModal(true);
              setShowSignupModal(false);
            } else {
              setShowLoginModal(false);
              setShowSignupModal(true);
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

  const {
    handleChange: handleChangeLogin,
    handleSubmit: handleSubmitLogin,
    values: valuesLogin,
    errors: errorsLogin,
  } = useFormik({
    initialValues: initialValuesLogin,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setLoggingIn(true);
      axios
        .post(URL, values)
        .then((result) => {
          if (result.data.status === true && result.data.token) {
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("firstName", result.data.user.firstName);
            localStorage.setItem("lastName", result.data.user.lastName);
            setLoginSuccess(true);
            setTimeout(() => {
              navigate("/user/dashboard");
            }, 3000);
          } else {
            console.error("error");
          }
        })
        .catch((err) => {
          console.error(err.response.data.message);
          setLoginError(err.response.data.message);
          setTimeout(() => {
            setLoginError(null);
          }, 2000);
        })
        .finally(() => {
          setTimeout(() => {
            setLoggingIn(false);
          }, 3000);
        });
    },
  });
  return (
    <>
      <section className=" lg:p-10 homeBg px-5">
        <div className=" lg:px-12 lg:py-28 py-20">
          <h1 className="poppins-extrabold-lg lg:text-black text-white ">
            Create and Track your event effectively
          </h1>
          <p className="poppins-regular lg:text-black text-white">
            we automate your planning and save you time for other things
          </p>

          <Button
            variant="contained"
            className="!font-bold !lg:mt-5 !mt-10 blueBtn"
            onClick={handleOpen}
          >
            Get Started
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
            <Fade in={open}>
              <Box sx={style}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h1"
                  className="text-center !text-2xl !font-bold "
                >
                  {showSignupModal ? "Sign up" : "Login"}
                </Typography>
                {showSignupModal && (
                  <>
                    <div className="px-5 poppins-medium-sm">
                      {(errorsSignup.firstName ||
                        errorsSignup.lastName ||
                        errorsSignup.email ||
                        errorsSignup.password ||
                        errorsSignup.confirmPassword) && (
                        <Alert sx={{ width: "100%" }} severity="warning">
                          {errorsSignup.firstName ||
                            errorsSignup.lastName ||
                            errorsSignup.email ||
                            errorsSignup.password ||
                            errorsSignup.confirmPassword}
                        </Alert>
                      )}
                    </div>
                  </>
                )}
                {!showSignupModal && (
                  <>
                    <div className="px-5 poppins-medium-sm">
                      {(errorsLogin.email || errorsLogin.password) && (
                        <Alert sx={{ width: "100%" }} severity="warning">
                          {errorsLogin.email || errorsLogin.password}
                        </Alert>
                      )}
                    </div>
                  </>
                )}
                <form
                  onSubmit={
                    showSignupModal ? handleSubmitSignup : handleSubmitLogin
                  }
                  className="lg:p-5 px-2 poppins-medium-sm"
                >
                  {showSignupModal && (
                    <>
                      <div className="border flex items-center bg-white p-2 mb-3 rounded-md outline-1 outline-slate-400">
                        <input
                          type="text"
                          placeholder="First Name"
                          onChange={handleChangeSignup}
                          name="firstName"
                          value={valuesSignup.firstName}
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
                          onChange={handleChangeSignup}
                          name="lastName"
                          value={valuesSignup.lastName}
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
                          onChange={handleChangeSignup}
                          name="email"
                          value={valuesSignup.email}
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
                          onChange={handleChangeSignup}
                          name="password"
                          value={valuesSignup.password}
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
                          onChange={handleChangeSignup}
                          name="confirmPassword"
                          value={valuesSignup.confirmPassword}
                          className="w-full outline-none text-black"
                        />
                        <span
                          className="material-symbols-outlined text-black cursor-pointer"
                          onClick={togglePasswordVisibilityConfirm}
                        >
                          {showConfirmPassword
                            ? "visibility"
                            : "visibility_off"}
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
                        Already have an account?{" "}
                        <span
                          className="poppins-medium-sm text-blue-600 cursor-pointer"
                          onClick={() => {
                            setShowSignupModal(false);
                            setShowLoginModal(true);
                          }}
                        >
                          Login
                        </span>
                      </p>
                    </>
                  )}
                  {!showSignupModal && (
                    <>
                      <div className="border flex items-center bg-white p-2 mb-3 rounded-md outline-1 outline-slate-400">
                        <input
                          type="email"
                          placeholder="Email address"
                          onChange={handleChangeLogin}
                          name="email"
                          value={valuesLogin.email}
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
                          onChange={handleChangeLogin}
                          name="password"
                          value={valuesLogin.password}
                          className="w-full outline-none text-black"
                        />
                        <span
                          className="material-symbols-outlined text-black cursor-pointer"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? "visibility" : "visibility_off"}
                        </span>
                      </div>

                      <button
                        type="submit"
                        className="w-full p-3 font-bold bg-blue-600 my-5 text-white rounded-md"
                        disabled={loggingIn}
                      >
                        {loggingIn ? "Logging in.." : "Login"}
                      </button>
                      <p className="text-center">
                        You don't have an account?{" "}
                        <span
                          className="poppins-medium-sm text-blue-600 cursor-pointer"
                          onClick={() => {
                            setShowSignupModal(true);
                            setShowLoginModal(false);
                          }}
                        >
                          Signup
                        </span>
                      </p>
                    </>
                  )}
                </form>
              </Box>
            </Fade>
          </Modal>
          <Link to="/login">
            <Button
              variant="contained"
              className="!font-bold !lg:mt-5 !mt-20 hideBtn !p-3 !bg-black"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </section>
      {/* <section className="custom-background"></section> */}
    </>
  );
};

export default Home;
