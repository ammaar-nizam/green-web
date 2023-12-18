import { BrowserRouter, Route, Routes } from "react-router-dom";
import SubmitComplaintPage from "./routes/pages/complaints/submit-complaint";
import MainLayout from "./layouts/main-layout";
import Reports from "./routes/pages/reports/reports";
import AllUserReport from "./routes/pages/reports/all-user-report";
import AllComplaintReport from "./routes/pages/reports/all-complaint-report";
import MyComplaints from "./routes/pages/complaints/my-complaints/my-complaints";
import DashboardPage from "./routes/pages/dashboard/dashboard";
import AuthLayout from "./layouts/auth-layout";
import LoginPage from "./routes/pages/auth/login";
import SignupPage from "./routes/pages/auth/signup";
import UsersPage from "./routes/pages/users/users";
import AllUsersPage from "./routes/pages/users/all";
import CreateUserPage from "./routes/pages/users/create";
import CreatePublicUserPage from "./routes/pages/users/create/public-user";
import CreateAdminUserPage from "./routes/pages/users/create/admin-user";
import CreateBeatOfficerPage from "./routes/pages/users/create/beat-officer";
import AdminUsersPage from "./routes/pages/users/users/admins";
import PublicUsersPage from "./routes/pages/users/users/public";
import BeatOfficesPage from "./routes/pages/users/users/beat-officers";
import InstitutionPage from "./routes/pages/institution/institution";
import DivisionPage from "./routes/pages/division/division";
import BranchPage from "./routes/pages/branch/branch";
import BeatOfficePage from "./routes/pages/beat-office/beat-office";
import CreateBeatOffice from "./routes/pages/beat-office/create";
import AssignedComplaints from "./routes/pages/complaints/assigned-complaints/assigned-complaints";
import AllComplaints from "./routes/pages/complaints/all-complaints/all-complaints";
import InvestigationsPage from "./routes/pages/investigations/investigations";
import CreateInvestigation from "./routes/pages/investigations/create";
import UpdateInvestigation from "./routes/pages/investigations/update";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="complaints">
            <Route path="all-complaints" element={<AllComplaints />} />
            <Route path="assigned-complaints" element={<AssignedComplaints />} />
            <Route path="new-complaint" element={<SubmitComplaintPage />} />
            <Route path="my-complaints" element={<MyComplaints />} />
          </Route>
          <Route path="investigations">
            <Route index element={<InvestigationsPage />} />
            <Route path="create" element={<CreateInvestigation/>} />
            <Route path="update/:id" element={<UpdateInvestigation/>} />
          </Route>
          <Route path="users">
            <Route index element={<UsersPage />} />
            <Route path="all">
              <Route index element={<AllUsersPage />} />
              <Route path="public" element={<PublicUsersPage />} />
              <Route path="beat-officer" element={<BeatOfficesPage />} />
              <Route path="admin" element={<AdminUsersPage />} />
            </Route>
            <Route path="create">
              <Route index element={<CreateUserPage />} />
              <Route path="public" element={<CreatePublicUserPage />} />
              <Route path="admin" element={<CreateAdminUserPage />} />
              <Route path="beat-officer" element={<CreateBeatOfficerPage />} />
            </Route>
          </Route>
          <Route path="institutions" element={<InstitutionPage />} />
          <Route path="divisions" element={<DivisionPage />} />
          <Route path="branches" element={<BranchPage />} />
          <Route path="beat-offices">
            <Route index element={<BeatOfficePage />} />
            <Route path="create" element={<CreateBeatOffice />} />
          </Route>

          <Route path="reports">
            <Route index element={<Reports />} />
            <Route path="all-user-report" element={<AllUserReport />} />
            <Route
              path="all-complaint-report"
              element={<AllComplaintReport />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
