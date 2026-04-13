import React, { useEffect, useState } from "react";
import { getAllPersons } from "../services/personQuery";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const data = await getAllPersons();
      setPatients(data || []);
      setError("");
    } catch (error) {
      console.error("Error fetching patients:", error);
      setError("Failed to load patients.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Patient List</h2>

      {loading ? (
        <p>Loading patients...</p>
      ) : error ? (
        <p>{error}</p>
      ) : patients.length === 0 ? (
        <p>No patients found</p>
      ) : (
        <table border="1" width="100%">
          <thead>
            <tr>
              <th>Name</th>
              <th>DOB</th>
              <th>Gender</th>
              <th>Address</th>
              <th>Nationality</th>
              <th>Religion</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.personId}>
                <td>{p.name}</td>
                <td>{p.dateOfBirth}</td>
                <td>{p.gender}</td>
                <td>{p.address}</td>
                <td>{p.nationality}</td>
                <td>{p.religion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientList;