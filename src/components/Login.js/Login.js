import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { validateLogicLogin } from "../../Utils/ValidateLogic";
import { ROOT_URL } from "../../Utils/Constants";
import UserContext from "../Context/UserContext";
import HidePassword from "../PasswordIcons/HidePassword";
import ShowPassword from "../PasswordIcons/ShowPassword";

function handleClick(values, setUser, setNotification) {
  console.log("entered handleclick");
  fetch(ROOT_URL + "users/login", {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user: values })
  })
    .then(res => res.json())
    .then(({ user }) => {
      localStorage.setItem("token", user.token);
      setNotification("you are suceesfully logged in");
      setUser(user);
    })
    .catch(error => {
      console.log(error);
      setNotification("email or password is incorrect");
      console.log(setNotification, "setNOtification");
      setUser(null);
    });
}

// function handleNotification(setNotification) {
//   setNotification("you are logged in");
// }

function Login(props) {
  let context = useContext(UserContext);
  let [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{
        email: "dasjideepak@gmail.com",
        password: "123123"
      }}
      validate={values => validateLogicLogin(values)}
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
                Login
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
                  {/* <input type="checkbox" onClick={handleShowPassword} /> */}
                </div>

                <input
                  type="submit"
                  value="Login"
                  className="btn mt-6 hover:text-gray-300 hover:shadow-xl"
                  // disabled={this.validateRegister(this.state.errors)}
                  // {validateRegister(this.state.errors) ? disabled : "hi"}
                />
              </form>
              <div className="flex justify-center items-center pt-6 text-sm">
                <p>New Member?</p>
                <span className="ml-2 font-bold text-gray-800 underline text-base hover:text-green-500">
                  <Link to="/">Signup</Link>
                </span>
              </div>
            </div>
          </div>
        </section>
      )}
    </Formik>
  );
}

export default Login;
