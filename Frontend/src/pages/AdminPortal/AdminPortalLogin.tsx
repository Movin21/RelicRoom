import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "./slice/adminSlice";
import adminLoginBG from "../../assets/admin/adminLoginBG.jpg";
const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  rememberPassword: z.boolean(),
});

const AdminPortalLogin = () => {
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const dispatch = useDispatch();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/admin/adminUserLogin",
        data
      );

      if (response.data.success) {
        // Login successful
        dispatch(login(response.data.admin));
        navigate("/admin");
        console.log(response.data.admin);
        reset();
      }
    } catch (error) {
      setLoginError(" Invalid username or password");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-gradient-to-r from-brownMedium to-brownDark"
      style={{
        backgroundImage: `url(${adminLoginBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="backdrop-blur-sm bg-white/30 p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="font-akshar text-brownDark text-4xl text-center font-bold mb-6">
          Welcome to Admin Portal
        </h2>
        <p className="mb-4 font-poppins  text-center text-sm">
          Please enter your username and password to continue
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="font-poppins block text-sm mb-2 font-medium"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              {...register("username")}
              className={`w-full px-3 py-1.5 border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Admin Username"
            />
            {errors.username && (
              <span className="text-red-500">
                {String(errors.username.message)}
              </span>
            )}
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
              {...register("password")}
              className={`w-full px-3 py-1.5 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            />
            {errors.password && (
              <span className="text-red-500">
                {String(errors.password.message)}
              </span>
            )}
          </div>
          {loginError && (
            <div className="bg-red-100 border border-red-400 text-red-700  rounded mb-4">
              <Alert variant="destructive">
                <AlertCircle className="h-5 w-5" />
                <AlertTitle>Login Error</AlertTitle>
                <AlertDescription>{loginError}</AlertDescription>
              </Alert>
            </div>
          )}
          <div className="mb-6">
            <label
              htmlFor="rememberPassword"
              className="font-poppins text-sm flex items-center"
            >
              <input
                type="checkbox"
                id="rememberPassword"
                {...register("rememberPassword")}
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
          Don't have an account?
          <Link to="#" className="font-poppins text-brownDark hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminPortalLogin;
