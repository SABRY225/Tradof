import axios from "axios";
import { uploadImage } from "./http";

export const getCompany = async ({ signal, id, token }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/Company/${id}`,
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
      const err = new Error("An error occurred while fetching company data");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const addPreferredLanguage = async ({ signal, data, id, token }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/Company/AddLanguage/${id}`,
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
      const err = new Error(
        "An error occurred while adding preferred language"
      );
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const deletePreferredLanguage = async ({ signal, data, id, token }) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/Company/RemoveLanguage/${id}`,
      {
        signal,
        headers: {
          Authorization: `Bearer ${token}`, // Attach token here
        },
        data,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error);
      const err = new Error(
        "An error occurred while delete preferred language"
      );
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
      `${import.meta.env.VITE_BACKEND_URL}/Company/AddSpecialization/${id}`,
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
      const err = new Error("An error occurred while adding Specialization");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const deleteSpecialization = async ({ signal, data, id, token }) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/Company/RemoveSpecialization/${id}`,
      {
        signal,
        headers: {
          Authorization: `Bearer ${token}`, // Attach token here
        },
        data,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error);
      const err = new Error("An error occurred while delete Specialization");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const editProfile = async ({ signal, data, token }) => {
  try {
    const imageURL = await uploadImage({ imageURL: data.profileImageUrl });
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/Company/UpdateCompany`,
      {
        ...data,
        profileImageUrl: imageURL,
      },
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
      const err = new Error("An error occurred while edit profile");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const createProject = async ({ signal, data, id, token }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/project`,
      data,
      {
        signal,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Attach token here
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log(error);
      const err = new Error("An error occurred while create project");
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
      }/Company/${id}/social-medias/add-or-update-or-remove`,
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

export const addEmployeeToCompany = async ({ signal, data, token }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/Company/AddEmployee`,
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
    console.log(error);

    if (error.response) {
      const err = new Error(
        "An error occurred while adding employee to company"
      );
      err.code = error.response.status;

      if (error.response.status === 500) {
        err.message = "Email address already exists";
        err.felid = "email";
      } else if (
        error.response.data.errors &&
        typeof error.response.data.errors === "object"
      ) {
        // Extract error messages from the object
        err.message = Object.values(error.response.data.errors)
          .flat() // Flatten if values are arrays
          .join(" ");
      } else {
        err.message =
          error.response.data?.message || "An unexpected error occurred";
      }

      throw err;
    }

    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const getEmployeeToCompany = async ({ signal, id, token }) => {
  // console.log(id, token);
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/company/${id}/employees`,
      {
        signal,
        headers: {
          Authorization: `Bearer ${token}`, // Attach token here
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    if (error.response) {
      const err = new Error("An error occurred while get employee to company");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const changesPassword = async ({ signal, data, id, token }) => {
  try {
    const response = await axios.post(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/Company/${id}/ChangePassword`,
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

//  A.SABRY
export const getStartedProjects = async ({ id, token}) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/project/allstartedprojects?companyId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token here
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while fetching start projects data");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const getUpcomingdProjects = async ({ id, token}) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/project/allincomingprojects?companyId=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token here
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while fetching incoming projects data");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const deleteProject = async ({ id, token}) => {
  try {
    console.log(id);
    
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/project/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token here
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while deleting project");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
} ;

export const fatchCurrentOffers = async ({ PageIndex,ProjectId, token}) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/proposal?&PageSize=3&PageIndex=${PageIndex}&ProjectId=${ProjectId}`,
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

export const Acceptproposal = async ({ projectId,proposalId, token}) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/proposal/accept?projectId=${projectId}&proposalId=${proposalId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

export const Denyproposal = async ({projectId,proposalId, token}) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/proposal/deny?projectId=${projectId}&proposalId=${proposalId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
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


export const uploadProjectFile = async ({ token, data, projectId }) => {
  try {
    console.log(token, data, projectId);
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/project/upload-files/${projectId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      console.log("Error response:", error.response.data); // 👈 helpful
      const err = new Error("An error occurred while uploading file");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const deleteProjectFile = async ({ token, fileId }) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/project/delete-file/${fileId}`,
      {
        headers: {
          "Content-Type": "application/json", // Ensure JSON format
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    if (error.response) {
      console.log(error);
      const err = new Error("An error occurred while delete file");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};


