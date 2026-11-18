-- ============================================================
-- Celestia Smiles – Seed Data
-- Run after schema.sql
-- ============================================================

-- ============================================================
-- SERVICES (from services page)
-- ============================================================
insert into public.services (slug, title, tagline, description, icon, benefits, duration, aftercare, is_featured, sort_order) values
('aesthetic-dentistry', 'Aesthetic Dentistry', 'Beauty through precision.',
 'Cosmetic bonding, contouring and advanced smile design tailored to your facial geometry. We craft subtle improvements that look completely natural.',
 'Smile',
 array['Natural-looking results', 'Minimal tooth preparation', 'Single-visit options', 'Long-lasting bonding materials'],
 '1–3 visits', 'Regular polishing every 6 months. Avoid hard or staining foods for 48 hours.', true, 1),

('orthodontics', 'Orthodontics', 'Straight, confident, invisible.',
 'From Invisalign clear aligners to ceramic braces, our orthodontic solutions align your teeth at any age with minimal impact on your daily life.',
 'AlignCenter',
 array['Virtually invisible options', 'Faster treatment with digital planning', 'Comfortable, smooth aligners', 'Teen and adult friendly'],
 '12–24 months', 'Wear retainers as directed. Clean aligners with cold water daily.', true, 2),

('implants', 'Implantology', 'Permanent roots. Permanent confidence.',
 'Dental implants that look, feel and function exactly like your natural teeth. Guided surgery ensures precision placement for lifelong stability.',
 'Landmark',
 array['Permanent tooth replacement', 'Preserves jaw bone', 'No adhesives or removal', '99% success rate'],
 '3–6 months', 'Soft diet for 2 weeks post-surgery. Gentle brushing around the implant site.', true, 3),

('whitening', 'Teeth Whitening', 'Brighter. Faster. Safer.',
 'Professional in-chair laser whitening that delivers up to 8 shades brighter results in a single 60-minute appointment.',
 'Sparkles',
 array['8 shades brighter in 1 session', 'Safe for enamel', 'Zero sensitivity protocol', 'Take-home top-up kit included'],
 '1–2 sessions', 'Avoid coffee, tea, and red wine for 48 hours. Use a straw for cold drinks.', true, 4),

('surgical-dentistry', 'Surgical Dentistry', 'Precision when it matters most.',
 'From complex extractions to bone grafting and gum surgery — performed with minimal incisions, advanced anaesthesia, and rapid recovery protocols.',
 'Scissors',
 array['Minimal trauma technique', 'Sedation available', 'Rapid healing materials', 'Post-op monitoring'],
 '1–3 visits', 'Soft diet for 5–7 days. Rinse with warm salt water. Avoid smoking.', false, 5),

('smile-makeover', 'Smile Makeover', 'Total transformation, one plan.',
 'A comprehensive treatment plan combining whitening, veneers, orthodontics, and more — designed as a single cohesive aesthetic outcome.',
 'Star',
 array['Coordinated multi-treatment plan', 'Digital preview before starting', 'One primary contact throughout', 'Phased payment options'],
 '3–6 months', 'Follow individual treatment aftercare. Annual maintenance reviews recommended.', false, 6),

('root-canal-treatment', 'Root Canal Treatment', 'Painless. Precise. Preserving.',
 'Modern rotary root canal therapy that removes infection and saves your natural tooth — typically completed in a single, comfortable session.',
 'Zap',
 array['No pain — advanced anaesthesia', 'Single-session completion', 'High success rate', 'Saves your natural tooth'],
 '1–2 sessions', 'Avoid chewing on the treated tooth until capped. Take prescribed antibiotics if given.', false, 7),

('crowns-bridges', 'Crowns & Bridges', 'Strength and beauty in one.',
 'Same-day CAD/CAM ceramic crowns and bridges milled in our in-house studio — perfectly matched to your tooth colour in a single visit.',
 'Shield',
 array['Same-day crowns', 'Natural colour matching', 'Durable, bio-compatible ceramic', 'No temporary crown needed'],
 '1–2 visits', 'Brush normally. Avoid very hard foods like ice for the first week.', false, 8),

