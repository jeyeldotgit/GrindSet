type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  label?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  id?: string;
  name?: string;
};

const Select = ({
  label,
  options,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  placeholder,
  className = "",
  id,
  name,
}: SelectProps) => {
  const selectId = id || name || `select-${Math.random().toString(36).substr(2, 9)}`;

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
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`select select-bordered w-full bg-neutral border-white/10 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100 ${
          error ? "border-error" : ""
        }`}
        aria-invalid={!!error}
        aria-describedby={error ? `${selectId}-error` : undefined}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <div className="label">
          <span id={`${selectId}-error`} className="label-text-alt text-error">
            {error}
          </span>
        </div>
      )}
    </label>
  );
};

export default Select;

