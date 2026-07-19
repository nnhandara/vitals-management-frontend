import axios from "axios";

const API_URL = "http://localhost:8080/person";

export const createPerson = async (data) => {
  const response = await axios.post(`${API_URL}/create`, data);
  return response.data;
};

export const updatePerson = (id, data) => {
  return axios.put(`${API_URL}/update/${id}`, data);
};

export const deletePerson = (id) => {
  return axios.delete(`${API_URL}/delete/${id}`);
};

// export const searchPersons = async (name) => {
//   const response = await fetch(`http://localhost:8080/person/search?name=${encodeURIComponent(name)}`);
//   return response.json();
// };