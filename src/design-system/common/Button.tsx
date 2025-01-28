import type React from "react";
import { type ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success" | "warning" | "info";
  size?: "small" | "medium" | "large";
  isLoading?: boolean;
  isFullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "medium",
      isLoading = false,
      isFullWidth = false,
      className = "",
      disabled,
      leftIcon,
      rightIcon,
      ...props
    },
    ref
  ) => {
    const baseStyle =
      "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200";

    const variantStyles = {
      primary: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white",
      secondary:
        "bg-gray-200 hover:bg-gray-300 focus:ring-gray-500 text-gray-800",
      danger: "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white",
      success:
        "bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white",
      warning:
        "bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-400 text-white",
      info: "bg-blue-400 hover:bg-blue-500 focus:ring-blue-300 text-white",
    };

    const sizeStyles = {
      small: "px-2 py-1 text-sm",
      medium: "px-4 py-2",
      large: "px-6 py-3 text-lg",
    };

    const computedClassName = `
    ${baseStyle}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${isFullWidth ? "w-full" : ""}
    ${isLoading || disabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
  `.trim();

    return (
      <button
        ref={ref}
        className={computedClassName}
        disabled={isLoading || disabled}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
