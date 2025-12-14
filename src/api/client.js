const API_URL =import.meta.env.VITE_API_URL

export function authHeaders() {
  const token = localStorage.getItem("token")
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  }
}

export default API_URL
