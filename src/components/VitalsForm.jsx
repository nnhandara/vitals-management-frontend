import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPersonById } from "../services/personQuery";
import { createVital } from "../services/vitalService";
import "../style/VitalsForm.css";

const VitalsForm = () => {
  const { personId } = useParams();

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loadingPatient, setLoadingPatient] = useState(true);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    temperature: "",
    bloodPressure: "",
    pulseRate: "",
    respiratoryRate: "",
    oxygenSaturation: "",
    weight: "",
    height: "",
    notes: "",
  });

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "Unknown";

    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  useEffect(() => {
    const fetchPatient = async () => {
      if (!personId) {
        setMessage("No patient selected. Please register a patient first.");
        setLoadingPatient(false);
        return;
      }

      try {
        const patient = await getPersonById(personId);

        if (patient) {
          setSelectedPatient(patient);
        } else {
          setMessage("Patient details could not be found.");
        }
      } catch (error) {
        console.error("Error loading patient:", error);
        setMessage("Failed to load patient details.");
      } finally {
        setLoadingPatient(false);
      }
    };

    fetchPatient();
  }, [personId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetVitalsForm = () => {
    setFormData({
      temperature: "",
      bloodPressure: "",
      pulseRate: "",
      heartRate: "",
      respiratoryRate: "",
      oxygenSaturation: "",
      weight: "",
      height: "",
      notes: "",
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!personId) {
    setMessage("No patient selected. Please register a patient first.");
    return;
  }

  const payload = {
    personId,
    temperature: Number(formData.temperature),
    bloodPressure: formData.bloodPressure,
    pulseRate: Number(formData.pulseRate),
    heartRate: Number(formData.pulseRate), // Assuming heart rate is the same as pulse rate
    respiratoryRate: Number(formData.respiratoryRate),
    oxygenSaturation: Number(formData.oxygenSaturation),
    weight: formData.weight ? Number(formData.weight) : null,
    height: formData.height ? Number(formData.height) : null,
    notes: formData.notes,
  };

  try {
    await createVital(personId, payload);

    setMessage("Vitals captured successfully.");
    resetVitalsForm();
  } catch (error) {
    console.error("Error saving vitals:", error);
    setMessage("Failed to save vitals.");
  }
};

  return (
    <div className="vitals-page">
      <div className="vitals-card">
        <div className="vitals-header">
          <h2>Capture Patient Vitals</h2>
          <p>Record vital signs for the registered patient.</p>
        </div>

        {message && <div className="vitals-message">{message}</div>}

        {loadingPatient ? (
          <div className="vitals-message">Loading patient details...</div>
        ) : (
          selectedPatient && (
            <div className="patient-info-card">
              <div>
                <span className="info-label">Patient Name</span>
                <strong>{selectedPatient.name}</strong>
              </div>

              <div>
                <span className="info-label">Age</span>
                <strong>{calculateAge(selectedPatient.dateOfBirth)} years</strong>
              </div>

              <div>
                <span className="info-label">Gender</span>
                <strong>{selectedPatient.gender || "Unknown"}</strong>
              </div>
            </div>
          )
        )}

        <form onSubmit={handleSubmit} className="vitals-form">
          <div className="form-group">
            <label>Temperature °C</label>
            <input
              type="number"
              step="0.1"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              placeholder="36.7"
              required
            />
          </div>

          <div className="form-group">
            <label>Blood Pressure</label>
            <input
              type="text"
              name="bloodPressure"
              value={formData.bloodPressure}
              onChange={handleChange}
              placeholder="120/80"
              required
            />
          </div>

          <div className="form-group">
            <label>Pulse Rate</label>
            <input
              type="number"
              name="pulseRate"
              value={formData.pulseRate}
              onChange={handleChange}
              placeholder="72"
              required
            />
          </div>

          <div className="form-group">
            <label>Heart Rate</label>
            <input
              type="number"
              name="heartRate"
              value={formData.heartRate}
              onChange={handleChange}
              placeholder="72"
              required
            />
          </div>  

          <div className="form-group">
            <label>Respiratory Rate</label>
            <input
              type="number"
              name="respiratoryRate"
              value={formData.respiratoryRate}
              onChange={handleChange}
              placeholder="18"
              required
            />
          </div>

          <div className="form-group">
            <label>Oxygen Saturation %</label>
            <input
              type="number"
              name="oxygenSaturation"
              value={formData.oxygenSaturation}
              onChange={handleChange}
              placeholder="98"
              required
            />
          </div>

          <div className="form-group">
            <label>Weight kg</label>
            <input
              type="number"
              step="0.1"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              placeholder="65"
            />
          </div>

          <div className="form-group">
            <label>Height cm</label>
            <input
              type="number"
              step="0.1"
              name="height"
              value={formData.height}
              onChange={handleChange}
              placeholder="170"
            />
          </div>

          <div className="form-group full-width">
            <label>Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Additional notes..."
            />
          </div>

          <button type="submit" className="save-vitals-btn">
            Save Vitals
          </button>
        </form>
      </div>
    </div>
  );
};

export default VitalsForm;