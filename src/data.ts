import { Medicine, Category, FAQ, Testimonial, Service, BlogTip } from './types';

export const BUSINESS_INFO = {
  name: "New Mantu Pharma",
  category: "Pharmacy | Medical Store",
  location: "Q2X4+FMC, Tekari Road, Gaya, Bihar 823001",
  address: "Tekari Road, Near Chowk, Gaya, Bihar 823001",
  coordinates: { lat: 24.7955, lng: 84.9995 },
  phone: "09934023219",
  phoneFormatted: "+919934023219",
  whatsapp: "919934023219",
  tagline: "Your Trusted Medical Store for Genuine Medicines & Healthcare Needs",
  established: "1998",
  owner: "Mantu Kumar",
  hours: {
    weekdays: "08:00 AM - 10:00 PM",
    sunday: "09:00 AM - 08:00 PM",
    emergency: "24/7 Available on Call"
  }
};

export const MEDICINE_CATEGORIES: Category[] = [
  { id: 'all', name: 'All Products', description: 'Complete pharmacy range', iconName: 'Grid', itemCount: 180 },
  { id: 'tablets', name: 'Tablets', description: 'Prescription & OTC Tablets', iconName: 'Layers', itemCount: 64 },
  { id: 'capsules', name: 'Capsules', description: 'Softgels & standard capsules', iconName: 'Flame', itemCount: 32 },
  { id: 'syrups', name: 'Syrups & Liquids', description: 'Cough, pediatric, & tonic syrups', iconName: 'Droplet', itemCount: 28 },
  { id: 'equipment', name: 'Medical Equipment', description: 'BP monitors, glucometers, & devices', iconName: 'Activity', itemCount: 12 },
  { id: 'baby', name: 'Baby Care Products', description: 'Baby food, diapers, skincare', iconName: 'Heart', itemCount: 18 },
  { id: 'supplements', name: 'Health Supplements', description: 'Vitamins, protein powders, & mineral supplements', iconName: 'ShieldPlus', itemCount: 22 },
  { id: 'skin', name: 'Skincare & Personal Care', description: 'Soaps, creams, hygiene essentials', iconName: 'Sparkles', itemCount: 24 },
  { id: 'diabetic', name: 'Diabetic Care', description: 'Sugar test strips, sugar-free items', iconName: 'Thermometer', itemCount: 15 }
];

