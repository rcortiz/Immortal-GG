import React from "react";

interface LevelIconProps {
  content?: string;
}

export default function LevelIcon({ content }: LevelIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 300"
      className="h-9 w-9"
      preserveAspectRatio="xMidYMid meet"
    >
      <polygon
        fill="#4F5A80"
        points="150,15 258,77 258,202 150,265 42,202 42,77"
      />
      {content && (
        <text
          x="150"
          y="140"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="100"
          fontWeight="bold"
        >
          {content}
        </text>
      )}
    </svg>
  );
}
