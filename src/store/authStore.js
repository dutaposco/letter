import { create } from 'zustand';

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,

    login: (username, password) => {
        // Basic mock authentication
        if (username && password) {
            set({
                user: {
                    id: 'USR-001',
                    username: username,
                    name: username === 'admin' ? 'Administrator' : username,
                    role: username === 'admin' ? 'Super Admin' : 'Staff',
                    email: `${username}@poscodx.com`
                },
                isAuthenticated: true
            });
            return true;
        }
        return false;
    },

    logout: () => {
        set({ user: null, isAuthenticated: false });
    }
}));

export default useAuthStore;
