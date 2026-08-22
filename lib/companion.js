import { GOV_SERVICES } from "@/lib/data/gov/services";
import { matchGovServices } from "@/lib/finder";
import { pickLang } from "@/lib/i18n";
import { COMPANION_PROMPTS } from "@/lib/data/companion-prompts";

const BANK_RESPONSES = [
  {
    keywords: ["kyc", "pan", "aadhaar", "verify", "update"],
    reply: {
      en: "KYC means the bank checks who you are.\n\n• Keep Aadhaar and PAN ready.\n• Update through the bank app or branch.\n• Never share OTP or PIN with anyone calling you.",
      hi: "KYC का मतलब है बैंक आपकी पहचान जांचता है।\n\n• आधार और PAN तैयार रखें।\n• बैंक ऐप या शाखा से अपडेट करें।\n• OTP या PIN किसी को न दें।",
      kn: "KYC means the bank checks who you are.\n\n• Keep Aadhaar and PAN ready.\n• Update through the bank app or branch.\n• Never share OTP or PIN with anyone calling you.",
    },
  },
  {
    keywords: [
      "fraud",
      "scam",
      "unknown",
      "unauthorized",
      "stolen",
      "phishing",
    ],
    reply: {
      en: "If money moved without your permission:\n\n• Call the bank fraud helpline immediately.\n• Block UPI/cards in the app.\n• Note the SMS time and amount.\n• File a complaint at the branch if needed.",
      hi: "अगर बिना अनुमति पैसे गए:\n\n• तुरंत bank fraud helpline पर कॉल करें।\n• ऐप में UPI/कार्ड ब्लॉक करें।\n• SMS का समय और राशि लिख लें।\n• जरूरत हो तो शाखा में शिकायत दर्ज करें।",
      kn: "If money moved without your permission:\n\n• Call the bank fraud helpline immediately.\n• Block UPI/cards in the app.\n• Note the SMS time and amount.\n• File a complaint at the branch if needed.",
    },
  },
  {
    keywords: ["upi", "debit", "paid", "transfer", "sms", "transaction"],
    reply: {
      en: "For a UPI debit SMS:\n\n• Check if you recognize the shop or person name.\n• Open your bank app and match the amount and date.\n• If you did not pay, block UPI and call the bank.",
      hi: "UPI debit SMS के लिए:\n\n• दुकान या व्यक्ति का नाम पहचानें।\n• बैंक ऐप में राशि और तारीख मिलाएं।\n• अगर आपने भुगतान नहीं किया, UPI ब्लॉक करें और बैंक को कॉल करें।",
      kn: "For a UPI debit SMS:\n\n• Check if you recognize the shop or person name.\n• Open your bank app and match the amount and date.\n• If you did not pay, block UPI and call the bank.",
    },
  },
  {
    keywords: ["emi", "loan", "interest", "due", "bounce"],
    reply: {
      en: "For loan or EMI alerts:\n\n• Check the due date and amount in the SMS.\n• Keep enough balance one day before the debit.\n• Contact the bank if the amount looks wrong.",
      hi: "Loan या EMI alert के लिए:\n\n• SMS में due date और राशि देखें।\n• debit से एक दिन पहले balance रखें।\n• राशि गलत लगे तो बैंक से संपर्क करें।",
      kn: "For loan or EMI alerts:\n\n• Check the due date and amount in the SMS.\n• Keep enough balance one day before the debit.\n• Contact the bank if the amount looks wrong.",
    },
  },
  {
    keywords: ["block", "card", "atm", "pin"],
    reply: {
      en: "To block a card:\n\n• Open your bank app → Cards → Block.\n• Or call the 24x7 helpline on your passbook or website.\n• Request a new card if it was lost or stolen.",
      hi: "कार्ड ब्लॉक करने के लिए:\n\n• बैंक ऐप → Cards → Block खोलें।\n• या passbook/website पर 24x7 helpline पर कॉल करें।\n• खो या चोरी हो तो नया कार्ड मांगें।",
      kn: "To block a card:\n\n• Open your bank app → Cards → Block.\n• Or call the 24x7 helpline on your passbook or website.\n• Request a new card if it was lost or stolen.",
    },
  },
];

const DEFAULT_REPLIES = {
  gov: {
    en: "I can help with government services like birth certificate, income certificate, ration card, or property tax.\n\nTry asking: “What documents for income certificate?” or use Service Finder above.",
    hi: "मैं birth certificate, income certificate, ration card या property tax में मदद कर सकता हूं।\n\nपूछें: “income certificate के लिए कौन से documents?” या ऊपर Service Finder use करें।",
    kn: "I can help with government services like birth certificate, income certificate, ration card, or property tax.\n\nTry asking: “What documents for income certificate?” or use Service Finder above.",
  },
  bank: {
    en: "I can help with KYC, UPI alerts, fraud, EMI, or blocking a card.\n\nTry asking: “I got an unknown UPI debit” or “How do I report fraud?”",
    hi: "मैं KYC, UPI alert, fraud, EMI या card block में मदद कर सकता हूं।\n\nपूछें: “unknown UPI debit आया” या “fraud report कैसे करें?”",
    kn: "I can help with KYC, UPI alerts, fraud, EMI, or blocking a card.\n\nTry asking: “I got an unknown UPI debit” or “How do I report fraud?”",
  },
};

export { COMPANION_PROMPTS };

function matchBankResponse(message, language) {
  const normalized = message.toLowerCase();

  for (const item of BANK_RESPONSES) {
    if (item.keywords.some((keyword) => normalized.includes(keyword))) {
      return pickLang(item.reply, language);
    }
  }

  return null;
}

export function findCompanionFallback(message, domain, language = "en") {
  const trimmed = message.trim();
  if (!trimmed) {
    return pickLang(
      DEFAULT_REPLIES[domain === "bank" ? "bank" : "gov"],
      language,
    );
  }

  if (domain === "gov") {
    const matches = matchGovServices(trimmed, GOV_SERVICES);
    if (matches.length > 0) {
      const service = matches[0];
      return [
        pickLang(service.title, language),
        pickLang(service.summary, language),
        `Next step: ${pickLang(service.nextStep, language)}`,
      ].join("\n\n");
    }
  }

  if (domain === "bank") {
    const bankReply = matchBankResponse(trimmed, language);
    if (bankReply) return bankReply;
  }

  return pickLang(
    DEFAULT_REPLIES[domain === "bank" ? "bank" : "gov"],
    language,
  );
}
