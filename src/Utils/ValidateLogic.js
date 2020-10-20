// function setError(name, errorMsg) {
//   const errors = {};
//   errors[name] = errorMsg;
//   console.log(errors, "errors");
//   return errors;
// }

// function isUsernameValid(values) {
//   let username = values.username;

//   if (!username) {
//     return setError("username", "*Username is required");
//   }

//   let hasNumber = username.split("").some(char => Number(char));

//   if (username.length < 5) {
//     return setError(
//       "username",
//       "Username must be atleat 5 characters long!!"
//     );
//   }

//   if (username.toLocaleLowerCase() !== username) {
//     return setError("username", "Username must be in Lowercase");
//   }

//   if (!hasNumber) {
//     return setError("username", "Username must include atleast one number");
//   }

//   return true;
// }

// function isEmailValid(values) {
//   let email = values.email;
//   console.log("entered", email);
//   if (!email) {
//     return setError("email", "email is required.");
//   }

//   let isValid =
//     email.endsWith(".com") && email.includes("@") && !email.startsWith("@");

//   if (!isValid) {
//     return setError("email", "Invalid Email");
//   }

//   return true;
// }

// function isPasswordValid(values) {
//   let password = values.password;

//   if (!password) {
//     return this.setError("password", "Password is required.");
//   }

//   let isValid = password.split("").some(char => Number(char));

//   if (password.length < 4) {
//     return this.setError(
//       "password",
//       "Password length must be atleast 4 characters long"
//     );
//   }

//   if (!isValid) {
//     return this.setError(
//       "password",
//       "Password must contains atleast one number."
//     );
//   }

//   return true;
// }

// async function validateLogic(values) {
//   let isUsernameCorrect = await isUsernameValid(values);
//   let isEmailCorrect = await isEmailValid(values);
//   // let isPasswordCorrect = isPasswordValid();
//   // console.log(isUsernameCorrect, isEmailCorrect, isPasswordCorrect);
//   // return isUsernameCorrect && isEmailCorrect && isPasswordCorrect;
//   return isUsernameCorrect && isEmailCorrect;
// }
export function validateLogicRegister(values) {
  console.log("entered validation");
  const errors = {};
  let username = values.username;
  let hasNumber = username.split("").some(char => Number(char));
  let password = values.password;
  let isValid = password.split("").some(char => Number(char));

  if (!username) {
    errors.username = "*Username is required";
  } else if (username.length < 5) {
    errors.username = "Username must be atleat 5 characters long!!";
  } else if (username.toLocaleLowerCase() !== username) {
    errors.username = "Username must be in Lowercase";
  } else if (!hasNumber) {
    errors.username = "Username must include atleast one number";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 4) {
    errors.password = "Password length must be atleast 4 characters long";
  } else if (!isValid) {
    errors.password = "Password must contains atleast one number.";
  }
  // console.log(errors);
  return errors;
}

export function validateLogicLogin(values) {
  console.log("entered validation");
  const errors = {};
  // let username = values.username;
  // let hasNumber = username.split("").some(char => Number(char));
  let password = values.password;
  let isValid = password.split("").some(char => Number(char));

  // if (!username) {
  //   errors.username = "*Username is required";
  // } else if (username.length < 5) {
  //   errors.username = "Username must be atleat 5 characters long!!";
  // } else if (username.toLocaleLowerCase() !== username) {
  //   errors.username = "Username must be in Lowercase";
  // } else if (!hasNumber) {
  //   errors.username = "Username must include atleast one number";
  // }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 4) {
    errors.password = "Password length must be atleast 4 characters long";
  } else if (!isValid) {
    errors.password = "Password must contains atleast one number.";
  }
  // console.log(errors);
  return errors;
}
