import React from "react";

interface BadgeProps {
  type: "win" | "lose";
}

export default function Badge({ type }: BadgeProps) {
  // Set different badge types and svg icons based on props
  const badgeStyles = {
    win: {
      className: "badge badge-win",
      message: "W",
    },
    lose: {
      className: "badge badge-lose",
      message: "L",
    },
  };

  const { className, message } = badgeStyles[type];

  return (
    <div role="badge" className={`${className}`}>
      {message}
    </div>
  );
}
