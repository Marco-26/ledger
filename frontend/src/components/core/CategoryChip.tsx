import { cn } from "@/lib/utils";

interface CategoryChipProps {
  category?: string | null;
  className?: string;
}

export function CategoryChip({ category, className }: CategoryChipProps) {
  if (!category) {
    return null;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-muted/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground whitespace-nowrap",
        className,
      )}
      title={category}
    >
      {category}
    </span>
  );
}
