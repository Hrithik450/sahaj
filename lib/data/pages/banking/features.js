import { FEATURE_DOMAINS } from "../../landing-features.js";

export const PAGE = {
  label: { en: "Banking", hi: "बैंकिंग", kn: "ಬ್ಯಾಂಕಿಂಗ್" },
  title: {
    en: "Manage banking tasks with clarity and confidence",
    hi: "स्पष्टता और विश्वास के साथ बैंकिंग कार्य संभालें",
    kn: "ಸ್ಪಷ್ಟತೆ ಮತ್ತು ವಿಶ್ವಾಸದೊಂದಿಗೆ ಬ್ಯಾಂಕಿಂಗ್ ಕೆಲಸಗಳನ್ನು ನಿರ್ವಹಿಸಿ",
  },
  featuresNav: {
    en: "Banking features",
    hi: "बैंकिंग सुविधाएं",
    kn: "ಬ್ಯಾಂಕಿಂಗ್ ವೈಶಿಷ್ಟ್ಯಗಳು",
  },
};

export const DOMAIN = {
  domainLabel: {
    en: "Banking service",
    hi: "बैंकिंग सेवा",
    kn: "ಬ್ಯಾಂಕಿಂಗ್ ಸೇವೆ",
  },
  features: {
    simplify: {
      title: {
        en: "Document Simplifier",
        hi: "दस्तावेज़ सरलीकरण",
        kn: "ದಾಖಲೆ ಸರಳೀಕರಣ",
      },
      description: {
        en: "Understand bank letters, EMI notices, and KYC messages in simple language.",
        hi: "बैंक पत्र, EMI नोटिस और KYC संदेश सरल भाषा में समझें।",
        kn: "ಬ್ಯಾಂಕ್ ಪತ್ರಗಳು, EMI ಸೂಚನೆಗಳು ಮತ್ತು KYC ಸಂದೇಶಗಳನ್ನು ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.",
      },
    },
    task: {
      title: {
        en: "Guided Banking Task",
        hi: "मार्गदर्शित बैंकिंग कार्य",
        kn: "ಮಾರ್ಗದರ್ಶಿತ ಬ್ಯಾಂಕಿಂಗ್ ಕೆಲಸ",
      },
      description: {
        en: "Walk through banking tasks like KYC or reporting fraud with one step at a time.",
        hi: "KYC या धोखाधड़ी रिपोर्ट जैसे बैंकिंग कार्य एक-एक कदम में पूरे करें।",
        kn: "KYC ಅಥವಾ ವಂಚನೆ ವರದಿ ಮಾಡುವಂತಹ ಬ್ಯಾಂಕಿಂಗ್ ಕೆಲಸಗಳನ್ನು ಒಂದೊಂದು ಹಂತದಲ್ಲಿ ಮಾಡಿ.",
      },
    },
    transaction: {
      title: {
        en: "Transaction Explainer",
        hi: "लेनदेन व्याख्याकार",
        kn: "ವಹಿವಾಟು ವಿವರಣೆ",
      },
      description: {
        en: "Paste an SMS or transaction alert and learn what happened and what to check.",
        hi: "SMS या लेनदेन अलर्ट चिपकाएं और जानें क्या हुआ और क्या जांचें।",
        kn: "SMS ಅಥವಾ ವಹಿವಾಟು ಎಚ್ಚರಿಕೆಯನ್ನು ಅಂಟಿಸಿ ಏನಾಯಿತು ಮತ್ತು ಏನನ್ನು ಪರಿಶೀಲಿಸಬೇಕು ಎಂದು ತಿಳಿಯಿರಿ.",
      },
    },
    companion: {
      title: { en: "Voice Companion", hi: "आवाज़ साथी", kn: "ಧ್ವನಿ ಸಂಗಾತಿ" },
      description: {
        en: "Ask banking questions and get streaming help you can hear and read on screen.",
        hi: "बैंकिंग सवाल पूछें और स्क्रीन पर सुन और पढ़ सकने वाली मदद पाएं।",
        kn: "ಬ್ಯಾಂಕಿಂಗ್ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ ಮತ್ತು ಪರದೆಯಲ್ಲಿ ಕೇಳಬಹುದಾದ ಮತ್ತು ಓದಬಹುದಾದ ಸಹಾಯ ಪಡೆಯಿರಿ.",
      },
    },
    practice: {
      title: {
        en: "Safe Practice Mode",
        hi: "सुरक्षित अभ्यास मोड",
        kn: "ಸುರಕ್ಷಿತ ಅಭ್ಯಾಸ ವಿಧಾನ",
      },
      description: {
        en: "Practice a fake UPI transfer or form submit with tips when something looks wrong.",
        hi: "नकली UPI ट्रांसफर या फॉर्म सबमिट का अभ्यास करें और गलती पर सुझाव पाएं।",
        kn: "ನಕಲಿ UPI ವರ್ಗಾವಣೆ ಅಥವಾ ಫಾರ್ಮ್ ಸಲ್ಲಿಕೆಯ ಅಭ್ಯಾಸ ಮಾಡಿ ತಪ್ಪಾದಾಗ ಸಲಹೆಗಳನ್ನು ಪಡೆಯಿರಿ.",
      },
    },
  },
};

export const features = FEATURE_DOMAINS.banking.features;
