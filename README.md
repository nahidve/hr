# Cohere HR Portal

An enterprise AI-driven human resource command center built with a minimalist, stark white editorial canvas aesthetic, dark product panels, and technical typography matching Cohere's 2026 design specifications.

The application leverages Cohere's design tokens and layout strategy to deliver structured, high-contrast, and responsive dashboards, directory managers, and AI assistants.

---

## Technical Stack

### Frontend
- **Framework**: React 19 & Vite 8
- **Styling**: Tailwind CSS v4 (with custom `@theme` tokens)
- **Routing**: React Router DOM v7
- **Telemetry Charts**: Recharts
- **Icons**: Lucide React

### Backend
- **Framework**: Node.js & Express
- **Database**: MongoDB (Mongoose ODM)

---

## Features

1. **Enterprise Cockpit (Dashboard)**: Real-time telemetry displaying employee distributions, compliance statistics, active goals, leave requests, and department skills charts.
2. **Personnel Roster (Directory)**: Query employee profiles, credentials, department deployments, and detailed AI insights.
3. **Personnel Onboarding**: Add new employees to the database and parse resumes (PDF format) to auto-extract skills, strengths, weaknesses, and recommend candidate role alignment.
4. **AI Policy Knowledge Graph**: Interactive chatbot console utilizing dark mockups to query compliance regulations and benefits schemas.
5. **Policy Codex (Directives)**: Editorial publication table for compliance documents with border-driven rows.
6. **Milestone Tracker (OKR)**: Set goals, assign employees, track status, update progress, and review deadlines.
7. **JD & Interview Generators**: Generate optimized role descriptions and tailored candidate question sets from parsed resumes.
8. **Leave AI Recommendation**: Run automated leave request checks evaluating eligibility, duration, and coverages.

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally or a remote connection string

### Setup & Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd HR
   ```

2. **Run Backend Service**:
   ```bash
   cd backend
   npm install
   # Create a .env file with your PORT and MONGODB_URI configurations
   npm run dev
   ```

3. **Run Frontend Application**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. **Production Build**:
   ```bash
   cd frontend
   npm run build
   ```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
