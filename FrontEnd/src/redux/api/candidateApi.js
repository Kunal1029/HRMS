import API from "./api";

// Get all candidates
export const getCandidates = async () => {
  const response = await API.get("/candidates");
  return response.data;
};

// Add new candidate
export const addCandidate = async (candidateData) => {
  const response = await API.post("/candidates", candidateData);
  return response.data;
};

// Update candidate
export const updateCandidate = async (id, candidateData) => {
  const response = await API.put(`/candidates/${id}`, candidateData);
  return response.data;
};

// Delete candidate
export const deleteCandidate = async (id) => {
  const response = await API.delete(`/candidates/${id}`);
  return response.data;
};

// Download resume (when you implement it later)
export const downloadResume = async (id) => {
  const response = await API.get(`/candidates/${id}/resume`, {
    responseType: 'blob', 
  });
  return response.data;
};