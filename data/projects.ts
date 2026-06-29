import { Project } from '@/types/portfolio';

export const projects: Project[] = [
  {
    title: "Chorus: 8-Agent RAG System",
    problem: "Engineers burn hours hunting through scattered docs, old Slack threads, and wikis just to answer a question like 'how did we implement auth?'",
    solution: "An assistant that answers plain-English questions by searching across your docs, conversations, and code, returning sourced answers like a senior engineer who's read everything and never forgets.",
    impact: [
      "New hires get instant answers instead of interrupting teammates",
      "Support teams surface solutions across docs and past tickets in seconds",
      "Teams move fast without the endless document hunt"
    ],
    highlight: "Eight specialized agents work as a team: one parses your question, others search the databases, and another fact-checks the answer before it reaches you.",
    tech: ["LangGraph", "AWS Bedrock", "Qdrant", "Neo4j", "Python", "Docker"],
    github: "https://github.com/rohanjoshi1399/Chorus",
    gradient: "from-purple-500 to-pink-600",
    impactLabel: "Who It Helps",
    highlightLabel: "The Cool Part"
  },
  {
    title: "Text-to-SQL with Reinforcement Learning",
    problem: "LLMs can write SQL from plain English, but they're wrong often enough to be risky on a real database. What moves accuracy more, fine-tuning the weights or optimizing the prompt, and do the gains stack?",
    solution: "I trained Llama 3.1 8B with GRPO reinforcement learning, rewarding it on whether each query actually ran correctly against a live database, then benchmarked it against supervised fine-tuning and DSPy prompt optimization.",
    impact: [
      "Reliable text-to-SQL lets anyone query a database in plain English",
      "Execution-based rewards train on queries that actually run, not ones that just look right",
      "Isolating RL, fine-tuning, and prompt-tuning shows where the gains really come from"
    ],
    highlight: "Fine-tuning alone memorizes join templates and regresses on hard queries; GRPO's execution reward restores that generalization, recovering +4.6 points on hard ones. That lifted it to 72.1% on Spider, past fine-tuning's 71.1%, while prompt-only optimization (DSPy) lagged at 8B scale.",
    tech: ["Python", "PyTorch", "TRL", "GRPO", "DSPy", "Llama 3.1 8B", "LoRA", "Spider"],
    github: "https://github.com/rohanjoshi1399/text2sql-rl",
    gradient: "from-emerald-500 to-teal-600",
    status: "Research",
    impactLabel: "Why It's Interesting",
    highlightLabel: "The Results"
  },
  {
    title: "Ship of Theseus: Authorial Identity Decay",
    problem: "Paraphrasing is the easiest way to slip AI-generated text past detectors. But rewrite a passage enough times and what fades first, its meaning or the author's fingerprint, and is there a point of no return?",
    solution: "A forensics study of how repeated LLM paraphrasing erodes authorial identity. I ran 7 datasets through 7 paraphrasers and built a pipeline measuring stylistic, structural, and semantic decay at every rewrite, plus a dashboard that visualizes it in real time.",
    impact: [
      "Content (named entities) decays 11.8× faster than style, so meaning erodes before voice does",
      "Aggressive paraphrasers break authorship attribution in one pass; gentle ones survive about three",
      "Each paraphraser leaves a fingerprint, distinguishable at 75.5% macro-F1"
    ],
    highlight: "It measures decay across three axes at once, lexical, structural, and semantic, validating every finding with permutation tests and bootstrap intervals (p < 0.001). t-SNE plots make authorial identity visibly pull apart with each rewrite.",
    tech: ["Python", "spaCy", "BERTScore", "SBERT", "scikit-learn", "Streamlit"],
    github: "https://github.com/Asurkatha/ShipOfTheseus-NLP",
    gradient: "from-amber-500 to-rose-600",
    status: "Research",
    impactLabel: "What It Reveals",
    highlightLabel: "How It Works"
  }
];
