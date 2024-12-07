import { QuizSubmission } from "./QuizSubmissionType";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";

export const createSubmission = async (quizId: string, submission: Partial<QuizSubmission>) => {
  const response = await fetch(`${API_BASE}/quizzes/${quizId}/submit`, {
    method: "POST",
    body: JSON.stringify(submission),
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};

export const fetchSubmissions = async (quizId: string, studentId: string) => {
  const response = await fetch(`${API_BASE}/quizzes/${quizId}/submissions/${studentId}`);
  return response.json();
};

export const fetchSubmissionById = async (submissionId: string) => {
  const response = await fetch(`${API_BASE}/submissions/${submissionId}`);
  return response.json();
};

export const updateSubmissionScores = async (submissionId: string, updates: any) => {
  const response = await fetch(`${API_BASE}/submissions/${submissionId}/scores`, {
    method: "PUT",
    body: JSON.stringify(updates),
    headers: { "Content-Type": "application/json" },
  });
  return response.json();
};