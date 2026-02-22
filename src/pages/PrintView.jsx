import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRequestStore from '../store/requestStore';

export default function PrintView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { requests, fetchRequests } = useRequestStore();

    useEffect(() => {
        if (requests.length === 0) fetchRequests();
    }, [fetchRequests, requests.length]);

    const request = requests.find(r => r.id === id);

    // Auto-trigger print disabled to prevent browser blocking. 
    // User must click 'Print Now' explicitly.

    if (!request) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading document...</div>;

    return (
        <div className="print-layout">
            {/* Non-printable back button container */}
            <div className="print-controls hidden-print" style={{ display: 'flex', gap: '1rem', width: '210mm', marginBottom: '1rem' }}>
                <button className="btn btn-outline" onClick={() => navigate(-1)}>
                    Back to Details
                </button>
                <button className="btn btn-primary" onClick={() => window.print()}>
                    Print Now
                </button>
            </div>

            <div className="document-page">
                <div className="doc-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div className="doc-company">
                        <u>{request.companyName}</u><br />
                        {request.deptName}
                    </div>
                    <div style={{ fontSize: '9pt', color: '#666' }}>
                        {request.docNo}
                    </div>
                </div>

                <div className="doc-title">
                    STATEMENT LETTER<br />
                    <span style={{ fontSize: '12pt', fontWeight: 'normal' }}>(UTILITY EMPLOYEE)</span>
                </div>

                <table className="doc-signatures-top">
                    <thead>
                        <tr>
                            <th style={{ width: '40%' }}>Requester</th>
                            <th style={{ width: '30%' }}>Reviewer</th>
                            <th style={{ width: '30%' }}>Approver</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ textAlign: 'left', paddingLeft: '8px' }}>
                                Position: <span style={{ marginLeft: '40px' }}>{request.requesterPosition}</span>
                                <br />
                                Name: <span style={{ marginLeft: '50px' }}>{request.requesterName}</span>
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                {request.reviewerPosition}
                                <br />
                                {request.reviewerName}
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                {request.approverPosition}
                                <br />
                                {request.approverName}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ textAlign: 'left', paddingLeft: '8px', verticalAlign: 'top', height: '80px' }}>
                                Signature
                                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                    <svg width="40" height="30" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5 20 L15 28 L35 5" stroke="black" strokeWidth="1.5" fill="none" />
                                        <path d="M5 10 L30 25" stroke="black" strokeWidth="1" fill="none" />
                                    </svg>
                                </div>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                <div className="doc-meta">
                    <table>
                        <tbody>
                            <tr>
                                <td>Date</td>
                                <td>: {request.currentDate}</td>
                            </tr>
                            <tr>
                                <td>Dept. / Team</td>
                                <td>: {request.metaDeptTeam}</td>
                            </tr>
                            <tr>
                                <td>To</td>
                                <td>: {request.metaTo}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="doc-body">
                    Dear Purchasing & GA Team<br />
                    Hereby I sent the equipment we need, as follows:

                    <table className="doc-table">
                        <thead>
                            <tr>
                                <th style={{ width: '5%' }}>No.</th>
                                <th style={{ width: '12%' }}>NIK</th>
                                <th style={{ width: '18%' }}>Name</th>
                                <th style={{ width: '8%' }}>Dept</th>
                                <th style={{ width: '8%' }}>Team</th>
                                <th style={{ width: '30%' }}>Item</th>
                                <th style={{ width: '8%' }}>Qty</th>
                                <th style={{ width: '11%' }}>Remark</th>
                            </tr>
                        </thead>
                        <tbody>
                            {request.items.map((item, index) => (
                                <tr key={item.id}>
                                    <td style={{ textAlign: 'center', verticalAlign: 'top' }}>{index + 1}</td>
                                    <td style={{ verticalAlign: 'top' }}>{item.nik}</td>
                                    <td style={{ verticalAlign: 'top' }}>{item.name}</td>
                                    <td style={{ verticalAlign: 'top' }}>{item.dept}</td>
                                    <td style={{ verticalAlign: 'top' }}>{item.team}</td>
                                    <td style={{ verticalAlign: 'top', whiteSpace: 'pre-line' }}>{item.itemDetail}</td>
                                    <td style={{ verticalAlign: 'top', whiteSpace: 'pre-line' }}>{item.qty}</td>
                                    <td style={{ verticalAlign: 'top', whiteSpace: 'pre-line' }}>{item.remark}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="doc-reason">
                    Reason :<br />
                    <span style={{ whiteSpace: 'pre-line' }}>{request.reason}</span>
                </div>

                <div className="doc-closing">
                    {request.closing}
                </div>

                <div className="doc-footer">
                    <div style={{ color: '#6b7280' }}>
                        {new Date().toISOString().slice(5, 10).replace('-', '-')} {new Date().toTimeString().slice(0, 5)}:09
                    </div>
                    <div className="doc-footer-logo" style={{ float: 'right' }}>
                        <span style={{ color: '#f5a623', fontSize: '18pt', fontWeight: 'bold' }}>D</span>rive to
                        <span style={{ color: '#f5a623', fontSize: '18pt', fontWeight: 'bold' }}> eX</span>cellence
                    </div>
                </div>
            </div>
        </div>
    );
}
