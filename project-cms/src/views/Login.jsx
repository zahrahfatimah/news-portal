import axios from 'axios';
import { useState } from 'react';
import Toastify from 'toastify-js';
import { useNavigate } from 'react-router-dom';

export default function Login({ url }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    async function handleLogin(event) {
        event.preventDefault();//biar nge-refresh
        try {
            let { data } = await axios.post(`${url}/apis/login`, { email, password });
            localStorage.setItem("token", data.data.access_token);
            navigate('/home')
            Toastify({
                text: "Success Login",
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#00B29F",
                    color: "#17202A",
                    boxShadow: "0 5px 10px black",
                    fontWeight: "bold"
                }
            }).showToast();
            // setPage('home');
        } catch (error) {
            // console.log(error);
            Toastify({
                text:"error nich",
                duration: 2000,
                newWindow: true,
                close: true,
                gravity: "bottom",
                position: "right",
                stopOnFocus: true,
                style: {
                    background: "#EF4C54",
                    color: "#17202A",
                    boxShadow: "0 5px 10px black",
                    fontWeight: "bold"
                }
            }).showToast();
        }
    }

    return (
        <div className="bg-gray-100 flex items-center justify-center min-h-screen">
            <form 
                onSubmit={handleLogin} 
                className="bg-[#CADABF] p-8 rounded-lg shadow-lg max-w-md w-full"
            >
                {/* <h1 className="text-2xl font-bold mb-6">Log in to your account</h1>
                <p className="mb-6 text-gray-600">
                    Log in on your profile to autocomplete your purchase order with your personal data.
                </p> */}
                <div className="mb-4">
                    
                    <label htmlFor="login-email" className="block text-gray-700 font-medium mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="login-email"
                        placeholder="Enter email address ..."
                        autoComplete="off"
                        required
                        className="form-input mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="login-password" className="block text-gray-700 font-medium mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="login-password"
                        placeholder="Enter your password ..."
                        autoComplete="off"
                        required
                        className="form-input mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            
                <button
                    type="submit"
                    className="w-full bg-[#BC9F8B] text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-[#BC9F8B] focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
                >
                    Log In
                </button>
            </form>
        </div>
    );
}
