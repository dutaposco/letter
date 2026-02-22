import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FilePlus, Settings as SettingsIcon, LogOut } from 'lucide-react';
import useAuthStore from '../store/authStore';

export default function Sidebar() {
    const { logout, user } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="app-sidebar hidden-print">
            <div className="sidebar-header">
                <div className="logo-wrapper">
                    <span className="logo-text">ERP</span>
                </div>
                <h2 className="brand-name">Posco System</h2>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`} end>
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/create" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <FilePlus size={20} />
                    <span>Create Request</span>
                </NavLink>
            </nav>

            <div className="sidebar-footer">
                <div className="px-6 mb-4 flex items-center gap-3">
                    <div className="w-8 h-8 flex-shrink-0 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm border border-indigo-200">
                        {user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-slate-700 truncate">{user?.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user?.role}</p>
                    </div>
                </div>
                <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                    <SettingsIcon size={20} />
                    <span>Settings</span>
                </NavLink>
                <button className="nav-item text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleLogout}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
