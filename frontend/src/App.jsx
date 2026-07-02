import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import PolicyAssistant from "./pages/PolicyAssistant";
import LeaveRecommendation from "./pages/LeaveRecommendation";
import EmployeeDirectory from "./pages/EmployeeDirectory";
import EmployeeDetails from "./pages/EmployeeDetails";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/policy" element={<PolicyAssistant />} />
        <Route path="/leave" element={<LeaveRecommendation />} />
        <Route path="/employees" element={<EmployeeDirectory />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;