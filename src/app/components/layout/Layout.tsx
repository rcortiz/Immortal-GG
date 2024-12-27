import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto min-h-screen w-full px-4 py-6 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
