import { cn } from "../lib/utils";

interface ConceptButtonProps {
  term: string;
  isSelected: boolean;
  onClick: () => void;
}

const ConceptButton = ({ term, isSelected, onClick }: ConceptButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
        "border border-border hover:border-primary/40",
        "hover:shadow-md hover:-translate-y-0.5",
        isSelected
          ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
          : "bg-card text-card-foreground hover:bg-secondary"
      )}
    >
      {term}
    </button>
  );
};

export default ConceptButton;
