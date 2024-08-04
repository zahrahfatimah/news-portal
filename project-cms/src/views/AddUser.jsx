import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";

function UserForm({ handleSubmit, nameProp }) {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("");

  const validateForm = () => {
    if (!username || !email || !password || !role) {
      Toastify({
        text: "All fields are required",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
      return false;
    }
    return true;
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <form
        className="bg-[#CADABF] p-8 rounded-lg shadow-lg max-w-md w-full"
        onSubmit={(e) => {
          if (validateForm()) {
            handleSubmit(e, username, email, password, role);
          }
        }}
      >
        <h1 className="text-2xl font-bold mb-6">Register</h1>
        <p className="mb-6 text-gray-600">
          Fill in the form to create a new account.
        </p>
        <div className="mb-4">
          <label
            htmlFor="register-username"
            className="block text-gray-700 font-medium mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="register-username"
            placeholder="Enter username ..."
            autoComplete="off"
            className="form-input mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="register-email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="register-email"
            placeholder="Enter email address ..."
            autoComplete="off"
            className="form-input mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="register-password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="register-password"
            placeholder="Enter your password ..."
            autoComplete="off"
            className="form-input mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="register-role"
            className="block text-gray-700 font-medium mb-2"
          >
            Role
          </label>
          <select
            id="register-role"
            className="form-select mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="" disabled selected>
              Select a role
            </option>
            <option value="admin">Admin</option>
            {/* <option value="moderator">Moderator</option> */}
            <option value="staff">Staff</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-[#BC9F8B] text-white font-bold py-2 px-4 rounded hover:bg-white hover:text-[#BC9F8B] focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50"
        >
          Register
        </button>
      </form>
    </div>
  );
}

function AddUser({ url }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      Toastify({
        text: "please log in first beb",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e, username, email, password, role) => {
    e.preventDefault();
    const user = { username, email, password, role };
    const token = localStorage.getItem("access_token");

    try {
      const response = await axios.post(`${url}/add-user`, user, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      Toastify({
        text: "Succes add new User",
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#00B29F",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
      navigate("/");
    } catch (error) {
      Toastify({
        text: error.response?.data?.message || error.message,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "left",
        stopOnFocus: true,
        style: {
          background: "#EF4C54",
          color: "#17202A",
          boxShadow: "0 5px 10px black",
          fontWeight: "bold",
        },
      }).showToast();
    }
  };

  return <UserForm handleSubmit={handleSubmit} nameProp="Add User" />;
}

export default AddUser;
