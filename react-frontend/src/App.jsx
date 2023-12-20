import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/auth-layout";
import MainLayout from "./layouts/main-layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}></Route>
        <Route path="/" element={<MainLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
