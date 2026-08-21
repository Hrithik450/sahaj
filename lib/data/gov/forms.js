export const GOV_FORMS = [
  {
    id: "income-certificate",
    title: {
      en: "Apply for income certificate",
      hi: "आय प्रमाण पत्र के लिए आवेदन",
      kn: "Apply for income certificate",
    },
    steps: [
      {
        id: "full-name",
        label: {
          en: "Your full name",
          hi: "आपका पूरा नाम",
          kn: "Your full name",
        },
        help: {
          en: "Write your name exactly as it appears on Aadhaar.",
          hi: "नाम वैसा ही लिखें जैसा आधार पर है।",
          kn: "Write your name exactly as it appears on Aadhaar.",
        },
        type: "text",
        required: true,
      },
      {
        id: "aadhaar",
        label: {
          en: "Aadhaar number",
          hi: "आधार नंबर",
          kn: "Aadhaar number",
        },
        help: {
          en: "Enter the 12-digit number without spaces.",
          hi: "12 अंकों का नंबर बिना space के दर्ज करें।",
          kn: "Enter the 12-digit number without spaces.",
        },
        type: "text",
        required: true,
      },
      {
        id: "annual-income",
        label: {
          en: "Annual income (in rupees)",
          hi: "वार्षिक आय (रुपये में)",
          kn: "Annual income (in rupees)",
        },
        help: {
          en: "Enter your total yearly income before tax.",
          hi: "कर से पहले की कुल वार्षिक आय दर्ज करें।",
          kn: "Enter your total yearly income before tax.",
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
      kn: "Apply for birth certificate",
    },
    steps: [
      {
        id: "child-name",
        label: {
          en: "Child's full name",
          hi: "बच्चे का पूरा नाम",
          kn: "Child's full name",
        },
        help: {
          en: "Use the name given at birth registration.",
          hi: "जन्म पंजीकरण में दिया गया नाम उपयोग करें।",
          kn: "Use the name given at birth registration.",
        },
        type: "text",
        required: true,
      },
      {
        id: "date-of-birth",
        label: {
          en: "Date of birth",
          hi: "जन्म तिथि",
          kn: "Date of birth",
        },
        help: {
          en: "Format: DD/MM/YYYY",
          hi: "प्रारूप: DD/MM/YYYY",
          kn: "Format: DD/MM/YYYY",
        },
        type: "text",
        required: true,
      },
    ],
  },
];
