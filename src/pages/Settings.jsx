import React from 'react';
import useAuthStore from '../store/authStore';
import { User, Mail, Shield, Key } from 'lucide-react';

export default function Settings() {
    const { user } = useAuthStore();

    return (
        <div className="page-container max-w-4xl mx-auto">
            <header className="page-header bg-white p-6 border-b border-slate-200 rounded-t-xl mt-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage your account preferences and profile details.</p>
                </div>
            </header>

            <div className="bg-white rounded-b-xl shadow-sm border border-t-0 border-slate-200">
                <div className="flex border-b border-slate-200">
                    <button className="px-6 py-4 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600 flex items-center gap-2">
                        <User size={16} /> My Account
                    </button>
                    <button className="px-6 py-4 text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors">
                        <Shield size={16} /> Security
                    </button>
                </div>

                <div className="p-8">
                    <div className="flex items-start gap-8 mb-10">
                        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 text-3xl font-bold border-4 border-white shadow-md">
                            {user?.name?.charAt(0) || 'U'}
                        </div>

                        <div className="flex-1 space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800">{user?.name || 'Loading...'}</h3>
                                    <p className="text-sm text-slate-500">{user?.role || 'User'}</p>
                                </div>
                                <button className="px-4 py-2 bg-indigo-50 text-indigo-600 font-medium rounded-lg text-sm hover:bg-indigo-100 transition-colors">
                                    Edit Profile
                                </button>
                            </div>

                            <div className="pt-4 border-t border-slate-100 mt-4">
                                <div className="grid grid-cols-2 gap-y-6 gap-x-8">
                                    <div>
                                        <span className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Username</span>
                                        <div className="flex items-center gap-2 text-slate-700 font-medium">
                                            <User size={16} className="text-slate-400" />
                                            {user?.username}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Email Address</span>
                                        <div className="flex items-center gap-2 text-slate-700 font-medium">
                                            <Mail size={16} className="text-slate-400" />
                                            {user?.email}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Employee ID</span>
                                        <div className="flex items-center gap-2 text-slate-700 font-medium">
                                            <Key size={16} className="text-slate-400" />
                                            {user?.id}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Access Level</span>
                                        <div className="flex items-center gap-2 text-slate-700 font-medium">
                                            <Shield size={16} className="text-slate-400" />
                                            {user?.role} Access
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
