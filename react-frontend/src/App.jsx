import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Routes/auth/login";
import SignupPage from "./Routes/auth/signup";
import DashboardPage from "./Routes/pages/dashboard";
import NewComplaintPage from "./Routes/pages/new-complaint";
import AuthLayout from "./layouts/auth-layout";
import MainLayout from "./layouts/main-layout";
import ContactPage from "./Routes/pages/contact";
import MyComplaintsPage from "./Routes/pages/my-complaints";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
          </Route>

          <Route path="/" element={<MainLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="new-complaint" element={<NewComplaintPage />} />
            <Route path="my-complaints" element={<MyComplaintsPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
