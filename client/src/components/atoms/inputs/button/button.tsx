import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "danger" | "outline";
    disabled?: boolean;
    className?: string;
}

export default function Button({
                                   children,
                                   onClick,
                                   type = "button",
                                   variant = "primary",
                                   disabled = false,
                                   className = "",
                               }: ButtonProps) {
    const baseStyles =
        "px-4 py-2 rounded-md font-medium transition focus:outline-none";

    const variantStyles = {
        primary: "bg-primary text-white hover:bg-primary/80",
        secondary: "bg-secondary text-white hover:bg-secondary/80",
        danger: "bg-error text-white hover:bg-error/80",
        outline: "border border-gray-500 text-gray-700 hover:bg-gray-100",
    };

    const disabledStyles = "opacity-50 cursor-not-allowed";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantStyles[variant]} ${
                disabled ? disabledStyles : ""
            } ${className}`}
        >
            {children}
        </button>
    );
}
