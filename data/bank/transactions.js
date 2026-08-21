export const BANK_TRANSACTIONS = [
  {
    id: "upi-debit-success",
    title: {
      en: "UPI payment successful",
      hi: "UPI भुगतान सफल",
      kn: "UPI payment successful",
    },
    text: "Rs 250.00 debited from A/c **9033 on 20-Aug-26. UPI/4829108821/Paid to FreshMart. Bal: Rs 12,440.18",
    fallback: {
      summary: {
        en: "Rs 250 was sent from your account ending 9033 to FreshMart via UPI.",
        hi: "9033 वाले खाते से FreshMart को UPI से Rs 250 भेजे गए।",
        kn: "Rs 250 was sent from your account ending 9033 to FreshMart via UPI.",
      },
      checks: [
        {
          en: "If you recognize FreshMart, no action is needed.",
          hi: "अगर FreshMart पहचानते हैं तो कोई कार्रवाई नहीं।",
          kn: "If you recognize FreshMart, no action is needed.",
        },
        {
          en: "If not you, block UPI and call bank fraud helpline immediately.",
          hi: "अगर आपने नहीं किया, UPI ब्लॉक करें और fraud helpline पर कॉल करें।",
          kn: "If not you, block UPI and call bank fraud helpline immediately.",
        },
      ],
    },
  },
  {
    id: "nach-debit",
    title: {
      en: "Auto-debit (NACH) alert",
      hi: "ऑटो-डेबिट (NACH) अलर्ट",
      kn: "Auto-debit (NACH) alert",
    },
    text: "NACH debit of Rs 599.00 scheduled on 22-Aug-26 for OTTPLUS Subscription from A/c **9033. Maintain balance to avoid bounce charges.",
    fallback: {
      summary: {
        en: "Rs 599 will be auto-debited on 22 August for an OTT subscription.",
        hi: "22 अगस्त को OTT subscription के लिए Rs 599 auto-debit होंगे।",
        kn: "Rs 599 will be auto-debited on 22 August for an OTT subscription.",
      },
      checks: [
        {
          en: "Cancel the subscription in the app if you no longer want it.",
          hi: "अगर नहीं चाहिए तो ऐप में subscription रद्द करें।",
          kn: "Cancel the subscription in the app if you no longer want it.",
        },
      ],
    },
  },
  {
    id: "salary-credit",
    title: {
      en: "Salary credit alert",
      hi: "वेतन जमा अलर्ट",
      kn: "Salary credit alert",
    },
    text: "INR 42,500.00 credited to A/c **9033 on 20-Aug-26. Info: SALARY AUG/ACME TECH. Avl Bal INR 54,940.18",
    fallback: {
      summary: {
        en: "Salary of Rs 42,500 from ACME TECH was credited to account ending 9033.",
        hi: "ACME TECH से Rs 42,500 वेतन 9033 खाते में जमा हुआ।",
        kn: "Salary of Rs 42,500 from ACME TECH was credited to account ending 9033.",
      },
      checks: [
        {
          en: "Verify amount matches your payslip.",
          hi: "राशि payslip से मेल खाती है या जांचें।",
          kn: "Verify amount matches your payslip.",
        },
      ],
    },
  },
];
