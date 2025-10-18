// // export const URL = "https://totetreasureshub.shop";
// export const URL = "https://movierule.shop";
// // export const URL = "http://localhost:4001";

// export const config = {
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// };

export const URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:4001" // local backend
    : "https://movierule.shop"; // production backend (AWS)

// 🧭 Axios global config
export const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ needed for cookies (JWTs)
};

export const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;


