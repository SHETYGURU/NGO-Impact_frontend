export default function Navbar() {
  return (
    <nav
      className="
        sticky top-0 z-40
        bg-white/80 backdrop-blur
        shadow-md
      "
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <img
            src="/assets/logo.png"
            alt="NGO Impact Logo"
            className="w-8 h-8"
          />
          <h1 className="text-xl font-bold text-indigo-600">
            NGO Impact
          </h1>
        </div>

        {/* Navigation */}
        <div className="flex gap-6 text-sm font-medium items-center">
          <a href="/report" className="hover:text-indigo-600">Report</a>
          <a href="/upload" className="hover:text-indigo-600">Upload</a>
          <a href="/dashboard" className="hover:text-indigo-600">Dashboard</a>

          <button
            onClick={() => {
              localStorage.removeItem("token")
              window.location.href = "/login"
            }}
            className="ml-4 text-red-500 hover:text-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
