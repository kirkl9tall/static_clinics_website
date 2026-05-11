import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  highlight,
  subtitle,
  className = "",
  align = "center",
  dark = false,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-16", align === "center" ? "text-center" : "text-left", className)}>
      {badge && (
        <span className={cn(
          "inline-block mb-4 px-4 py-1.5 text-sm font-medium rounded-full",
          dark
            ? "bg-primary-500/20 text-primary-300"
            : "bg-primary-50 text-primary-600 dark:bg-primary-500/20 dark:text-primary-300"
        )}>
          {badge}
        </span>
      )}
      <h2 className={cn(
        "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-balance",
        dark ? "text-white" : "text-text-primary dark:text-text-dark-primary"
      )}>
        {title}{highlight && <> <span className="gradient-text">{highlight}</span></>}
      </h2>
      {subtitle && (
        <p className={cn(
          "mt-4 text-lg md:text-xl max-w-3xl leading-relaxed",
          align === "center" ? "mx-auto" : "",
          dark ? "text-gray-300" : "text-text-secondary dark:text-text-dark-secondary"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
