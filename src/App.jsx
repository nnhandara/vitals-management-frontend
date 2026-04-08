import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PersonForm from "./components/PersonForm";
import PersonList from "./components/PersonList";
import "./App.css";

function App() {
  const refresh = () => {
    window.location.reload();
  };

  return (
    <BrowserRouter>
      <div>
        <Navbar
          user={{ name: "Nyale" }}
          onLogout={() => console.log("Logged out")}
        />

        <div className="container">
          <Routes>
            <Route path="/" element={<PersonForm refresh={refresh} />} />
            <Route path="/patients" element={<PersonList />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;