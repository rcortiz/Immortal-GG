import React from "react";

interface MedalIconProps {
  bgColor?: string;
  content?: string;
}

export default function MedalIcon({ bgColor, content }: MedalIconProps) {
  return (
    <svg
      viewBox="0 0 235 235"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
    >
      <path
        d="M112.761 0.17667C110.191 0.681553 105.463 2.37979 102.893 3.71085C100.919 4.72061 98.5325 6.78604 94.4016 10.9628C87.9758 17.4804 85.4973 19.4999 81.137 21.6571C74.0227 25.1913 69.2952 26.1093 58.3713 25.9716C49.0999 25.8339 47.1721 26.2011 41.6184 29.0927C36.0647 31.9843 31.9338 36.1151 29.0422 41.6689C26.1506 47.2226 25.7834 49.1503 25.9211 58.4218C26.0588 69.3456 25.1409 74.0731 21.6067 81.1874C19.4495 85.5478 17.4299 88.0263 10.9124 94.4521C4.67017 100.557 3.20142 102.806 1.13599 108.91C-0.378662 113.5 -0.378662 121.303 1.13599 125.892C3.20142 131.997 4.67017 134.246 10.9124 140.35C17.4299 146.776 19.4495 149.255 21.6067 153.615C25.1409 160.729 26.0588 165.457 25.9211 176.381C25.7834 185.652 26.1506 187.58 29.0422 193.134C31.9338 198.687 36.0647 202.818 41.6184 205.71C47.1721 208.601 49.0999 208.969 58.3713 208.831C69.2952 208.693 74.0227 209.611 81.137 213.145C85.4973 215.303 87.9758 217.322 94.4016 223.84C100.506 230.082 102.755 231.551 108.86 233.616C113.449 235.131 121.252 235.131 125.842 233.616C131.947 231.551 134.196 230.082 140.3 223.84C146.726 217.322 149.204 215.303 153.565 213.145C160.679 209.611 165.407 208.693 176.33 208.831C185.602 208.969 187.53 208.601 193.083 205.71C198.637 202.818 202.768 198.687 205.659 193.134C208.551 187.58 208.918 185.652 208.781 176.381C208.643 165.457 209.561 160.729 213.095 153.615C215.252 149.255 217.272 146.776 223.789 140.35C230.032 134.246 231.5 131.997 233.566 125.892C235.08 121.303 235.08 113.5 233.566 108.91C231.5 102.806 230.032 100.557 223.789 94.4521C217.272 88.0263 215.252 85.5478 213.095 81.1874C209.561 74.0731 208.643 69.3456 208.781 58.4218C208.918 49.1503 208.551 47.2226 205.659 41.6689C202.768 36.1151 198.637 31.9843 193.083 29.0927C187.53 26.2011 185.602 25.8339 176.33 25.9716C165.544 26.1093 160.633 25.1913 153.84 21.7948C149.158 19.4999 147.185 17.8935 140.759 11.4218C134.196 4.76651 131.992 3.25187 126.072 1.27823C123.134 0.314365 115.423 -0.328213 112.761 0.17667Z"
        fill={bgColor}
      />
      {content && (
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="black"
          fontSize="130"
          fontWeight="bold"
        >
          {content}
        </text>
      )}
    </svg>
  );
}
