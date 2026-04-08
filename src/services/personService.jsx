import axios from "axios";

const API_URL = "http://localhost:8080/person";

export const createPerson = (data) => {
  return axios.post(`${API_URL}/create`, data);
};

export const updatePerson = (id, address) => {
  return axios.put(`${API_URL}/update/${id}`, { address });
};

export const deletePerson = (id) => {
  return axios.delete(`${API_URL}/delete/${id}`);
};

export const searchPersons = async (name) => {
  const response = await fetch(`http://localhost:8080/person/search?name=${encodeURIComponent(name)}`);
  return response.json();
};