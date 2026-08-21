export const GOV_NOTICES = [
  {
    id: "income-certificate-reminder",
    title: {
      en: "Income certificate application reminder",
      hi: "आय प्रमाण पत्र आवेदन अनुस्मारक",
      kn: "Income certificate application reminder",
    },
    text: `Dear Applicant,

Your application for an Income Certificate (Ref: INC/2026/88421) is pending document upload. Please upload your Aadhaar and latest salary slip on the municipal portal before 30 August 2026.

If documents are not received, the application may be marked incomplete.

Municipal Citizen Services`,
    fallback: {
      summary: {
        en: "Your income certificate application is waiting for Aadhaar and salary slip uploads.",
        hi: "आपका आय प्रमाण पत्र आवेदन आधार और वेतन पर्ची अपलोड की प्रतीक्षा कर रहा है।",
        kn: "Your income certificate application is waiting for Aadhaar and salary slip uploads.",
      },
      actions: [
        {
          en: "Upload Aadhaar and salary slip on the municipal portal",
          hi: "नगर पालिका पोर्टल पर आधार और वेतन पर्ची अपलोड करें",
          kn: "Upload Aadhaar and salary slip on the municipal portal",
        },
        {
          en: "Complete upload before 30 August 2026",
          hi: "30 अगस्त 2026 से पहले अपलोड पूरा करें",
          kn: "Complete upload before 30 August 2026",
        },
      ],
    },
  },
  {
    id: "property-tax-notice",
    title: {
      en: "Property tax assessment notice",
      hi: "संपत्ति कर मूल्यांकन सूचना",
      kn: "Property tax assessment notice",
    },
    text: `Property ID: PT-BLR-442901

Your annual property tax for 2026-27 has been assessed at Rs 4,820. Payment is due by 15 September 2026 to avoid a late fee of Rs 240.

Pay online through the city tax portal using UPI, net banking, or at the ward office.`,
    fallback: {
      summary: {
        en: "Property tax of Rs 4,820 is due by 15 September 2026.",
        hi: "Rs 4,820 का संपत्ति कर 15 सितंबर 2026 तक देय है।",
        kn: "Property tax of Rs 4,820 is due by 15 September 2026.",
      },
      actions: [
        {
          en: "Pay online on the city tax portal",
          hi: "शहर कर पोर्टल पर ऑनलाइन भुगतान करें",
          kn: "Pay online on the city tax portal",
        },
        {
          en: "Keep payment receipt for your records",
          hi: "अपने रिकॉर्ड के लिए भुगतान रसीद रखें",
          kn: "Keep payment receipt for your records",
        },
      ],
    },
  },
  {
    id: "birth-certificate-status",
    title: {
      en: "Birth certificate status update",
      hi: "जन्म प्रमाण पत्र स्थिति अपडेट",
      kn: "Birth certificate status update",
    },
    text: `Application No: BC/2026/11903

Your birth certificate request has moved to verification. The registrar will confirm hospital records within 7 working days.

You will receive an SMS when the digital certificate is ready to download from DigiLocker.`,
    fallback: {
      summary: {
        en: "Your birth certificate is being verified and should be ready within 7 working days.",
        hi: "आपका जन्म प्रमाण पत्र सत्यापित हो रहा है और 7 कार्य दिवसों में तैयार होना चाहिए।",
        kn: "Your birth certificate is being verified and should be ready within 7 working days.",
      },
      actions: [
        {
          en: "Wait for SMS confirmation",
          hi: "SMS पुष्टि की प्रतीक्षा करें",
          kn: "Wait for SMS confirmation",
        },
        {
          en: "Download from DigiLocker when notified",
          hi: "सूचना मिलने पर DigiLocker से डाउनलोड करें",
          kn: "Download from DigiLocker when notified",
        },
      ],
    },
  },
];
