export const BANK_NOTICES = [
  {
    id: "kyc-update-letter",
    title: {
      en: "KYC update required",
      hi: "KYC अपडेट आवश्यक",
      kn: "KYC ನವೀಕರಣ ಅಗತ್ಯ",
    },
    text: `Dear Customer,

Periodic KYC for your savings account ending 4821 is due. Visit any branch with Aadhaar and PAN by 10 September 2026 to avoid temporary debit restrictions.

You may also complete video KYC through the bank mobile app under Profile > Update KYC.`,
    fallback: {
      summary: {
        en: "Your bank KYC is due. Update it by 10 September to avoid account restrictions.",
        hi: "आपका बैंक KYC देय है। खाता प्रतिबंध से बचने के लिए 10 सितंबर तक अपडेट करें।",
        kn: "ನಿಮ್ಮ ಬ್ಯಾಂಕ್ KYC ಬಾಕಿ ಇದೆ. ಖಾತೆ ನಿರ್ಬಂಧ ತಪ್ಪಿಸಲು 10 ಸೆಪ್ಟೆಂಬರ್ ಮೊದಲು ನವೀಕರಿಸಿ.",
      },
      actions: [
        {
          en: "Complete video KYC in the mobile app",
          hi: "मोबाइल ऐप में वीडियो KYC पूरा करें",
          kn: "ಮೊಬೈಲ್ ಅಪ್ಲಿಕೇಶನ್‌ನಲ್ಲಿ ವೀಡಿಯೋ KYC ಪೂರ್ಣಗೊಳಿಸಿ",
        },
        {
          en: "Or visit branch with Aadhaar and PAN",
          hi: "या आधार और PAN के साथ शाखा में जाएं",
          kn: "ಅಥವಾ ಆಧಾರ್ ಮತ್ತು PAN ಒಯ್ದು ಶಾಖೆಗೆ ಭೇಟಿ ನೀಡಿ",
        },
      ],
    },
  },
];
