import AuthProvider from "./context/AuthProvider.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ClientPage from "./pages/ClientPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";


function App() {

  return (
    <>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage/>}/>
          <Route 
          path="/client" 
          element={
          <ProtectedRoute>
            <ClientPage/>
          </ProtectedRoute>
          }/>
        </Routes>
      </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App
