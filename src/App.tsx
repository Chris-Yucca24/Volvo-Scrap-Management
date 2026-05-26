
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Inbound from "./Modules/Pwa1/InboundPages/Inbound"
import Outbound from "./Modules/Pwa2/OutboundPages/outbound"
import AdminAssembly from "./Modules/AdminDashboard/AdminPages/AdminAssembly"
import L1L2L3Management from "./Modules/AdminDashboard/AdminPages/L1L2L3Management"
import UserManagement from "./Modules/AdminDashboard/AdminPages/Usermanagement"
import LevelManagement from "./Modules/AdminDashboard/AdminPages/LevelManagement"
import MaterialSettings from "./Modules/AdminDashboard/AdminPages/MaterialSettings";
import FinanceTeam from "./Modules/AdminDashboard/AdminPages/FinanceTeam"
import LoginPage from "./Modules/LoginMain/Login"
import AppLayout from "./layouts/AppLayout"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/inbound" element={<Inbound />} />
        <Route path="/outbound" element={<Outbound/>} />
        <Route path="/admin" element={<AdminAssembly />} />
        <Route path="/l1" element={<L1L2L3Management />} />
        <Route path="/fin" element={<FinanceTeam />} /> 
        <Route path="/" element={<LoginPage/>}/>       
        <Route
          path="/usermanagement"
          element={
            <AppLayout showSettings={true}>
              <UserManagement />
            </AppLayout>
          }
        />
        <Route
          path="/levelmanagement"
          element={
            <AppLayout showSettings={true}>
              <LevelManagement/>
            </AppLayout>
          }
        />
         <Route
          path="/MaterialSettings"
          element={
            <AppLayout showSettings={true}>
              <MaterialSettings/>
            </AppLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

