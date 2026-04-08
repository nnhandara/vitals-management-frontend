import React, { useState } from "react";
import { createPerson, updatePerson, searchPersons } from "../services/personService";
import "../style/PersonForm.css";

const PersonForm = ({ refresh, editPerson }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [nationality, setNationality] = useState("");
  const [religion, setReligion] = useState("");

  const resetForm = () => {
    setId("");
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
        return;
      }

      const results = await searchPersons(searchTerm);
      setSearchResults(results || []);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleSelectPerson = (person) => {
    setId(person.id || "");
    setName(person.name || "");
    setDateOfBirth(person.dateOfBirth || "");
    setGender(person.gender || "");
    setAddress(person.address || "");
    setNationality(person.nationality || "");
    setReligion(person.religion || "");

    setShowForm(true);
    setSearchResults([]);
    setSearchTerm(person.name || "");

    alert("Patient already exists. You can update instead.");
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

      if (editPerson || id) {
        await updatePerson(id, {
          name,
          dateOfBirth,
          gender,
          address,
          nationality,
          religion,
        });
        alert("Updated!");
      } else {
        await createPerson({
          name,
          dateOfBirth,
          gender,
          address,
          nationality,
          religion,
        });
        alert("Created!");
      }

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
            />
          </div>

          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>

        {/* RESULTS */}
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((person) => (
              <div
                key={person.id}
                className="result-item"
                onClick={() => handleSelectPerson(person)}
              >
                {person.name} - {person.dateOfBirth}
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

              <input
                type="text"
                placeholder="Nationality"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
              />

              <input
                type="text"
                placeholder="Religion"
                value={religion}
                onChange={(e) => setReligion(e.target.value)}
              />
            </div>
          </div>
        )}

        <button className="submit-btn" onClick={handleSubmit}>
          {!showForm
            ? "Register New Patient"
            : editPerson || id
            ? "Update Patient"
            : "Save Patient"}
        </button>
      </div>
    </div>
  );
};

export default PersonForm;