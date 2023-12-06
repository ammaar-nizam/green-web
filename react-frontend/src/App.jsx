import { BrowserRouter, Route, Routes } from "react-router-dom"
import SubmitComplaintPage from "./routes/pages/complaints/submit-complaint"
import MainLayout from "./layouts/main-layout"
import Reports from "./routes/pages/reports/reports"
import AllUserReport from "./routes/pages/reports/all-user-report"
import AllComplaintReport from "./routes/pages/reports/all-complaint-report"


function App() {

  return (
   <BrowserRouter>
     <Routes>
     <Route path="/" element={<MainLayout />}>
      <Route path="new-complaint" element={<SubmitComplaintPage/>}/>
      
      <Route path="reports">
        <Route index element={<Reports/>}/>
        <Route path="all-user-report" element={<AllUserReport/>}/>
        <Route path="all-complaint-report" element={<AllComplaintReport/>}/>
      </Route>
     </Route>
     </Routes>
   </BrowserRouter>
    )
}

export default App
