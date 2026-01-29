interface InputFieldProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  type: string;
  error?: string;
}

const InputField = ({
  label,
  value,
  onChange,
  placeholder,
  type,
  error,
}: InputFieldProps) => {
  return (
    <>
      <div className="flex flex-col gap-y-2">
        <label className="block text-lg font-semibold text-gray-800">
          {label}
        </label>
        <input
          type={type}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 bg-white shadow-sm focus:border-gray-500 focus:ring-2 focus:ring-gray-200 focus:outline-none transition-all duration-200 text-gray-900 font-medium"
          placeholder={placeholder}
        />
        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      </div>
    </>
  );
};

export default InputField;
