import { CompactProject, Project } from '@/types/portfolio';

// Featured case studies, rendered in full
export const projects: Project[] = [
  {
    title: "Chorus: 8-Agent RAG System",
    problem: "Engineers burn hours digging through scattered docs, Slack threads, and wikis to answer a question like 'how did we implement auth?'",
    solution: "An assistant that answers plain-English questions from your docs, conversations, and code, with sources, like a senior engineer who's read everything and never forgets.",
    impact: [
      "Hybrid search across Qdrant vectors, BM25 keywords, and a Neo4j knowledge graph, reranked by a BGE cross-encoder",
      "Answers stream over WebSockets, with Redis-backed conversation memory"
    ],
    highlight: "The agents split the work: one parses your question, others search, and a grader rewrites weak queries and fact-checks the answer before it reaches you. That loop gets retrieval to 90% precision on technical documentation.",
    tech: ["LangGraph", "AWS Bedrock", "Qdrant", "Neo4j", "Redis", "Python", "Docker"],
    github: "https://github.com/rohanjoshi1399/Chorus"
  },
  {
    title: "Text-to-SQL with Reinforcement Learning",
    problem: "LLMs can write SQL from plain English, but they're wrong often enough to be risky on a real database.",
    solution: "I trained Llama 3.1 8B with GRPO reinforcement learning, rewarding only queries that actually ran correctly, and tested whether it beats fine-tuning and prompt optimization, and whether the gains stack.",
    impact: [
      "A composite reward scores each query on execution accuracy, syntax validity, and schema coverage",
      "LoRA fine-tuning with Dr. GRPO's length-bias correction keeps training stable"
    ],
    highlight: "Fine-tuning alone memorizes join templates and regresses on hard queries; GRPO's execution reward restores that generalization, recovering +4.6 points on hard ones and reaching 72.1% on Spider, past fine-tuning's 71.1%. Prompt-only optimization (DSPy) lagged at 8B scale.",
    tech: ["Python", "PyTorch", "TRL", "GRPO", "DSPy", "Llama 3.1 8B", "LoRA", "Spider"],
    github: "https://github.com/rohanjoshi1399/text2sql-rl",
    status: "Research"
  },
  {
    title: "Ship of Theseus: Authorial Identity Decay",
    problem: "Paraphrasing is the easiest way to slip AI text past detectors, but rewrite a passage enough times and what fades first: its meaning or the author's fingerprint?",
    solution: "A forensics study of how repeated LLM paraphrasing erodes authorial identity, across 7 datasets and 7 paraphraser variants from 4 model families.",
    impact: [
      "Tracks lexical (TTR, n-gram overlap), structural (POS, dependency depth), and semantic (BERTScore, SBERT) decay at every rewrite",
      "Validates every finding with permutation tests and bootstrap intervals (p < 0.001)"
    ],
    highlight: "Content (named entities) decays 11.8× faster than style, so meaning erodes before voice does. Aggressive paraphrasers break authorship attribution in one pass; gentle ones survive about three. And each paraphraser leaves a fingerprint, distinguishable at 75.5% macro-F1.",
    tech: ["Python", "spaCy", "BERTScore", "SBERT", "scikit-learn", "Streamlit"],
    github: "https://github.com/Asurkatha/ShipOfTheseus-NLP",
    status: "Research"
  }
];

// Compact "More Work" rows. Empty for now; the section hides itself until
// something is added here.
export const moreProjects: CompactProject[] = [];
