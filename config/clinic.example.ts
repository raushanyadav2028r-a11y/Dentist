/**
 * ==============================================================================
 * EXAMPLE ALTERNATIVE CLINIC CONFIGURATION (e.g. Surat, Gujarat)
 * ==============================================================================
 * Is file ko copy karke clinic.ts me rename karein ya reference ke roop me use karein.
 * ==============================================================================
 */

import type { ClinicConfig } from "./clinic";

export const exampleClinicConfig: ClinicConfig = {
  clinicName: "Smile Craft Advanced Dental Care",
  tagline: "Your Smile, Our Passion – World Class Dental Care at Honest Prices",
  shortName: "SC",
  logoImage: "",

  city: "Surat",
  area: "Adajan",
  state: "Gujarat",
  pincode: "395009",
  fullAddress: "201, Second Floor, Titanium Square, Near Prime Arcade, Anand Mahal Road, Adajan, Surat, Gujarat 395009",
  googleMapsLink: "https://maps.google.com/?q=Adajan+Surat+Gujarat+395009",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.000000000000!2d72.79!3d21.19!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAdajan%2C%20Surat!5e0!3m2!1sen!2sin!4v1700000000000",

  phone: "+91 97123 45678",
  phoneRaw: "919712345678",
  whatsappNumber: "919712345678",
  email: "contact@smilecraftsurat.com",

  timings: {
    weekdays: "9:30 AM – 1:30 PM | 4:30 PM – 8:30 PM",
    sunday: "10:00 AM – 1:00 PM (Emergency & Appointments)",
    emergencyNote: "24/7 Dental pain emergency on call",
  },

  socialLinks: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    justdial: "https://justdial.com",
    googleReviews: "https://maps.google.com",
  },

  googleRating: 4.9,
  totalReviews: 530,
  yearEstablished: 2015,
  yearsOfExperience: 12,
  patientsTreated: "15,000+",

  doctors: [
    {
      name: "Dr. Hardik Patel",
      qualification: "BDS, MDS (Prosthodontics & Implantology)",
      specialization: "Dental Implant Specialist & Full Mouth Rehab",
      experienceYears: 12,
      regNo: "GDC-2012-7890",
      photo: "/stitch_male_doctor.webp",
      bio: "Expert in immediate dental implants, digital smile design, and painless full mouth restoration with over 2,500 successful implant cases.",
    },
  ],

  treatments: [
    {
      title: "Root Canal Treatment (RCT)",
      slug: "root-canal-treatment",
      description: "Painless single-sitting rotary root canal treatment with digital X-rays.",
      startingPrice: 2200,
      duration: "1 visit",
      iconName: "Shield",
      benefits: ["Gentle care", "High precision", "Tooth saved"],
    },
    {
      title: "Dental Implants",
      slug: "dental-implants",
      description: "German & Korean titanium dental implants for natural eating and smiling.",
      startingPrice: 17500,
      duration: "2 stages",
      iconName: "Sparkles",
      benefits: ["High durability", "Natural looks", "Safe"],
    },
  ],

  testimonials: [
    {
      name: "Bhavin Shah",
      city: "Adajan, Surat",
      text: "Khub saras treatment chhe. Dr. Hardik Patel sir bohot humble chhe ane koi pan jatl dard vagar implant thai gayu.",
      rating: 5,
      isPlaceholder: true,
      treatment: "Dental Implants",
    },
  ],

  faqs: [
    {
      question: "Tamari clinic ma appointment levu jaruri chhe?",
      answer: "Ha, website thi ya call kari ne appointment levathi wait time nathi rahyu.",
    },
  ],

  beforeAfter: [],

  paymentInfo: {
    upi: true,
    cards: true,
    emiAvailable: true,
    emiDetails: "0% interest EMI on all major credit cards",
    insuranceCashless: "Assistance with mediclaim documentation",
  },

  languages: {
    enabled: ["en", "hi", "gu"],
    defaultLanguage: "gu",
  },

  theme: {
    primaryColor: "#0D5C75",
    accentColor: "#00A86B",
    darkNavy: "#08121E",
  },

  showDemoBadge: true,
  developer: {
    name: "Raushan Yadav",
    contactUrl: "https://github.com/raushanyadav2028r-a11y",
  },

  seo: {
    title: "Smile Craft Dental Care | Best Dentist in Adajan, Surat",
    description: "Top rated dental clinic in Adajan, Surat. Dental implants, root canals, and teeth whitening at honest prices.",
    keywords: ["dentist in Surat", "dental clinic Adajan", "implants Surat"],
    ogImage: "/og-image.jpg",
    siteUrl: "https://smilecraftsurat.com",
  },
};

export default exampleClinicConfig;
