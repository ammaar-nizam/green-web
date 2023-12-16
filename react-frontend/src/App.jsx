import { BrowserRouter, Route, Routes } from "react-router-dom";
import SubmitComplaintPage from "./routes/pages/complaints/submit-complaint";
import MainLayout from "./layouts/main-layout";
import Reports from "./routes/pages/reports/reports";
import AllUserReport from "./routes/pages/reports/all-user-report";
import AllComplaintReport from "./routes/pages/reports/all-complaint-report";
import MyComplaints from "./routes/pages/my-complaints/my-complaints";
import DashboardPage from "./routes/pages/dashboard/dashboard";
import AuthLayout from "./layouts/auth-layout";
import LoginPage from "./routes/pages/auth/login";
import SignupPage from "./routes/pages/auth/signup";
import UsersPage from "./routes/pages/users/users";
import AllUsersPage from "./routes/pages/users/all";
import CreateUserPage from "./routes/pages/users/create";
import CreatePublicUserPage from "./routes/pages/users/create/public-user";

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
          <Route path="new-complaint" element={<SubmitComplaintPage />} />
          <Route path="my-complaints" element={<MyComplaints />} />
          <Route path="users" >
            <Route index element={<UsersPage />} />
            <Route path="all" element={<AllUsersPage />} />
            <Route path="create" >
              <Route index element={<CreateUserPage />} />
              <Route path="public" element={<CreatePublicUserPage />} />
            </Route>
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
