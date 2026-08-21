export const ACCESSIBILITY_NEEDS = [
  {
    id: "vision",
    title: "Larger Text",
    description: "Easier to read",
    accent: "#c9bdf4",
    iconBg: "#f1eefc",
  },
  {
    id: "hearing",
    title: "Voice Guidance",
    description: "Speak and listen",
    accent: "#1e9e5a",
    iconBg: "#eaf9f3",
  },
  {
    id: "cognitive",
    title: "Simple Steps",
    description: "One step at a time",
    accent: "#ff806d",
    iconBg: "#fff1ec",
  },
];

export const ACCESSIBILITY_NEED_IDS = new Set(
  ACCESSIBILITY_NEEDS.map((need) => need.id),
);
