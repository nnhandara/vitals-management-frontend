import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPersonById } from "../services/personQuery";
import { getVitalsByPersonId } from "../services/vitalQuery";
import "../style/PatientVitals.css";

const PatientVitals = () => {
  const { personId } = useParams();

  const [patient, setPatient] = useState(null);
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const patientData = await getPersonById(personId);
        setPatient(patientData);

        const vitalsData = await getVitalsByPersonId(personId);
        setVitals(vitalsData || []);
      } catch (error) {
        console.error(error);
        setMessage("Failed to load patient vitals.");
      } finally {
        setLoading(false);
      }
    };

    if (personId) {
      fetchData();
    }
  }, [personId]);

  const calculateAge = (dob) => {
    if (!dob) return "";

    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  if (loading) {
    return <p className="loading">Loading patient vitals...</p>;
  }

  return (
    <div className="patient-vitals-container">

      <h2>Patient Vitals</h2>

      {message && <p className="error">{message}</p>}

      {patient && (
        <div className="patient-card">
          <h3>{patient.name}</h3>

          <p>
            <strong>Age:</strong> {calculateAge(patient.dateOfBirth)}
          </p>

          <p>
            <strong>Gender:</strong> {patient.gender}
          </p>

          <p>
            <strong>Address:</strong> {patient.address}
          </p>
        </div>
      )}

      {vitals.length === 0 ? (
        <p>No vitals have been recorded for this patient.</p>
      ) : (
        <table className="vitals-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Temperature</th>
              <th>Blood Pressure</th>
              <th>Pulse</th>
              <th>Respiratory</th>
              <th>Oxygen</th>
              <th>Weight</th>
              <th>Height</th>
              <th>Notes</th>
            </tr>
          </thead>

          <tbody>
            {vitals.map((vital) => (
              <tr key={vital.vitalId}>
                <td>{vital.recordedAt}</td>
                <td>{vital.temperature} °C</td>
                <td>{vital.bloodPressure}</td>
                <td>{vital.pulseRate}</td>
                <td>{vital.respiratoryRate}</td>
                <td>{vital.oxygenSaturation}%</td>
                <td>{vital.weight ?? "-"}</td>
                <td>{vital.height ?? "-"}</td>
                <td>{vital.notes || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientVitals;