export const GOV_PRACTICE = [
  {
    id: "income-form-practice",
    title: {
      en: "Practice: income certificate form",
      hi: "अभ्यास: आय प्रमाण पत्र फॉर्म",
      kn: "Practice: income certificate form",
    },
    steps: [
      {
        id: "full-name",
        label: { en: "Full name", hi: "पूरा नाम", kn: "Full name" },
        correct: "Ananya Sharma",
        mistakeHint: {
          en: "Use the name exactly as on Aadhaar, not a nickname.",
          hi: "उपनाम नहीं, आधार जैसा नाम उपयोग करें।",
          kn: "Use the name exactly as on Aadhaar, not a nickname.",
        },
      },
      {
        id: "aadhaar",
        label: { en: "Aadhaar number", hi: "आधार नंबर", kn: "Aadhaar number" },
        correct: "123456789012",
        mistakeHint: {
          en: "Aadhaar must be 12 digits with no spaces or dashes.",
          hi: "आधार 12 अंकों का हो, space या dash नहीं।",
          kn: "Aadhaar must be 12 digits with no spaces or dashes.",
        },
      },
    ],
  },
  {
    id: "service-finder-practice",
    title: {
      en: "Practice: find the right service",
      hi: "अभ्यास: सही सेवा खोजें",
      kn: "Practice: find the right service",
    },
    prompt: {
      en: "You need proof of yearly income for a college scholarship.",
      hi: "कॉलेज छात्रवृत्ति के लिए वार्षिक आय का प्रमाण चाहिए।",
      kn: "You need proof of yearly income for a college scholarship.",
    },
    correctServiceId: "income-certificate",
    mistakeHint: {
      en: "Scholarships usually need an income certificate, not a birth certificate.",
      hi: "छात्रवृत्ति के लिए आमतौर पर आय प्रमाण पत्र चाहिए, जन्म प्रमाण पत्र नहीं।",
      kn: "Scholarships usually need an income certificate, not a birth certificate.",
    },
  },
];
