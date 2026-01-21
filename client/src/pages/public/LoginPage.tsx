import { useState } from "react";
import { Link } from "react-router-dom";
import { loginFormSchema, type LoginFormData } from "../../schemas/auth";
import { Input, Button, SocialAuthButton } from "../../components/ui";
import { useAuth } from "../../hooks/useAuth";

const LoginPage = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginFormData, string>>
  >({});
  const { login, isLoading, error } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = loginFormSchema.safeParse(formData);
    try {
      if (!result.success) {
        const fieldErrors: Partial<Record<keyof LoginFormData, string>> = {};
        result.error.issues.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as keyof LoginFormData] = error.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }
      setErrors({});
      await login(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-primary mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-400">Sign in to continue your grind</p>
        </div>

        <div className="card bg-neutral border border-white/5 shadow-2xl">
          <div className="card-body p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
              />

              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
              />

              {error ? (
                <div className="text-sm text-error bg-error/10 border border-error/20 rounded-lg px-3 py-2">
                  {error}
                </div>
              ) : null}

              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full text-gray-900"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="divider my-6">OR</div>

            <div className="space-y-3">
              <SocialAuthButton provider="google" />
              <SocialAuthButton provider="facebook" />
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-primary hover:underline font-semibold"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
