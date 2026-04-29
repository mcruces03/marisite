import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-terracotta text-cream hover:bg-peach",
  secondary: "bg-sage-light text-forest hover:bg-sage",
  ghost: "bg-transparent text-forest hover:bg-sand/60"
};

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
};

type LinkButtonProps = CommonProps &
  Omit<ComponentProps<typeof Link>, "href"> & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  ComponentProps<"button"> & {
    href?: undefined;
  };

type Props = LinkButtonProps | NativeButtonProps;

export function Button(props: Props) {
  const { variant = "primary", className } = props;
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/50";

  if (typeof (props as LinkButtonProps).href === "string") {
    const { href, ...rest } = props as LinkButtonProps;
    return (
      <Link
        href={href}
        className={[base, variantClass[variant], className].filter(Boolean).join(" ")}
        {...rest}
      />
    );
  }

  const { ...rest } = props as NativeButtonProps;
  return (
    <button
      className={[base, variantClass[variant], className].filter(Boolean).join(" ")}
      {...rest}
    />
  );
}

