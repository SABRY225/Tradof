import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();

// refresh token

export const refreshToken = async ({ signal, oldToken }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/refresh-token`,
      { oldToken }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while fetching the token");
      err.code = error.response.status;
      err.info = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

// get all subscriptions
export const getAllSubscriptions = async ({ signal }) => {
  try {
    const response = await axios.get(
      `https://tradofserver.azurewebsites.net/api/package`,
      {
        signal,
      }
    );
    
    return response.data.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while fetching the packages");
      err.code = error.response.status;
      err.info = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

// get all counters for register
export const getAllCountries = async ({ signal }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/country`,
      {
        signal,
      }
    );
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

// get country by id
export const getCountryById = async ({ signal, id }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/country/${id}`,
      {
        signal,
      }
    );
    // console.log(response);
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while fetching the country");
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

async function urlToFile(imageUrl, filename = "downloaded-image.jpg") {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return new File([blob], filename, { type: blob.type });
}

// upload image in cloudinary
export const uploadImage = async ({ imageURL }) => {
  try {
    const image = await urlToFile(imageURL, "user-image.jpg");
    // console.log("Converted File:", image);
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "user_photo"); // Change this to your preset
    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dolzghrv6/image/upload",
        formData
      );
      // console.log(data);
      return data.secure_url;
    } catch (error) {
      console.error("Upload failed", error);
    }
  } catch (error) {
    console.error("Error converting URL to file", error);
  }
};

// register for freelancers
export const registerFreelancers = async ({ signal, data }) => {
  try {
    // console.log(data.profileImageUrl);
    const imageURL = await uploadImage({ imageURL: data.profileImageUrl });
    const handleData = {
      ...data,
      profileImageUrl: imageURL,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/register-freelancer`,
      handleData,
      {
        signal,
        headers: {
          "Content-Type": "application/json", // Ensure JSON format
        },
      }
    );
    // console.log(response);
    return response;
  } catch (error) {
    if (error.response) {
      const err = new Error(
        "An error occurred while registering the freelancer"
      );
      err.code = error.response.status;
      if (error.response.status === 400) {
        err.message = "Email address already exists";
        err.felid = "email";
      } else if (
        error.response.data.errors &&
        typeof error.response.data.errors === "object"
      ) {
        // Extract error messages from the object
        err.errors = error.response.data.errors;
      } else {
        err.message =
          error.response.data?.message || "An unexpected error occurred";
      }
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

// register for companies
export const registerCompanies = async ({ signal, data }) => {
  try {
    const imageURL = await uploadImage({ imageURL: data.profileImageUrl });
    const handleData = {
      ...data,
      profileImageUrl: imageURL,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/auth/register-company`,
      handleData,
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
      const err = new Error("An error occurred while registering the company");
      err.code = error.response.status;
      if (error.response.status === 400) {
        err.message = "Email address already exists";
        err.felid = "email";
      } else if (
        error.response.data.errors &&
        typeof error.response.data.errors === "object"
      ) {
        // Extract error messages from the object
        err.errors = error.response.data.errors;
      } else {
        err.message =
          error.response.data?.message || "An unexpected error occurred";
      }
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
    // console.log(response);

    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error);
      const err = new Error("An error occurred while Login");
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


// SABRY API
export const fatchProjectDetailes = async ({id,token}) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/project/${id}`,
      {
        headers: {
          "Content-Type": "application/json", // Ensure JSON format
          Authorization: `Bearer ${token}`,
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

export const fatchProjectCard = async ({id,token}) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/project/GetProjectCardData?projectId=${id}`,
      {
        headers: {
          "Content-Type": "application/json", // Ensure JSON format
          Authorization: `Bearer ${token}`,
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

export const sendFeedback=async({token,rate,reasonRate,idea})=>{
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_NODE_URL}/feedback`,
      {rate,reasonRate,idea},
      {
        headers: {
          Authorization: `${token}`,
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

}

export const searchAskQuestion = async({token,query})=>{
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_NODE_URL}/askQuestion/search?query=${query}`,
      {
        headers: {
          Authorization: `${token}`,
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
}

export const sendAskQuestion = async({token,question})=>{
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_NODE_URL}/askQuestion`,
      {question},
      {
        headers: {
          Authorization: `${token}`,
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
}