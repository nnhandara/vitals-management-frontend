import React, { useState } from "react";
import { createPerson } from "../services/personService";
import { searchPersons } from "../services/personQuery";
import { useNavigate } from "react-router-dom";
import "../style/PersonForm.css";

const PersonForm = ({ refresh, editPerson }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [personId, setPersonId] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [nationality, setNationality] = useState("");
  const [religion, setReligion] = useState("");

  const resetForm = () => {
    setPersonId("");
    setName("");
    setDateOfBirth("");
    setGender("");
    setAddress("");
    setNationality("");
    setReligion("");
  };

  const handleSearch = async () => {
    try {
      if (!searchTerm.trim()) {
        setSearchResults([]);
        setMessage("");
        return;
      }

      const results = await searchPersons(searchTerm);

      if (!results || results.length === 0) {
        setSearchResults([]);
        setMessage("Person does not exist");
      } else {
        setSearchResults(results);
        setMessage("");
      }
    } catch (error) {
      console.error("Search error:", error.response?.data || error);
      setMessage("Error searching for person");
    }
  };

  const handleSelectPerson = (person) => {
    setPersonId(person.personId || "");
    setName(person.name || "");
    setDateOfBirth(person.dateOfBirth || "");
    setGender(person.gender || "");
    setAddress(person.address || "");
    setNationality(person.nationality || "");
    setReligion(person.religion || "");

    setShowForm(true);
    setSearchResults([]);
    setSearchTerm(person.name || "");

    alert("Patient already exists.");
  };

  const handleSubmit = async () => {
    try {
      if (!showForm) {
        setShowForm(true);
        return;
      }

      if (!name.trim() || !dateOfBirth) {
        alert("Please enter at least name and date of birth.");
        return;
      }

      const savedPerson = await createPerson({
        name,
        dateOfBirth,
        gender,
        address,
        nationality,
        religion,
      });

      alert("Patient Created!");

      navigate(`/vitals/${savedPerson.personId}`);

      resetForm();
      setShowForm(false);
      setSearchTerm("");
      setSearchResults([]);
      refresh();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };
  return (
    <div className="form-shell">
      <div className="form-card">
        {/* SEARCH */}
        <div className="search-box">
          <div className="search-input-wrap">
            <span className="search-icon">⌕</span>
            <input
              placeholder="Search existing patient..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>

          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* RESULTS */}
        {message && <div className="error-message">{message}</div>}
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((person) => (
              <div
                key={person.personId}
                className="result-item"
                onClick={() => handleSelectPerson(person)}
              >
                <div>
                  <strong>Name:</strong> {person.name}
                </div>
                <div>
                  <strong>Date of Birth:</strong> {person.dateOfBirth}
                </div>
                <div>
                  <strong>Gender:</strong> {person.gender}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FORM */}
        {showForm && (
          <div className="form-body">
            <div className="field-group">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />

              <select
                placeholder="Gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <select
                type="text"
                placeholder="Nationality"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
              >
                <option value="">Select Nationality</option>
                <option value="African">African</option>
                <option value="American">American</option>
                <option value="Canadian">Canadian</option>
              </select>

              <select
                type="text"
                placeholder="Religion"
                value={religion}
                onChange={(e) => setReligion(e.target.value)}
              >
                <option value="">Select Religion</option>
                <option value="Christian">Christian</option>
                <option value="Muslim">Muslim</option>
                <option value="ATR">ATR</option>
              </select>
            </div>
          </div>
        )}

        <button className="submit-btn" onClick={handleSubmit}>
          {!showForm ? "Register New Patient" : "Save Patient"}
        </button>
      </div>
    </div>
  );
};

export default PersonForm;
