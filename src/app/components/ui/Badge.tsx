import React from "react";

interface BadgeProps {
  type: "win" | "lose";
}

export default function Badge({ type }: BadgeProps) {
  // Set different badge types and svg icons based on props
  const badgeStyles = {
    win: {
      className: "bg-ui-accent-win/25 text-ui-accent-win",
      message: "W",
    },
    lose: {
      className: "bg-ui-accent-lose/25 text-ui-accent-lose",
      message: "L",
    },
  };

  const { className, message } = badgeStyles[type];

  return (
    <div
      role="badge"
      className={`${className} flex h-8 w-8 items-center justify-center rounded-lg text-center font-bold`}
    >
      {message}
    </div>
  );
}
