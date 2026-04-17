import { useState } from "react";
import { concepts } from "./data/concepts";
import ConceptButton from "./components/ConceptButton";
import ConceptDetail from "./components/ConceptDetail";

export default function Index() {
  const [selectedConcept, setSelectedConcept] = useState(concepts[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Moderna historiska begrepp
          </h1>
          <p className="text-muted-foreground text-lg">
            Utforska viktiga händelser och fenomen från modern historia med förklaringar på flera språk
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold text-foreground mb-4">Begrepp</h2>
            <div className="grid gap-2 max-h-[600px] overflow-y-auto pr-2">
              {concepts.map((concept) => (
                <ConceptButton
                  key={concept.term}
                  term={concept.term}
                  isSelected={selectedConcept.term === concept.term}
                  onClick={() => setSelectedConcept(concept)}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
              <ConceptDetail concept={selectedConcept} />
            </div>
          </div>
        </div>

        <footer className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            Denna app hjälper dig att lära dig viktiga begrepp från modern historia.
            Alla förklaringar inkluderar översättningar till flera språk.
          </p>
        </footer>
      </div>
    </div>
  );
}
