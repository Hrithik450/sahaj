"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useAccessability } from "@/components/accessability/AccessabilityProvider";
import { isSimplifyGateLogin } from "@/lib/routes";
import {
  playSignInRequiredIntro,
  speakSarvam,
  unlockVoice,
} from "@/lib/tts/voice";
import { pickLang } from "@/lib/utils";

const LOGIN_UI = {
  featureLabel: {
    en: "Sign in to continue",
    hi: "जारी रखने के लिए साइन इन करें",
    kn: "ಮುಂದುವರಿಸಲು ಸೈನ್ ಇನ್ ಮಾಡಿ",
  },
  optionalLabel: {
    en: "Optional sign in",
    hi: "वैकल्पिक साइन इन",
    kn: "ಐಚ್ಛಿಕ ಸೈನ್ ಇನ್",
  },
  featureTitle: {
    en: "One step to open tools",
    hi: "सुविधाएँ खोलने के लिए एक कदम",
    kn: "ಸಾಧನಗಳನ್ನು ತೆರೆಯಲು ಒಂದು ಹಂತ",
  },
  optionalTitle: {
    en: "Save your setup",
    hi: "अपनी सेटिंग सहेजें",
    kn: "ನಿಮ್ಮ ಸೆಟಪ್ ಉಳಿಸಿ",
  },
  featureBody: {
    en: "Sign in with Google to simplify your first notice. After that, we'll bring you right back to Document Simplifier on the Government page.",
    hi: "अपना पहला नोटिस सरल करने के लिए Google से साइन इन करें। उसके बाद हम आपको सरकार पृष्ठ पर दस्तावेज़ सरलीकरण में वापस ले जाएंगे।",
    kn: "ನಿಮ್ಮ ಮೊದಲ ಸೂಚನೆಯನ್ನು ಸರಳಗೊಳಿಸಲು Google ನೊಂದಿಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ. ನಂತರ ನಾವು ನಿಮ್ಮನ್ನು ಸರ್ಕಾರ ಪುಟದ ದಾಖಲೆ ಸರಳೀಕರಣಕ್ಕೆ ಮರಳಿ ಕರೆದೊಯ್ಯುತ್ತೇವೆ.",
  },
  optionalBody: {
    en: "Sahaj works without an account. Sign in with Google to sync your accessibility preferences across devices when you are ready.",
    hi: "सहज बिना खाते के काम करता है। तैयार होने पर Google से साइन इन करें और अपनी सुलभता सेटिंग सभी डिवाइस पर सिंक करें।",
    kn: "ಸಹಜ ಖಾತೆ ಇಲ್ಲದೆಯೂ ಕೆಲಸ ಮಾಡುತ್ತದೆ. ಸಿದ್ಧವಾದಾಗ Google ನೊಂದಿಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ ಸುಲಭತೆ ಸೆಟಪ್ ಎಲ್ಲಾ ಡಿವೈಸ್‌ಗಳಲ್ಲಿ ಸಿಂಕ್ ಮಾಡಿ.",
  },
  optionalFootnote: {
    en: "Guest mode stays available. Your current setup is saved on this device even if you skip sign in.",
    hi: "अतिथि मोड उपलब्ध रहता है। साइन इन छोड़ने पर भी आपकी सेटिंग इस डिवाइस पर सहेजी रहती है।",
    kn: "ಅತಿಥಿ ಮೋಡ್ ಲಭ್ಯವಿದೆ. ಸೈನ್ ಇನ್ ಬಿಟ್ಟರೂ ನಿಮ್ಮ ಸೆಟಪ್ ಈ ಡಿವೈಸ್‌ನಲ್ಲಿ ಉಳಿಯುತ್ತದೆ.",
  },
  continueGoogle: {
    en: "Continue with Google",
    hi: "Google से जारी रखें",
    kn: "Google ನೊಂದಿಗೆ ಮುಂದುವರಿಯಿರಿ",
  },
  optionalVoice: {
    en: "You can keep using Sahaj without signing in. If you want your accessibility choices saved across devices, sign in with Google below  it only takes a moment.",
    hi: "बिना साइन इन के भी सहज इस्तेमाल कर सकते हैं। अगर आपकी सुलभता सेटिंग सभी डिवाइस पर सहेजना है, तो नीचे Google से साइन इन करें  बस एक पल लगेगा।",
    kn: "ಸೈನ್ ಇನ್ ಇಲ್ಲದೆಯೂ ಸಹಜ ಬಳಸಬಹುದು. ನಿಮ್ಮ ಸುಲಭತೆ ಆಯ್ಕೆಗಳನ್ನು ಎಲ್ಲಾ ಡಿವೈಸ್‌ಗಳಲ್ಲಿ ಉಳಿಸಬೇಕಾದರೆ, ಕೆಳಗೆ Google ನೊಂದಿಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ  ಒಂದು ಕ್ಷಣ ತೆಗೆದುಕೊಳ್ಳುತ್ತದೆ.",
  },
  pageTitleFeature: {
    en: "Sign in to continue",
    hi: "जारी रखने के लिए साइन इन",
    kn: "ಮುಂದುವರಿಸಲು ಸೈನ್ ಇನ್",
  },
  pageTitleOptional: {
    en: "Sign in",
    hi: "साइन इन",
    kn: "ಸೈನ್ ಇನ್",
  },
};

export function LoginCard() {
  const searchParams = useSearchParams();
  const { prefs } = useAccessability();
  const language = prefs.language;
  const fromSimplifyGate = isSimplifyGateLogin(searchParams);
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    const title = pickLang(
      fromSimplifyGate ? LOGIN_UI.pageTitleFeature : LOGIN_UI.pageTitleOptional,
      language,
    );
    document.title = `${title} · Sahaj`;
  }, [fromSimplifyGate, language]);

  useEffect(() => {
    if (fromSimplifyGate) {
      unlockVoice();
      void playSignInRequiredIntro(language);
      return;
    }

    if (!prefs.voiceEnabled) return;
    void speakSarvam(pickLang(LOGIN_UI.optionalVoice, language), { language });
  }, [fromSimplifyGate, prefs.voiceEnabled, language]);

  return (
    <div className="ink-card p-8 sm:p-10">
      <p className="caption text-xs font-semibold uppercase tracking-widest">
        {pickLang(
          fromSimplifyGate ? LOGIN_UI.featureLabel : LOGIN_UI.optionalLabel,
          language,
        )}
      </p>
      <h1 className="landing-strong mt-2 text-[clamp(1.75rem,4vw,2.25rem)]">
        {pickLang(
          fromSimplifyGate ? LOGIN_UI.featureTitle : LOGIN_UI.optionalTitle,
          language,
        )}
      </h1>
      <p className="caption mt-3 text-sm leading-relaxed sm:text-base">
        {pickLang(
          fromSimplifyGate ? LOGIN_UI.featureBody : LOGIN_UI.optionalBody,
          language,
        )}
      </p>

      <button
        type="button"
        onClick={() => {
          unlockVoice();
          signIn("google", { callbackUrl });
        }}
        className="btn-ink mt-8 w-full px-6 py-3 text-sm text-white sm:w-auto"
        style={{ backgroundColor: "var(--blue)" }}
      >
        {pickLang(LOGIN_UI.continueGoogle, language)}
      </button>

      {!fromSimplifyGate && (
        <p className="caption mt-4 text-xs leading-relaxed text-[var(--muted)]">
          {pickLang(LOGIN_UI.optionalFootnote, language)}
        </p>
      )}
    </div>
  );
}
