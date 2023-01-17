const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_PASSWORD = "PASSWORD";
// const VALIDATOR_TYPE_PASSWORD_MATCH = "PASSWORD_MATCH";
const VALIDATOR_TYPE_EMAIL = "EMAIL";

export const validate = (value, validators) => {
  let isValid = true;
//   let password;
  
  if (validators === VALIDATOR_TYPE_REQUIRE) {
    isValid = isValid && value.trim().length > 0;
  } 
  else if (validators === VALIDATOR_TYPE_EMAIL) {
    isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
  } 
  else if (validators === VALIDATOR_TYPE_PASSWORD) {
    isValid = isValid && value.length >= 8;
    // password = value;
  } 
//   else if (validators === VALIDATOR_TYPE_PASSWORD_MATCH) {
//     console.log(password, value);
//     isValid = isValid && value === password;
//   } 
  else {
    isValid = false;
  }

  return isValid;
};
