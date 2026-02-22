import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRequestStore from '../store/requestStore';
import { ArrowLeft, Printer, FileText, Calendar, Building2 } from 'lucide-react';

export default function DetailView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { requests, fetchRequests } = useRequestStore();

    useEffect(() => {
        if (requests.length === 0) fetchRequests();
    }, [fetchRequests, requests.length]);

    const request = requests.find(r => r.id === id);

    if (!request) {
        return <div className="page-container center-content">Request not found.</div>;
    }

    return (
        <div className="page-container">
            <header className="page-header">
                <div className="header-left">
                    <button className="btn btn-outline btn-icon" onClick={() => navigate('/')}>
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <h1 className="page-title">Request Details</h1>
                        <p className="page-subtitle">{request.id}</p>
                    </div>
                </div>
                <div className="header-right">
                    <button className="btn btn-primary" onClick={() => navigate(`/ print / ${id} `)}>
                        <Printer size={18} /> Print Document
                    </button>
                </div>
            </header>

            <div className="detail-content">
                <div className="detail-cards-grid">
                    <div className="detail-card">
                        <div className="card-header">
                            <FileText size={20} className="icon-primary" />
                            <h3>Document Info</h3>
                        </div>
                        <div className="info-list">
                            <div className="info-item">
                                <span className="info-label">Doc No.</span>
                                <span className="info-value">{request.docNo}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Date</span>
                                <span className="info-value">{request.currentDate}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">To</span>
                                <span className="info-value">{request.metaTo}</span>
                            </div>
                        </div>
                    </div>

                    <div className="detail-card">
                        <div className="card-header">
                            <Building2 size={20} className="icon-primary" />
                            <h3>Department</h3>
                        </div>
                        <div className="info-list">
                            <div className="info-item">
                                <span className="info-label">Company</span>
                                <span className="info-value">{request.companyName}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Dept</span>
                                <span className="info-value">{request.deptName}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Team</span>
                                <span className="info-value">{request.metaDeptTeam}</span>
                            </div>
                        </div>
                    </div>

                    <div className="detail-card col-span-2">
                        <div className="card-header">
                            <h3>Approval Chain</h3>
                        </div>
                        <div className="approval-chain">
                            <div className="approval-node">
                                <span className="node-role">Requester</span>
                                <span className="node-name">{request.requesterName}</span>
                                <span className="node-pos">{request.requesterPosition}</span>
                            </div>
                            <div className="approval-line" />
                            <div className="approval-node">
                                <span className="node-role">Reviewer</span>
                                <span className="node-name">{request.reviewerName}</span>
                                <span className="node-pos">{request.reviewerPosition}</span>
                            </div>
                            <div className="approval-line" />
                            <div className="approval-node">
                                <span className="node-role">Approver</span>
                                <span className="node-name">{request.approverName}</span>
                                <span className="node-pos">{request.approverPosition}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="detail-card mt-6">
                    <div className="card-header">
                        <h3>Requested Items ({request.items.length})</h3>
                    </div>
                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>NIK</th>
                                    <th>Name</th>
                                    <th>Dept/Team</th>
                                    <th>Item Detail</th>
                                    <th>Qty</th>
                                    <th>Remark</th>
                                </tr>
                            </thead>
                            <tbody>
                                {request.items.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.nik}</td>
                                        <td>{item.name}</td>
                                        <td>{item.dept} / {item.team}</td>
                                        <td className="whitespace-pre">{item.itemDetail}</td>
                                        <td className="whitespace-pre">{item.qty}</td>
                                        <td className="whitespace-pre">{item.remark}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="detail-card mt-6">
                    <div className="card-header">
                        <h3>Reasoning</h3>
                    </div>
                    <p className="reason-text whitespace-pre">{request.reason}</p>
                </div>
            </div>
        </div>
    );
}
