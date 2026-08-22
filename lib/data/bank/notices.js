export const BANK_NOTICES = [
  {
    id: "kyc-update-letter",
    title: {
      en: "KYC update required",
      hi: "KYC अपडेट आवश्यक",
      kn: "KYC update required",
    },
    text: `Dear Customer,

Periodic KYC for your savings account ending 4821 is due. Visit any branch with Aadhaar and PAN by 10 September 2026 to avoid temporary debit restrictions.

You may also complete video KYC through the bank mobile app under Profile > Update KYC.`,
    fallback: {
      summary: {
        en: "Your bank KYC is due. Update it by 10 September to avoid account restrictions.",
        hi: "आपका बैंक KYC देय है। खाता प्रतिबंध से बचने के लिए 10 सितंबर तक अपडेट करें।",
        kn: "Your bank KYC is due. Update it by 10 September to avoid account restrictions.",
      },
      actions: [
        {
          en: "Complete video KYC in the mobile app",
          hi: "मोबाइल ऐप में वीडियो KYC पूरा करें",
          kn: "Complete video KYC in the mobile app",
        },
        {
          en: "Or visit branch with Aadhaar and PAN",
          hi: "या आधार और PAN के साथ शाखा में जाएं",
          kn: "Or visit branch with Aadhaar and PAN",
        },
      ],
    },
  },
];
