type TextareaProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
  id?: string;
  name?: string;
};

const Textarea = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  rows = 4,
  className = "",
  id,
  name,
}: TextareaProps) => {
  const textareaId = id || name || `textarea-${Math.random().toString(36).substr(2, 9)}`;

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
      <textarea
        id={textareaId}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        rows={rows}
        className={`textarea textarea-bordered w-full bg-neutral border-white/10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100 ${
          error ? "border-error" : ""
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${textareaId}-error` : undefined}
      />
      {error && (
        <div className="label">
          <span id={`${textareaId}-error`} className="label-text-alt text-error">
            {error}
          </span>
        </div>
      )}
    </label>
  );
};

export default Textarea;

