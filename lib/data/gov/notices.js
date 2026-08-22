export const GOV_NOTICES = [
  {
    id: "income-certificate-reminder",
    title: {
      en: "Income certificate application reminder",
      hi: "आय प्रमाण पत्र आवेदन अनुस्मारक",
      kn: "ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಅರ್ಜಿ ನೆನಪು",
    },
    text: `Dear Applicant,

Your application for an Income Certificate (Ref: INC/2026/88421) is pending document upload. Please upload your Aadhaar and latest salary slip on the municipal portal before 30 August 2026.

If documents are not received, the application may be marked incomplete.

Municipal Citizen Services`,
    fallback: {
      summary: {
        en: "Your income certificate application is waiting for Aadhaar and salary slip uploads.",
        hi: "आपका आय प्रमाण पत्र आवेदन आधार और वेतन पर्ची अपलोड की प्रतीक्षा कर रहा है।",
        kn: "ನಿಮ್ಮ ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಅರ್ಜಿಯಲ್ಲಿ ಆಧಾರ್ ಮತ್ತು ಸ್ಯಾಲರಿ ಸ್ಲಿಪ್ ಅಪ್‌ಲೋಡ್ ಬಾಕಿ ಇದೆ.",
      },
      actions: [
        {
          en: "Upload Aadhaar and salary slip on the municipal portal",
          hi: "नगर पालिका पोर्टल पर आधार और वेतन पर्ची अपलोड करें",
          kn: "ನಗರ ಪಾಲಿಕೆ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಆಧಾರ್ ಮತ್ತು ಸ್ಯಾಲರಿ ಸ್ಲಿಪ್ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
        },
        {
          en: "Complete upload before 30 August 2026",
          hi: "30 अगस्त 2026 से पहले अपलोड पूरा करें",
          kn: "30 ಆಗಸ್ಟ್ 2026 ರ ಮೊದಲು ಅಪ್‌ಲೋಡ್ ಪೂರ್ಣಗೊಳಿಸಿ",
        },
      ],
    },
  },
];