export const MEDICINES_DATABASE: Medicine[] = [
  {
    id: 'm1',
    name: 'Paracetamol 650mg',
    category: 'tablets',
    form: 'Tablet',
    price: 30,
    availability: 'In Stock',
    description: 'Analgesic and antipyretic for relief of fever and mild to moderate pain.',
    isGeneric: true,
    genericName: 'Paracetamol',
    dosage: '650mg',
    manufacturer: 'Micro Labs Ltd'
  },
  {
    id: 'm2',
    name: 'Amoxicillin Trihydrate 500mg',
    category: 'capsules',
    form: 'Capsule',
    price: 112,
    availability: 'In Stock',
    description: 'Broad-spectrum penicillin antibiotic used to treat bacterial infections.',
    isGeneric: false,
    dosage: '500mg',
    manufacturer: 'Alkem Laboratories'
  },
  {
    id: 'm3',
    name: 'Metformin Hydrochloride 500mg SR',
    category: 'diabetic',
    form: 'Tablet',
    price: 45,
    availability: 'In Stock',
    description: 'Oral anti-diabetic drug for managing Type-2 diabetes mellitus.',
    isGeneric: true,
    genericName: 'Metformin SR',
    dosage: '500mg',
    manufacturer: 'Abbott Healthcare'
  },
  {
    id: 'm4',
    name: 'Digital Blood Pressure Monitor',
    category: 'equipment',
    form: 'Device',
    price: 1850,
    availability: 'In Stock',
    description: 'Automatic blood pressure monitor with cuff, heart rate indicator, and digital memory.',
    isGeneric: false,
    dosage: 'One Size',
    manufacturer: 'Omron Healthcare'
  },
  {
    id: 'm5',
    name: 'Cough & Cold Relief Syrup',
    category: 'syrups',
    form: 'Syrup',
    price: 95,
    availability: 'In Stock',
    description: 'Effective cough suppressant and decongestant for dry, tickly cough.',
    isGeneric: false,
    dosage: '100ml',
    manufacturer: 'Dabur India'
  },
  {
    id: 'm6',
    name: 'Vitamin C with Zinc Chewable',
    category: 'supplements',
    form: 'Tablet',
    price: 75,
    availability: 'In Stock',
    description: 'Daily immunity-boosting chewable tablets for overall antioxidant defense.',
    isGeneric: true,
    genericName: 'Ascorbic Acid + Zinc',
    dosage: '500mg',
    manufacturer: 'GlaxoSmithKline'
  },
  {
    id: 'm7',
    name: 'Baby Moisturizing Cream',
    category: 'baby',
    form: 'Cream',
    price: 240,
    availability: 'In Stock',
    description: 'Hypoallergenic and gentle skin protection formula specially designed for infant skin.',
    isGeneric: false,
    dosage: '200g',
    manufacturer: 'Himalaya BabyCare'
  },
  {
    id: 'm8',
    name: 'Glucometer Blood Sugar Tester',
    category: 'diabetic',
    form: 'Device',
    price: 999,
    availability: 'In Stock',
    description: 'Compact instant blood sugar level reader with 10 free test strips included.',
    isGeneric: false,
    dosage: 'Kit',
    manufacturer: 'Accu-Chek Instant'
  },
  {
    id: 'm9',
    name: 'Atorvastatin 10mg',
    category: 'tablets',
    form: 'Tablet',
    price: 82,
    availability: 'Available in 2 Hours',
    description: 'Lipid-lowering drug to prevent cardiovascular diseases and lower cholesterol.',
    isGeneric: true,
    genericName: 'Atorvastatin',
    dosage: '10mg',
    manufacturer: 'Sun Pharma'
  },
  {
    id: 'm10',
    name: 'Moisturizing Aloe Vera Skin Cream',
    category: 'skin',
    form: 'Cream',
    price: 180,
    availability: 'In Stock',
    description: 'Calming and cooling herbal lotion for standard daily dry skin relief.',
    isGeneric: false,
    dosage: '150ml',
    manufacturer: 'Nivea'
  },
  {
    id: 'm11',
    name: 'Nebulizer Compressor Kit',
    category: 'equipment',
    form: 'Device',
    price: 1450,
    availability: 'In Stock',
    description: 'Durable aerosol therapy device for kids and adults suffering from asthma or bronchitis.',
    isGeneric: false,
    dosage: '1 Unit',
    manufacturer: 'Omron'
  },
  {
    id: 'm12',
    name: 'Multivitamin & Minerals Softgels',
    category: 'supplements',
    form: 'Capsule',
    price: 150,
    availability: 'In Stock',
    description: 'Premium formulation with essential minerals, antioxidants, and trace elements.',
    isGeneric: false,
    dosage: '15 Softgels',
    manufacturer: 'Ranbaxy'
  },
  {
    id: 'm13',
    name: 'Cetirizine Hydrochloride 10mg',
    category: 'tablets',
    form: 'Tablet',
    price: 18,
    availability: 'In Stock',
    description: 'Non-drowsy 24-hour antihistamine for seasonal allergy, runny nose, and sneezing relief.',
    isGeneric: true,
    genericName: 'Cetirizine',
    dosage: '10mg',
    manufacturer: 'Cipla Ltd'
  },
  {
    id: 'm14',
    name: 'Orthopedic Knee Support Cap',
    category: 'skin',
    form: 'Other',
    price: 320,
    availability: 'In Stock',
    description: 'Flexible knee sleeve offering warmth and consistent joint compression during physical activity.',
    isGeneric: false,
    dosage: 'Medium Size',
    manufacturer: 'Flamingo'
  }
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    title: 'Prescription Medicines',
    description: 'Providing genuine life-saving Rx drugs strictly under medical guidance.',
    detailedDescription: 'We stock a extensive library of ethical drugs, cardiac medicines, diabetic formulations, antibiotics, and neuro-care medication. Our experienced staff carefully reviews prescriptions to ensure exact dispensing and dosage matches.',
    iconName: 'FileText',
    benefits: ['100% Genuine batch certification', 'Cold-chain storage maintained for temperature-sensitive drugs', 'Substitute guidance with generic equivalents to save costs']
  },
  {
    id: 's2',
    title: 'General & OTC Medicines',
    description: 'Vast selection of over-the-counter pain-killers, antacids, cold medicines, and first-aid kits.',
    detailedDescription: 'Find immediate relief formulations for daily issues like common colds, acidity, muscle pain, indigestion, or superficial cuts. Our OTC counter is managed by trained advisors who can recommend standard, safe household products.',
    iconName: 'Shield',
    benefits: ['Highly trusted household formulations', 'All emergency first-aid needs in one place', 'Authentic medicines with explicit expiry checks']
  },
  {
    id: 's3',
    title: 'Health & Dietary Supplements',
    description: 'Protein powders, prenatal vitamins, immunity-boosting chewables, and daily health boosters.',
    detailedDescription: 'Fuel your active lifestyle with high-quality nutrients. We stock international and national health supplement brands with proven safety standards—ranging from calcium tablets to protein supplements for fitness lovers.',
    iconName: 'PlusCircle',
    benefits: ['Vitamins, Minerals, & Specialty wellness kits', 'Premium trusted global brands', 'Expert guidance on safe vitamin pairings']
  },
  {
    id: 's4',
    title: 'Baby & Maternal Care',
    description: 'Infant formulas, hypoallergenic baby skincare, organic baby wipes, feeding bottles, and maternal tonics.',
    detailedDescription: 'Prioritize your child’s health. We provide dermatologist-tested newborn skincare lines, premium infant baby foods, diapers, breast pads, and wellness tonics to support mothers before and after delivery.',
    iconName: 'Baby',
    benefits: ['Dermatologist-tested, skin-safe baby products', 'A-grade baby formulas and milks always in stock', 'Complete maternal physical support kits']
  },
  {
    id: 's5',
    title: 'Skincare & Personal Care',
    description: 'Medicated acne creams, herbal body lotions, hair-fall therapy kits, and clinical hygiene products.',
    detailedDescription: 'We host a beautiful personal care section that caters to medical cosmetics, face washes, premium organic soaps, and personal grooming items. Every item is verified against harsh chemical formulas.',
    iconName: 'Sparkles',
    benefits: ['Hypoallergenic medical cosmetics', 'Trusted solutions for hair-care, oral-hygiene & skin-care', 'Regular stock updates for high-demand personal hygiene']
  },
  {
    id: 's6',
    title: 'Medical Equipment & Devices',
    description: 'Blood pressure cuffs, digital glucometers, nebulizers, pulse oximeters, and orthopedic supports.',
    detailedDescription: 'Equip your home with easy-to-use vital monitors. We feature Omron BP machines, Accu-Check sugar testers, lightweight steam inhalers, cervical collars, lumbar belts, and walking canes for elders.',
    iconName: 'Activity',
    benefits: ['Original manufacturer warrantied hardware', 'Complimentary calibration check in-store', 'Full range of orthopedic support straps']
  },
  {
    id: 's7',
    title: 'Surgical & First Aid Supplies',
    description: 'Gauzes, adhesive bandages, antiseptic solutions, cotton rolls, surgical gloves, and scalpels.',
    detailedDescription: 'Supporting local Gaya clinics and home care setups with reliable surgical disposables, sterile bandages, antiseptics, and safety gears.',
    iconName: 'Scissors',
    benefits: ['Strict medical-grade sterile packaging', 'Bulk availability for local Gaya clinics', 'Complete surgical disposables catalog']
  },
  {
    id: 's8',
    title: 'Diabetic & Chronic Care Care',
    description: 'Specialized low-glycemic foods, daily test strips, insulin syringe needles, and sugar-free syrups.',
    detailedDescription: 'Manage long-term conditions with precision. Our dedicated diabetic care desk keeps records of patient cycles, offers reminders, and maintains deep inventory of insulin and checking strips.',
    iconName: 'Thermometer',
    benefits: ['Comprehensive diabetic companion items', 'Cooling storage for high-quality insulin vials', 'Subscription packages for chronic medications']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'r1',
    name: 'Sanjeev Kumar Singh',
    rating: 5,
    text: 'New Mantu Pharma is my go-to medical store in Gaya. The staff is extremely knowledgeable, and they always have the prescription medicines which other pharmacies usually tell me to wait for. Highly recommended!',
    date: 'June 18, 2026',
    role: 'Gaya Local Resident',
    verified: true
  },
  {
    id: 'r2',
    name: 'Dr. Ritesh Ranjan',
    rating: 5,
    text: 'I trust New Mantu Pharma for all surgical supplies and patient drugs. They maintain strict cold chain storage for critical vaccines and insulins, which is very rare in the Tekari Road area. Excellent store standards.',
    date: 'May 04, 2026',
    role: 'General Physician',
    verified: true
  },
  {
    id: 'r3',
    name: 'Priyanka Sen',
    rating: 5,
    text: 'Ordering via WhatsApp is a breeze. I just snap a photo of my grandmother\'s prescription, send it over, and they confirm the total price immediately. The medication is always 100% authentic and packaged carefully.',
    date: 'July 01, 2026',
    role: 'Homemaker, AP Colony',
    verified: true
  },
  {
    id: 'r4',
    name: 'Ajeet Kumar Mishra',
    rating: 4,
    text: 'Fair prices, authentic products, and fast counter service. They also guided me toward high-quality generic options which saved me nearly 40% on my daily blood pressure and diabetes medicines.',
    date: 'April 22, 2026',
    role: 'Retired Government Officer',
    verified: true
  },
  {
    id: 'r5',
    name: 'Neha Verma',
    rating: 5,
    text: 'Amazing collection of baby products like Himalaya creams, diapers, and baby milk formula. The shop owner Mantu ji is very respectful and helps elderly people get their medicines quickly directly in their vehicles.',
    date: 'June 29, 2026',
    role: 'Mother of 1-year-old',
    verified: true
  },
  {
    id: 'r6',
    name: 'Md. Imran',
    rating: 5,
    text: 'Very reliable service on Tekari Road. They are transparent about medicine expiry dates and don\'t push unnecessary expensive brands. I am their regular customer for the last 8 years.',
    date: 'February 12, 2026',
    role: 'Business Owner',
    verified: true
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'f1',
    question: 'What are the store operating hours for New Mantu Pharma?',
    answer: 'Our physical store at Tekari Road, Gaya is open from Monday to Saturday between 08:00 AM and 10:00 PM, and on Sundays from 09:00 AM to 08:00 PM. We are also available 24/7 on call for urgent emergency medicine requests.',
    category: 'Store'
  },
  {
    id: 'f2',
    question: 'Do you deliver medicines nearby in Gaya, Bihar?',
    answer: 'Yes! We offer convenient local doorstep delivery for prescriptions and healthcare essentials. Delivery is free for orders above ₹500 within a 2 km radius of Tekari Road, Gaya. For distant areas, a nominal delivery fee might apply.',
    category: 'Services'
  },
  {
    id: 'f3',
    question: 'How can I order medicines online or via WhatsApp?',
    answer: 'Ordering is extremely simple. Use our WhatsApp Order Form on this website. Fill in your name, address, medicines required, and upload your prescription. Click "Send via WhatsApp", and it will format a beautiful text to send directly to us on +91 99340 23219. We will confirm the price and deliver right away!',
    category: 'Orders'
  },
  {
    id: 'f4',
    question: 'Is a medical prescription mandatory for all medicines?',
    answer: 'A valid prescription signed by a registered practitioner is strictly mandatory for Schedule H, H1, and X drugs (such as strong antibiotics, psychiatric medicines, and chronic heart conditions). Standard Over-The-Counter (OTC) medicines, baby items, and vitamins do not require a prescription.',
    category: 'Medicines'
  },
  {
    id: 'f5',
    question: 'How do you guarantee that your medicines are 100% genuine?',
    answer: 'We source all our stocks directly from authorized pharmaceutical distributors and authorized manufacturer stockists. We strictly verify batches, hold active drug licenses, maintain cold chain temperature controls, and issue official GST invoices with clear expiry details.',
    category: 'Medicines'
  },
  {
    id: 'f6',
    question: 'Can I return or exchange purchased medications?',
    answer: 'Medicines can be returned or exchanged within 7 days of purchase, provided they are in their original sealed packing, not damaged, and accompanied by the original purchase invoice. However, refrigerated medicines and specialty injections cannot be returned due to strict safety regulations.',
    category: 'Orders'
  },
  {
    id: 'f7',
    question: 'Do you offer special discounts for senior citizens?',
    answer: 'Yes, we respect our senior citizens. We offer a flat discount on chronic care medications (heart, diabetes, asthma, thyroid) for senior patients. Please mention or ask our billing staff during purchase or when ordering via WhatsApp.',
    category: 'Services'
  },
  {
    id: 'f8',
    question: 'Do you keep medical monitors and orthopedic supports in stock?',
    answer: 'Absolutely! We stock a premium range of home care medical devices, including digital BP monitors, Glucometers, Nebulizers, Pulse Oximeters, Infrared Thermometers, as well as orthopedic supports (knee caps, ankle braces, belts, and collars) from top brands.',
    category: 'Store'
  },
  {
    id: 'f9',
    question: 'What if a prescribed medicine is out of stock?',
    answer: 'If any specialty medicine is out of stock, our team can arrange it from our central stockist network within 2 to 24 hours. You can drop us a photo of the prescription on WhatsApp, and we will keep the medicines ready for you before your physical visit.',
    category: 'Services'
  },
  {
    id: 'f10',
    question: 'What payment modes do you accept at the store and during delivery?',
    answer: 'We accept all major payment modes: Cash, UPI (PhonePe, Google Pay, Paytm, BHIM), Credit/Debit Cards, and Net Banking. For home delivery, you can easily pay via UPI scan once your medicines arrive safely.',
    category: 'Orders'
  }
];

