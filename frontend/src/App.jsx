import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import PolicyAssistant from "./pages/PolicyAssistant";
import LeaveRecommendation from "./pages/LeaveRecommendation";
import EmployeeDirectory from "./pages/EmployeeDirectory";
import EmployeeDetails from "./pages/EmployeeDetails";
import Policies from "./pages/Policies";
import JobDescriptionGenerator from "./pages/JobDescriptionGenerator";
import InterviewGenerator from "./pages/InterviewGenerator";
import Goals from "./pages/Goals";
import EmployeeProfile from "./pages/EmployeeProfile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* HR Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute
              roles={["HR"]}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/onboarding"
          element={
            <ProtectedRoute
              roles={["HR"]}
            >
              <Onboarding />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees"
          element={
            <ProtectedRoute
              roles={["HR"]}
            >
              <EmployeeDirectory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/policies"
          element={
            <ProtectedRoute
              roles={["HR"]}
            >
              <Policies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/job-descriptions"
          element={
            <ProtectedRoute
              roles={["HR"]}
            >
              <JobDescriptionGenerator />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interviews"
          element={
            <ProtectedRoute
              roles={["HR"]}
            >
              <InterviewGenerator />
            </ProtectedRoute>
          }
        />

        <Route
          path="/goals"
          element={
            <ProtectedRoute
              roles={["HR"]}
            >
              <Goals />
            </ProtectedRoute>
          }
        />

        {/* HR + Employee Routes */}
        <Route
          path="/policy"
          element={
            <ProtectedRoute
              roles={[
                "HR",
                "Employee",
              ]}
            >
              <PolicyAssistant />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leave"
          element={
            <ProtectedRoute
              roles={[
                "HR",
                "Employee",
              ]}
            >
              <LeaveRecommendation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees/:id"
          element={
            <ProtectedRoute
              roles={[
                "HR",
                "Employee",
              ]}
            >
              <EmployeeDetails />
            </ProtectedRoute>
          }
        />

        <Route
  path="/profile"
  element={
    <ProtectedRoute
      roles={[
        "Employee",
      ]}
    >
      <EmployeeProfile />
    </ProtectedRoute>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;