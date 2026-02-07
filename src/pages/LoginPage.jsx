import { useState, useContext, useEffect } from "react"
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import fetchUsers from "../api/users";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    
    const navigate = useNavigate();

    const { isAuthenticated, login } = useContext(AuthContext);

    useEffect(() => {
        
        async function loadUsers() {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (err) {
                setError("Failed to load users");
                console.log(err);
            }
        }

        loadUsers();
    }, []);

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (email === "" || password === "") {
            setError("Please fill in all fields");
            return;
        }

        setLoading(true);
        setError("");

        //Password check will be handled by backend later, do not forget
        if(users.find((user) => user.email.toLowerCase() === email.toLowerCase())
            ) {
            login({ email });
            setLoading(false);
            } else {
            setError("Invalid Credentials");
            setLoading(false);
            }
    }

    useEffect(() => {
        if(isAuthenticated) {
            navigate("/client", { replace: true });
        }
    },[isAuthenticated, navigate])

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm">
                <h1 className="text-2xl font-semibold text-center text-gray-600 mb-5">Login</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col gap-y-2">
                        <label className="text-sm font-medium text-gray-600">Email</label>
                        <input 
                        type="email"
                        value={email}
                        onChange={handleEmailChange} 
                        placeholder="you@example.com" 
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <label className="text-sm font-medium text-gray-600">Password</label>
                        <input 
                        type="password"
                        value={password} 
                        onChange={handlePasswordChange} 
                        placeholder="******" 
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                    </div>

                    <div className="flex items-center gap-x-2">
                        <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300"
                        id="remember"
                        />
                        <label htmlFor="remember" className="mb-[2px]">Remember me</label>
                    </div>

                    <button 
                    className="w-full rounded-lg bg-teal-500 text-white py-2 font-medium hover:bg-teal-600 transition" 
                    disabled={loading}
                    type="submit"
                    >
                        {loading ? "Logging in...": "Login"}
                    </button>

                    {error ? <p className="flex justify-center text-red-600">{error}</p>: null}
                </form>
            </div>
        </div>
    )
}