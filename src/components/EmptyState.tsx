import React from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
  actionButton?: {
    text: string;
    onClick: () => void;
    variant?:
      | "primary"
      | "secondary"
      | "success"
      | "danger"
      | "warning"
      | "info";
  };
  className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = "inventory_2",
  actionButton,
  className = "",
}) => {
  return (
    <div className={`text-center mt-5 py-5 ${className}`}>
      <div className="mb-4">
        <i
          className="material-icons text-muted"
          style={{
            fontSize: "80px",
            opacity: 0.5,
            display: "block",
            marginBottom: "1rem",
          }}
        >
          {icon}
        </i>
      </div>

      <h4 className="text-muted fw-medium mb-3">{title}</h4>

      {description && (
        <p
          className="text-muted mb-4"
          style={{ maxWidth: "400px", margin: "0 auto" }}
        >
          {description}
        </p>
      )}

      {actionButton && (
        <button
          className={`btn btn-${
            actionButton.variant || "primary"
          } d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill fw-medium transition-all`}
          onClick={actionButton.onClick}
          style={{
            background:
              actionButton.variant === "primary"
                ? "linear-gradient(135deg, #007bff 0%, #0056b3 100%)"
                : undefined,
            border: "none",
            boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)",
          }}
          onMouseEnter={(e) => {
            if (actionButton.variant === "primary") {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(0, 123, 255, 0.4)";
            }
          }}
          onMouseLeave={(e) => {
            if (actionButton.variant === "primary") {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 15px rgba(0, 123, 255, 0.3)";
            }
          }}
        >
          <i className="material-icons" style={{ fontSize: "18px" }}>
            add_circle
          </i>
          {actionButton.text}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
