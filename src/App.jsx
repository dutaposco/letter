import React from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import CreateRequest from './pages/CreateRequest';
import DetailView from './pages/DetailView';
import PrintView from './pages/PrintView';
import Login from './pages/Login';
import Settings from './pages/Settings';
import useAuthStore from './store/authStore';
import './index.css';

// Protected Route Wrapper
function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuthStore();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

// General Layout that includes Sidebar and main content area
function AppLayout() {
    return (
        <div className="app-container">
            <Sidebar />
            <main className="main-content bg-slate-50 relative overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                {/* Print view has no sidebar */}
                <Route path="/print/:id" element={
                    <ProtectedRoute>
                        <PrintView />
                    </ProtectedRoute>
                } />

                {/* All other routes are inside the layout */}
                <Route path="/" element={
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
                }>
                    <Route index element={<Dashboard />} />
                    <Route path="create" element={<CreateRequest />} />
                    <Route path="detail/:id" element={<DetailView />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
