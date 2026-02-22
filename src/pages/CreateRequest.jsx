import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRequestStore from '../store/requestStore';
import {
    Plus,
    Trash2,
    Info,
    Users,
    PackageSearch,
    MessageSquare
} from 'lucide-react';

export default function CreateRequest() {
    const navigate = useNavigate();
    const { addRequest } = useRequestStore();

    const [formData, setFormData] = useState({
        // Header
        companyName: 'PT. POSCO DX INDONESIA',
        deptName: 'PURCHASING & GA TEAM',
        docNo: 'Doc No.: RE-GA-ADM-007-01',
        // Approvals
        requesterPosition: 'Assistant Manager',
        requesterName: 'Rd. Bambang F',
        reviewerPosition: 'Team Manager',
        reviewerName: 'Kim Dong Soo',
        approverPosition: 'Department Manager',
        approverName: 'Baek Seung Chul',
        // Meta
        currentDate: '29 Jan 2026',
        metaDeptTeam: 'ITB / P/C Team',
        metaTo: 'Purchasing & GA Team',
        // Items
        items: [
            {
                id: Date.now(),
                nik: '',
                name: '',
                dept: '',
                team: '',
                itemDetail: '',
                qty: '',
                remark: ''
            }
        ],
        // Reason
        reason: "",
        closing: "Thus this statement we made, for your attention we say thank you."
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleItemChange = (id, field, value) => {
        setFormData({
            ...formData,
            items: formData.items.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            )
        });
    };

    const addItem = () => {
        const newItem = {
            id: Date.now(),
            nik: '',
            name: '',
            dept: '',
            team: '',
            itemDetail: '',
            qty: '',
            remark: ''
        };
        setFormData({ ...formData, items: [...formData.items, newItem] });
    };

    const removeItem = (id) => {
        setFormData({
            ...formData,
            items: formData.items.filter(item => item.id !== id)
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addRequest(formData);
        // Redirect to dashboard or the new detail view
        navigate('/');
    };

    return (
        <div className="page-container">
            <header className="page-header">
                <div>
                    <h1 className="page-title">Create Statement Request</h1>
                    <p className="page-subtitle">Fill in the details below to generate a new utility statement.</p>
                </div>
            </header>

            <form className="create-form" onSubmit={handleSubmit}>
                <div className="form-content max-w-4xl mx-auto space-y-8">

                    {/* Document Settings */}
                    <section className="form-section">
                        <div className="form-section-header">
                            <Info size={18} />
                            <h2>Document Settings</h2>
                        </div>

                        <div className="form-group">
                            <label>Doc No.</label>
                            <input type="text" name="docNo" className="form-control" value={formData.docNo} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label>Date</label>
                            <input type="text" name="currentDate" className="form-control" value={formData.currentDate} onChange={handleInputChange} required />
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Dept / Team</label>
                                <input type="text" name="metaDeptTeam" className="form-control" value={formData.metaDeptTeam} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>To</label>
                                <input type="text" name="metaTo" className="form-control" value={formData.metaTo} onChange={handleInputChange} required />
                            </div>
                        </div>
                    </section>

                    {/* Signatures */}
                    <section className="form-section">
                        <div className="form-section-header">
                            <Users size={18} />
                            <h2>Signatures</h2>
                        </div>

                        <div className="form-group">
                            <label className="section-label">Requester</label>
                            <div className="form-grid">
                                <input type="text" name="requesterName" placeholder="Name" className="form-control" value={formData.requesterName} onChange={handleInputChange} required />
                                <input type="text" name="requesterPosition" placeholder="Position" className="form-control" value={formData.requesterPosition} onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className="form-group mt-4">
                            <label className="section-label">Reviewer</label>
                            <div className="form-grid">
                                <input type="text" name="reviewerName" placeholder="Name" className="form-control" value={formData.reviewerName} onChange={handleInputChange} required />
                                <input type="text" name="reviewerPosition" placeholder="Position" className="form-control" value={formData.reviewerPosition} onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className="form-group mt-4">
                            <label className="section-label">Approver</label>
                            <div className="form-grid">
                                <input type="text" name="approverName" placeholder="Name" className="form-control" value={formData.approverName} onChange={handleInputChange} required />
                                <input type="text" name="approverPosition" placeholder="Position" className="form-control" value={formData.approverPosition} onChange={handleInputChange} required />
                            </div>
                        </div>
                    </section>

                    {/* Items List */}
                    <section className="form-section">
                        <div className="form-section-header flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                                <PackageSearch size={18} />
                                <h2>Requested Items</h2>
                            </div>
                            <button type="button" className="btn btn-outline btn-sm" onClick={addItem}>
                                <Plus size={14} /> Add Item
                            </button>
                        </div>

                        {formData.items.map((item, index) => (
                            <div key={item.id} className="item-card">
                                <div className="item-header">
                                    <h4>Item #{index + 1}</h4>
                                    {formData.items.length > 1 && (
                                        <button type="button" className="btn-icon text-danger" onClick={() => removeItem(item.id)}>
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>

                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>NIK</label>
                                        <input type="text" className="form-control" value={item.nik} onChange={(e) => handleItemChange(item.id, 'nik', e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input type="text" className="form-control" value={item.name} onChange={(e) => handleItemChange(item.id, 'name', e.target.value)} required />
                                    </div>
                                </div>

                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Dept</label>
                                        <input type="text" className="form-control" value={item.dept} onChange={(e) => handleItemChange(item.id, 'dept', e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Team</label>
                                        <input type="text" className="form-control" value={item.team} onChange={(e) => handleItemChange(item.id, 'team', e.target.value)} required />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Item Description (Multi-line)</label>
                                    <textarea className="form-control" value={item.itemDetail} onChange={(e) => handleItemChange(item.id, 'itemDetail', e.target.value)} required />
                                </div>

                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Qty (Multi-line)</label>
                                        <textarea className="form-control min-h-[60px]" value={item.qty} onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Remark (Multi-line)</label>
                                        <textarea className="form-control min-h-[60px]" value={item.remark} onChange={(e) => handleItemChange(item.id, 'remark', e.target.value)} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Explanation */}
                    <section className="form-section">
                        <div className="form-section-header">
                            <MessageSquare size={18} />
                            <h2>Explanation & Closing</h2>
                        </div>
                        <div className="form-group">
                            <label>Reason Description</label>
                            <textarea name="reason" className="form-control min-h-[120px]" value={formData.reason} onChange={handleInputChange} required />
                        </div>
                        <div className="form-group mt-4">
                            <label>Closing Statement</label>
                            <input type="text" name="closing" className="form-control" value={formData.closing} onChange={handleInputChange} required />
                        </div>
                    </section>

                    <div className="form-actions mt-8 pb-12 flex justify-end gap-4">
                        <button type="button" className="btn btn-outline" onClick={() => navigate('/')}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Save Request</button>
                    </div>

                </div>
            </form>
        </div>
    );
}
