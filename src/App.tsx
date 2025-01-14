import { BrowserRouter, Routes, Route } from "react-router-dom";
import Background from "./wrappers/Background.tsx";
import AuthWrapper from "./wrappers/AuthWrapper.tsx";
import Register from "./app/auth/Register.tsx";
import Login from "./app/auth/Login.tsx";
import TableModern from "./app/table/TableModern.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Background />}>
            <Route path="auth/" element={<AuthWrapper />}>
                <Route path="register" element={<Register />}/>
                <Route path="login" element={<Login />}/>
            </Route>
            <Route path="" element={<TableModern/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
