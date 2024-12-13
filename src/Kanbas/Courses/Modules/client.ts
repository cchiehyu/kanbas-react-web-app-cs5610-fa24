import axios from "axios";
const API_BASE = "https://kanbas-server-cs5610-final-cyc-04c94dc4fc38.herokuapp.com";

export const createModuleAPI = async (courseId: string, moduleName: string) => {
  const response = await axios.post(`${API_BASE}/api/courses/${courseId}/modules`, {
    name: moduleName
  });
  return response.data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axios.get(`${API_BASE}/api/courses/${courseId}/modules`);
  return response.data;
};

export const deleteModuleAPI = async (moduleId: string) => {
  await axios.delete(`${API_BASE}/api/modules/${moduleId}`);
  return { success: true };
};

export const updateModuleAPI = async (moduleId: string, moduleName: string) => {
  await axios.put(`${API_BASE}/api/modules/${moduleId}`, {
    name: moduleName
  });
  return { moduleId, name: moduleName };
};