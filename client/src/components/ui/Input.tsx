type InputProps = {
  label?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
};

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = "",
  id,
  name,
}: InputProps) => {
  const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <label className={`form-control w-full ${className}`}>
      {label && (
        <div className="label">
          <span className="label-text font-semibold">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </span>
        </div>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`input input-bordered w-full bg-neutral border-white/10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100 ${
          error ? "border-error" : ""
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
      />
      {error && (
        <div className="label">
          <span id={`${inputId}-error`} className="label-text-alt text-error">
            {error}
          </span>
        </div>
      )}
    </label>
  );
};

export default Input;

