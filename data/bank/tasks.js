export const BANK_TASKS = [
  {
    id: "report-fraud",
    title: {
      en: "Report unauthorized transaction",
      hi: "अनधिकृत लेनदेन की रिपोर्ट",
      kn: "Report unauthorized transaction",
    },
    steps: [
      {
        id: "account-last-four",
        label: {
          en: "Last 4 digits of account",
          hi: "खाते के अंतिम 4 अंक",
          kn: "Last 4 digits of account",
        },
        help: {
          en: "Find this on your passbook or mobile banking home screen.",
          hi: "यह पासबुक या mobile banking home screen पर मिलेगा।",
          kn: "Find this on your passbook or mobile banking home screen.",
        },
        type: "text",
        required: true,
      },
      {
        id: "transaction-amount",
        label: {
          en: "Disputed amount (Rs)",
          hi: "विवादित राशि (रु.)",
          kn: "Disputed amount (Rs)",
        },
        help: {
          en: "Enter the exact amount shown in the SMS alert.",
          hi: "SMS alert में दिखी सटीक राशि दर्ज करें।",
          kn: "Enter the exact amount shown in the SMS alert.",
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
      kn: "Update savings account KYC",
    },
    steps: [
      {
        id: "pan",
        label: {
          en: "PAN number",
          hi: "PAN नंबर",
          kn: "PAN number",
        },
        help: {
          en: "10-character PAN in uppercase letters and numbers.",
          hi: "10 अक्षरों का PAN, बड़े अक्षर और संख्या।",
          kn: "10-character PAN in uppercase letters and numbers.",
        },
        type: "text",
        required: true,
      },
    ],
  },
];
