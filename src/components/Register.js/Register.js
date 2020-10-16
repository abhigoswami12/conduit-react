import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { validateLogicRegister } from "../../Utils/ValidateLogic";
import { ROOT_URL } from "../../Utils/Constants";
import UserContext from "../Context/UserContext";
import HidePassword from "../PasswordIcons/HidePassword";
import ShowPassword from "../PasswordIcons/ShowPassword";

function handleClick(values, setUser, setNotification) {
  console.log("entered handleclick");
  fetch(ROOT_URL + "users", {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user: values })
  })
    .then(res => res.json())
    .then(({ user }) => {
      localStorage.setItem("token", user.token);
      setNotification("you have signed up successfully");
      setUser(user);
    })
    .catch(error => {
      console.log(error, "ERROR");
      setNotification("email already registered");
      setUser(null);
    });
}

function handleNotification(setNotification) {
  setNotification("you have signed up successfully");
}

function Register(props) {
  let context = useContext(UserContext);
  let [showPassword, setShowPassword] = useState(false);
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validate={values => validateLogicRegister(values)}
      onSubmit={values => {
        handleClick(values, context.setUser, context.setNotification);
        // handleNotification(context.setNotification);
        props.close();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <section className="font-nunito">
          <div className="pt-2 pb-6">
            <div></div>
            <div className="bg-white mx-auto w-2/3 my-0 py-6 shadow border border-gray-400">
              <legend className="mx-auto my-0 pb-6 font-bold text-3xl text-gray-900 tracking-wide">
                Signup
              </legend>
              <form
                action=""
                className="text-center"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="mb-5">
                  <input
                    className={
                      errors.username
                        ? "border px-4 py-2 outline-none focus:border-red-700 focus:shadow-inner border-gray-500"
                        : "border px-4 py-2 outline-none focus:border-green-700 focus:shadow-inner border-gray-500"
                    }
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    noValidate
                  />
                  {
                    <small className="block text-red-700">
                      {errors &&
                        errors.username &&
                        touched.username &&
                        errors.username}
                    </small>
                  }
                </div>
                <div className="mb-5">
                  <input
                    className={
                      errors.email
                        ? "border block mx-auto px-4 py-2 outline-none focus:border-red-700 focus:shadow-inner border-gray-500"
                        : "border block mx-auto px-4 py-2 outline-none focus:border-green-700 focus:shadow-inner border-gray-500"
                    }
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    noValidate
                  />
                  <small className="block text-red-700">
                    {errors && errors.email && touched.email && errors.email}
                  </small>
                </div>
                <div>
                  <div className="relative">
                    <input
                      className={
                        errors.password
                          ? "border px-4 py-2 outline-none focus:border-red-700 focus:shadow-inner border-gray-500"
                          : "border px-4 py-2 outline-none focus:border-green-700 focus:shadow-inner border-gray-500"
                      }
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      noValidate
                    />
                    {/* DOUBT: how to make cursor pointer in svg image */}
                    {showPassword ? (
                      <HidePassword setShowPassword={setShowPassword} />
                    ) : (
                      <ShowPassword setShowPassword={setShowPassword} />
                    )}
                  </div>
                  {
                    <small className="block text-red-700">
                      {errors &&
                        errors.password &&
                        touched.password &&
                        errors.password}
                    </small>
                  }
                </div>

                <input
                  type="submit"
                  value="Register"
                  // disabled={!isSubmitting}
                  // className={
                  //   isSubmitting
                  //     ? "btn mt-6 hover:text-gray-300 hover:shadow-xl"
                  //     : "disabled-btn mt-6"
                  // }
                  className="btn mt-6 hover:text-gray-300 hover:shadow-xl"
                  // disabled={this.validateRegister(this.state.errors)}
                  // {validateRegister(this.state.errors) ? disabled : "hi"}
                />
              </form>
              <div className="flex justify-center items-center pt-6 text-sm">
                <p>Already a Member?</p>
                <span className="ml-2 font-bold text-gray-800 underline text-base hover:text-green-500">
                  <Link to="/">Login</Link>
                </span>
              </div>
            </div>
          </div>
        </section>
      )}
    </Formik>
  );
}

export default Register;
