import { useState } from "react";
import { Link } from "react-router-dom";

const AdminPortalLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);

  const handleEmailChange = (e: any) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const handleRememberPasswordChange = (e: any) => {
    setRememberPassword(e.target.checked);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Perform login logic here
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Remember Password:", rememberPassword);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-brownMedium to-brownDark">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="font-akshar text-brownDark text-4xl text-center font-bold mb-6">
          Welcome to Admin Portal
        </h2>
        <p className="mb-4 font-poppins  text-center text-sm">
          Please enter your username and password to continue
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="font-poppins block text-sm font-medium mb-2"
            >
              Username:
            </label>
            <input
              type="username"
              id="username"
              value={username}
              onChange={handleEmailChange}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Movin_2001"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className=" font-poppins text-sm block font-medium mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="rememberPassword"
              className="font-poppins text-sm flex items-center"
            >
              <input
                type="checkbox"
                id="rememberPassword"
                checked={rememberPassword}
                onChange={handleRememberPasswordChange}
                className="mr-2"
              />
              Remember Password
            </label>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-brownDark text-white px-4 py-2 rounded-md hover:bg-brownMedium transition-colors duration-300"
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="font-poppins mt-4 text-sm">
          Don't have an account?{" "}
          <Link
            to="#"
            className="font-poppins text-brownMedium hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminPortalLogin;
