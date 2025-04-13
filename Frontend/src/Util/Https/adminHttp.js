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

// delete Feedback


// Allowed Feedback



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
      const err = new Error("An error occurred while change password");
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
        console.log(error);
        const err = new Error("An error occurred while change password");
        err.code = error.response.status;
        err.message = error.response.data;
        throw err;
      }
      throw new Error(error.message || "An unexpected error occurred");
    }
}

