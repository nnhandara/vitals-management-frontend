import axios from "axios";

const API_URL = "http://localhost:8080";

export const createVital = async (personId, payload) => {
  const response = await axios.post(
    `${API_URL}/${personId}/vital/create`,
    payload
  );

  return response.data;
};