export const HEALTH_TIPS: BlogTip[] = [
  {
    id: 'b1',
    title: '5 Crucial Rules for Safe Medicine Intake',
    category: 'Medicine Safety',
    snippet: 'Taking medicines correctly is vital for your health. Learn why timing, water quantity, and avoiding self-medication save lives.',
    content: '1. Never skip doses: For antibiotics and chronic care, skipping doses leads to resistance.\n2. Water over soda/tea: Always take tablets with a full glass of plain water. Tea, coffee, or milk can bind with active compounds and reduce efficiency.\n3. Keep original packaging: Storing tablets cut out from strips often hides expiry details.\n4. Avoid self-medication: Standard painkillers or antibiotics shouldn\'t be popped without a doctor\'s approval.\n5. Follow exact instructions: If a medicine says "Before Food" (empty stomach), take it at least 30-40 minutes before your meal.',
    date: 'July 10, 2026',
    readTime: '3 min read',
    author: 'Mantu Kumar (Pharmacist)',
    tag: 'Safety'
  },
  {
    id: 'b2',
    title: 'Managing Blood Pressure Naturally at Home',
    category: 'Lifestyle',
    snippet: 'Hypertension is a silent killer. Discover effective daily habits to monitor and keep your blood pressure within safe ranges.',
    content: '1. Check regularly: Maintain a daily log of blood pressure in the morning and evening using a digital monitor.\n2. Restrict daily sodium: Limit salt intake to less than 1 teaspoon (5g) per day.\n3. Increase potassium: Include bananas, green leafy vegetables, and coconut water in your daily diet.\n4. Stay active: 30 minutes of brisk walking on Tekari road or in a park reduces cardiac pressure.\n5. Avoid chronic stress: Practice 10 minutes of deep-breathing exercises daily.',
    date: 'June 25, 2026',
    readTime: '4 min read',
    author: 'Dr. S. K. Pathak',
    tag: 'Heart Care'
  },
  {
    id: 'b3',
    title: 'Understanding Generic vs. Branded Medicines',
    category: 'Smart Savings',
    snippet: 'Are cheap generic medicines safe? We break down the myths and explain why generic medicines offer identical clinical results.',
    content: '1. What are generic medicines? A generic drug is a medication created to be the same as an already marketed brand-name drug in dosage form, safety, strength, route of administration, and quality.\n2. Why are they cheaper? Generic manufacturers don\'t have high research and drug development marketing budgets, allowing them to sell at 30% to 80% lower cost.\n3. Is the quality identical? Yes, generic formulations undergo rigorous bio-equivalence tests to match the efficacy of branded counterpart.',
    date: 'May 14, 2026',
    readTime: '5 min read',
    author: 'New Mantu Pharma Advisor',
    tag: 'Education'
  }
];

export const STORE_TIMELINE = [
  { year: '1998', title: 'Humble Beginnings', description: 'Established a small local medical shop in Tekari Road, Gaya to deliver authentic medicines.' },
  { year: '2005', title: 'Community Trust', description: 'Expanded chemical store to include clinical supplies, orthopedics, and baby care to serve thousands of families.' },
  { year: '2015', title: 'Modern Upgrades', description: 'Upgraded infrastructure with computerized billing, temperature controlled storage, and vaccine refrigerators.' },
  { year: '2022', title: 'Digital Support', description: 'Launched 2-hour rapid delivery in Gaya and direct WhatsApp medicine ordering support.' }
];

export const OFFERS_AND_DISCOUNTS = [
  { id: 'o1', title: 'Senior Citizen Care', description: 'Flat discount on monthly chronic heart & diabetes medicines for patients above 60 years.', badge: 'Elders Special' },
  { id: 'o2', title: 'Baby Nutrition Package', description: 'Get special bundle pricing on infant milk powders, baby soaps, and premium skincare products.', badge: 'Happy Baby' },
  { id: 'o3', title: 'Free Home Delivery', description: 'Free rapid door delivery on all medicine orders exceeding ₹500 within Gaya city limits.', badge: 'Fast Service' }
];
