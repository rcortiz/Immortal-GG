import React from "react";

interface AlertProps {
  type: "success" | "error" | "warning" | "info";
  message: string;
}

export default function Alert({ type, message }: AlertProps) {
  // Set different alert types and svg icons based on props
  const alertStyles = {
    success: {
      className: "alert alert-success",
      iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", // Checkmark icon
    },
    error: {
      className: "alert alert-error",
      iconPath:
        "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z", // Cross icon
    },
    warning: {
      className: "alert alert-warning",
      iconPath:
        "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", // Warning icon
    },
    info: {
      className: "alert alert-info",
      iconPath: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", // Info icon
    },
  };

  // Set info as default fallback for alert
  const { className, iconPath } = alertStyles[type] || alertStyles.info;

  return (
    <div
      role="alert"
      className={`${className} absolute left-1/2 top-4 z-50 w-[90%] max-w-lg -translate-x-1/2 transform px-4 shadow-lg`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d={iconPath}
        />
      </svg>
      <span>{message}</span>
    </div>
  );
}
