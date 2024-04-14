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
import { verifyTokenSchema } from "../schema/tokenVerify";

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
const styleMobile = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 370,
  borderRadius: "10px",
  bgcolor: "background.paper",
  boxShadow: 24,
  px: 2,
  py: 4,
};

const Home = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signingUp, setSigningUp] = useState(false);
  const [verifyingToken, setVerifyingToken] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [SignupSuccess, setSignupSuccess] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [showTokenVerificationModal, setShowTokenVerificationModal] =
    useState(false);
  const SignupURL = "http://localhost:3000/register";
  const LoginURL = "http://localhost:3000/login";
  const verifyURL = "http://localhost:3000/verifyToken";
  const handleOpen = () => {
    setOpen(true);
    setShowLoginModal(true);
    setShowSignupModal(false);
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  

  const handleClose = () => {
    setOpen(false);
    setShowLoginModal(false);
    setShowSignupModal(false);
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
          .post(SignupURL, values)
          .then((response) => {
            if (response.data.status === 200) {
              setSignupSuccess(true);
              setTimeout(() => {
                values.firstName = "";
                values.lastName = "";
                values.email = "";
                values.password = "";
                values.confirmPassword = "";
                setShowTokenVerificationModal(true);
                setShowSignupModal(false);
                setShowLoginModal(false);
              }, 3000);
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
        .post(LoginURL, values)
        .then((result) => {
          if (result.data.status === true && result.data.token) {
            localStorage.setItem("token", result.data.token);
            localStorage.setItem("firstName", result.data.user.firstName);
            localStorage.setItem("lastName", result.data.user.lastName);
            setLoginSuccess(true);
            setTimeout(() => {
              setShowLoginModal(false);
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

  const {
    handleChange: handleChangeTokenVerification,
    handleSubmit: handleSubmitTokenVerification,
    values: valuesTokenVerification,
    errors: errorsTokenVerification,
  } = useFormik({
    initialValues: verifyTokenSchema,
    onSubmit: (values) => {
      setVerifyingToken(true);
      axios
        .post(verifyURL, values)
        .then((result) => {
          if (result.data.status === true) {
            setVerifySuccess(true);
            setTimeout(() => {
              setShowLoginModal(true);
              setShowTokenVerificationModal(false);
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
            open={showSignupModal}
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
            <Fade in={showSignupModal}>
              <Box sx={style}>
                <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h1"
                  className="text-center !text-2xl !font-bold "
                >
                  Signup
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
               
                <form
                  onSubmit={
                    handleSubmitSignup
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
                          disabled={signingUp}
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
                          disabled={signingUp}
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
                          disabled={signingUp}
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
                          disabled={signingUp}
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
                          disabled={signingUp}
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
                        className={`w-full p-3 font-bold ${
                          SignupSuccess ? "bg-green-600" : "bg-blue-600"
                        } my-5 text-white rounded-md`}
                        disabled={signingUp}
                      >
                        {signingUp
                          ? "Signing up..."
                          : SignupSuccess
                          ? "Signed in"
                          : "Signup"}
                      </button>
                      <p className="text-center">
                        Already have an account?{" "}
                        <span
                          className="poppins-medium-sm text-blue-600 cursor-pointer"
                          onClick={() => {
                            setShowLoginModal(true);
                            setShowSignupModal(false);
                          }}
                        >
                          Login
                        </span>
                      </p>
                    </>
                  )}
                </form>
              </Box>
            </Fade>
          </Modal>

          {/* login modal */}

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={showLoginModal}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={showLoginModal}>
              <Box sx={style}>
                <Typography
                  variant="h6"
                  component="h1"
                  className="text-center !text-2xl !font-bold"
                >
                  Login
                </Typography>
                <form
                  onSubmit={handleSubmitLogin}
                  className="lg:p-5 px-2 poppins-medium-sm"
                >
                  {showLoginModal && (
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
                        className={`w-full p-3 font-bold ${
                          loginSuccess ? "bg-green-600" : "bg-blue-600"
                        } my-5 text-white rounded-md`}
                        disabled={loggingIn}
                      >
                        {loggingIn
                          ? "Logging in..."
                          : loginSuccess
                          ? "Logged in"
                          : "Login"}
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

          {/* modal for email verification large screen */}

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={showTokenVerificationModal}
            onClose={() => setShowTokenVerificationModal(false)}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
            className="lg:block hidden"
          >
            <Fade in={showTokenVerificationModal}>
              <Box sx={style}>
                <Typography
                  variant="h6"
                  component="h1"
                  className="text-center font-bold"
                >
                  Verify Token
                </Typography>
                {showTokenVerificationModal && (
                  <>
                    <div className="px-5 poppins-medium-sm">
                      {errorsTokenVerification.token && (
                        <Alert sx={{ width: "100%" }} severity="warning">
                          {errorsTokenVerification.token}
                        </Alert>
                      )}
                    </div>
                  </>
                )}

                <form
                  onSubmit={handleSubmitTokenVerification}
                  className="lg:p-5 px-2 poppins-medium-sm"
                >
                  {showTokenVerificationModal && (
                    <>
                      <div className="border flex items-center bg-white p-2 mb-3 rounded-md outline-1 outline-slate-400">
                        <input
                          type="text"
                          placeholder="Verification token "
                          onChange={handleChangeTokenVerification}
                          name="firstName"
                          value={valuesTokenVerification.token}
                          className="w-full outline-none text-black"
                          autoFocus
                          disabled={verifyingToken}
                        />
                        <span class="material-symbols-outlined text-black">
                          info
                        </span>
                      </div>

                      <button
                        type="submit"
                        className={`w-full p-3 font-bold ${
                          verifySuccess ? "bg-green-600" : "bg-blue-600"
                        } my-5 text-white rounded-md`}
                        disabled={verifyingToken}
                      >
                        {verifyingToken
                          ? "Verifying ..."
                          : verifySuccess
                          ? "Verified"
                          : "verify email"}
                      </button>
                    </>
                  )}
                </form>
              </Box>
            </Fade>
          </Modal>

          {/* modal signup and login for mobile screen */}
          <Button
            variant="contained"
            className="!font-bold !lg:mt-5 !mt-20 hideBtn !p-4 w-full !bg-black"
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
            className="lg:hidden block"
          >
            <Fade in={open}>
              <Box sx={styleMobile}>
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
                  className="lg:p-5 px-2 py-4 poppins-medium-sm"
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
                        className={`w-full p-3 font-bold ${
                          loginSuccess ? "bg-green-600" : "bg-blue-600"
                        } my-5 text-white rounded-md`}
                        disabled={signingUp}
                      >
                        {signingUp
                          ? "Signing up..."
                          : loginSuccess
                          ? "Signed in"
                          : "Signup"}
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
                        className={`w-full p-3 font-bold ${
                          loginSuccess ? "bg-green-600" : "bg-blue-600"
                        } my-5 text-white rounded-md`}
                        disabled={loggingIn}
                      >
                        {loggingIn
                          ? "Logging in..."
                          : loginSuccess
                          ? "Logged in"
                          : "Login"}
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
        </div>
      </section>
    </>
  );
};

export default Home;
