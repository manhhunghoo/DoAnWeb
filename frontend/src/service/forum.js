import * as httpRequest from "../utils/httpRequest";

export const getForumAll = async () => {
  try {
    const response = await httpRequest.get("/complains/ComplainList");
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const getForum = async (idForum) => {
  // co id forum lay thong tin forum
  try {
    const response = await httpRequest.get(`/complains/${idForum}`);
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const addForum = async (data) => {
  try {
    const response = await httpRequest.post("/complains/ComplainCreate", data);
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const updateForum = async (idUser, data) => {
  // truyen vo id user cap cai post
  try {
    const response = await httpRequest.put(`/posts/UpdatePost/${idUser}`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteForum = async (id) => {
  try {
    const response = await httpRequest.remove(
      `/complains/DeleteComplain/${id}`
    );
    return response;
  } catch (error) {
    throw error.response;
  }
};
