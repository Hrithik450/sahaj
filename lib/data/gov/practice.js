export const GOV_PRACTICE = [
  {
    id: "income-form-practice",
    title: {
      en: "Practice: income certificate form",
      hi: "अभ्यास: आय प्रमाण पत्र फॉर्म",
      kn: "ಅಭ್ಯಾಸ: ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಫಾರ್ಮ್",
    },
    steps: [
      {
        id: "full-name",
        label: { en: "Full name", hi: "पूरा नाम", kn: "ಪೂರ್ಣ ಹೆಸರು" },
        correct: "Ananya Sharma",
        mistakeHint: {
          en: "Use the name exactly as on Aadhaar, not a nickname.",
          hi: "उपनाम नहीं, आधार जैसा नाम उपयोग करें।",
          kn: "ಆಧಾರ್‌ನಲ್ಲಿರುವ ಹೆಸರನ್ನು ನಿಖರವಾಗಿ ಬರೆಯಿರಿ, ಉಪನಾಮ ಅಲ್ಲ.",
        },
      },
      {
        id: "aadhaar",
        label: { en: "Aadhaar number", hi: "आधार नंबर", kn: "ಆಧಾರ್ ಸಂಖ್ಯೆ" },
        correct: "123456789012",
        mistakeHint: {
          en: "Aadhaar must be 12 digits with no spaces or dashes.",
          hi: "आधार 12 अंकों का हो, space या dash नहीं।",
          kn: "ಆಧಾರ್ 12 ಅಂಕಿಗಳಾಗಿರಬೇಕು, ಖಾಲಿ ಜಾಗ ಅಥವಾ dash ಇಲ್ಲದೆ.",
        },
      },
    ],
  },
  {
    id: "service-finder-practice",
    title: {
      en: "Practice: find the right service",
      hi: "अभ्यास: सही सेवा खोजें",
      kn: "ಅಭ್ಯಾಸ: ಸರಿಯಾದ ಸೇವೆ ಹುಡುಕಿ",
    },
    prompt: {
      en: "You need proof of yearly income for a college scholarship.",
      hi: "कॉलेज छात्रवृत्ति के लिए वार्षिक आय का प्रमाण चाहिए।",
      kn: "ಕಾಲೇಜು ವಿದ್ಯಾರ್ಥಿವೇತನಕ್ಕಾಗಿ ವಾರ್ಷಿಕ ಆದಾಯದ ಪ್ರಮಾಣ ಬೇಕು.",
    },
    correctServiceId: "income-certificate",
    mistakeHint: {
      en: "Scholarships usually need an income certificate, not a birth certificate.",
      hi: "छात्रवृत्ति के लिए आमतौर पर आय प्रमाण पत्र चाहिए, जन्म प्रमाण पत्र नहीं।",
      kn: "ವಿದ್ಯಾರ್ಥಿವೇತನಗಳಿಗೆ ಸಾಮಾನ್ಯವಾಗಿ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಬೇಕು, ಜನ್ಮ ಪ್ರಮಾಣಪತ್ರ ಅಲ್ಲ.",
    },
  },
];
