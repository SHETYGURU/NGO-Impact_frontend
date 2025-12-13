import { useEffect, useState } from "react"
import ProcessingOverlay from "../components/ProcessingOverlay"
import API_URL, { authHeaders } from "../api/client"

export default function Upload() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [jobId, setJobId] = useState(null)
  const [error, setError] = useState(null)
  const [progress, setProgress] = useState(0)

  function onFileChange(e) {
    const selectedFile = e.target.files[0]
    setJobId(null)
    setError(null)
    setProgress(0)

    if (!selectedFile) return

    if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
      setError("Only CSV files are allowed.")
      return
    }

    setFile(selectedFile)
  }

  async function upload() {
    if (!file) {
      setError("Please select a CSV file.")
      return
    }

    setError(null)
    setLoading(true)
    setProgress(5)

    // 🔁 Fake smooth progress while backend works
    const fakeProgress = setInterval(() => {
      setProgress(p => (p < 90 ? p + 5 : p))
    }, 300)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch(`${API_URL}/reports/upload`, {
        method: "POST",
        headers: {
          Authorization: authHeaders().Authorization,
        },
        body: formData,
      })

      const data = await res.json()

      if (!res.ok) {
        clearInterval(fakeProgress)
        setError(data.message || "Upload failed.")
        setLoading(false)
        return
      }

      setJobId(data.jobId)

      // ✅ Finish animation smoothly
      setProgress(100)
      setTimeout(() => {
        setLoading(false)
        clearInterval(fakeProgress)
      }, 800)
    } catch {
      setError("Server error while uploading.")
      setLoading(false)
    }
  }

  return (
    <>
      {loading && (
        <ProcessingOverlay
          text="Uploading CSV..."
          progress={progress}
        />
      )}

      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold">
          Bulk CSV Upload
        </h2>

        <input
          type="file"
          accept=".csv"
          onChange={onFileChange}
        />

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          onClick={upload}
          disabled={!file || loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl shadow-md hover:bg-indigo-700 transition disabled:bg-slate-400"
        >
          Upload CSV
        </button>

        {jobId && (
          <p className="text-sm text-slate-600">
            Job ID:
            <span className="ml-2 font-mono">{jobId}</span>
          </p>
        )}
      </div>
    </>
  )
}
