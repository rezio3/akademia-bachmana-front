const isLocalhost =
  typeof window !== "undefined" && window.location.hostname === "localhost";

export const baseUrl = isLocalhost
  ? "http://localhost:5000/"
  : "https://akademia-bachmana-backend.onrender.com/";
