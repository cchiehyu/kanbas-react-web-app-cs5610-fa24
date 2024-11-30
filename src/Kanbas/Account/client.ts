import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return data;
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const USERS_API = `${REMOTE_SERVER}/api/users`;
export const findCoursesForUser = async (userId: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${userId}/courses`);
  return response.data;
};


export const enrollIntoCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
  return response.data;
 };
 export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}`);
  return response.data;
 };
 

export const findAllUsers = async () => {
  try {
    const response = await axiosWithCredentials.get(USERS_API);
    console.log("Users API Response:", response);
    console.log("Users Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const createUser = async (user: any) => {
  const response = await axios.post(`${USERS_API}`, user);
  return response.data;
};


export const findUsersByRole = async (role: string) => {
  const response = await
    axios.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const findUsersByPartialName = async (name: string) => {
  const response = await axios.get(`${USERS_API}?name=${name}`);
  return response.data;
};

export const findUserById = async (id: string) => {
  console.log("Client findUserById called with id:", id);
  console.log("Full URL being called:", `${USERS_API}/${id}`);
  try {
    const response = await axios.get(`${USERS_API}/${id}`);
    console.log("Response received:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in client findUserById:", error);
    throw error;
  }
};

export const signin = async (credentials: any) => {
  console.log('Signin attempt:', { url: `${USERS_API}/signin`, credentials });  
  const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
  return response.data;
};

export const signup = async (user: any) => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signup`, user);
    return response.data;
  };
  
  export const updateUser = async (user: any) => {
    const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
    return response.data;
  };

  export const deleteUser = async (userId: string) => {
    const response = await axios.delete( `${USERS_API}/${userId}` );
    return response.data;
  };
  
  
  export const profile = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
    return response.data;
  };
  
  export const signout = async () => {
    const response = await axiosWithCredentials.post(`${USERS_API}/signout`);
    return response.data;
  };
  