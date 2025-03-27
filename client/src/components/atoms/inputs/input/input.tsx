import React from "react";

interface InputProps {
    label?: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    error?: string;
}

export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled = false,
  className = "",
  error,
}: InputProps) {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="text-sm font-medium text-gray-700">{label}</label>
            )}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`border px-3 py-2 rounded-md outline-none transition 
          ${error ? "border-red-500" : "border-gray-300"} 
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"} 
          ${className}`}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}
