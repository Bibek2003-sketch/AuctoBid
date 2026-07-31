function InputField({
  icon: Icon,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
}) {
  return (
    <div className="w-full">
      <div className="relative">
        {/* Icon */}

        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400" />

        {/* Input */}

        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full rounded-xl border bg-white py-3 pl-12 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 sm:text-base
          ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-slate-300 focus:border-blue-500"
          }`}
        />
      </div>

      {error && (
        <p className="mt-2 text-xs text-red-500 sm:text-sm">
          {error}
        </p>
      )}
    </div>
  );
}

export default InputField;