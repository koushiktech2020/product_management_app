import React from "react";

interface LoadingProps {
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  fullScreen = false,
  size = "md",
  text = "Loading...",
  className = "",
}) => {
  const containerClasses = fullScreen
    ? "d-flex justify-content-center align-items-center vh-100"
    : "d-flex justify-content-center align-items-center py-5";

  const spinnerClasses = `spinner-border${
    size !== "md" ? ` spinner-border-${size}` : ""
  }`;

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className={spinnerClasses} role="status">
        <span className="visually-hidden">{text}</span>
      </div>
      {text !== "Loading..." && <span className="ms-2">{text}</span>}
    </div>
  );
};

export default Loading;
