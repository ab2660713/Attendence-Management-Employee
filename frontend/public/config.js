const isLocalDev = ["localhost", "127.0.0.1", "::1"].includes(
  window.location.hostname
);

window.__APP_CONFIG__ = {
  API_BASE: isLocalDev
    ? "http://localhost:4000/api"
    : "https://attendence-management-employee-2.onrender.com/api",
};
