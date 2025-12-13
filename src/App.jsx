import Layout from "./components/Layout"
import RequireAuth from "./components/RequireAuth"
import Login from "./pages/Login"
import Report from "./pages/Report"
import Upload from "./pages/Upload"
import Dashboard from "./pages/Dashboard"

export default function App() {
  const path = window.location.pathname

  if (path === "/login") return <Login />

  let Page = Report
  if (path === "/upload") Page = Upload
  if (path === "/dashboard") Page = Dashboard

  return (
    <RequireAuth>
      <Layout>
        <Page />
      </Layout>
    </RequireAuth>
  )
}
