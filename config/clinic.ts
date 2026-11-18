/**
 * ==============================================================================
 * CLINIC CONFIGURATION FILE (SINGLE SOURCE OF TRUTH)
 * ==============================================================================
 * Naye client ke liye sirf is file ko edit karein.
 * Poori website ka naam, contact details, treatments, doctors, colors aur SEO
 * isi ek file se automatically update ho jayenge.
 * ==============================================================================
 */

export interface Doctor {
  name: string; // Doctor ka poora naam (e.g. Dr. Rajesh Sharma)
  qualification: string; // Degree (e.g. BDS, MDS - Conservative Dentistry)
  specialization: string; // Mukhya vishay (e.g. Root Canal & Cosmetic Specialist)
  experienceYears: number; // Kitne saal ka anubhav (e.g. 12)
  regNo?: string; // State Dental Council Registration Number (optional)
  photo: string; // Doctor ki photo ka path
  bio: string; // Chhota parichay
}

export interface Treatment {
  title: string; // Treatment ka naam
  slug: string; // URL slug (e.g. root-canal-treatment)
  description: string; // 1-2 line description
  startingPrice?: number; // Starting price ₹ me (optional, na ho to "Contact for Price")
  duration?: string; // Samay (e.g. "30-45 mins", "1-2 visits")
  iconName: string; // Lucide icon name (Smile, Sparkles, Shield, Activity, etc.)
  benefits: string[]; // 3-4 fayde
}

export interface Testimonial {
  name: string; // Mariz ka naam
  city: string; // Shehar ya ilaqa
  text: string; // Review ka text
  rating: number; // 1 se 5 stars
  isPlaceholder?: boolean; // Demo ke liye true rakhein, real patient reviews par false
  treatment?: string; // Kis treatment ke liye review diya
}

export interface BeforeAfterItem {
  title: string; // Case name (e.g. "Smile Makeover / Front Teeth Gap Closure")
  beforeImage: string; // Before photo
  afterImage: string; // After photo
  duration?: string; // Time taken
  isPlaceholder?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ClinicConfig {
  // ─── 1. Basic Branding ──────────────────────────────────────────────────────
  clinicName: string; // Clinic ka naam (e.g. "Smile Care Dental Clinic")
  tagline: string; // Hero section ka slogan
  shortName: string; // Logo ke andar dikhne wale initials (e.g. "SC")
  logoImage?: string; // Agar logo image file ho to path (/logo.png), nahi to text initials use honge

  // ─── 2. Location & Address ──────────────────────────────────────────────────
  city: string; // Shehar (e.g. "Pune", "Surat", "Jaipur")
  area: string; // Ilaqa (e.g. "Kothrud", "Adajan", "Malviya Nagar")
  state: string; // Rajya (e.g. "Maharashtra", "Gujarat")
  pincode: string; // PIN code
  fullAddress: string; // Complete clinic address
  googleMapsLink: string; // Google Maps directions link (mobile click ke liye)
  googleMapsEmbedUrl: string; // Google Map iframe embed URL

  // ─── 3. Contact Details ─────────────────────────────────────────────────────
  // NOTE: Phone aur WhatsApp ek hi valid format me rakhein
  phone: string; // Calling number with spaces for readability (e.g. "+91 98765 43210")
  phoneRaw: string; // Pure digits for tel: link (e.g. "919876543210")
  whatsappNumber: string; // Pure digits with country code for WhatsApp link (e.g. "919876543210")
  email: string; // Clinic ka official email id

  // ─── 4. Timings ─────────────────────────────────────────────────────────────
  timings: {
    weekdays: string; // Somwar se Shanivar (e.g. "10:00 AM - 2:00 PM | 5:00 PM - 9:00 PM")
    sunday: string; // Ravivar ka samay (e.g. "10:00 AM - 1:00 PM (By Appointment)")
    emergencyNote?: string; // Emergency service notice (e.g. "24/7 Dental Emergency On Call")
  };

  // ─── 5. Social & Review Links ───────────────────────────────────────────────
  socialLinks: {
    instagram?: string;
    facebook?: string;
    justdial?: string;
    googleReviews?: string;
  };

  // ─── 6. Trust Metrics & Stats ───────────────────────────────────────────────
  googleRating?: number; // Google rating (e.g. 4.9) — na ho to null
  totalReviews?: number; // Total reviews count (e.g. 380) — na ho to null
  yearEstablished?: number; // Kis saal clinic shuru hui (e.g. 2014)
  yearsOfExperience?: number; // Senior dentist ka kul anubhav (e.g. 15)
  patientsTreated?: string; // Total khush mariz (e.g. "10,000+")

  // ─── 7. Doctors List ────────────────────────────────────────────────────────
  doctors: Doctor[];

  // ─── 8. Treatments Offered ──────────────────────────────────────────────────
  treatments: Treatment[];

  // ─── 9. Testimonials ────────────────────────────────────────────────────────
  testimonials: Testimonial[];

  // ─── 10. FAQs (Minimum 8 Indian context) ────────────────────────────────────
  faqs: FaqItem[];

  // ─── 11. Before / After Gallery (Empty ho to section hide hoga) ─────────────
  beforeAfter: BeforeAfterItem[];

  // ─── 12. Payment & Financing ────────────────────────────────────────────────
  paymentInfo: {
    upi: boolean; // GPay, PhonePe, Paytm accepted?
    cards: boolean; // Credit/Debit cards accepted?
    emiAvailable: boolean; // 0% EMI available? (Bajaj Finserv, Cards)
    emiDetails?: string;
    insuranceCashless?: string; // Dental insurance/reimbursement assistance
  };

  // ─── 13. Languages ──────────────────────────────────────────────────────────
  languages: {
    enabled: ("en" | "hi" | "gu" | "mr")[]; // Website me kaunsi languages available hongi
    defaultLanguage: "en" | "hi" | "gu" | "mr"; // By default kaunsi bhasha dikhegi
  };

  // ─── 14. Theme & Appearance ─────────────────────────────────────────────────
  theme: {
    primaryColor: string; // Emerald green (#00B894)
    accentColor: string; // Teal (#16C7B5)
    darkNavy: string; // Deep midnight navy (#071321)
    cardBackground?: string; // Card navy (#112332)
    secondaryBackground?: string; // Dark blue-black (#0B1928)
  };

  // ─── 15. Demo / Developer Badges ────────────────────────────────────────────
  showDemoBadge: boolean; // Demo version me true rakhein, client ko bechte samay false kar dein
  developer: {
    name: string;
    contactUrl: string;
  };

  // ─── 16. SEO & Meta ─────────────────────────────────────────────────────────
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
    siteUrl: string;
  };
}

