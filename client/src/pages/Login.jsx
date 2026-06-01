import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);
  const [state, setState] = useState("Sign Up");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    setErrors({ ...errors, [e.target.name]: "" });
  };

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      axios.defaults.withCredentials = true;

      if (state === "Sign Up") {
        const { data } = await axios.post(
          backendUrl + "/api/v1/auth/signup",
          formData,
        );

        if (data.success) {
          setIsLoggedin(true);
          await getUserData();
          navigate("/dashboard");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/v1/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        if (data.success) {
          setIsLoggedin(true);
          await getUserData();
          navigate("/dashboard");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-6
     sm:px-0 bg-gray-100"
    >
      <h2 onClick={() => navigate("/")} className="text-xl sm:text-3xl font-semibold mb-2 p-1 bg-slate-100 rounded-full absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer">
        SecureTask
      </h2>

      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign Up" ? "Create account" : "Login"}
        </h2>

        <p className="text-center text-sm mb-6">
          {state === "Sign Up"
            ? "Create your account"
            : "Login to your account!"}
        </p>

        <form onSubmit={onsubmitHandler}>
          {/* Name */}
          {state === "Sign Up" && (
            <div className="mb-3">
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                <img src={assets.person_icon} alt="" />
                <input
                  onChange={handleChange}
                  value={formData.name}
                  name="name"
                  type="text"
                  className="bg-transparent outline-none text-white"
                  placeholder="Full Name"
                  required
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>
          )}

          {/* Email */}
          <div className="mb-3">
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.mail_icon} alt="" />
              <input
                onChange={handleChange}
                value={formData.email}
                name="email"
                type="email"
                className="bg-transparent outline-none text-white"
                placeholder="Email id"
                required
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <div className="mb-4 flex items-center  gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={assets.lock_icon} alt="" />
              <input
                onChange={handleChange}
                value={formData.password}
                name="password"
                type="password"
                className="bg-transparent outline-none text-white"
                placeholder="Password"
                required
              />
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* General error */}
          {errors.general && (
            <p className="text-red-500 text-sm text-center mb-2">
              {errors.general}
            </p>
          )}

          <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900">
            {state}
          </button>
        </form>

        {state === "Sign Up" ? (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-400 text-center text-xs mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-400 cursor-pointer underline"
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
