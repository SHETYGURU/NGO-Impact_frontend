const API_URL = "http://localhost:4000"

export function authHeaders() {
  const token = localStorage.getItem("token")
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  }
}

export default API_URL
