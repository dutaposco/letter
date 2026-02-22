import { create } from 'zustand';

const API_URL = 'http://localhost:3000/api/requests';

const useRequestStore = create((set, get) => ({
    requests: [],
    isLoading: false,
    error: null,

    fetchRequests: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Failed to fetch requests');
            const data = await response.json();
            set({ requests: data, isLoading: false });
        } catch (err) {
            set({ error: err.message, isLoading: false });
        }
    },

    addRequest: async (request) => {
        const currentState = get();
        // Start with a new ID
        const newId = `REQ-${new Date().getFullYear()}-${String(currentState.requests.length + 1).padStart(3, '0')}`;
        const newRequest = {
            ...request,
            id: newId,
            status: 'Pending',
            createdAt: new Date().toISOString()
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRequest)
            });
            if (!response.ok) throw new Error('Failed to save request to database');

            // Update local state after successful DB insert
            set((state) => ({
                requests: [newRequest, ...state.requests]
            }));
        } catch (err) {
            console.error(err);
            alert('Error saving request: ' + err.message);
        }
    },

    deleteRequest: async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) throw new Error('Failed to delete request');

            set((state) => ({
                requests: state.requests.filter(req => req.id !== id)
            }));
        } catch (err) {
            console.error(err);
            alert('Error deleting request: ' + err.message);
        }
    },
}));

export default useRequestStore;
