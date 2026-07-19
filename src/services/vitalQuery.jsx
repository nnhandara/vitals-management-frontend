const GRAPHQL_URL = "http://localhost:8080/graphql";

export const getVitalsByPersonId = async (personId) => {
  const query = `
    query GetVitalsByPersonId($personId: ID!) {
      vitalsByPersonId(personId: $personId) {
        vitalId
        temperature
        bloodPressure
        pulseRate
        respiratoryRate
        oxygenSaturation
        weight
        height
        notes
        recordedAt
      }
    }
  `;

  const response = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { personId },
    }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data.vitalsByPersonId;
};