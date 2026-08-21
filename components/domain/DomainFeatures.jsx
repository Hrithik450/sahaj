"use client";

import { CompanionChat } from "@/components/shared/CompanionChat";
import { PracticeRunner } from "@/components/shared/PracticeRunner";
import { Simplifier } from "@/components/shared/Simplifier";
import { StepWizard } from "@/components/shared/StepWizard";
import { ServiceFinder } from "@/components/shared/ServiceFinder";
import { TransactionExplainer } from "@/components/shared/TransactionExplainer";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { FeatureSection } from "@/components/domain/FeatureSection";
import { BANK_NOTICES } from "@/lib/data/bank/notices";
import { BANK_PRACTICE } from "@/lib/data/bank/practice";
import { BANK_TASKS } from "@/lib/data/bank/tasks";
import { GOV_FORMS } from "@/lib/data/gov/forms";
import { GOV_NOTICES } from "@/lib/data/gov/notices";
import { GOV_PRACTICE } from "@/lib/data/gov/practice";
import { pickLang } from "@/lib/i18n";

const DOMAIN = {
  government: {
    domainLabel: {
      en: "Government service",
      hi: "सरकारी सेवा",
      kn: "ಸರ್ಕಾರಿ ಸೇವೆ",
    },
    features: {
      simplify: {
        title: {
          en: "Document Simplifier",
          hi: "दस्तावेज़ सरलीकरण",
          kn: "ದಾಖಲೆ ಸರಳೀಕರಣ",
        },
        description: {
          en: "Paste a notice or letter and get a plain-language summary with clear next steps.",
          hi: "कोई नोटिस या पत्र चिपकाएं और स्पष्ट अगले कदमों के साथ सरल भाषा में सारांश पाएं।",
          kn: "ಸೂಚನೆ ಅಥವಾ ಪತ್ರ ಅಂಟಿಸಿ ಸ್ಪಷ್ಟ ಮುಂದಿನ ಹಂತಗಳೊಂದಿಗೆ ಸರಳ ಭಾಷೆಯ ಸಾರಾಂಶ ಪಡೆಯಿರಿ.",
        },
      },
      form: {
        title: { en: "Guided Form", hi: "मार्गदर्शित फॉर्म", kn: "ಮಾರ್ಗದರ್ಶಿತ ಫಾರ್ಮ್" },
        description: {
          en: "Complete government forms one field at a time with voice prompts and simple help.",
          hi: "आवाज़ संकेत और सरल सहायता के साथ सरकारी फॉर्म एक-एक फ़ील्ड भरें।",
          kn: "ಧ್ವನಿ ಸೂಚನೆ ಮತ್ತು ಸರಳ ಸಹಾಯದೊಂದಿಗೆ ಸರ್ಕಾರಿ ಫಾರ್ಮ್‌ಗಳನ್ನು ಒಂದೊಂದು ಫೀಲ್ಡ್‌ನಲ್ಲಿ ಪೂರ್ಣಗೊಳಿಸಿ.",
        },
      },
      finder: {
        title: { en: "Service Finder", hi: "सेवा खोज", kn: "ಸೇವೆ ಹುಡುಕಾಟ" },
        description: {
          en: "Describe what you need and find the right service, documents, and where to go next.",
          hi: "अपनी जरूरत बताएं और सही सेवा, दस्तावेज़ और अगला कदम खोजें।",
          kn: "ನಿಮಗೆ ಬೇಕಾದದ್ದನ್ನು ವಿವರಿಸಿ ಸರಿಯಾದ ಸೇವೆ, ದಾಖಲೆಗಳು ಮತ್ತು ಮುಂದಿನ ಹಂತವನ್ನು ಹುಡುಕಿ.",
        },
      },
      companion: {
        title: { en: "Voice Companion", hi: "आवाज़ साथी", kn: "ಧ್ವನಿ ಸಂಗಾತಿ" },
        description: {
          en: "Ask questions in plain language and get short, actionable answers with captions.",
          hi: "सरल भाषा में सवाल पूछें और कैप्शन के साथ छोटे, उपयोगी जवाब पाएं।",
          kn: "ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಪ್ರಶ್ನೆಗಳನ್ನು ಕೇಳಿ ಮತ್ತು ಶೀರ್ಷಿಕೆಗಳೊಂದಿಗೆ ಚಿಕ್ಕ, ಉಪಯುಕ್ತ ಉತ್ತರಗಳನ್ನು ಪಡೆಯಿರಿ.",
        },
      },
      practice: {
        title: { en: "Practice Mode", hi: "अभ्यास मोड", kn: "ಅಭ್ಯಾಸ ವಿಧಾನ" },
        description: {
          en: "Try a simulated form or task safely, learn from mistakes, and build confidence.",
          hi: "सुरक्षित रूप से अभ्यास करें, गलतियों से सीखें और आत्मविश्वास बढ़ाएं।",
          kn: "ಸಿಮ್ಯುಲೇಟೆಡ್ ಫಾರ್ಮ್ ಅಥವಾ ಕೆಲಸವನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಪ್ರಯತ್ನಿಸಿ, ತಪ್ಪುಗಳಿಂದ ಕಲಿಯಿರಿ ಮತ್ತು ವಿಶ್ವಾಸ ಹೆಚ್ಚಿಸಿ.",
        },
      },
    },
  },
  banking: {
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
  },
};

function FeatureBody({ feature, domain }) {
  if (feature.id === "simplify") {
    return (
      <Simplifier
        domain={domain}
        samples={domain === "bank" ? BANK_NOTICES : GOV_NOTICES}
      />
    );
  }

  if (feature.id === "form") {
    return <StepWizard templates={GOV_FORMS} />;
  }

  if (feature.id === "task") {
    return <StepWizard templates={BANK_TASKS} />;
  }

  if (feature.id === "finder" && domain === "gov") {
    return <ServiceFinder />;
  }

  if (feature.id === "transaction" && domain === "bank") {
    return <TransactionExplainer />;
  }

  if (feature.id === "companion") {
    return <CompanionChat domain={domain} />;
  }

  if (feature.id === "practice") {
    return (
      <PracticeRunner
        scenarios={domain === "bank" ? BANK_PRACTICE : GOV_PRACTICE}
      />
    );
  }

  return null;
}

export function DomainFeatures({ features, domain, domainKey }) {
  const { prefs } = useAccessability();
  const language = prefs.language;
  const copy = DOMAIN[domainKey];

  return (
    <>
      {features.map((feature) => {
        const featureCopy = copy.features[feature.id] || {};
        return (
          <FeatureSection
            key={feature.id}
            id={feature.id}
            title={pickLang(featureCopy.title, language) || feature.title}
            description={
              pickLang(featureCopy.description, language) || feature.description
            }
            domainLabel={pickLang(copy.domainLabel, language)}
          >
            <FeatureBody feature={feature} domain={domain} />
          </FeatureSection>
        );
      })}
    </>
  );
}