('pediatric-dentistry', 'Pediatric Dentistry', 'Gentle care from day one.',
 'A child-friendly environment designed to make dental visits fun and stress-free. We build healthy habits and positive associations from the very first visit.',
 'Baby',
 array['Child-friendly environment', 'Gentle, patient team', 'Preventive focus', 'Sealants and fluoride'],
 '30–45 min per visit', 'Brush twice daily with child-safe toothpaste. First dental visit by age 1.', false, 9),

('emergency', 'Emergency Dental Care', 'When you need us most.',
 'Same-day emergency appointments for toothache, broken teeth, dental trauma, or abscesses. Call or WhatsApp us and we''ll prioritise you.',
 'Heart',
 array['Same-day appointments', 'Pain relief guaranteed', '24/7 WhatsApp triage', 'All emergencies treated'],
 'Same day', 'Depends on treatment. Our team will guide you on-site.', false, 10);

-- ============================================================
-- SPECIALISTS
-- ============================================================
insert into public.specialists (name, role, education, experience, specialties, languages, clinic_days, bio, image_src, gender, sort_order) values
('Dr. Julian Hayes', 'Lead Orthodontist', 'DMD, MS (Orthodontics) – Board Certified', '14 years',
 array['Invisalign Diamond Provider', 'Complex Alignment Cases', 'Digital Orthodontics'],
 'English, Spanish', 'Monday, Wednesday, Friday',
 'Dr. Hayes is Celestia Smiles'' founding specialist. His patient-first approach and artistry in smile design have earned him an international reputation. He has treated over 1,200 alignment cases.',
 '/stitch_male_doctor.webp', 'male', 1),

('Dr. Elena Rostova', 'Cosmetic & Restorative Dentist', 'DDS – Advanced Aesthetic Dentistry Fellow', '10 years',
 array['Porcelain Veneers', 'Smile Makeovers', 'Laser Whitening'],
 'English, French', 'Tuesday, Thursday, Saturday',
 'Dr. Rostova specialises in full smile transformations. Her work combines clinical precision with a deep understanding of facial aesthetics — every veneer she places is individually characterised for a natural look.',
 '/stitch_female_doctor.webp', 'female', 2),

('Dr. Sophia Turner', 'Endodontist', 'DMD, Master of Clinical Endodontics', '12 years',
 array['Painless Root Canals', 'Retreatment Cases', 'Microscopic Dentistry'],
 'English', 'Monday, Tuesday, Thursday',
 'Dr. Turner has completed over 3,000 root canal treatments with a near-perfect success rate. Her use of the dental operating microscope means she catches even the most complex canal systems.',
 '/stitch_female_doctor.webp', 'female', 3),

('Dr. Marcus Vance', 'Oral & Maxillofacial Surgeon', 'DMD, Board Certified Oral Implantology', '16 years',
 array['Guided Implant Surgery', 'Bone Grafting', 'Jaw Reconstruction'],
 'English, German', 'Wednesday, Friday',
 'Dr. Vance is our surgical lead with expertise in complex implant placements and bone regeneration procedures.',
 '/stitch_male_doctor.webp', 'male', 4),

('Dr. Meera Kapoor', 'Pediatric Dentist', 'DMD, Pediatric Dentistry Fellow', '9 years',
 array['Child Behaviour Management', 'Early Orthodontics', 'Preventive Dentistry'],
 'English', 'Monday, Tuesday, Saturday',
 'Dr. Kapoor has a unique gift for putting children at ease. Her gentle, playful approach has helped hundreds of children overcome dental anxiety and build healthy habits for life.',
 '/stitch_female_doctor.webp', 'female', 5),

('Dr. Vikram Sethi', 'Periodontist & Implant Specialist', 'DDS, Master of Periodontology', '11 years',
 array['Gum Disease Treatment', 'Laser Gum Therapy', 'All-on-4 Implants'],
 'English', 'Tuesday, Thursday, Saturday',
 'Dr. Sethi specialises in the foundation of a healthy smile — the gums. His laser-based treatments minimise pain and bleeding while delivering exceptional results in gum health and aesthetics.',
 '/stitch_male_doctor.webp', 'male', 6);

