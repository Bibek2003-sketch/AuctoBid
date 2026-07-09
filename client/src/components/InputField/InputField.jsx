function InputField ({
    // icon component (FaUser, FaEnvelope...)
    icon: Icon,
    //input type
    type,
    //input name,
    name,
    // placeholder text
    placeholder,
    //current input value
    value,
    //function called while typing
    onChange,
    // error message
    error,
}) {
    return (
        <div>
        <div className="relative">
            {/* Render the icon */}
            <Icon className="absolute left-4 top-4 text-slate-400" />

            <input 
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}

                className={`w-full rounded-xl border py-3 pl-12 pr-4 outline-none transition
                ${
                    error ? "border-red-500 focus:border-red-500" : "border-slate-300 focus:border-slate-600"
                }`}
            />
        </div>

        {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
        )}

        </div>
    )
}

export default InputField