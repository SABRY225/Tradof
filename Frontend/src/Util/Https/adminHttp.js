import axios from "axios";

// get all feedback
export const fetchFeedback = async({token})=>{
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
}
// Approve Feedback
export const ApproveFeedback = async({token,id})=>{
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
}
// Dany Feedback
export const DanyFeedback = async({token,id})=>{
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
}
// get Profit Withdrawal Requests


// edit status Withdrawal Requests


//get ask-question not answer
export const fetchAskQuestion = async({token})=>{
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
}

// answer ask-question 
export const AnswerAskQuestion = async({token,id,answer})=>{
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_NODE_URL}/askQuestion/${id}`,
        {answer},
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
}

// Get All Admin
export const GetAllAdmins = async()=>{
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/admin/admins`);
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
}
// add admin
export const AddAdmin = async({data,token})=>{
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/admin/AddAdmin`,{data},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return response.data;
  } catch (error) {
    if (error.response) {
      const err = new Error("An error occurred while add admin");
      err.code = error.response.status;
      err.message = error.response.data;
      throw err;
    }
    throw new Error(error.message || "An unexpected error occurred");
  }
}
// add plan
export const AddPlan = async({data,token})=>{
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_NODE_URL}/package`,{data},
      {
        headers: {
          Authorization: `${token}`,
        },
      });
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
}
//edit plan
export const EditPlan = async({data,id,token})=>{
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_BACKEND_NODE_URL}/package/${id}`,{data},
      {
        headers: {
          Authorization: `${token}`,
        },
      });
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
}