-- ============================================================
-- TESTIMONIALS
-- ============================================================
insert into public.testimonials (name, role, treatment_slug, treatment_label, rating, review_date, quote, sort_order) values
('Sarah Mehta', 'Marketing Director', 'smile-makeover', 'Smile Makeover', 5, 'March 2024',
 'I was terrified of dentists for years. The team at Celestia Smiles completely changed that. My new smile has transformed my confidence in meetings and socially. Worth every investment.', 1),

('Rohan Verma', 'Entrepreneur', 'implants', 'Dental Implants', 5, 'January 2024',
 'The implant process was seamless — no pain, no downtime. Dr. Elena explained every step clearly. I can''t even tell which tooth is the implant. That''s how natural it looks.', 2),

('Priya Singh', 'Architect', 'braces', 'Invisalign Aligners', 5, 'February 2024',
 '14 months of aligners and nobody at work even noticed I was wearing them! The results are incredible. The digital previews they showed me at the start were exactly right.', 3),

('Aditya Sharma', 'Software Engineer', 'whitening', 'Teeth Whitening', 5, 'April 2024',
 'Done in under an hour and the results are insane. I''ve gotten more compliments on my smile in the last month than in my entire life. The numbing gel meant zero sensitivity.', 4),

('Kavya Nair', 'Teacher', 'cosmetic', 'Porcelain Veneers', 5, 'December 2023',
 'I had gaps and chips I was always covering with my hand when I smiled. Now I can laugh freely. Dr. Elena is an artist — each veneer was handpicked to match my skin tone.', 5),

('Mohammed Al-Rashid', 'Business Consultant', 'family', 'Family Care', 5, 'November 2023',
 'My entire family sees Dr. Kapoor for the kids and Dr. Hayes for the adults. They''ve turned what used to be a dreaded experience into something we actually look forward to.', 6),

('Deepa Krishnan', 'Homemaker', 'implants', 'Dental Implants', 5, 'October 2023',
 'After losing a tooth in an accident, I was devastated. Dr. Rahul''s guidance through the implant process was thorough and compassionate. I feel whole again.', 7),

('Arjun Malhotra', 'Doctor', 'cosmetic', 'Smile Makeover', 5, 'September 2023',
 'As a healthcare professional, I''m very particular about clinical standards. Celestia Smiles exceeded every benchmark. The facility is immaculate and the care is exceptional.', 8),

('Tanvi Joshi', 'Fashion Designer', 'whitening', 'Laser Whitening', 5, 'August 2023',
 'Quick, effective, painless. I expected sensitivity for days but felt nothing at all. The whitening shade lasted months. I''ll be back for my annual touch-up without question.', 9);

-- ============================================================
-- FAQ
-- ============================================================
insert into public.faq (question, answer, category, sort_order) values
('Does the treatment involve any discomfort?',
 'We use the latest techniques including computer-guided anesthesia and laser dentistry to make treatments virtually painless. Most patients are pleasantly surprised by our Zero-Pain Protocol.',
 'general', 1),

('How long does laser whitening last?',
 'Professional whitening results typically last 1–3 years depending on diet and lifestyle. We provide bespoke take-home touch-up kits to maintain your bright smile between visits.',
 'whitening', 2),

('Do you offer emergency appointments?',
 'Yes. We reserve dedicated slots daily for our clients requiring immediate attention for pain relief, trauma, or broken restorations.',
 'general', 3),

('Are flexible payment plans available?',
 'Absolutely. We offer tailored financing options through our concierge service, allowing you to start your transformation today and pay at your convenience.',
 'billing', 4);

-- ============================================================
-- CLINIC SETTINGS
-- ============================================================
update public.clinic_settings set
  clinic_name    = 'Celestia Smiles',
  address        = '422 Serenity Avenue, Suite 900',
  city           = 'Beverly Hills',
  country        = 'United States',
  postal_code    = '90210',
  phone          = '+1 888 235 3784',
  whatsapp       = '+1 888 235 3784',
  email          = 'concierge@celestiasmiles.com',
  hours_weekday  = 'Mon–Fri: 9am – 7pm',
  hours_saturday = 'Saturday: 10am – 3pm',
  hours_sunday   = 'Sunday: Closed',
  map_embed_url  = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7152!2d-118.4003!3d34.0736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDA0JzI1LjAiTiAxMTjCsDI0JzAxLjAiVw!5e0!3m2!1sen!2sus!4v1'
where id = 1;
