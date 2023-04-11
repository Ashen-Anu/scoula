import create from 'zustand';

export const useAuthStore = create((set) => ({
    auth : {
        email : '',
        active : false
    },
    setEmail : (emaill) => set((state) => ({ auth : { ...state.auth, email : emaill }})) 
}))