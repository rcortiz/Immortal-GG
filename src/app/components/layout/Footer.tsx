import React from "react";

export default function Footer() {
  return (
    <footer className="w-full py-4">
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="text-sm font-semibold">
          Data provided by{" "}
          <a
            href="https://stratz.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Stratz API website"
            className="text-blue-400 hover:underline"
          >
            STRATZ API
          </a>
        </p>
        <p className="text-sm">
          Designed and Developed by Ralph © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
