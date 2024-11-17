import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const BASE_API = `${REMOTE_SERVER}/api`;

export const updateAssignment = async (assignment: any) => {
    const response = await axios.put(
        `${BASE_API}/assignments/${assignment._id}`, 
        assignment
    );
    return response.data;
};

export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
    const response = await axios.post(
        `${BASE_API}/courses/${courseId}/assignments`,
        assignment
    );
    return response.data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
    const response = await axios.get(
        `${BASE_API}/courses/${courseId}/assignments`
    );
    return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
    await axios.delete(`${BASE_API}/assignments/${assignmentId}`);
    return assignmentId;  // Return ID for Redux update
};