import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();

// get all counters for register
export const getAllCountries = async ({ signal }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/country`,
      {
        signal,
      }
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while fetching the countries");
      err.code = error.response.status;
      err.info = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

// get all languages for register
export const getAllLanguages = async ({ signal }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/language`,
      {
        signal,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while fetching the languages");
      err.code = error.response.status;
      err.info = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

// get all specialization for register
export const getAllSpecializations = async ({ signal }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/specialization`,
      {
        signal,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error(
        "An error occurred while fetching the specialization"
      );
      err.code = error.response.status;
      err.info = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

// register for freelancers
export const registerFreelancers = async ({ signal, data }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/register-freelancer`,
      data,
      {
        signal,
        headers: {
          "Content-Type": "application/json", // Ensure JSON format
        },
      }
    );
    console.log(response);
    return response;
  } catch (error) {
    if (error.response) {
      console.log(error);
      const err = new Error(
        "An error occurred while registering the freelancer"
      );
      err.code = error.response.status;
      err.errors = error.response.data.errors;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

// register for companies
export const registerCompanies = async ({ signal, data }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/register-company`,
      data,
      {
        signal,
        headers: {
          "Content-Type": "application/json", // Ensure JSON format
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      console.log(error);
      const err = new Error(
        "An error occurred while registering the freelancer"
      );
      err.code = error.response.status;
      err.errors = error.response.data.errors;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

// login user
export const loginUser = async ({ signal, data }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/log-in`,
      data,
      {
        signal,
        headers: {
          "Content-Type": "application/json", // Ensure JSON format
        },
      }
    );
    console.log(response);
    
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error);
      const err = new Error(
        "An error occurred while Login"
      );
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const restPassword = async ({ signal, data }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/forget-password`,
      data,
      {
        signal,
        headers: {
          "Content-Type": "application/json", // Ensure JSON format
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error);
      const err = new Error("An error occurred while send otp");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const verifyEmail = async ({ signal, data }) => {
  console.log(data);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/verify-otp`,
      data,
      {
        signal,
        headers: {
          "Content-Type": "application/json", // Ensure JSON format
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error);
      const err = new Error("An error occurred while verify email");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const changePassword = async ({ signal, data }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/change-password`,
      data,
      {
        signal,
        headers: {
          "Content-Type": "application/json", // Ensure JSON format
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error);
      const err = new Error("An error occurred while change password");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};
