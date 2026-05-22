import { useState } from "react";
import { concepts, type Concept } from "../data/concepts";

const LANGUAGES = [
  { name: "Svenska", flag: "🇸🇪" },
  { name: "Engelska", flag: "🇬🇧" },
  { name: "Spanska", flag: "🇪🇸" },
  { name: "Ukrainska", flag: "🇺🇦" },
  { name: "Ryska", flag: "🇷🇺" },
  { name: "Urdu", flag: "🇵🇰" },
  { name: "Persiska", flag: "🇮🇷" },
  { name: "Polska", flag: "🇵🇱" },
  { name: "Arabiska", flag: "🇸🇦" },
];

const RTL = new Set(["Arabiska", "Urdu", "Persiska"]);

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getText(concept: Concept, lang: string): string {
  if (lang === "Svenska") return concept.explanation;
  return concept.translations.find((t) => t.language === lang)?.translation ?? concept.explanation;
}

function maskTerm(text: string, term: string): string {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(new RegExp(escaped, "gi"), "___");
}

interface Question {
  explanation: string;
  correct: string;
  options: string[];
}

function buildQuestions(lang: string): Question[] {
  const shuffled = shuffle([...concepts]);
  return shuffled.map((concept) => {
    const explanation = maskTerm(getText(concept, lang), concept.term);
    const distractors = shuffle(shuffled.filter((c) => c.term !== concept.term))
      .slice(0, 3)
      .map((c) => c.term);
    return { explanation, correct: concept.term, options: shuffle([concept.term, ...distractors]) };
  });
}

type Phase = "select-language" | "playing" | "finished";

interface Props {
  onExit: () => void;
}

export default function QuizGame({ onExit }: Props) {
  const [phase, setPhase] = useState<Phase>("select-language");
  const [language, setLanguage] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const langMeta = LANGUAGES.find((l) => l.name === language);
  const isRTL = RTL.has(language);
  const q = questions[index];
  const total = questions.length;
  const answered = chosen !== null;

  function start(lang: string) {
    setLanguage(lang);
    setQuestions(buildQuestions(lang));
    setIndex(0);
    setChosen(null);
    setScore(0);
    setPhase("playing");
  }

  function pick(option: string) {
    if (answered) return;
    setChosen(option);
    if (option === q.correct) setScore((s) => s + 1);
  }

  function next() {
    if (index + 1 >= total) {
      setPhase("finished");
    } else {
      setIndex((i) => i + 1);
      setChosen(null);
    }
  }

  // ── Language selector ──────────────────────────────────────────────────
  if (phase === "select-language") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-8 px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">Välj språk</h2>
          <p className="text-muted-foreground">
            Förklaringarna visas på det språk du väljer
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 w-full max-w-md">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.name}
              onClick={() => start(lang.name)}
              className="flex flex-col items-center gap-1 bg-card border border-border rounded-xl p-4 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer"
            >
              <span className="text-3xl">{lang.flag}</span>
              <span className="text-sm font-medium text-foreground">{lang.name}</span>
            </button>
          ))}
        </div>
        <button
          onClick={onExit}
          className="text-sm text-muted-foreground hover:text-foreground underline"
        >
          Tillbaka till studieläge
        </button>
      </div>
    );
  }

  // ── Finished ───────────────────────────────────────────────────────────
  if (phase === "finished") {
    const pct = Math.round((score / total) * 100);
    const emoji = pct >= 80 ? "🏆" : pct >= 60 ? "👍" : "📚";
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 text-center px-4">
        <div className="text-6xl">{emoji}</div>
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-1">Quiz klart!</h2>
          <p className="text-muted-foreground">
            {langMeta?.flag} {language}
          </p>
        </div>
        <div className="bg-card border border-border rounded-2xl px-12 py-6 shadow-sm">
          <div className="text-5xl font-bold text-primary">
            {score}
            <span className="text-2xl text-muted-foreground font-normal">/{total}</span>
          </div>
          <div className="text-muted-foreground mt-1">{pct}% rätt</div>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => start(language)}
            className="bg-primary text-primary-foreground rounded-lg px-5 py-2.5 font-medium hover:bg-primary/90 transition-colors"
          >
            Spela igen
          </button>
          <button
            onClick={() => setPhase("select-language")}
            className="bg-card border border-border rounded-lg px-5 py-2.5 text-foreground font-medium hover:border-primary/50 transition-colors"
          >
            Byt språk
          </button>
          <button
            onClick={onExit}
            className="text-sm text-muted-foreground hover:text-foreground underline self-center"
          >
            Tillbaka
          </button>
        </div>
      </div>
    );
  }

  // ── Playing ────────────────────────────────────────────────────────────
  const progress = (index / total) * 100;

  return (
    <div className="flex flex-col gap-5 max-w-2xl mx-auto px-2">
      {/* Top bar */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {langMeta?.flag} {language} · Fråga {index + 1}/{total}
        </span>
        <span className="font-semibold text-foreground">
          {score} <span className="font-normal text-muted-foreground">poäng</span>
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Explanation card */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Vilket begrepp beskrivs här?
        </p>
        <p className="text-sm leading-relaxed text-foreground" dir={isRTL ? "rtl" : "ltr"}>
          {q.explanation}
        </p>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {q.options.map((option, i) => {
          let cls =
            "w-full text-left border rounded-xl px-5 py-4 text-sm font-medium transition-all duration-150 ";
          if (!answered) {
            cls += "bg-card border-border hover:border-primary/60 hover:bg-primary/5 cursor-pointer";
          } else if (option === q.correct) {
            cls += "bg-green-50 border-green-500 text-green-900";
          } else if (option === chosen) {
            cls += "bg-red-50 border-red-400 text-red-900";
          } else {
            cls += "bg-card border-border opacity-40 cursor-default";
          }
          return (
            <button
              key={i}
              onClick={() => pick(option)}
              className={cls}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Feedback + Next button */}
      {answered && (
        <div className="flex items-center justify-between gap-4 pt-1">
          <span
            className={
              chosen === q.correct
                ? "text-green-600 font-semibold text-sm"
                : "text-red-500 font-semibold text-sm"
            }
          >
            {chosen === q.correct
              ? "✓ Rätt!"
              : "✗ Fel — rätt svar är markerat i grönt"}
          </span>
          <button
            onClick={next}
            className="bg-primary text-primary-foreground rounded-lg px-5 py-2.5 font-medium hover:bg-primary/90 transition-colors shrink-0"
          >
            {index + 1 >= total ? "Visa resultat" : "Nästa →"}
          </button>
        </div>
      )}
    </div>
  );
}
