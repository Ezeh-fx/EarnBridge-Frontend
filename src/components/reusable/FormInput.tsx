import { useState } from "react";
import { type LucideIcon, Eye, EyeOff } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  label: string;
  icon: LucideIcon;
  placeholder: string;
  type?: "text" | "email" | "password";
  id: string;
  error?: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
}

export default function FormInput({
  label,
  icon: Icon,
  placeholder,
  type = "text",
  id,
  error,
  required = false,
  register,
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          {...register}
          type={inputType}
          id={id}
          required={required}
          className={`
            w-full pl-10 pr-10 py-3 border rounded-lg
            focus:ring-2 focus:ring-green-500 focus:border-transparent
            outline-none transition-all bg-white
            ${error ? "border-red-500" : "border-gray-300"}
          `}
          placeholder={placeholder}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
