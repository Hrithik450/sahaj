export const BANK_PRACTICE = [
  {
    id: "upi-transfer-practice",
    title: {
      en: "Practice: send Rs 50 to family",
      hi: "अभ्यास: परिवार को Rs 50 भेजें",
      kn: "ಅಭ್ಯಾಸ: ಕುಟುಂಬಕ್ಕೆ Rs 50 ಕಳುಹಿಸಿ",
    },
    steps: [
      {
        id: "amount",
        label: { en: "Amount", hi: "राशि", kn: "ಮೊತ್ತ" },
        correct: "50",
        mistakeHint: {
          en: "Double-check the amount before confirming UPI payment.",
          hi: "UPI भुगतान से पहले राशि दोबारा जांचें।",
          kn: "UPI ಪಾವತಿ ದೃಢೀಕರಿಸುವ ಮೊದಲು ಮೊತ್ತವನ್ನು ಮತ್ತೆ ಪರಿಶೀಲಿಸಿ.",
        },
      },
      {
        id: "upi-id",
        label: { en: "UPI ID", hi: "UPI ID", kn: "UPI ID" },
        correct: "amma@oksbi",
        mistakeHint: {
          en: "Verify the UPI ID belongs to the person you intend to pay.",
          hi: "पुष्टि करें कि UPI ID सही व्यक्ति की है।",
          kn: "ನೀವು ಪಾವತಿಸಲು ಬಯಸುವ ವ್ಯಕ್ತಿಯ UPI ID ಸರಿಯಾಗಿದೆಯೇ ಎಂದು ಪರಿಶೀಲಿಸಿ.",
        },
      },
    ],
  },
  {
    id: "fraud-report-practice",
    title: {
      en: "Practice: spot a wrong transaction amount",
      hi: "अभ्यास: गलत लेनदेन राशि पहचानें",
      kn: "ಅಭ್ಯಾಸ: ತಪ್ಪಾದ ವಹಿವಾಟು ಮೊತ್ತವನ್ನು ಗುರುತಿಸಿ",
    },
    prompt: {
      en: "SMS says Rs 5,000 debited but you only bought tea for Rs 50.",
      hi: "SMS में Rs 5,000 debit दिख रहा है, जबकि chai केवल Rs 50 की थी।",
      kn: "SMS ನಲ್ಲಿ Rs 5,000 debit ಎಂದಿದೆ, ಆದರೆ ನೀವು chai ಗೆ ಕೇವಲ Rs 50 ಕೊಟ್ಟಿದ್ದೀರಿ.",
    },
    correctAction: {
      en: "Report the transaction immediately and block UPI.",
      hi: "तुरंत लेनदेन की रिपोर्ट करें और UPI ब्लॉक करें।",
      kn: "ತಕ್ಷಣ ವಹಿವಾಟನ್ನು ವರದಿ ಮಾಡಿ ಮತ್ತು UPI ಅನ್ನು ನಿರ್ಬಂಧಿಸಿ.",
    },
    mistakeHint: {
      en: "Large unexpected debits should be reported right away, not ignored.",
      hi: "अप्रत्याशित बड़े debit को नजरअंदाज न करें, तुरंत रिपोर्ट करें।",
      kn: "ಅನಿರೀಕ್ಷಿತ ದೊಡ್ಡ debit ಗಳನ್ನು ನಿರ್ಲಕ್ಷಿಸಬೇಡಿ, ತಕ್ಷಣ ವರದಿ ಮಾಡಿ.",
    },
  },
];
