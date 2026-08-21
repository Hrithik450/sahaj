export const GOV_FORMS = [
  {
    id: "income-certificate",
    title: {
      en: "Apply for income certificate",
      hi: "आय प्रमाण पत्र के लिए आवेदन",
      kn: "ಆದಾಯ ಪ್ರಮಾಣಪತ್ರಕ್ಕಾಗಿ ಅರ್ಜಿ",
    },
    steps: [
      {
        id: "full-name",
        label: {
          en: "Your full name",
          hi: "आपका पूरा नाम",
          kn: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರು",
        },
        help: {
          en: "Write your name exactly as it appears on Aadhaar.",
          hi: "नाम वैसा ही लिखें जैसा आधार पर है।",
          kn: "ಆಧಾರ್‌ನಲ್ಲಿರುವಂತೆ ನಿಮ್ಮ ಹೆಸರನ್ನು ನಿಖರವಾಗಿ ಬರೆಯಿರಿ.",
        },
        type: "text",
        required: true,
      },
      {
        id: "aadhaar",
        label: {
          en: "Aadhaar number",
          hi: "आधार नंबर",
          kn: "ಆಧಾರ್ ಸಂಖ್ಯೆ",
        },
        help: {
          en: "Enter the 12-digit number without spaces.",
          hi: "12 अंकों का नंबर बिना space के दर्ज करें।",
          kn: "12 ಅಂಕಿಗಳ ಸಂಖ್ಯೆಯನ್ನು ಖಾಲಿ ಜಾಗ ಇಲ್ಲದೆ ನಮೂದಿಸಿ.",
        },
        type: "text",
        required: true,
      },
      {
        id: "annual-income",
        label: {
          en: "Annual income (in rupees)",
          hi: "वार्षिक आय (रुपये में)",
          kn: "ವಾರ್ಷಿಕ ಆದಾಯ (ರೂಪಾಯಿಗಳಲ್ಲಿ)",
        },
        help: {
          en: "Enter your total yearly income before tax.",
          hi: "कर से पहले की कुल वार्षिक आय दर्ज करें।",
          kn: "ತೆರಿಗೆಗೂ ಮೊದಲಿನ ನಿಮ್ಮ ಒಟ್ಟು ವಾರ್ಷಿಕ ಆದಾಯವನ್ನು ನಮೂದಿಸಿ.",
        },
        type: "number",
        required: true,
      },
    ],
  },
  {
    id: "birth-certificate",
    title: {
      en: "Apply for birth certificate",
      hi: "जन्म प्रमाण पत्र के लिए आवेदन",
      kn: "ಜನ್ಮ ಪ್ರಮಾಣಪತ್ರಕ್ಕಾಗಿ ಅರ್ಜಿ",
    },
    steps: [
      {
        id: "child-name",
        label: {
          en: "Child's full name",
          hi: "बच्चे का पूरा नाम",
          kn: "ಮಗುವಿನ ಪೂರ್ಣ ಹೆಸರು",
        },
        help: {
          en: "Use the name given at birth registration.",
          hi: "जन्म पंजीकरण में दिया गया नाम उपयोग करें।",
          kn: "ಜನ್ಮ ನೋಂದಣಿಯಲ್ಲಿ ನೀಡಿದ ಹೆಸರನ್ನು ಬಳಸಿ.",
        },
        type: "text",
        required: true,
      },
      {
        id: "date-of-birth",
        label: {
          en: "Date of birth",
          hi: "जन्म तिथि",
          kn: "ಜನ್ಮ ದಿನಾಂಕ",
        },
        help: {
          en: "Format: DD/MM/YYYY",
          hi: "प्रारूप: DD/MM/YYYY",
          kn: "ಸ್ವರೂಪ: DD/MM/YYYY",
        },
        type: "text",
        required: true,
      },
    ],
  },
];
