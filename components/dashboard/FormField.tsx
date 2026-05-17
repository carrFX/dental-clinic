interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (value: string) => void;
  required?: boolean;
  options?: { value: string; label: string }[];
  rows?: number;
}

export function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  options,
  rows,
}: FormFieldProps) {
  const baseClass =
    "w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20";

  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-[var(--foreground)]">
        {label}
        {required && <span className="text-[var(--danger)]"> *</span>}
      </label>
      {options ? (
        <select
          id={name}
          name={name}
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
          required={required}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : rows ? (
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={String(value)}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
          required={required}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClass}
          required={required}
        />
      )}
    </div>
  );
}
