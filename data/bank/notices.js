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
  {
    id: "emi-debit-notice",
    title: {
      en: "Home loan EMI debit notice",
      hi: "होम लोन EMI डेबिट सूचना",
      kn: "Home loan EMI debit notice",
    },
    text: `Your home loan account HL/882144 will be debited for EMI of Rs 18,450 on 05 September 2026. Please maintain sufficient balance in account ending 9033 one day before debit.

For prepayment or EMI date change, use the loans section in net banking.`,
    fallback: {
      summary: {
        en: "EMI of Rs 18,450 will be debited on 5 September from account ending 9033.",
        hi: "Rs 18,450 की EMI 5 सितंबर को 9033 वाले खाते से काटी जाएगी।",
        kn: "EMI of Rs 18,450 will be debited on 5 September from account ending 9033.",
      },
      actions: [
        {
          en: "Keep enough balance one day before 5 September",
          hi: "5 सितंबर से एक दिन पहले पर्याप्त बैलेंस रखें",
          kn: "Keep enough balance one day before 5 September",
        },
      ],
    },
  },
  {
    id: "subsidy-credit-letter",
    title: {
      en: "LPG subsidy credit letter",
      hi: "LPG सब्सिडी क्रेडिट पत्र",
      kn: "LPG subsidy credit letter",
    },
    text: `Subsidy of Rs 79.26 for LPG refill has been credited to your Aadhaar-linked bank account on 18 August 2026.

If the amount is not visible within 2 working days, verify that your LPG ID is linked to the same account in the subsidy portal.`,
    fallback: {
      summary: {
        en: "LPG subsidy of Rs 79.26 was credited to your Aadhaar-linked account.",
        hi: "Rs 79.26 की LPG सब्सिडी आपके आधार-लिंक खाते में जमा हुई।",
        kn: "LPG subsidy of Rs 79.26 was credited to your Aadhaar-linked account.",
      },
      actions: [
        {
          en: "Check account balance after 2 working days if not visible",
          hi: "दिखाई न दे तो 2 कार्य दिवस बाद बैलेंस जांचें",
          kn: "Check account balance after 2 working days if not visible",
        },
      ],
    },
  },
];
