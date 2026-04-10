import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import useTheme from "../hooks/useTheme";
import { PiMoonBold, PiSunBold } from "react-icons/pi";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Minimum 8 characters required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const { darkMode, toggleTheme } = useTheme();

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
    <div
      className="min-h-screen flex flex-col 
      bg-linear-to-br from-violet-100 via-white to-purple-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-black text-primary"
    >
      {/* Header / Fake Navbar */}
      <header className="w-full ">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 border-b border-borderMain">
          <img src="/assets/Logo.png" className="h-10" />

          <button onClick={toggleTheme}>
            {darkMode ? <PiSunBold size={20} /> : <PiMoonBold size={20} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-card shadow-xl rounded-2xl p-6 sm:p-8 space-y-5 border border-borderMain"
        >
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl font-bold text-brand">
              ShopSphere
            </h1>

            <h2 className="text-xl sm:text-2xl font-semibold text-primary">
              Login to your account
            </h2>

            <p className="text-secondary text-sm mt-1">Welcome back 👋</p>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <input
              type="text"
              {...register("email")}
              placeholder="Email Address"
              className="w-full px-4 py-2 border border-inputBorder bg-inputBg text-primary rounded-lg focus:outline-none focus:ring-1 focus:ring-brand transition"
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
              className="w-full px-4 py-2 border border-inputBorder bg-inputBg text-primary rounded-lg focus:outline-none focus:ring-1 focus:ring-brand transition"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-brand hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand hover:bg-brandHover transition text-white py-2 rounded-lg font-medium disabled:opacity-50"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          {/* Footer */}
          <p className="text-center text-sm text-secondary">
            Don’t have an account?{" "}
            <span className="text-brand cursor-pointer hover:underline">
              Sign up
            </span>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Login;
