import axios from "axios";

const GRAPHQL_URL = "http://localhost:8080/graphql";

export const getAllPersons = async () => {
  const query = {
    query: `
      query {
        getAllPerson {
          personId
          name
          address
          dateOfBirth
          gender
          nationality
          religion

        }
      }
    `
  };

  const response = await axios.post(GRAPHQL_URL, query);
  return response.data.data.getAllPerson;
};


export const searchPersons = async (name) => {
  const query = {
    query: `
      query($name: String!) {
        searchPerson(name: $name) {
          name
        }
      }
    `
  };

  const response = await axios.post(GRAPHQL_URL, query);
  return response.data.data.searchPerson;
};
