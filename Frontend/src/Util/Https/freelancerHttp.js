import axios from "axios";
import { uploadImage } from "./http";
import { toast } from "react-toastify";

export const getFreelancer = async ({ signal, id, token }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/freelancers/${id}`,
      {
        signal,
        headers: {
          Authorization: `Bearer ${token}`, // Attach token here
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error);
      const err = new Error("An error occurred while fetching freelancer data");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const addLanguagePair = async ({ signal, data, id, token }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/freelancers/${id}/language-pairs`,
      data,
      {
        signal,
        headers: {
          Authorization: `Bearer ${token}`, // Attach token here
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error);
      const err = new Error("An error occurred while fetching freelancer data");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const deleteLanguagePairs = async ({ signal, data, id, token }) => {
  console.log(data, id, token);
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/freelancers/${id}/language-pairs`,
      {
        signal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error);
      const err = new Error("An error occurred while fetching freelancer data");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const addCV = async ({ signal, data, id, token }) => {
  try {
    if (!data?.file) throw new Error("No file provided for upload");

    const formData = new FormData();
    formData.append("file", data.file);

    console.log("Final FormData:", formData);

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/freelancers/${id}/upload-cv`,
      formData,
      {
        signal,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server Error:", error);
      const err = new Error("An error occurred while adding CV");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const addSpecialization = async ({ signal, data, id, token }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/freelancers/AddSpecialization/${id}`,
      data,
      {
        signal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server Error:", error);
      const err = new Error("An error occurred while adding specified");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const deleteSpecialization = async ({ signal, data, id, token }) => {
  console.log(token);
  try {
    const response = await axios.delete(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/freelancers/RemoveSpecialization/${id}`,
      {
        signal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server Error:", error);
      const err = new Error("An error occurred while delete specified");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const editProfile = async ({ signal, data, id, token }) => {
  console.log(data);
  try {
    const imageURL = await uploadImage({ imageURL: data.profileImageUrl });
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/freelancers/${id}`,
      {
        ...data,
        profileImageUrl: imageURL,
      },
      {
        signal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server Error:", error);
      const err = new Error("An error occurred while edit profile");
      err.code = error.response.status;
      err.message = Object.entries(error.response.data.errors)
        .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
        .join(" ");
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const editSocialMedia = async ({ signal, data, id, token }) => {
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/freelancers/${id}/social-medias/add-or-update-or-remove`,
      data,
      {
        signal,
        headers: {
          Authorization: `Bearer ${token}`, // Attach token here
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error);
      const err = new Error("An error occurred while edit social media");
      err.code = error.response.status;
      err.errors = error.response.data.errors;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const changesPassword = async ({ signal, data, id, token }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/freelancers/${id}/change-password`,
      data,
      {
        signal,
        headers: {
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

export const getStatistics = async ({ signal, id, token }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/project/statistics?id=${id}`,
      {
        signal,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error);
      const err = new Error("An error occurred while fetch statistics");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};


export const AddOffer = async ({ data, token }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/proposal`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Server Error:", error);
      const err = new Error("An error occurred while adding offer");
      err.code = error.response.status;
      err.message = error.response.data.message;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const fatchProjects = async ({ token }) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/project/unassigned-projects?pageIndex=1&pageSize=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token here
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while fetching company data");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const fatchOffers = async ({ userId, token }) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/proposal/freelancer-proposals?freelancerId=${userId}&pageIndex=1&pageSize=4`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token here
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while fetching offers data");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const GetFreelancerStatistics = async ({ freelancerId, token }) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_NODE_URL
      }/financial/freelancer-statistics/${freelancerId}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while fetching company data");
      err.code = error.response.status;
      err.message = error.response.data;
      console.log(error);

      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const sendWithdrawRequest = async ({formData,token}) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_NODE_URL}/financial/request-withdrawProfits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `${token}`,
      },
      body: JSON.stringify(formData),
    });
   console.log(response);
   
    if (response.ok) {
      const data = await response.json();
      toast.success("Withdrawal successful!");
    
    } else {
      throw new Error("There was an error processing your withdrawal.");
    }
  } catch (error) {
    console.log(error);
    
    toast.error("An error occurred. Please check your connection and try again.");
    console.error("Error:", error);
  }
};

// rabi3 in code
export const getCurrentProjects = async ({
  signal,
  token,
  freelancerId,
  pageIndex,
  pageSize,
}) => {
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/project/projects/freelancer?freelancerId=${freelancerId}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
      {
        signal,
        headers: {
          Authorization: `Bearer ${token}`, // Attach token here
        },
      }
    );
    console.log("response", response);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error);
      const err = new Error(
        "An error occurred while fetching freelancer projects"
      );
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const getUnassignedProjects = async ({ signal, token, filter }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/project/unassigned-projects`,
      {
        params: { ...filter },
        signal,
        headers: {
          Authorization: `Bearer ${token}`, // Attach token here
        },
      }
    );
    console.log("response", response);
    return response.data.data;
  } catch (error) {
    if (error.response) {
      console.log(error);
      const err = new Error("An error occurred while fetching projects");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const reviewRequest = async ({ signal, id, token }) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/project/SendReviewRequest/${id}`,
      {},
      {
        signal,
        headers: {
          Authorization: `Bearer ${token}`, // Attach token here
        },
      }
    );
    console.log("response", response);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error);
      const err = new Error("An error occurred while fetching freelancer data");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const getOffersChart = async ({
  signal,
  token,
  year = "",
  month = "",
  state = "",
}) => {
  // console.log(token);
  try {
    const response = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/proposal/countByMonth?year=${year}&month=${month}&status=${state}`,
      {
        signal,
        headers: {
          Authorization: `Bearer ${token}`, // Attach token here
        },
      }
    );
    // console.log("response", response);
    return response.data.data;
  } catch (error) {
    if (error.response) {
      console.log(error);
      const err = new Error(
        "An error occurred while fetching freelancer offer chart"
      );
      err.code = error.response.status;
      err.message = error.response.data;
      err.errors = error.errors;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const askForReview = async ({
  signal,
  projectId,
  freelancerId,
  token,
}) => {
  try {
    const response = await axios.put(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/project/send-review-request?projectId=${projectId}&freelancerId=${freelancerId}`,
      {},
      {
        signal,
        headers: {
          Authorization: `Bearer ${token}`, // Attach token here
        },
      }
    );
    console.log("response", response);
    return response.data.data;
  } catch (error) {
    if (error.response) {
      console.log(error);
      const err = new Error(
        "An error occurred while fetching freelancer offer chart"
      );
      err.code = error.response.status;
      err.message = error.response.data;
      err.errors = error.errors;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const GetFreelancerProjectsFinancials = async ({ token }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_NODE_URL}/financial/projects-freelancer`,
      {
        headers: {
          Authorization: `${token}`, 
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while Get Financial Projects Freelancer");
      err.code = error.response.status;
      err.message = error.response.data.message;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};