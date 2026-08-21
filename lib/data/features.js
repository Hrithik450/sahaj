export const FEATURE_DOMAINS = {
  government: {
    label: "Government",
    href: "/government",
    features: [
      {
        id: "simplify",
        title: "Document Simplifier",
        navHint: "Plain notices",
        description:
          "Paste a notice or letter and get a plain-language summary with clear next steps.",
        accent: "#c9bdf4",
        iconBg: "#f1eefc",
        layerA: { rotate: -6, tx: -4, ty: 2 },
        layerB: { rotate: 5, tx: 4, ty: -2 },
      },
      {
        id: "form",
        title: "Guided Form",
        navHint: "Step-by-step forms",
        description:
          "Complete government forms one field at a time with voice prompts and simple help.",
        accent: "#aeead6",
        iconBg: "#eaf9f3",
        layerA: { rotate: -5, tx: -3, ty: -3 },
        layerB: { rotate: 6, tx: 4, ty: 2 },
      },
      {
        id: "finder",
        title: "Service Finder",
        navHint: "Find services",
        description:
          "Describe what you need and find the right service, documents, and where to go next.",
        accent: "#fff3d6",
        iconBg: "#fff8e8",
        layerA: { rotate: 6, tx: 3, ty: -2 },
        layerB: { rotate: -5, tx: -4, ty: 3 },
      },
      {
        id: "companion",
        title: "Voice Companion",
        navHint: "Ask anything",
        description:
          "Ask questions in plain language and get short, actionable answers with captions.",
        accent: "#ff806d",
        iconBg: "#fff1ec",
        layerA: { rotate: -4, tx: -3, ty: 2 },
        layerB: { rotate: 5, tx: 3, ty: -2 },
      },
      {
        id: "practice",
        title: "Practice Mode",
        navHint: "Safe to try",
        description:
          "Try a simulated form or task safely, learn from mistakes, and build confidence.",
        accent: "#a8d5f2",
        iconBg: "#eef6fc",
        layerA: { rotate: 5, tx: 4, ty: 2 },
        layerB: { rotate: -6, tx: -4, ty: -2 },
      },
    ],
  },
  banking: {
    label: "Banking",
    href: "/banking",
    features: [
      {
        id: "simplify",
        title: "Document Simplifier",
        navHint: "Plain notices",
        description:
          "Understand bank letters, EMI notices, and KYC messages in simple language.",
        accent: "#c9bdf4",
        iconBg: "#f1eefc",
        layerA: { rotate: -6, tx: -4, ty: 2 },
        layerB: { rotate: 5, tx: 4, ty: -2 },
      },
      {
        id: "task",
        title: "Guided Banking Task",
        navHint: "Banking steps",
        description:
          "Walk through banking tasks like KYC or reporting fraud with one step at a time.",
        accent: "#aeead6",
        iconBg: "#eaf9f3",
        layerA: { rotate: -5, tx: -3, ty: -3 },
        layerB: { rotate: 6, tx: 4, ty: 2 },
      },
      {
        id: "transaction",
        title: "Transaction Explainer",
        navHint: "Decode SMS alerts",
        description:
          "Paste an SMS or transaction alert and learn what happened and what to check.",
        accent: "#fff3d6",
        iconBg: "#fff8e8",
        layerA: { rotate: 6, tx: 3, ty: -2 },
        layerB: { rotate: -5, tx: -4, ty: 3 },
      },
      {
        id: "companion",
        title: "Voice Companion",
        navHint: "Ask anything",
        description:
          "Ask banking questions and get streaming help you can hear and read on screen.",
        accent: "#ff806d",
        iconBg: "#fff1ec",
        layerA: { rotate: -4, tx: -3, ty: 2 },
        layerB: { rotate: 5, tx: 3, ty: -2 },
      },
      {
        id: "practice",
        title: "Safe Practice Mode",
        navHint: "Safe to try",
        description:
          "Practice a fake UPI transfer or form submit with tips when something looks wrong.",
        accent: "#a8d5f2",
        iconBg: "#eef6fc",
        layerA: { rotate: 5, tx: 4, ty: 2 },
        layerB: { rotate: -6, tx: -4, ty: -2 },
      },
    ],
  },
};

export const DEFAULT_FEATURE_DOMAIN = "government";
