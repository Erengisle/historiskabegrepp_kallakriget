import { concepts as kallakrigetConcepts } from "./concepts";
import { concepts as forntidanConcepts } from "./concepts-forntiden";
import { concepts as medeltidenConcepts } from "./concepts-medeltiden";
import { concepts as nyaTidenConcepts } from "./concepts-nya-tiden";
import { concepts as artonhundratalet } from "./concepts-1800-talet";
import { concepts as nittonhundratalet } from "./concepts-1900-talet";
import { concepts as nutidshistoriaConcepts } from "./concepts-nutid";
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
    id: "forntiden",
    label: "Forntiden och antiken",
    description: "",
    concepts: forntidanConcepts,
  },
  {
    id: "medeltiden",
    label: "Medeltiden",
    description: "",
    concepts: medeltidenConcepts,
  },
  {
    id: "nya-tiden",
    label: "Den nya tiden",
    description: "",
    concepts: nyaTidenConcepts,
  },
  {
    id: "1800-talet",
    label: "Det långa 1800-talet",
    description: "",
    concepts: artonhundratalet,
  },
  {
    id: "1900-talet",
    label: "Det korta 1900-talet",
    description: "",
    concepts: nittonhundratalet,
  },
  {
    id: "nutidshistoria",
    label: "Nutidshistoria",
    description: "",
    concepts: nutidshistoriaConcepts,
  },
  {
    id: "kallakriget",
    label: "Kalla kriget",
    description: "Moderna historiska begrepp kopplade till kalla kriget och efterkrigstiden",
    concepts: kallakrigetConcepts,
  },
];
