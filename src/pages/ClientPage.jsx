import { useContext } from "react"
import AuthContext from "../context/AuthContext"


export default function ClientPage() {
    const { user, logout } = useContext(AuthContext);

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
            <h1 className="text-2xl font-semibold text-center text-gray-600 mb-5">
                Welcome {user?.email}!
            </h1>

            <button
                className="w-full rounded-lg bg-red-500 text-white py-2 font-medium hover:bg-red-600 transition"
                onClick={logout}
            >
                Logout
            </button>
            </div>
        </div>
    )
}