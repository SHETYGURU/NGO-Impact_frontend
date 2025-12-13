import { useEffect, useState } from "react"
import API_URL, { authHeaders } from "../api/client"

export default function Dashboard() {
  const [data, setData] = useState(null)
  const [month, setMonth] = useState("2025-11")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    fetch(`${API_URL}/dashboard?month=${month}`, {
      headers: authHeaders(),
    })
      .then(res => res.json())
      .then(res => {
        setData(res)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [month])

  const cards = [
    { label: "NGOs Reporting", value: data?.totalNGOsReporting ?? 0 },
    { label: "People Helped", value: data?.totalPeopleHelped ?? 0 },
    { label: "Events Conducted", value: data?.totalEventsConducted ?? 0 },
    { label: "Funds Utilized", value: data?.totalFundsUtilized ?? 0 },
  ]

  return (
    <div className="space-y-8">
      {/* Header + Month Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-semibold">
          Monthly Dashboard
        </h2>

        <input
          type="month"
          value={month}
          onChange={e => setMonth(e.target.value)}
          className="
            border
            rounded-lg
            px-4
            py-2
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
          "
        />
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-slate-500">
          Loading dashboard data...
        </p>
      )}

      {/* Cards */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map(card => (
            <div
              key={card.label}
              className="
                bg-white
                rounded-2xl
                p-6
                shadow-md
                hover:shadow-xl
                transition
              "
            >
              <p className="text-slate-500 text-sm">
                {card.label}
              </p>

              <p className="text-3xl font-bold text-indigo-600 mt-2">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
