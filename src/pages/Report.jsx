import { useState } from "react"
import Input from "../Input"
import ProcessingOverlay from "../components/ProcessingOverlay"
import API_URL, { authHeaders } from "../api/client"

export default function Report() {
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  function validate() {
    const e = {}
    if (!form.ngoId) e.ngoId = "NGO ID is required"
    if (!form.month) e.month = "Month is required"
    return e
  }

  async function submit(e) {
    e.preventDefault()

    const v = validate()
    if (Object.keys(v).length) {
      setErrors(v)
      return
    }

    setErrors({})
    setLoading(true)

    try {
      await fetch(`${API_URL}/report`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(form),
      })
    } finally {
      // ✅ Only processing popup for 1.5s, then disappear
      setTimeout(() => setLoading(false), 1500)
    }
  }

  return (
    <>
      {/* 🟣 Processing Popup */}
      {loading && (
        <ProcessingOverlay
          text="Submitting report..."
          progress={100}
        />
      )}

      {/* 📌 Centered Form */}
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <form
          onSubmit={submit}
          className="max-w-xl w-full bg-white p-6 rounded-2xl shadow-lg space-y-4"
        >
          <h2 className="text-2xl font-semibold">
            Submit Monthly Report
          </h2>

          <Input
            label="NGO ID"
            error={errors.ngoId}
            placeholder="NGO-001"
            onChange={e =>
              setForm({ ...form, ngoId: e.target.value })
            }
          />

          {/* 📅 Month Picker */}
          <Input
            label="Month"
            type="month"
            error={errors.month}
            onChange={e =>
              setForm({ ...form, month: e.target.value })
            }
          />

          <Input
            label="People Helped"
            type="number"
            placeholder="120"
            onChange={e =>
              setForm({ ...form, peopleHelped: e.target.value })
            }
          />

          <Input
            label="Events Conducted"
            type="number"
            placeholder="4"
            onChange={e =>
              setForm({ ...form, eventsConducted: e.target.value })
            }
          />

          <Input
            label="Funds Utilized"
            type="number"
            placeholder="25000"
            onChange={e =>
              setForm({ ...form, fundsUtilized: e.target.value })
            }
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-indigo-600
              text-white
              py-3
              rounded-xl
              shadow-md
              hover:bg-indigo-700
              hover:shadow-xl
              active:scale-95
              transition-all
              disabled:bg-slate-400
              disabled:cursor-not-allowed
            "
          >
            Submit Report
          </button>
        </form>
      </div>
    </>
  )
}
