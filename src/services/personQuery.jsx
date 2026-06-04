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

export const getPersonById = async (personId) => {
  const query = {
    query: `
      query($personId: String!) {
        getPersonById(personId: $personId) {
          personId
          name
          gender
          dateOfBirth
          address
          nationality
          religion
        }
      }
    `,
    variables: {
      personId,
    },
  };

  const response = await axios.post(GRAPHQL_URL, query);

  return response.data.data.getPersonById;
};


export const searchPersons = async (name) => {
  const query = {
    query: `
      query($name: String!) {
        searchPersonQuery(name: $name) {
          personId
          name
          dateOfBirth
          gender
        }
      }
    `,
    variables: {
      name,
    },
  };

  const response = await axios.post(GRAPHQL_URL, query);

  console.log("Search response:", response.data);

  return response.data.data.searchPersonQuery;
};

