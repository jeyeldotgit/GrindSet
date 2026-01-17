type StatDisplayProps = {
  title: string;
  value: string | number;
  description?: string;
  highlight?: boolean;
  className?: string;
};

const StatDisplay = ({
  title,
  value,
  description,
  highlight = false,
  className = "",
}: StatDisplayProps) => {
  return (
    <div className={`stat bg-transparent ${className}`}>
      <div className="stat-title text-gray-400">{title}</div>
      <div
        className={`stat-value font-mono text-3xl ${
          highlight ? "text-primary" : ""
        }`}
      >
        {value}
      </div>
      {description && (
        <div className="stat-desc text-sm text-gray-500">{description}</div>
      )}
    </div>
  );
};

export default StatDisplay;

