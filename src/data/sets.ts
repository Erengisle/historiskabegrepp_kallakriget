import { concepts as kallakrigetConcepts } from "./concepts";
import type { Concept } from "./concepts";

export type { Concept, ConceptTranslation } from "./concepts";

export interface ConceptSet {
  id: string;
  label: string;
  description: string;
  concepts: Concept[];
}

export const sets: ConceptSet[] = [
  {
    id: "kallakriget",
    label: "Kalla kriget",
    description: "Moderna historiska begrepp kopplade till kalla kriget och efterkrigstiden",
    concepts: kallakrigetConcepts,
  },
];
