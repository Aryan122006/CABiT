
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  className?: string;
}

export const StarRating = ({ value = 0, onChange, readOnly = false, className }: StarRatingProps) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  
  return (
    <div className={cn("flex items-center", className)}>
      {stars.map((star) => (
        <Star
          key={star}
          className={cn(
            "w-5 h-5 cursor-pointer transition-colors",
            star <= value
              ? "text-yellow-400 fill-yellow-400"
              : "text-muted-foreground",
            readOnly && "cursor-default"
          )}
          onClick={() => !readOnly && onChange?.(star)}
        />
      ))}
    </div>
  );
};
