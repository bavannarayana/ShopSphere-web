import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../customs/useAuthContext";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Minimum 8 characters required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const res = await api.post("/login", {
      email: data?.email,
      password: data?.password,
    });
    if (res.status === 200) {
      setUser(res.data?.user);
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-violet-100 via-white to-purple-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-5"
      >
        {/* Logo / Title */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-400">ShopSphere</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back 👋</p>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-semibold text-center text-gray-800">
          Login to your account
        </h2>

        {/* Email */}
        <div className="space-y-1">
          <input
            type="text"
            {...register("email")}
            placeholder="Email Address"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 transition"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-blue-500 hover:underline hover:cursor-pointer"
          >
            Forgot password?
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-400 hover:bg-blue-500 transition text-white py-2 rounded-lg font-medium disabled:opacity-50"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <span className="text-blue-500 cursor-pointer hover:underline">
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
