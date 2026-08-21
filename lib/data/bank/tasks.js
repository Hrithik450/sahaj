export const BANK_TASKS = [
  {
    id: "report-fraud",
    title: {
      en: "Report unauthorized transaction",
      hi: "अनधिकृत लेनदेन की रिपोर्ट",
      kn: "ಅನಧಿಕೃತ ವಹಿವಾಟನ್ನು ವರದಿ ಮಾಡಿ",
    },
    steps: [
      {
        id: "account-last-four",
        label: {
          en: "Last 4 digits of account",
          hi: "खाते के अंतिम 4 अंक",
          kn: "ಖಾತೆಯ ಕೊನೆಯ 4 ಅಂಕಿಗಳು",
        },
        help: {
          en: "Find this on your passbook or mobile banking home screen.",
          hi: "यह पासबुक या mobile banking home screen पर मिलेगा।",
          kn: "ಇದು ಪಾಸ್‌ಬುಕ್ ಅಥವಾ mobile banking home screen ನಲ್ಲಿ ಸಿಗುತ್ತದೆ.",
        },
        type: "text",
        required: true,
      },
      {
        id: "transaction-amount",
        label: {
          en: "Disputed amount (Rs)",
          hi: "विवादित राशि (रु.)",
          kn: "ವಿವಾದಿತ ಮೊತ್ತ (ರೂ.)",
        },
        help: {
          en: "Enter the exact amount shown in the SMS alert.",
          hi: "SMS alert में दिखी सटीक राशि दर्ज करें।",
          kn: "SMS alert ನಲ್ಲಿ ತೋರಿಸಿದ ನಿಖರ ಮೊತ್ತವನ್ನು ನಮೂದಿಸಿ.",
        },
        type: "number",
        required: true,
      },
    ],
  },
  {
    id: "savings-kyc",
    title: {
      en: "Update savings account KYC",
      hi: "बचत खाता KYC अपडेट",
      kn: "ಉಳಿತಾಯ ಖಾತೆ KYC ಅಪ್‌ಡೇಟ್",
    },
    steps: [
      {
        id: "pan",
        label: {
          en: "PAN number",
          hi: "PAN नंबर",
          kn: "PAN ಸಂಖ್ಯೆ",
        },
        help: {
          en: "10-character PAN in uppercase letters and numbers.",
          hi: "10 अक्षरों का PAN, बड़े अक्षर और संख्या।",
          kn: "10 ಅಕ್ಷರಗಳ PAN, ದೊಡ್ಡ ಅಕ್ಷರಗಳು ಮತ್ತು ಸಂಖ್ಯೆಗಳು.",
        },
        type: "text",
        required: true,
      },
    ],
  },
];
