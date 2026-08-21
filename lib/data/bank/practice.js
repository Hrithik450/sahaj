export const BANK_PRACTICE = [
  {
    id: "upi-transfer-practice",
    title: {
      en: "Practice: send Rs 50 to family",
      hi: "अभ्यास: परिवार को Rs 50 भेजें",
      kn: "Practice: send Rs 50 to family",
    },
    steps: [
      {
        id: "amount",
        label: { en: "Amount", hi: "राशि", kn: "Amount" },
        correct: "50",
        mistakeHint: {
          en: "Double-check the amount before confirming UPI payment.",
          hi: "UPI भुगतान से पहले राशि दोबारा जांचें।",
          kn: "Double-check the amount before confirming UPI payment.",
        },
      },
      {
        id: "upi-id",
        label: { en: "UPI ID", hi: "UPI ID", kn: "UPI ID" },
        correct: "amma@oksbi",
        mistakeHint: {
          en: "Verify the UPI ID belongs to the person you intend to pay.",
          hi: "पुष्टि करें कि UPI ID सही व्यक्ति की है।",
          kn: "Verify the UPI ID belongs to the person you intend to pay.",
        },
      },
    ],
  },
  {
    id: "fraud-report-practice",
    title: {
      en: "Practice: spot a wrong transaction amount",
      hi: "अभ्यास: गलत लेनदेन राशि पहचानें",
      kn: "Practice: spot a wrong transaction amount",
    },
    prompt: {
      en: "SMS says Rs 5,000 debited but you only bought tea for Rs 50.",
      hi: "SMS में Rs 5,000 debit दिख रहा है, जबकि chai केवल Rs 50 की थी।",
      kn: "SMS says Rs 5,000 debited but you only bought tea for Rs 50.",
    },
    correctAction: {
      en: "Report the transaction immediately and block UPI.",
      hi: "तुरंत लेनदेन की रिपोर्ट करें और UPI ब्लॉक करें।",
      kn: "Report the transaction immediately and block UPI.",
    },
    mistakeHint: {
      en: "Large unexpected debits should be reported right away, not ignored.",
      hi: "अप्रत्याशित बड़े debit को नजरअंदाज न करें, तुरंत रिपोर्ट करें।",
      kn: "Large unexpected debits should be reported right away, not ignored.",
    },
  },
];
