import type { ComponentProps } from "react";

export function Card({
  className,
  ...props
}: ComponentProps<"div"> & { className?: string }) {
  return (
    <div
      className={[
        "rounded-2xl border border-sand/70 bg-cream shadow-sm",
        className
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

