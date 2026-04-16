import type { Concept } from "../data/concepts";

interface ConceptDetailProps {
  concept: Concept;
}

const ConceptDetail = ({ concept }: ConceptDetailProps) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-3">{concept.term}</h2>
        <p className="text-muted-foreground leading-relaxed">{concept.explanation}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {concept.translations.map((t) => (
          <div
            key={t.language}
            className="rounded-lg border border-border bg-card p-4 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{t.flag}</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {t.language}
              </span>
            </div>
            <p className="text-sm text-card-foreground leading-relaxed" dir={
              ["Arabiska", "Urdu", "Persiska"].includes(t.language) ? "rtl" : "ltr"
            }>
              {t.translation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConceptDetail;