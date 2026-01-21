import { useState } from "react";
import { Link } from "react-router-dom";
import { registerFormSchema, type RegisterFormData } from "../../schemas/auth";
import { Input, Button, SocialAuthButton } from "../../components/ui";
import { useAuth } from "../../hooks/useAuth";

const RegisterPage = () => {

  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { signup, isLoading, error } = useAuth();

  // Handle form data change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    try {
      const validated = registerFormSchema.safeParse(formData);
      if (!validated.success) {
        const fieldErrors: Record<string, string> = {};
        validated.error.issues.forEach((issue) => {
          const key = issue.path[0] ? String(issue.path[0]) : "form";
          fieldErrors[key] = issue.message;
        });
        setErrors(fieldErrors);
        return;
      }

      await signup(validated.data);
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ form: error.message });
      }
    }
  }


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

              {error || errors.form ? (
                <div className="text-sm text-error bg-error/10 border border-error/20 rounded-lg px-3 py-2">
                  {error ?? errors.form}
                </div>
              ) : null}

              <Button
                type="submit"
                className="w-full text-gray-900"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
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