export const clinicConfig: ClinicConfig = {
  // ── 1. Basic Branding ───────────────────────────────────────────────────────
  clinicName: "Dr. Sharma's Smile Dental Care",
  tagline: "Modern, Gentle & Affordable Dental Care for Your Entire Family",
  shortName: "SDC",
  logoImage: "", // Khali ho to shortName (SDC) round badge me dikhega

  // ── 2. Location & Address ───────────────────────────────────────────────────
  city: "Pune",
  area: "Kothrud",
  state: "Maharashtra",
  pincode: "411038",
  fullAddress: "Shop 12, Ground Floor, Royal Palms Complex, Paud Road, Kothrud, Pune, Maharashtra 411038",
  googleMapsLink: "https://maps.google.com/?q=Kothrud+Pune+Maharashtra+411038",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.568285514083!2d73.8052!3d18.5034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf941f17e0b5%3A0x6b4859a5840c83ef!2sKothrud%2C%20Pune%2C%20Maharashtra%20411038!5e0!3m2!1sen!2sin!4v1700000000000",

  // ── 3. Contact Details ──────────────────────────────────────────────────────
  phone: "+91 98230 45678",
  phoneRaw: "919823045678",
  whatsappNumber: "919823045678",
  email: "care@sharmasdentalcare.com",

  // ── 4. Timings ──────────────────────────────────────────────────────────────
  timings: {
    weekdays: "10:00 AM – 2:00 PM | 5:00 PM – 9:00 PM",
    sunday: "10:00 AM – 1:00 PM (Prior Appointment)",
    emergencyNote: "Emergency toothache cases attended on priority",
  },

  // ── 5. Social & Review Links ────────────────────────────────────────────────
  socialLinks: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    justdial: "https://justdial.com",
    googleReviews: "https://maps.google.com",
  },

  // ── 6. Trust Metrics & Stats ────────────────────────────────────────────────
  googleRating: 4.9,
  totalReviews: 420,
  yearEstablished: 2012,
  yearsOfExperience: 14,
  patientsTreated: "12,000+",

  // ── 7. Doctors List ─────────────────────────────────────────────────────────
  doctors: [
    {
      name: "Dr. Rajesh Sharma",
      qualification: "BDS, MDS (Conservative Dentistry & Endodontics)",
      specialization: "Root Canal Specialist & Cosmetic Dentist",
      experienceYears: 14,
      regNo: "MDC-2010-4821",
      photo: "/stitch_male_doctor.webp",
      bio: "14+ years of experience in single-sitting painless root canals, smile designing, and aesthetic restorative dentistry.",
    },
    {
      name: "Dr. Neha Sharma",
      qualification: "BDS, MDS (Orthodontics & Dentofacial Orthopedics)",
      specialization: "Braces & Certified Clear Aligner Specialist",
      experienceYears: 11,
      regNo: "MDC-2013-6192",
      photo: "/stitch_female_doctor.webp",
      bio: "Specialist in invisible aligners, metal & ceramic braces for kids and adults. Dedicated to creating naturally confident smiles.",
    },
  ],

  // ── 8. Indian Dental Treatments (12 Key Treatments) ─────────────────────────
  treatments: [
    {
      title: "Root Canal Treatment (RCT)",
      slug: "root-canal-treatment",
      description: "Save your infected tooth with modern rotary painless root canal treatment. Single-sitting option available.",
      startingPrice: 2500,
      duration: "1–2 visits (40 mins)",
      iconName: "Shield",
      benefits: ["Gentle digital anesthesia", "Natural tooth preservation", "Digital apex locator accuracy"],
    },
    {
      title: "Dental Implants",
      slug: "dental-implants",
      description: "Permanent replacement for missing teeth with world-class titanium implants that look and feel like natural teeth.",
      startingPrice: 18000,
      duration: "2-stage procedure",
      iconName: "Sparkles",
      benefits: ["Lifetime durability", "Natural chewing strength", "No damage to adjacent teeth"],
    },
    {
      title: "Braces & Clear Aligners",
      slug: "braces-and-aligners",
      description: "Straighten crooked teeth with invisible aligners or tooth-colored ceramic and metal braces.",
      startingPrice: 25000,
      duration: "6–18 months",
      iconName: "Smile",
      benefits: ["Custom 3D digital planning", "Almost invisible options", "Comfortable, removable trays"],
    },
    {
      title: "Teeth Whitening",
      slug: "teeth-whitening",
      description: "Safe, effective clinical teeth whitening to remove yellow stains from tea, coffee, and tobacco in under 45 minutes.",
      startingPrice: 4500,
      duration: "45 minutes",
      iconName: "Sparkles",
      benefits: ["Up to 4-6 shades brighter", "Enamel-safe formula", "Instant festive/wedding glow"],
    },
    {
      title: "Dental Crowns & Bridges",
      slug: "crowns-and-bridges",
      description: "Zirconia and ceramic metal-free caps to protect fractured, root canal treated, or missing teeth with natural look.",
      startingPrice: 3500,
      duration: "2 visits",
      iconName: "Shield",
      benefits: ["High-strength Zirconia", "Natural translucency & shade match", "Long-term warranty options"],
    },
    {
      title: "Teeth Cleaning & Polishing",
      slug: "cleaning-and-scaling",
      description: "Ultrasonic scaling to remove tartar, plaque, and stubborn tobacco stains for healthy pink gums and fresh breath.",
      startingPrice: 999,
      duration: "30 minutes",
      iconName: "Activity",
      benefits: ["Painless ultrasonic scaling", "Prevents bleeding gums & pyorrhea", "Polishing for shiny surface"],
    },
    {
      title: "Wisdom Tooth Removal",
      slug: "wisdom-tooth-removal",
      description: "Gentle surgical and non-surgical extraction of impacted or painful wisdom teeth under local anesthesia.",
      startingPrice: 2500,
      duration: "30–45 minutes",
      iconName: "Shield",
      benefits: ["Minimal swelling protocol", "Experienced oral surgeon care", "Quick recovery instructions"],
    },
    {
      title: "Kids Dentistry (Pedodontics)",
      slug: "kids-dentistry",
      description: "Child-friendly dental care including cavity fillings, fluoride application, habit-breaking appliances, and space maintainers.",
      startingPrice: 800,
      duration: "20–30 minutes",
      iconName: "Heart",
      benefits: ["Fear-free friendly environment", "Cavity prevention coating", "Painless milk tooth care"],
    },
    {
      title: "Smile Designing & Veneers",
      slug: "smile-designing",
      description: "Fix chipped, spaced, or discolored front teeth with aesthetic composite bonding or porcelain veneers.",
      startingPrice: 6000,
      duration: "1–2 visits",
      iconName: "Smile",
      benefits: ["Photographic smile analysis", "Minimally invasive preparation", "Harmonious facial aesthetics"],
    },
    {
      title: "Dentures (Batti)",
      slug: "dentures",
      description: "Complete and partial flexible dentures for senior citizens to restore effortless eating and clear speech.",
      startingPrice: 8000,
      duration: "3–4 visits",
      iconName: "Shield",
      benefits: ["Unbreakable flexible options", "Comfortable suction fit", "Restores face profile & chewing"],
    },
    {
      title: "Gum Treatment & Pyorrhea Care",
      slug: "gum-treatment",
      description: "Deep curettage, flap surgery, and bone grafting to stop loose teeth, foul smell, and persistent gum bleeding.",
      startingPrice: 2000,
      duration: "1–2 visits",
      iconName: "Activity",
      benefits: ["Arrests tooth mobility", "Eliminates bad breath (halitosis)", "Strengthens dental foundation"],
    },
    {
      title: "Emergency Dental Care",
      slug: "emergency-dental-care",
      description: "Immediate relief for severe toothache, broken tooth, swelling, or knocked-out tooth with same-day attention.",
      startingPrice: 500,
      duration: "Immediate attention",
      iconName: "Activity",
      benefits: ["Same-day pain relief", "Emergency medication & diagnosis", "Priority walk-in support"],
    },
  ],

  // ── 9. Testimonials ─────────────────────────────────────────────────────────
  testimonials: [
    {
      name: "Amit Deshmukh",
      city: "Kothrud, Pune",
      text: "Main bohot darta tha Root Canal se, par Dr. Rajesh Sharma sir ne poora procedure bilkul bina kisi dard ke kiya. Same day pain gayab ho gaya. Bohot shaant aur clean clinic hai.",
      rating: 5,
      isPlaceholder: true,
      treatment: "Root Canal Treatment",
    },
    {
      name: "Sneha Patil",
      city: "Baner, Pune",
      text: "Dr. Neha ma'am se Clear Aligners karwaye. 10 mahine me mere teeth bilkul seedhe ho gaye. Kisi ko pata bhi nahi chala ki maine aligners pehne hue the. Very affordable pricing compared to big corporate chains.",
      rating: 5,
      isPlaceholder: true,
      treatment: "Clear Aligners",
    },
    {
      name: "Suresh Joshi",
      city: "Karve Nagar, Pune",
      text: "Mera dental implant ka treatment yahan hua. Senior citizen hone ke bawajood koi dikkat nahi hui. Ab main aaram se sab khana kha pata hoon. Staff bohot respectful aur polite hai.",
      rating: 5,
      isPlaceholder: true,
      treatment: "Dental Implant",
    },
    {
      name: "Pooja Kulkarni",
      city: "Aundh, Pune",
      text: "Family ke regular checkup aur teeth cleaning ke liye best clinic hai. Rates genuine hain, koi faltu treatment suggest nahi karte. Honest doctors!",
      rating: 5,
      isPlaceholder: true,
      treatment: "Teeth Cleaning & Scaling",
    },
  ],

  // ── 10. Indian Context FAQs ─────────────────────────────────────────────────
  faqs: [
    {
      question: "Kya Root Canal Treatment (RCT) me dard hota hai?",
      answer: "Nahi. Modern digital anesthesia aur rotary instruments ki madad se Root Canal Treatment bilkul aaramdayak aur lagbhag dard-mukt hota hai. Treatment ke dauran mariz ko koi khas dard mehsoos nahi hota.",
    },
    {
      question: "Dental Implant ka lagbhag kitna kharcha aata hai?",
      answer: "Dental implant ka kharcha ₹18,000 se shuru hota hai, jo implant ke brand (Indian/Imported) aur crown ke type (Ceramic ya Zirconia) par depend karta hai. Hum pehle X-ray karke transparent estimate dete hain, jisme koi hidden charges nahi hote.",
    },
    {
      question: "Kya treatment ke liye EMI ya installment ki suvidha uplabdh hai?",
      answer: "Haan, bade treatments jaise Dental Implants, Braces aur Smile Makeover ke liye 0% interest EMI suvidha uplabdh hai. Aap Credit Card ya finance partners ke zariye asan maasik kiston me payment kar sakte hain.",
    },
    {
      question: "Dental checkup kitne samay baad karwana chahiye?",
      answer: "Dental Council of India aur hamare specialists ke mutabik har 6 mahine me ek baar routine dental checkup aur scaling (cleaning) karwani chahiye taaki cavities aur pyorrhea shuruaat me hi pakde ja sakein.",
    },
    {
      question: "Chhote bachon ko pehli baar dentist ke paas kab le jana chahiye?",
      answer: "Bache ka pehla doodh ka daant aane par ya pehle janamdin par dentist ko dikhana chahiye. Isse doodh ke daanton me keede lagne se rokne me madad milti hai aur bache ka clinic se dar nikalta hai.",
    },
    {
      question: "Clinic ke timings kya hain aur kya Sunday ko clinic khula rehta hai?",
      answer: "Clinic Somwar se Shanivar subah 10:00 se 2:00 aur shaam 5:00 se 9:00 baje tak khuli rehti hai. Ravivar (Sunday) ko subah 10:00 se 1:00 baje tak prior appointment ke saath suvidha uplabdh hai.",
    },
    {
      question: "Appointment kaise book karein? Kya direct walk-in aa sakte hain?",
      answer: "Aap hamari website ke booking form se, direct call (+91 98230 45678) karke, ya WhatsApp par message bhejkar asani se apna samay confirm kar sakte hain. Direct walk-in bhi allowed hain, par advance booking se wait time nahi hota.",
    },
    {
      question: "Payment ke kaun-kaun se options uplabdh hain?",
      answer: "Hum Cash, sabhi UPI apps (Google Pay, PhonePe, Paytm), Debit/Credit Cards aur Net Banking accept karte hain. Hum insurance claim ke liye medical bill aur prescription bhi provide karte hain.",
    },
  ],

  // ── 11. Before / After Gallery (Real photos na ho to sample mark hoga) ───────
  beforeAfter: [
    {
      title: "Teeth Whitening & Stain Removal",
      beforeImage: "/transformations/teeth_whitening_before.webp",
      afterImage: "/transformations/teeth_whitening_after.webp",
      duration: "Single Session (45 Mins)",
      isPlaceholder: true,
    },
    {
      title: "Crooked Teeth to Aligned Smile",
      beforeImage: "/transformations/invisalign_before.webp",
      afterImage: "/transformations/invisalign_after.webp",
      duration: "Clear Aligners (9 Months)",
      isPlaceholder: true,
    },
    {
      title: "Front Tooth Gap Closure & Veneers",
      beforeImage: "/transformations/veneers_before.webp",
      afterImage: "/transformations/veneers_after.webp",
      duration: "2 Sittings",
      isPlaceholder: true,
    },
  ],

  // ── 12. Payment & Financing ────────────────────────────────────────────────
  paymentInfo: {
    upi: true,
    cards: true,
    emiAvailable: true,
    emiDetails: "No-cost EMI available on Credit Cards & Bajaj Finserv for implants & braces",
    insuranceCashless: "Detailed itemized receipts provided for mediclaim reimbursement",
  },

  // ── 13. Languages ──────────────────────────────────────────────────────────
  languages: {
    enabled: ["en", "hi", "mr"],
    defaultLanguage: "en",
  },

  // ── 14. Theme & Appearance ─────────────────────────────────────────────────
  theme: {
    primaryColor: "#00B894", // Emerald Green
    accentColor: "#16C7B5", // Teal Accent
    darkNavy: "#071321", // Deep Midnight Navy
    cardBackground: "#112332", // Card Navy
    secondaryBackground: "#0B1928", // Dark Blue-Black
  },

  // ── 15. Demo / Developer Badges ────────────────────────────────────────────
  showDemoBadge: true,
  developer: {
    name: "Raushan Yadav",
    contactUrl: "https://github.com/raushanyadav2028r-a11y",
  },

  // ── 16. SEO & Meta ─────────────────────────────────────────────────────────
  seo: {
    title: "Dr. Sharma's Smile Dental Care | Best Dentist in Kothrud, Pune",
    description: "Trusted & gentle dental clinic in Kothrud, Pune. Painless root canal, dental implants, clear aligners & teeth cleaning. Affordable rates & 0% EMI available.",
    keywords: [
      "dentist in Kothrud",
      "dental clinic Pune",
      "painless root canal Pune",
      "dental implants Kothrud",
      "teeth cleaning cost Pune",
      "clear aligners Pune",
      "family dentist Kothrud",
    ],
    ogImage: "/og-image.jpg",
    siteUrl: "https://sharmasdentalcare.com",
  },
};

export default clinicConfig;
