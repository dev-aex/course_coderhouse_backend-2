const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ' -]+$/;
const ageRegex = /^(0?[1-9]|[1-9][0-9]|1[01][0-9]|120)$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export default class Validator {
  firstName(firstName) {
    if (!firstName || firstName.length < 2) {
      return false;
    }
    if (!nameRegex.test(firstName)) {
      return false;
    }
    return true;
  }
  lastName(lastname) {
    if (!lastname || lastname.length < 2) {
      return false;
    }
    if (!nameRegex.test(lastname)) {
      return false;
    }
    return true;
  }
  age(age) {
    if (!age || age.length < 2) {
      return false;
    }
    if (!ageRegex.test(age)) {
      return false;
    }
    return true;
  }
  email(email) {
    if (!email) {
      return false;
    }
    if (!emailRegex.test(email)) {
      return false;
    }
    return true;
  }
  password(password) {
    if (!password || password.length < 8) {
      return false;
    }
    if (!passwordRegex.test(password)) {
      return false;
    }
    return true;
  }
}
