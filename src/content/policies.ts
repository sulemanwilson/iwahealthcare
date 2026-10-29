import { CUIN } from './home'
import { COMPANY_NAME, CONTACT_EMAIL, PHONE_DISPLAY, WEBSITE_DISPLAY } from '../nav'

export type PolicySection = { heading: string; paragraphs?: string[]; bullets?: string[] }
export type Policy = {
  id: 'privacy' | 'terms' | 'disclaimer' | 'complaints'
  label: string
  title: string
  intro: string
  sections: PolicySection[]
}

export const POLICIES_UPDATED = '13 October 2026'

const WHO = `${COMPANY_NAME} (SECP registered, CUIN ${CUIN}) operates the IWA Healthcare website at ${WEBSITE_DISPLAY}. IWA Healthcare provides healthcare staffing, hospital and clinic staffing, home nursing, physiotherapy, caregiver and patient attendant services in Pakistan. In these policies, "we", "us" and "IWA Healthcare" mean that company.`

export const POLICIES: Policy[] = [
  {
    id: 'privacy',
    label: 'Privacy Policy',
    title: 'Privacy Policy',
    intro: WHO,
    sections: [
      {
        heading: 'What this policy covers',
        paragraphs: [
          'This policy explains what personal information we receive through this website and how we handle it. Information we handle when we arrange or provide a service is dealt with under the arrangements for that service.',
        ],
      },
      {
        heading: 'Information we receive',
        bullets: [
          'Enquiry form: your full name, email address, phone number, enquiry type and message. The form does not send this information to us by itself. When you press Submit Enquiry, your own email application opens with a message addressed to ' + CONTACT_EMAIL + '. We only receive the message if you press Send in your email application.',
          'Email, phone and WhatsApp: if you contact us directly, we receive the details you provide, such as your name, phone number or email address and the content of your messages.',
        ],
      },
      {
        heading: 'What this website does not do',
        paragraphs: [
          'The enquiry form does not store submissions in a website database. We have not added analytics, advertising or tracking tools to this website, and the website\'s own code does not set cookies or use browser storage.',
          'Like any website, loading it involves other parties. Some images (such as our logo and the SECP emblem) are loaded from an image hosting service, and the website is delivered by a hosting provider. These providers can see technical information such as your IP address and browser type when your browser requests files from them. We do not control their practices.',
        ],
      },
      {
        heading: 'How we use information',
        bullets: [
          'To read and respond to your enquiry and discuss the services you ask about.',
          'To arrange, manage and follow up on services you request.',
          'To keep reasonable records, handle complaints and protect the website and our business from misuse.',
          'To meet legal obligations that apply to us.',
        ],
      },
      {
        heading: 'Health and other sensitive information',
        paragraphs: [
          'Please do not send medical records, test results, prescriptions, CNIC or passport numbers, or financial or banking details through the enquiry form or in your first email. A short description of the type of service you need is enough. If more detail is needed to arrange a service, we may ask for it separately, limited to what is necessary.',
        ],
      },
      {
        heading: 'Who may receive your information',
        bullets: [
          'Email and messaging providers that carry your message, including your own email provider and ours.',
          'Healthcare professionals, facilities or other parties, where needed to arrange a service you have asked for.',
          'Authorities, where we are required to disclose information by law.',
        ],
        paragraphs: ['We do not sell your personal information.'],
      },
      {
        heading: 'WhatsApp and social media links',
        paragraphs: [
          'This website links to WhatsApp, Facebook, Instagram and LinkedIn. When you open a WhatsApp link, you leave this website and your phone number, profile details and messages are handled by WhatsApp (operated by Meta) under its own terms and privacy policy. The same applies to the social media services. We do not control how those services collect or use your information, and we encourage you to read their policies.',
        ],
      },
      {
        heading: 'How long we keep information',
        paragraphs: [
          'We keep enquiry emails and messages only for as long as reasonably needed for the purposes above or as required by law.',
        ],
      },
      {
        heading: 'Security',
        paragraphs: [
          'We take reasonable steps to protect information we hold. Please be aware that email and messaging over the internet are not completely secure, and ordinary email is not end-to-end encrypted by default.',
        ],
      },
      {
        heading: 'Your choices',
        paragraphs: [
          'You can ask us to correct or delete information you have sent us, or ask a question about how we handle it, by emailing ' + CONTACT_EMAIL + '. We will consider your request in line with applicable law.',
        ],
      },
      {
        heading: 'Children',
        paragraphs: ['This website is intended for adults. It is not directed at children.'],
      },
      {
        heading: 'Changes to this policy',
        paragraphs: [`We may update this policy from time to time. The date at the top shows when it was last updated (${POLICIES_UPDATED}).`],
      },
    ],
  },
  {
    id: 'terms',
    label: 'Terms of Use',
    title: 'Website Terms of Use',
    intro: 'By using this website you agree to these terms. If you do not agree, please do not use the website.',
    sections: [
      {
        heading: 'About the website',
        paragraphs: [
          WHO,
          'The website provides general information about our services. It is not an offer that guarantees any service, price, availability or timing. Services are provided only under a separate arrangement agreed with you.',
        ],
      },
      {
        heading: 'Enquiries',
        paragraphs: [
          'The enquiry form opens your email application with a prefilled message to ' + CONTACT_EMAIL + '. Your enquiry is not sent until you press Send there. Sending an enquiry does not create a service agreement or a professional relationship, and we cannot promise a response time.',
        ],
      },
      {
        heading: 'Accuracy of information',
        paragraphs: [
          'We aim to keep the information on this website accurate and current, but it may change or contain errors. Please confirm important details with us directly before relying on them.',
        ],
      },
      {
        heading: 'Acceptable use',
        paragraphs: ['You agree not to:'],
        bullets: [
          'give false, misleading or another person\'s information, or impersonate anyone;',
          'use the website unlawfully, or to send harmful, abusive or malicious content;',
          'try to gain unauthorised access to, disrupt or damage the website or its systems.',
        ],
      },
      {
        heading: 'Intellectual property',
        paragraphs: [
          'The website content and the IWA Healthcare name and logo belong to us or our licensors. The SECP emblem and any other third-party names and logos belong to their respective owners. You may not copy or reuse our content for commercial purposes without our written permission.',
        ],
      },
      {
        heading: 'Third-party links',
        paragraphs: [
          'The website links to third-party services such as WhatsApp and social media. We do not control and are not responsible for their content or practices.',
        ],
      },
      {
        heading: 'Limits of liability',
        paragraphs: [
          'To the extent permitted by law, we are not liable for loss arising from your use of, or reliance on, this website, or from interruptions or errors in it. Nothing in these terms excludes or limits any liability that cannot be excluded or limited under applicable law, including consumer protection law.',
        ],
      },
      {
        heading: 'Governing law',
        paragraphs: ['These terms are governed by the laws of Pakistan.'],
      },
      {
        heading: 'Changes',
        paragraphs: [`We may update these terms from time to time. The date at the top shows when they were last updated (${POLICIES_UPDATED}).`],
      },
    ],
  },
  {
    id: 'disclaimer',
    label: 'Medical & Service Disclaimer',
    title: 'Medical and Service Disclaimer',
    intro: 'Please read this notice before relying on anything on this website or sending us an enquiry.',
    sections: [
      {
        heading: 'Not an emergency service',
        paragraphs: [
          'This website, our enquiry channels and any online consultation we arrange are not an emergency service and are not monitored for emergencies. If you or someone else needs urgent medical help, contact local emergency services or go to the nearest hospital emergency department immediately. Do not wait for a reply from us.',
        ],
      },
      {
        heading: 'General information vs. online consultation',
        paragraphs: [
          'General information on this website, such as descriptions of our services, is not medical advice, diagnosis or treatment. It does not replace assessment by a qualified, registered healthcare professional. Do not delay or ignore professional medical advice because of something you read here.',
          'Where we offer online consultation with a professor doctor or other healthcare professional, that consultation itself is intended to be medical advice from that independent professional, based on the information you provide during the consultation. It is provided via video, phone or messaging and does not replace an in-person examination where needed.',
        ],
      },
      {
        heading: 'Our role',
        paragraphs: [
          'IWA Healthcare is a healthcare staffing and home-care service provider. We arrange and introduce nurses, physiotherapists, caregivers, patient attendants and other staff to families, hospitals and clinics. We also arrange online consultations by connecting you with independent healthcare professionals, including professor doctors.',
          'Healthcare professionals, including those providing online consultations, remain responsible for their own professional judgement, advice and conduct. Healthcare facilities remain responsible for their own clinical care and governance. This notice does not limit any responsibility we have under the law or under an agreement with you.',
        ],
      },
      {
        heading: 'Online consultation - important points',
        bullets: [
          'Consultations are provided by independent, qualified and registered professionals, not by IWA Healthcare itself.',
          'Advice is based only on the information you provide. Please give complete and accurate information.',
          "Any prescription, test, or referral is at the consulting doctor's professional discretion and subject to applicable law in Pakistan. We do not guarantee that a prescription will be issued or a specific outcome achieved.",
          'If the consulting professional advises in-person care, further tests, or emergency care, please follow that advice promptly.',
          'Online consultation is not suitable for all conditions.',
        ],
      },
      {
        heading: 'Scope of different roles',
        paragraphs: [
          'Different roles have different qualifications and registration requirements. Caregivers and patient attendants provide support and assistance. They do not provide skilled nursing or medical treatment unless they hold the relevant qualification and registration and are engaged for that purpose. Please tell us clearly what care is needed so the right type of professional can be considered.',
        ],
      },
      {
        heading: 'Qualifications and registration',
        paragraphs: [
          'You are welcome to ask us about the qualifications and registration of any professional we propose, including for online consultation, and we encourage you or your facility to verify registration with the relevant regulator or council (such as PM&DC / PNC).',
        ],
      },
      {
        heading: 'No guarantees',
        paragraphs: [
          'We do not guarantee any medical or recovery outcome. Service availability, matching and start times, and online consultation availability, depend on requirements, location and the availability of suitable professionals, and are confirmed only when agreed with you directly.',
        ],
      },
    ],
  },
  {
    id: 'complaints',
    label: 'Complaints & Contact',
    title: 'Complaints and Contact',
    intro: 'If something has gone wrong, or you have a concern about our website or services, we want to hear from you.',
    sections: [
      {
        heading: 'How to make a complaint',
        paragraphs: [
          `Email ${CONTACT_EMAIL} with the subject "Complaint", or call or message us on ${PHONE_DISPLAY}. Please include your name, how to reach you, the date, what happened and what outcome you are seeking. Please avoid including unnecessary medical details.`,
        ],
      },
      {
        heading: 'What happens next',
        paragraphs: [
          'We will acknowledge your complaint, look into it and let you know the outcome. If we need more information, we will ask you for it.',
        ],
      },
      {
        heading: 'Urgent safety concerns',
        paragraphs: [
          'If a patient\'s safety or health is at immediate risk, contact emergency services or the treating clinician first, then contact us.',
        ],
      },
      {
        heading: 'Other places you can raise concerns',
        paragraphs: [
          'Depending on the circumstances, you may also have the right to raise concerns with other bodies, such as the relevant provincial healthcare commission, the relevant professional regulator or council, or consumer protection forums. Using our complaints process does not prevent you from doing so.',
        ],
      },
      {
        heading: 'Contact details',
        bullets: [
          `Company: ${COMPANY_NAME} (SECP registered, CUIN ${CUIN})`,
          `Email: ${CONTACT_EMAIL}`,
          `Phone / WhatsApp: ${PHONE_DISPLAY}`,
          `Website: ${WEBSITE_DISPLAY}`,
        ],
      },
    ],
  },
]
