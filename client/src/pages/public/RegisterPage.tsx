import { useState } from "react";
import { Link } from "react-router-dom";
import { registerSchema, type RegisterFormData } from "../../schemas/auth";
import { Input, Button, SocialAuthButton } from "../../components/ui";

const RegisterPage = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterFormData, string>>
  >({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof RegisterFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = registerSchema.safeParse(formData);
    try {
      if (!result.success) {
        const fieldErrors: Partial<Record<keyof RegisterFormData, string>> = {};
        result.error.issues.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as keyof RegisterFormData] =
              error.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }
      setErrors({});
      console.log("Form data:", result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter text-primary mb-2">
            Start Your Grind
          </h1>
          <p className="text-gray-400">
            Create an account to track your progress
          </p>
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

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                required
              />

              <Button type="submit" className="w-full text-gray-900">
                Create Account
              </Button>
            </form>

            <div className="divider my-6">OR</div>

            <div className="space-y-3">
              <SocialAuthButton provider="google" />
              <SocialAuthButton provider="facebook" />
            </div>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary hover:underline font-semibold"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
