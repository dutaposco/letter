import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useRequestStore from '../store/requestStore';
import { FileText, Plus, Search, Eye, Trash2 } from 'lucide-react';

export default function Dashboard() {
    const navigate = useNavigate();
    const { requests, deleteRequest, fetchRequests, isLoading, error } = useRequestStore();
    const [searchTerm, setSearchTerm] = React.useState('');

    React.useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    const filteredRequests = requests.filter(request =>
        request.docNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.requesterName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="page-container">
            <header className="page-header flex justify-between items-center bg-white p-6 border-b border-slate-200">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Statement Requests</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage all utility statement requests.</p>
                </div>
                <button className="btn btn-primary shadow-md" onClick={() => navigate('/create')}>
                    <Plus size={18} /> New Request
                </button>
            </header>

            <div className="p-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="stat-card bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                            <FileText size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 font-medium">Total Requests</p>
                            <h3 className="text-2xl font-bold text-slate-800">{requests.length}</h3>
                        </div>
                    </div>
                </div>

                {/* Filters/Search Area */}
                <div className="flex justify-between items-center mb-6">
                    <div className="search-bar relative w-80">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search doc no..."
                            className="form-control pl-10 h-10 w-full rounded-md border-slate-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Requests Table */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="py-4 px-6 font-semibold text-slate-600 text-sm">Req ID</th>
                                <th className="py-4 px-6 font-semibold text-slate-600 text-sm">Doc No.</th>
                                <th className="py-4 px-6 font-semibold text-slate-600 text-sm">Requester</th>
                                <th className="py-4 px-6 font-semibold text-slate-600 text-sm">Date</th>
                                <th className="py-4 px-6 font-semibold text-slate-600 text-sm">Status</th>
                                <th className="py-4 px-6 font-semibold text-slate-600 text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRequests.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="py-12 text-center text-slate-500 text-sm">
                                        No requests found. Create one to get started.
                                    </td>
                                </tr>
                            ) : (
                                filteredRequests.map((request) => (
                                    <tr key={request.id} className="border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors">
                                        <td className="py-4 px-6 font-medium text-indigo-600 text-sm">{request.id}</td>
                                        <td className="py-4 px-6 text-slate-700 text-sm">{request.docNo}</td>
                                        <td className="py-4 px-6">
                                            <div className="font-medium text-slate-800 text-sm">{request.requesterName}</div>
                                            <div className="text-xs text-slate-500">{request.requesterPosition}</div>
                                        </td>
                                        <td className="py-4 px-6 text-slate-600 text-sm">{request.currentDate}</td>
                                        <td className="py-4 px-6">
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                                                {request.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                                                    onClick={() => navigate(`/detail/${request.id}`)}
                                                    title="View Details"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button
                                                    className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to delete this request?')) {
                                                            deleteRequest(request.id);
                                                        }
                                                    }}
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
