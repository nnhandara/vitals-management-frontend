import React, { useEffect, useState } from "react";
import { getAllPersons } from "../services/personQuery";
import { useNavigate } from "react-router-dom";
import "../style/PatientList.css";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchPatients = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAllPersons();

      const cleanedData = (data || []).filter(
        (p) =>
          p.name ||
          p.dateOfBirth ||
          p.gender ||
          p.address ||
          p.nationality ||
          p.religion
      );

      setPatients(cleanedData);
      setFilteredPatients(cleanedData);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setError("Failed to load patients. Please check your backend or GraphQL query.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  useEffect(() => {
    const results = patients.filter((patient) =>
      `${patient.name} ${patient.gender} ${patient.address} ${patient.nationality} ${patient.religion}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    setFilteredPatients(results);
  }, [searchTerm, patients]);

  return (
    <div className="patient-list-container">
      <div className="patient-list-header">
        <div>
          <h2 className="patient-list-title">Patient List</h2>
          <p className="patient-list-subtitle">Registered patients</p>
        </div>

        <button onClick={fetchPatients} className="refresh-button">
          Refresh
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name, gender, address, nationality..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="patient-search-input"
      />

      {loading ? (
        <p className="patient-message">Loading patients...</p>
      ) : error ? (
        <p className="patient-error">{error}</p>
      ) : filteredPatients.length === 0 ? (
        <p className="patient-message">No patients found.</p>
      ) : (
        <div className="patient-table-wrapper">
          <table className="patient-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Nationality</th>
                <th>Religion</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredPatients.map((p) => (
                <tr key={p.personId}>
                  <td>{p.name || ""}</td>
                  <td>{p.dateOfBirth || ""}</td>
                  <td>{p.gender || ""}</td>
                  <td>{p.address || ""}</td>
                  <td>{p.nationality || ""}</td>
                  <td>{p.religion || ""}</td>

                  <td>
                    <button
                      className="capture-vitals-btn"
                      onClick={() => {
                        console.log("Navigating with personId:", p.personId);
                        navigate(`/patients/${p.personId}/vitals`);
                      }}
                    >
                      Capture Vitals
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientList;