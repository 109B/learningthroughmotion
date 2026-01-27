"use client";

import { useState, useEffect } from "react";

const CORRECT_PASSWORD = "24Ch@t_LTM_2025!";
const STORAGE_KEY = "docs_authenticated";

export default function DocsLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if already authenticated
    const auth = sessionStorage.getItem(STORAGE_KEY);
    if (auth === "true") {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
    setPassword("");
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div style={styles.fullPage}>
        <div style={styles.topBar}>
          <span style={styles.topBarTitle}>Project Documentation</span>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
        <iframe
          src="/docs-content/index.html"
          style={styles.iframe}
          title="Project Documentation"
        />
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconContainer}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0D7C66"
            strokeWidth="2"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h1 style={styles.title}>Project Documentation</h1>
        <p style={styles.subtitle}>
          This documentation is password protected.
          <br />
          Please enter your password to continue.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            style={styles.input}
            autoFocus
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>

        <p style={styles.footer}>
          Contact the development team for access credentials.
        </p>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: "20px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "40px",
    maxWidth: "400px",
    width: "100%",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    textAlign: "center" as const,
  },
  iconContainer: {
    marginBottom: "20px",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#1a1a1a",
    margin: "0 0 10px 0",
  },
  subtitle: {
    fontSize: "0.95rem",
    color: "#666",
    margin: "0 0 30px 0",
    lineHeight: "1.5",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
  },
  input: {
    padding: "14px 16px",
    fontSize: "1rem",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    outline: "none",
    transition: "border-color 0.2s",
  },
  button: {
    padding: "14px 20px",
    fontSize: "1rem",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#0D7C66",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  error: {
    color: "#dc2626",
    fontSize: "0.875rem",
    margin: "0",
  },
  footer: {
    fontSize: "0.8rem",
    color: "#999",
    marginTop: "25px",
    marginBottom: "0",
  },
  fullPage: {
    height: "100vh",
    display: "flex",
    flexDirection: "column" as const,
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#0D7C66",
    color: "white",
  },
  topBarTitle: {
    fontWeight: "600",
  },
  logoutButton: {
    padding: "8px 16px",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#0D7C66",
    backgroundColor: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  iframe: {
    flex: 1,
    border: "none",
    width: "100%",
  },
};
