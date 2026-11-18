# 🏥 Premium Indian Dental Clinic Website Template
### One Template Fits All — High-Converting, Production-Ready Next.js Dental Solution

An ultra-premium, modern, and trustworthy dental clinic website engineered specifically for **Indian dental clinics** (Pune, Mumbai, Delhi, Bengaluru, Surat, Ahmedabad, Jaipur, etc.). Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS 4**, and **Framer Motion**.

---

## 🌟 Key Highlights & Design Vision

- **Emerald Green & Deep Midnight Navy Aesthetic:**
  - Background: Deep Midnight Navy (`#071321`) & Dark Blue-Black (`#0B1928`)
  - Cards: Card Navy (`#112332`) with subtle transparent teal borders (`#16C7B5`)
  - Primary Accent: High-converting Emerald Green (`#00B894`) for buttons, CTAs & badges
  - Text: Soft White (`#F4F8FA`) and Muted Blue-Grey (`#A8B6C4`)
- **Single Config File (`config/clinic.ts`):** Change the entire website's clinic name, doctors, treatments, pricing, phone, WhatsApp, timings, Google Map, and SEO from **one single file** without touching any component code!
- **India-Specific Conversion Features:**
  - 🇮🇳 Clean 10-digit Indian mobile validation (`^[6-9]\d{9}$`).
  - 💬 **Instant WhatsApp Booking:** Form auto-constructs a pre-filled WhatsApp message sent straight to the clinic's reception number.
  - 📞 **Sticky Mobile Bottom Bar:** "Call Now", "WhatsApp", and "Book" buttons always accessible on mobile devices (360px+).
  - 💳 **Payment & Financing Section:** UPI (GPay, PhonePe, Paytm, BHIM), Cards, and 0% Interest EMI assistance.
  - 🛡️ **DCI-Compliant Healthcare Content:** Zero exaggerated claims. Factual, trustworthy focus on 100% Autoclave sterilization, single-use kits, and digital diagnostics.
- **Multilingual Support:**
  - Built-in English, हिन्दी (Hindi), ગુજરાતી (Gujarati), and मराठी (Marathi) language toggles in the navigation bar.
- **Interactive Smile Transformation Slider:**
  - High-performance before-and-after comparison slider (touch-enabled on mobile).

---

## ⚡ 15-Minute Client Customization Checklist

Jab bhi kisi naye dental clinic client ke liye website setup karni ho, bas ye steps follow karein:

### Step 1: `config/clinic.ts` file open karein
Apne client ki details ke anusar ye fields update karein:
- [ ] `clinicName`: Clinic ka poora naam (e.g., `"Smile Craft Dental Clinic"`)
- [ ] `tagline`: Tagline ya slogan (e.g., `"Modern & Gentle Family Dentistry"`)
- [ ] `shortName`: 2-3 letters logo initials (e.g., `"SCD"`)
- [ ] `city`, `area`, `pincode`, `fullAddress`: Clinic ka actual Indian address
- [ ] `phone`: Calling number (e.g., `"+91 98765 43210"`)
- [ ] `whatsappNumber`: Country code ke saath bina space wala WhatsApp number (e.g., `"919876543210"`)
- [ ] `googleMapsLink` & `googleMapsEmbedUrl`: Clinic ka Google Maps directions link aur iframe embed URL
- [ ] `timings`: Somwar se Shanivar aur Sunday ke timings
- [ ] `doctors`: Client ke dentists ki details (Name, BDS/MDS degree, Experience, Reg. No.)
- [ ] `treatments`: Clinic me uplabdh treatments aur starting price in ₹
- [ ] `showDemoBadge`: Client ko bechte samay `false` kar dein taaki demo notice hide ho jaye.

### Step 2: Photos Replace Karein (Optional)
Agar clinic ke doctors ki real photos hain:
1. Unhe `public/` folder me daalein (e.g., `public/doctor_rajesh.webp`).
2. `config/clinic.ts` me `photo: "/doctor_rajesh.webp"` set kar dein.

### Step 3: Vercel Par Deploy Karein
1. GitHub repo ko Vercel me import karein.
2. (Optional) Agar database aur email alerts chahiye to `.env.local` ke variables Vercel me daalein.
3. **Deploy** button dabayein — Website 60 seconds me live ho jayegi!

### Step 4: Custom Domain Jodein
Vercel Settings &rarr; Domains me client ka custom domain add karein (e.g., `www.clientdentalclinic.com`).

---

## 📂 Kaun si files edit karni hain aur kaun si nahi?

| File Path | Status | Purpose |
| :--- | :--- | :--- |
| `config/clinic.ts` | ✏️ **EDIT THIS** | **Single Source of Truth.** Har client ke liye sirf is file ko edit karna hai. |
| `config/clinic.example.ts` | 📖 **REFERENCE** | Doosre client ka example template (e.g., Surat clinic). |
| `src/locales/*.json` | ✏️ **OPTIONAL** | Agar custom translations badalni hon (English, Hindi, Gujarati, Marathi). |
| `public/*` | ✏️ **OPTIONAL** | Client ke clinic photos ya logo replace karne ke liye. |
| `src/components/*` | 🔒 **DO NOT TOUCH** | Reusable layout & UI components. Inhe chhedne ki zaroorat nahi hai. |
| `src/app/*` | 🔒 **DO NOT TOUCH** | Route pages, SEO schemas & Next.js layouts. Ye automatically config se load hote hain. |

---

## 🚀 Naye Client Ko Add Karne Ka Sabse Fast Tareeka

Do tareeqe hain:

### Tareeqa A: Separate Repository (Best for individual clients)
1. Is template repo ko GitHub par **"Use this template"** ya **Clone** karein:
   ```bash
   git clone <template-repo-url> client-clinic-name
   cd client-clinic-name
   ```
2. `config/clinic.ts` me client ka data daalein.
3. Commit aur Push karke Vercel par client ke domain ke sath deploy kar dein.

### Tareeqa B: Branch Per Client
1. Ek main template repo rakhein.
2. Har naye client ke liye ek naya branch banayein:
   ```bash
   git checkout -b client-pune-sharma
   # edit config/clinic.ts
   git commit -am "Customize for Dr. Sharma Clinic Pune"
   git push origin client-pune-sharma
   ```
3. Vercel me us branch ko deploy kar dein.

---

## 🛠️ Tech Stack & Scripts

```bash
# Development server start karne ke liye
npm run dev

# Production build test karne ke liye
npm run build

# Production server start karne ke liye
npm run start
```

---

## 📄 License & Attribution
Designed & Engineered for High-Converting Indian Healthcare Clinics.
Controlled by `clinicConfig.showDemoBadge` in `config/clinic.ts`.
