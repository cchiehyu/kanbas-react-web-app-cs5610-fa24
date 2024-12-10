import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";

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