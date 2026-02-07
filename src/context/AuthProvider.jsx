import { useState } from "react"
import AuthContext from "./AuthContext"

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("authUser")

        if(storedUser) {
            return JSON.parse(storedUser)
        } else {
            return null
        }
    });

    function login(userData) {
    localStorage.setItem("authUser", JSON.stringify(userData));
    setUser(userData);
    }

    function logout() {
    localStorage.removeItem("authUser");
    setUser(null);
    }

    const value = { 
        user, 
        isAuthenticated: Boolean(user), 
        login, 
        logout, 
    };

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}