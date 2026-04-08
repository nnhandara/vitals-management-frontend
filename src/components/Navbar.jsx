import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../style/Navbar.css";

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();

  const links = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
      ),
    },
    {
      to: "/patients",
      label: "Patients",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
    },
    {
      to: "/vitals",
      label: "Vitals",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      ),
    },
    {
      to: "/settings",
      label: "Settings",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
        </svg>
      ),
    },
  ];

  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <nav className="nb">
      <div className="nb-inner">
        <Link to="/" className="nb-logo">
          <div className="nb-logo-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div className="nb-logo-text">
            <span className="nb-logo-title">Vitals MS</span>
            <span className="nb-logo-sub">Management System</span>
          </div>
        </Link>

        <div className="nb-links">
          {links.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              className={`nb-link ${location.pathname.startsWith(to) ? "active" : ""}`}
            >
              {icon}
              {label}
            </Link>
          ))}
        </div>

        <div className="nb-right">
          <div className="nb-divider" />
          <div className="nb-avatar" title={user?.name}>
            {getInitials(user?.name || "User")}
          </div>
          <button className="nb-logout" onClick={onLogout}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
