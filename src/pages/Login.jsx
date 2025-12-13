import { useState } from "react"
import API_URL from "../api/client"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function login(e) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        setError("Invalid credentials")
        return
      }

      const data = await res.json()
      localStorage.setItem("token", data.token)
      window.location.href = "/dashboard"
    } catch {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      
    {/* 🔹 Background Image */}
<div
  className="absolute inset-0 bg-center bg-no-repeat opacity-50"
  style={{
    backgroundImage: "url('/assets/logo.png')",
    backgroundSize: "65%",
  }}
/>


      {/* 🔹 Login Card */}
      <form
        onSubmit={login}
        className="relative z-10 w-full max-w-sm bg-white p-6 sm:p-8
                   rounded-2xl shadow-xl animate-fade-in space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-slate-800">
          Admin Login
        </h2>

        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300
                     focus:outline-none focus:ring-2 focus:ring-black transition"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300
                     focus:outline-none focus:ring-2 focus:ring-black transition"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="w-full py-2.5 rounded-lg bg-black text-white font-medium
                     transition-all duration-300
                     hover:bg-slate-800 hover:shadow-lg
                     active:scale-95
                     disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  )
}
