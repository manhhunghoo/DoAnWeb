import * as httpRequest from "../utils/httpRequest";

export const getPosts = async () => {
  try {
    const response = await httpRequest.get("/posts/GetPostAll");
    return response;
  } catch (error) {
    throw error.response;
  }
};
export const getListPostofItem = async (idsItem) => {
  try {
    const response = await httpRequest.get(`/posts/Getlist/${idsItem}`);
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const CreateNewPost = async (data) => {
  try {
    const response = await httpRequest.post("/posts/CreateNewPost", data);
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const UpdatePost = async (idPost, data) => {
  // truyen vo id user cap cai post
  try {
    const response = await httpRequest.put(`/posts/UpdatePost/${idPost}`, data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const DeletePost = async (id) => {
  try {
    const response = await httpRequest.remove(`/posts/DeletePost/${id}`);
    return response;
  } catch (error) {
    throw error.response;
  }
};
