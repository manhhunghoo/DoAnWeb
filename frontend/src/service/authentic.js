import * as httpRequest from "../utils/httpRequest";

export const login = async (email, password, role) => {
  try {
    let response = null;
    if (role === "student") {
      response = await httpRequest.post(
        `users/StudentLogin/${email}/${password}`
      );
    } else if (role === "teacher") {
      response = await httpRequest.post(
        `teachers/TeacherLogin/${email}/${password}`
      );
    } else if (role === "admin") {
      response = await httpRequest.post(
        `admin/AdminLogin/${email}/${password}`
      );
    }
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const logout = async (id,role) => {
  try {
    if(role==='student') {
      const response = await httpRequest.put(`users/StudentLogOut/${id}`);
      return response;
    }
    else  {
      return 'log out just for student'
    }
  } catch (error) {
    throw error.response;
  }
};

export const registerStudent = async (data) => {
  try {
    const response = await httpRequest.post(`users/StudentReg`, data);
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const registerTeacher = async () => {
  try {
    const response = await httpRequest.post(`users/TeacherReg`, data);
    return response;
  } catch (error) {
    throw error.response;
  }
}

export const getAlluserOnline = async () => {
  try {
    const response = await httpRequest.get(`users/getAlluserOnline/`);
    return response;
  } catch (error) {
    throw error.response;
  }
};
