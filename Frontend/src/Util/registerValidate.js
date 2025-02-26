
export function StepOneValidator({ stepOneData }) {
  let errors = [];
  if (stepOneData.accountType === null) {
    errors.push("Must Choose account type");
  }
  if (stepOneData.acceptPolicy === false) {
    errors.push("You must accept policy");
  }
  return errors;
}

export function StepTwoValidator({ stepTwoData }) {
  let errors = [];
  const phoneRegex = /^\+?[1-9]\d{6,14}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

  if (!stepTwoData.firstName.trim()) {
    errors.push({ felid: "firstName", message: "First name is required." });
  }

  if (!stepTwoData.lastName.trim()) {
    errors.push({ felid: "lastName", message: "Last name is required" });
  }

  if (!stepTwoData.phoneNumber.trim()) {
    errors.push({ felid: "phoneNumber", message: "Phone number is required." });
  } else if (!phoneRegex.test(stepTwoData.phoneNumber)) {
    errors.push({
      felid: "phoneNumber",
      message: "Phone number must be 10-15 digits.",
    });
  }

  if (!stepTwoData.email.trim()) {
    errors.push({
      felid: "email",
      message: "Email is required.",
    });
  } else if (!emailRegex.test(stepTwoData.email)) {
    errors.push({
      felid: "email",
      message: "Invalid email format.",
    });
  }

  if (!stepTwoData.password.trim()) {
    errors.push({
      felid: "password",
      message: "Password is required.",
    });
  } else if (stepTwoData.password.length < 6) {
    errors.push({
      felid: "password",
      message: "Password must be at least 6 characters long.",
    });
  } else if (!passwordRegex.test(stepTwoData.password)) {
    errors.push({
      felid: "password",
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }

  if (!stepTwoData.confirmPassword.trim()) {
    errors.push({
      felid: "confirmPassword",
      message: "Please confirm your password.",
    });
  } else if (stepTwoData.password !== stepTwoData.confirmPassword) {
    errors.push({
      felid: "confirmPassword",
      message: "Passwords do not match.",
    });
  }

  return errors;
}

export function StepThreeFreelancerValidator({ stepThreeData }) {
  if (stepThreeData.currentPhoto.trim() === "") {
    return "Please choose account photo";
  }
  if (stepThreeData.country.trim() === "") {
    return "Please choose country";
  }
  if (stepThreeData.specializations.length == 0) {
    return "Please choose at least one specialization";
  }
  if (stepThreeData.languagePair.length == 0) {
    return "Please choose at least one language pair";
  }
  return "";
}
export function StepThreeCompanyValidator({ stepThreeData }) {
  if (stepThreeData.currentPhoto.trim() === "") {
    return "Please choose account photo";
  }
  if (stepThreeData.companyName.trim() === "") { 
    return "Please write company name";
  }
  if (stepThreeData.country.trim() === "") {
    return "Please choose country";
  }
  if (stepThreeData.location.trim() === "") { 
  return "Please choose location";
  }
  if (stepThreeData.jopTitle.trim() === "") { 
    return "Please write jop title";
  }
  if (stepThreeData.industriesServed.length == 0) {
    return "Please choose at least one Industries Served";
  }
  if (stepThreeData.preferredLanguage.length == 0) {
    return "Please choose at least one preferred language";
  }
  return "";
}
