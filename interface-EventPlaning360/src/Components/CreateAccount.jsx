import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { RegisterSchema } from "../schema/plannerSignup";
import Button from '@mui/material/Button';


const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signingUp, setSigningUp] = useState(false);

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

  return (
    <>
      <section className="h-full p-3">
        <Link to="/">
          <HomeIcon className="text-blue-900" sx={{ fontSize: "35px" }} />
        </Link>
        <div className="mt-10">
          <h1 className="poppins-bold text-2xl text-center">Create Account</h1>
          <div className="px-5 poppins-medium-sm">
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
          <form onSubmit={handleSubmit} className="px-2 py-5 poppins-medium-sm">
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
              <span class="material-symbols-outlined text-black">info</span>
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
              <span class="material-symbols-outlined text-black">info</span>
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
              <span class="material-symbols-outlined text-black">mail</span>
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
              className="w-full p-3 font-bold bg-blue-600 text-white rounded-md mt-5"
              disabled={signingUp}
            >
              {signingUp ? "Signing up..." : "Signup"}
            </button>
            <p className="text-center my-5">
              you already have an account?
            </p>
              <Link to="/login" className="text-blue-400 ">
                <Button variant="contained" className="w-full !bg-yellow-500 !shadow-sm !p-2 !font-bold poppins-medium-sm">Login</Button>
              </Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default CreateAccount;
