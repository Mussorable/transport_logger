import { BrowserRouter, Routes, Route } from "react-router-dom";
import Background from "./wrappers/Background.tsx";
import AuthWrapper from "./wrappers/AuthWrapper.tsx";
import Register from "./app/auth/Register.tsx";
import Login from "./app/auth/Login.tsx";
import TableModern from "./app/table/TableModern.tsx";
import { AuthProvider } from "./app/auth/AuthProvider.tsx";
import ProtectedRoute from "./app/auth/ProtectedRoute.tsx";
import AppInitializer from "./app/auth/AppInitializer.tsx";

function App() {
    return (
        <AuthProvider>
            <AppInitializer />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Background />}>
                        <Route path="auth/" element={<AuthWrapper />}>
                            <Route path="register" element={<Register />}/>
                            <Route path="login" element={<Login />}/>
                        </Route>
                        <Route path="/" element={
                            <ProtectedRoute>
                                <TableModern/>
                            </ProtectedRoute>
                        } />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
