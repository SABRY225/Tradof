import axios from "axios";

// get all feedback
export const fetchFeedback = async ({ token }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_NODE_URL}/feedback`,
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
};
// Approve Feedback
export const ApproveFeedback = async ({ token, id }) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_NODE_URL}/feedback/approve/${id}`,
      {},
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
      const err = new Error("An error occurred while fetch Question");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};
// Dany Feedback
export const DanyFeedback = async ({ token, id }) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_NODE_URL}/feedback/dany/${id}`,
      {},
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while fetch Question");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};
// get Profit Withdrawal Requests

// edit status Withdrawal Requests

//get ask-question not answer
export const fetchAskQuestion = async ({ token }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_NODE_URL}/askQuestion/unanswered`,
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
      const err = new Error("An error occurred while fetch Question");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

// answer ask-question
export const AnswerAskQuestion = async ({ token, id, answer }) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_NODE_URL}/askQuestion/${id}`,
      { answer },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while fetch Question");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

// Get All Admin
export const GetAllAdmins = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/admin/admins`
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while fetch admins");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};
// add admin
export const addAdmin = async ({ data }) => {
  try {
    console.log(data);
    
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/admin/AddAdmin`,
      data ,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    
    if (error.response) {
      const err = new Error("An error occurred while add admin");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};
// add plan
export const AddPlan = async ({ data, token }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_NODE_URL}/package`,
      { data },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while add plan");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};
//edit plan
export const EditPlan = async ({ data, id, token }) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_NODE_URL}/package/${id}`,
      { data },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while edit plan");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const getMessagesList = async (token) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_NODE_URL}/technicalSupport`, {
      headers: { Authorization: `${token}` },
    });
    return res.data.messages;
  } catch (err) {
    console.error("Error fetching messages list:", err);
    throw err;
  }
};

export const getChatMessages = async (userId, token) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_NODE_URL}/technicalSupport/${userId}`, {
      headers: { Authorization: `${token}` },
    });
    return res.data.messages;
  } catch (err) {
    console.error(`Error fetching chat messages for user ${userId}:`, err);
    throw err;
  }
};

export const sendMessage = async (receiverId, message, file, token) => {
  const formData = new FormData();
  formData.append("receiverId", receiverId);
  formData.append("message", message);
  if (file) formData.append("file", file);

  try {
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_NODE_URL}/technicalSupport/admin`, formData, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error sending message:", err);
    throw err;
  }
};
// rabi3 in code
export const getAllSubscriptions = async ({ signal, token }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_NODE_URL}/subscription/all-subscriptions`,
      {
        signal,
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while fetch subscriptions");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const getIncomeStatistics = async ({ signal, token }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_NODE_URL}/subscription/income-statistics`,
      {
        signal,
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while fetch income statistics");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const getAdminStatistics = async ({ signal, token }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_NODE_URL}/financial/admin-statistics`,
      {
        signal,
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while fetch income statistics");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const getDashboardStatistics = async ({ signal, token }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/admin/GetDashboardStatistics`,
      {
        signal,
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error(
        "An error occurred while fetching dashboard statistics"
      );
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const getStatistics = async ({ token, year }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/admin/GetStatistics`,
      {
        params: { year },
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while fetching statistics");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export const getFreelancersAndCompanies = async ({ token }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/admin/GetFreelancersAndCompanies`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error(
        "An error occurred while fetching freelancers and companies"
      );
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
};
