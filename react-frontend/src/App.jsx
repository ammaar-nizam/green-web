import { BrowserRouter, Route, Routes } from "react-router-dom"
import SubmitComplaintPage from "./routes/pages/submit-complaint"
import MainLayout from "./layouts/main-layout"


function App() {

  return (
   <BrowserRouter>
     <Routes>
     <Route path="/" element={<MainLayout />}>
      <Route path="new-complaint" element={<SubmitComplaintPage/>}/>
     </Route>
     </Routes>
   </BrowserRouter>
    )
}

export default App
