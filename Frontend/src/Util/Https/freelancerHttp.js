import axios from "axios";

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
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/freelancers/${id}`,
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
      const err = new Error("An error occurred while edit profile");
      err.code = error.response.status;
      err.message = error.response.data;
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

// SABRY API
export const AddOffer = async ({data,token})=>{
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
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
}

export const fatchProjects = async ({token}) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/project?pageIndex=1&Status&pageSize=10&budget&languageFromId&languageToId&sortBy`,
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