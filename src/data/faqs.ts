import { FAQ } from "@/types";

export const faqs: FAQ[] = [
  { id: "1", question: "How do I book an appointment?", answer: "You can book an appointment through our website, by calling the respective clinic directly, or using our online booking system. Walk-in appointments are also available for urgent cases.", category: "appointments" },
  { id: "2", question: "What insurance do you accept?", answer: "We accept all major Swiss health insurance providers. Both basic (KVG) and supplementary insurance plans are welcome. Please bring your insurance card to your first visit.", category: "insurance" },
  { id: "3", question: "What are the opening hours?", answer: "Our clinics are generally open Monday to Friday from 8:00 to 18:00. Some locations offer Saturday morning hours. Please check individual clinic pages for specific times.", category: "locations" },
  { id: "4", question: "Do I need a referral?", answer: "For general practice consultations, no referral is needed. For specialist services, a referral from your general practitioner may be required depending on your insurance model.", category: "services" },
  { id: "5", question: "What should I bring to my first appointment?", answer: "Please bring your health insurance card, a valid ID, any relevant medical records, a list of current medications, and any referral letters if applicable.", category: "appointments" },
  { id: "6", question: "Do you offer emergency services?", answer: "Yes, several of our clinics offer walk-in emergency services during opening hours. For life-threatening emergencies, please call 144 (Swiss emergency number).", category: "emergency" },
  { id: "7", question: "Can I get my lab results online?", answer: "Lab results are typically discussed with your doctor during a follow-up consultation. We are implementing a patient portal for digital access to results.", category: "services" },
  { id: "8", question: "Are your clinics wheelchair accessible?", answer: "Yes, all our clinics are designed to be fully accessible, including wheelchair access, accessible parking, and adapted facilities.", category: "locations" },
  { id: "9", question: "How can I cancel an appointment?", answer: "Please cancel at least 24 hours in advance by calling the clinic directly. Late cancellations or no-shows may incur a fee.", category: "appointments" },
  { id: "10", question: "Do you offer telemedicine?", answer: "Yes, we offer video consultations through our telemedicine platform. Book online or call any clinic to schedule a virtual appointment.", category: "services" },
  { id: "11", question: "What languages do your doctors speak?", answer: "Our multilingual team speaks German, English, French, Italian, Spanish, Arabic, Portuguese, and Mandarin, depending on the doctor.", category: "services" },
  { id: "12", question: "Do you treat children?", answer: "Yes, our general practices provide pediatric care for children of all ages. For specialized pediatric care, we can provide appropriate referrals.", category: "services" },
];

export function getFaqsByCategory(category: string) {
  return faqs.filter((f) => f.category === category);
}
export const faqCategories = [...new Set(faqs.map((f) => f.category))];
