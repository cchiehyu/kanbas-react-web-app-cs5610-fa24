import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const MODULES_API = `${REMOTE_SERVER}/api/modules`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const updateModule = async (module: any) => {
  const { data } = await axiosWithCredentials.put(`${MODULES_API}/${module._id}`, module);
  return data;
};

export const deleteModule = async (moduleId: string) => {
  const response = await axiosWithCredentials.delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};
 
export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const findUsersForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/users`);
  return response.data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const fetchAllCourses = async () => {
  try {
    const response = await axiosWithCredentials.get(COURSES_API);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: any) => {
  if (!course?._id) {
    console.error('Update failed: No course ID provided');
    throw new Error('Course ID is required for updates');
  }

  const courseId = course._id;
  // Create a copy of course data without _id for updates
  const { _id, ...courseUpdates } = course;

  console.log('Updating course - Data being sent to server:', {
    courseId,
    courseUpdates,
    endpoint: `${COURSES_API}/${courseId}`
  });
  
  try {
    const { data } = await axiosWithCredentials.put(
      `${COURSES_API}/${courseId}`, 
      courseUpdates  // Send only the updates, not the _id
    );
    
    console.log('Server response for update:', data);
    return data;
  } catch (error) {
    console.error('Failed to update course:', error);
    throw error;
  }
};


export const createCourse = async (course: any) => {
  console.log('Creating new course - Data being sent to server:', {
    courseData: course,
    endpoint: COURSES_API
  });
  
  const { data } = await axiosWithCredentials.post(
    COURSES_API, 
    course
  );
  
  console.log('Server response for create:', data);
  return data;
};