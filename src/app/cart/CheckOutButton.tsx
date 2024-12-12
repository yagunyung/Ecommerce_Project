"use client";

import { ComponentProps } from "react";

type CheckOutButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function CheckOutButton({
  children,
  className,
  ...props
}: CheckOutButtonProps) {
  return (
    <button {...props} className={`btn btn-primary ${className}`}>
      {children}
    </button>
  );
}
