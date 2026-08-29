// Centralized Doctors and Departments Master Data

export const DEPARTMENTS = [
  { value: '', labelEn: 'All Departments', labelBn: 'সকল বিভাগ' },
  { value: 'cardiac surgery', labelEn: 'Cardiac Surgery', labelBn: 'কার্ডিয়াক সার্জারি' },
  { value: 'cardiology', labelEn: 'Cardiology', labelBn: 'কার্ডিওলজি' },
  { value: 'ent', labelEn: 'ENT (Ear, Nose, Throat)', labelBn: 'ইএনটি (নাক, কান, গলা)' },
  { value: 'pediatrics', labelEn: 'Pediatrics', labelBn: 'শিশু বিভাগ' },
  { value: 'orthopedics', labelEn: 'Orthopedics', labelBn: 'অর্থোপেডিক্স' },
  { value: 'neurology', labelEn: 'Neurology', labelBn: 'নিউরোলজি' },
  { value: 'oncology', labelEn: 'Oncology', labelBn: 'অনকোলজি' },
  { value: 'internal medicine', labelEn: 'Internal Medicine', labelBn: 'ইন্টারনাল মেডিসিন' },
  { value: 'gynecology', labelEn: 'Gynecology & Obstetrics', labelBn: 'স্ত্রীরোগ ও প্রসূতিবিদ্যা' },
  { value: 'dermatology', labelEn: 'Dermatology', labelBn: 'চর্ম ও যৌন রোগ' },
  { value: 'gastroenterology', labelEn: 'Gastroenterology', labelBn: 'গ্যাস্ট্রোএন্টারোলজি' }
]

export const DEPARTMENT_DETAILS = {
  'cardiac surgery': {
    titleEn: 'Cardiac Surgery & Cardiothoracic Specialists',
    titleBn: 'কার্ডিয়াক সার্জারি ও থোরাসিক বিশেষজ্ঞ টিম',
    descEn: 'Pioneering open-heart surgery, coronary artery bypass (CABG), valve repairs, and minimally invasive cardiothoracic procedures with world-class surgical intensive care.',
    descBn: 'উন্নত ওপেন-হার্ট সার্জারি, করোনারি আর্টারি বাইপাস (CABG), ভালভ প্রতিস্থাপন এবং আধুনিক কার্ডিয়াক ইনটেনসিভ কেয়ার সম্বলিত বিশেষায়িত বিভাগ।',
    highlights: ['24/7 Dedicated Cardiac OT', 'Minimally Invasive Valve Repair', 'Pediatric & Adult Cardiac Surgery', 'Post-Op Cardiac ICU']
  },
  'cardiology': {
    titleEn: 'Cardiology & Heart Care Specialists',
    titleBn: 'কার্ডিওলজি ও হৃদরোগ বিশেষজ্ঞ টিম',
    descEn: 'Comprehensive non-invasive & interventional cardiovascular care, 24/7 emergency catheterization lab, primary angioplasty, pacemaker implantations, and advanced ECG diagnostics.',
    descBn: '২৪/৭ জরুরি ক্যাথ ল্যাব, প্রাইমারি এনজিওপ্লাস্টি, পেসমেকার স্থাপন এবং জটিল হৃদরোগ চিকিৎসায় অভিজ্ঞ আন্তর্জাতিক মানের কার্ডিওলজি বিশেষজ্ঞগণ।',
    highlights: ['24/7 Emergency Cath Lab', 'Primary Angioplasty (PCI)', 'Echocardiography & TMT', 'Heart Failure Clinic']
  },
  'ent': {
    titleEn: 'ENT, Head & Neck Surgery Specialists',
    titleBn: 'ইএনটি (নাক, কান, গলা) ও হেড-নেক বিশেষজ্ঞ টিম',
    descEn: 'State-of-the-art endoscopic sinus surgeries, microscopic ear procedures, sleep apnea therapies, and advanced head and neck oncological management.',
    descBn: 'এন্ডোস্কোপিক সাইনাস সার্জারি, মাইক্রোস্কোপিক ইয়ার সার্জারি, স্লিপ অ্যাপনিয়া এবং নাক-কান-গলার উন্নত চিকিৎসায় নিবেদিত বিশেষজ্ঞ দল।',
    highlights: ['Endoscopic Sinus Surgery', 'Micro-Ear & Hearing Lab', 'Snoring & Sleep Apnea Clinic', 'Head-Neck Cancer Surgery']
  },
  'pediatrics': {
    titleEn: 'Pediatrics & Neonatal Care Specialists',
    titleBn: 'শিশু বিভাগ ও নবজাতক নিবিড় পরিচর্যা টিম',
    descEn: 'Specialized neonatal intensive care (NICU), pediatric growth development, child immunizations, and round-the-clock emergency pediatric consultation.',
    descBn: 'নবজাতকের নিবিড় পরিচর্যা (NICU), শিশুর সার্বিক বৃদ্ধি ও পুষ্টি পর্যবেক্ষণ, সময়োপযোগী টিকা সূচি ও ২৪ ঘণ্টার শিশু স্বাস্থ্যসেবা।',
    highlights: ['Level-3 Neonatal ICU (NICU)', 'Childhood Immunization Planner', 'Pediatric Emergency Care', 'Growth & Nutrition Clinic']
  },
  'orthopedics': {
    titleEn: 'Orthopedics & Joint Replacement Specialists',
    titleBn: 'অর্থোপেডিক্স ও জয়েন্ট রিপ্লেসমেন্ট বিশেষজ্ঞ টিম',
    descEn: 'Robotic knee and hip arthroplasty, arthroscopic sports injury treatments, complex trauma reconstruction, and specialized musculoskeletal rehabilitation.',
    descBn: 'রোবোটিক হাঁটু ও কোমর প্রতিস্থাপন, স্পোর্টস ইনজুরি ও আর্থ্রোস্কোপি, ফ্র্যাকচার পুনর্গঠন এবং আধুনিক ফিজিওথেরাপি কেয়ার।',
    highlights: ['Robotic Joint Replacement', 'Arthroscopic Sports Surgery', 'Trauma & Fracture Unit', 'Spine & Musculoskeletal Care']
  },
  'neurology': {
    titleEn: 'Neurology & Stroke Care Specialists',
    titleBn: 'নিউরোলজি ও স্ট্রোক কেয়ার বিশেষজ্ঞ টিম',
    descEn: 'Expert management of acute ischemic stroke, epilepsy, Parkinson’s disease, neuromuscular disorders, memory loss, and specialized neuro-rehabilitation.',
    descBn: 'তীব্র স্ট্রোক ব্যবস্থাপনা, মৃগীরোগ, পারকিনসন্স, মাইগ্রেন ও স্নায়ুতন্ত্রের জটিল রোগের উন্নত ডায়াগনস্টিক ও চিকিৎসা সেবা।',
    highlights: ['24/7 Acute Stroke Care', 'EEG & EMG Neuro Lab', 'Epilepsy & Headache Clinic', 'Neuro-Rehabilitation Center']
  },
  'oncology': {
    titleEn: 'Medical Oncology & Cancer Specialists',
    titleBn: 'অনকোলজি ও ক্যান্সার কেয়ার বিশেষজ্ঞ টিম',
    descEn: 'Evidence-based multidisciplinary cancer therapies, chemotherapy daycare, targeted immunotherapy, tumor boards, and compassionate palliative support.',
    descBn: 'আন্তর্জাতিক প্রোটোকল অনুযায়ী সমন্বিত ক্যান্সার চিকিৎসা, কেমোথেরাপি ডে-কেয়ার, টার্গেটেড ইমিউনোথেরাপি ও প্যালিয়েটিভ কেয়ার।',
    highlights: ['Chemotherapy Daycare Unit', 'Targeted Immunotherapy', 'Multidisciplinary Tumor Board', 'Palliative & Pain Support']
  },
  'internal medicine': {
    titleEn: 'Internal Medicine & Physician Specialists',
    titleBn: 'ইন্টারনাল মেডিসিন ও জেনারেল ফিজিশিয়ান টিম',
    descEn: 'Holistic adult medical care, complex diabetes management, uncontrolled hypertension, multisystem infectious diseases, and preventative wellness screening.',
    descBn: 'প্রাপ্তবয়স্কদের সকল জটিল শারীরিক অসুস্থতা, অনিয়ন্ত্রিত ডায়াবেটিস, উচ্চ রক্তচাপ এবং সংক্রামক ব্যাধির সমন্বিত নির্ভরযোগ্য চিকিৎসা।',
    highlights: ['Comprehensive Diabetes Care', 'Hypertension & Lipid Clinic', 'Infectious Disease Unit', 'Executive Health Checkups']
  },
  'gynecology': {
    titleEn: 'Gynecology, Obstetrics & Women’s Health',
    titleBn: 'স্ত্রীরোগ, প্রসূতিবিদ্যা ও নারী স্বাস্থ্য বিশেষজ্ঞ টিম',
    descEn: 'High-risk pregnancy management, modern labor suites, laparoscopic gynecological surgery, infertility evaluations, and women’s wellness checkups.',
    descBn: 'উচ্চ ঝুঁকিপূর্ণ গর্ভকালীন যত্ন, আধুনিক লেবার স্যুট, মিনিমালি ইনভেসিভ ল্যাপারোস্কোপিক সার্জারি ও বন্ধ্যাত্ব চিকিৎসা বিশেষজ্ঞ দল।',
    highlights: ['High-Risk Maternity Care', 'Modern Labor & Delivery Suites', 'Laparoscopic Gynae Surgery', 'Infertility Counseling']
  },
  'dermatology': {
    titleEn: 'Dermatology, Laser & Cosmetology Specialists',
    titleBn: 'চর্ম, লেজার ও কসমেটোলজি বিশেষজ্ঞ টিম',
    descEn: 'Comprehensive clinical dermatology, advanced medical laser treatments, chronic eczema and psoriasis management, acne scar therapies, and pediatric skin care.',
    descBn: 'ক্লিনিক্যাল চর্মরোগ, আধুনিক লেজার ট্রিটমেন্ট, একজিমা, সোরিয়াসিস ও অ্যালার্জির চিকিৎসায় আন্তর্জাতিক মানের ডার্মাটোলজি কেয়ার।',
    highlights: ['Clinical Dermatology Clinic', 'Advanced Medical Laser Unit', 'Psoriasis & Eczema Management', 'Pediatric Skin Care']
  },
  'gastroenterology': {
    titleEn: 'Gastroenterology, Hepatology & Endoscopy Specialists',
    titleBn: 'গ্যাস্ট্রোএন্টারোলজি, হেপাটোলজি ও এন্ডোস্কোপি বিশেষজ্ঞ টিম',
    descEn: 'Cutting-edge diagnostic and therapeutic upper/lower GI endoscopy, ERCP, liver disease management, inflammatory bowel disease (IBD), and metabolic digestive health.',
    descBn: 'উন্নত ডায়াগনস্টিক ও থেরাপিউটিক এন্ডোস্কোপি, কোলোনোস্কোপি, ইআরসিপি এবং লিভার ও পাচনতন্ত্রের জটিল রোগের নির্ভরযোগ্য চিকিৎসা।',
    highlights: ['Diagnostic & Therapeutic Endoscopy', 'ERCP & Liver Care Unit', 'IBD & Acid Peptic Clinic', 'GI Motility Lab']
  }
}

export const DOCTORS_DATA = [
  {
    id: 1,
    nameEn: 'Dr. Jahangir Kabir',
    nameBn: 'ডা. জাহাঙ্গীর কবির',
    deptKey: 'cardiac surgery',
    deptNameEn: 'Cardiac Surgery',
    deptNameBn: 'কার্ডিয়াক সার্জারি',
    titleEn: 'Chief Cardiac Surgeon & Senior Consultant',
    titleBn: 'প্রধান কার্ডিয়াক সার্জন ও সিনিয়র কনসালট্যান্ট',
    qualification: 'MBBS, MS (CTS), FRCS (Edin)',
    experienceEn: '18 Years Experience',
    experienceBn: '১৮ বছরের অভিজ্ঞতা',
    roomEn: 'Room 402, East Wing',
    roomBn: 'রুম ৪০২, ইস্ট উইং',
    rating: '4.9',
    reviewsCount: 312,
    feeAmount: 1500,
    feeEn: '৳ 1,500',
    feeBn: '৳ ১,৫০০',
    bioEn: 'Pioneer cardiac surgeon with over 5,000 successful bypass and valve surgeries.',
    bioBn: '৫,০০০ এরও বেশি সফল বাইপাস এবং ভালভ সার্জারির অভিজ্ঞতা সম্পন্ন প্রখ্যাত কার্ডিয়াক সার্জন।',
    availableDays: [0, 1, 3, 4], // Sun, Mon, Wed, Thu
    timeSlots: [
      { time: '09:30 AM', available: true },
      { time: '10:30 AM', available: true },
      { time: '11:45 AM', available: false },
      { time: '02:00 PM', available: true },
      { time: '03:30 PM', available: true },
      { time: '05:00 PM', available: false }
    ]
  },
  {
    id: 2,
    nameEn: 'Dr. Md. Sayedur Rahman Khan',
    nameBn: 'ডা. মো. সাইয়েদুর রহমান খান',
    deptKey: 'cardiac surgery',
    deptNameEn: 'Cardiac Surgery',
    deptNameBn: 'কার্ডিয়াক সার্জারি',
    titleEn: 'Senior Consultant, Minimally Invasive Cardiac Surgery',
    titleBn: 'সিনিয়র কনসালট্যান্ট, মিনিমালি ইনভেসিভ সার্জারি',
    qualification: 'MBBS, FCPS (Surgery), MS (Cardiothoracic)',
    experienceEn: '15 Years Experience',
    experienceBn: '১৫ বছরের অভিজ্ঞতা',
    roomEn: 'Room 405, East Wing',
    roomBn: 'রুম ৪০৫, ইস্ট উইং',
    rating: '4.8',
    reviewsCount: 245,
    feeAmount: 1200,
    feeEn: '৳ 1,200',
    feeBn: '৳ ১,২০০',
    bioEn: 'Specialist in minimally invasive aortic and coronary artery bypass procedures.',
    bioBn: 'মিনিমালি ইনভেসিভ এওর্টিক ও করোনারি আর্টারি বাইপাস চিকিৎসায় দক্ষ বিশেষজ্ঞ।',
    availableDays: [1, 2, 4, 6], // Mon, Tue, Thu, Sat
    timeSlots: [
      { time: '10:00 AM', available: true },
      { time: '11:30 AM', available: true },
      { time: '01:00 PM', available: false },
      { time: '03:00 PM', available: true },
      { time: '04:30 PM', available: true }
    ]
  },
  {
    id: 3,
    nameEn: 'Dr. Mirza Abul Kalam Mohiuddin',
    nameBn: 'ডা. মির্জা আবুল কালাম মহিউদ্দিন',
    deptKey: 'cardiac surgery',
    deptNameEn: 'Cardiac Surgery',
    deptNameBn: 'কার্ডিয়াক সার্জারি',
    titleEn: 'Associate Consultant & Pediatric Heart Surgeon',
    titleBn: 'অ্যাসোসিয়েট কনসালট্যান্ট ও শিশু হৃদরোগ সার্জন',
    qualification: 'MBBS, MS (Cardiovascular Surgery)',
    experienceEn: '16 Years Experience',
    experienceBn: '১৬ বছরের অভিজ্ঞতা',
    roomEn: 'Room 410, East Wing',
    roomBn: 'রুম ৪১০, ইস্ট উইং',
    rating: '4.9',
    reviewsCount: 198,
    feeAmount: 1200,
    feeEn: '৳ 1,200',
    feeBn: '৳ ১,২০০',
    bioEn: 'Dedicated to congenital heart defect corrections and pediatric cardiac surgery.',
    bioBn: 'জন্মগত হৃদরোগ নিরাময় এবং শিশু কার্ডিয়াক সার্জারিতে নিবেদিত বিশেষজ্ঞ।',
    availableDays: [0, 2, 3, 5], // Sun, Tue, Wed, Fri
    timeSlots: [
      { time: '09:00 AM', available: true },
      { time: '10:30 AM', available: true },
      { time: '12:00 PM', available: true },
      { time: '04:00 PM', available: false },
      { time: '05:30 PM', available: true }
    ]
  },
  {
    id: 4,
    nameEn: 'Dr. Rezaul Hassan',
    nameBn: 'ডা. রেজাউল হাসান',
    deptKey: 'cardiac surgery',
    deptNameEn: 'Cardiac Surgery',
    deptNameBn: 'কার্ডিয়াক সার্জারি',
    titleEn: 'Consultant, Adult Cardiac & Thoracic Surgery',
    titleBn: 'কনসালট্যান্ট, অ্যাডাল্ট কার্ডিয়াক ও থোরাসিক সার্জারি',
    qualification: 'MBBS, FCPS (Surgery), FACS',
    experienceEn: '12 Years Experience',
    experienceBn: '১২ বছরের অভিজ্ঞতা',
    roomEn: 'Room 412, East Wing',
    roomBn: 'রুম ৪১২, ইস্ট উইং',
    rating: '4.7',
    reviewsCount: 160,
    feeAmount: 1000,
    feeEn: '৳ 1,000',
    feeBn: '৳ ১,০০০',
    bioEn: 'Expertise in thoracic emergency trauma care and advanced cardiac life support.',
    bioBn: 'থোরাসিক ইমার্জেন্সি ট্রমা কেয়ার এবং অ্যাডভান্সড কার্ডিয়াক কেয়ারে অভিজ্ঞ।',
    availableDays: [1, 3, 4, 6], // Mon, Wed, Thu, Sat
    timeSlots: [
      { time: '10:00 AM', available: true },
      { time: '11:00 AM', available: false },
      { time: '02:30 PM', available: true },
      { time: '03:45 PM', available: true },
      { time: '05:00 PM', available: true }
    ]
  },
  {
    id: 5,
    nameEn: 'Dr. Evelyn Ross',
    nameBn: 'ডা. এভলিন রস',
    deptKey: 'cardiology',
    deptNameEn: 'Cardiology',
    deptNameBn: 'কার্ডিওলজি',
    titleEn: 'Senior Interventional Cardiologist',
    titleBn: 'সিনিয়র ইন্টারভেনশনাল কার্ডিওলজিস্ট',
    qualification: 'MBBS, MD (Cardiology), FACC',
    experienceEn: '14 Years Experience',
    experienceBn: '১৪ বছরের অভিজ্ঞতা',
    roomEn: 'Room 301, Central Wing',
    roomBn: 'রুম ৩০১, সেন্ট্রাল উইং',
    rating: '4.9',
    reviewsCount: 240,
    feeAmount: 1500,
    feeEn: '৳ 1,500',
    feeBn: '৳ ১,৫০০',
    bioEn: 'Expert in angioplasty, pacemaker implantations, and complex arrhythmias.',
    bioBn: 'এনজিওপ্লাস্টি, পেসমেকার স্থাপন এবং জটিল অ্যারিথমিয়া চিকিৎসায় দক্ষ।',
    availableDays: [0, 1, 2, 3, 4], // Sun-Thu
    timeSlots: [
      { time: '09:00 AM', available: true },
      { time: '10:30 AM', available: true },
      { time: '12:00 PM', available: false },
      { time: '02:00 PM', available: true },
      { time: '03:30 PM', available: true }
    ]
  },
  {
    id: 6,
    nameEn: 'Dr. Tanvir Ahmed Chowdhury',
    nameBn: 'ডা. তানভীর আহমেদ চৌধুরী',
    deptKey: 'ent',
    deptNameEn: 'ENT (Ear, Nose, Throat)',
    deptNameBn: 'ইএনটি (নাক, কান, গলা)',
    titleEn: 'Head & Neck Surgeon, Senior ENT Consultant',
    titleBn: 'হেড অ্যান্ড নেক সার্জন, সিনিয়র ইএনটি কনসালট্যান্ট',
    qualification: 'MBBS, DLO, MS (ENT), FACS',
    experienceEn: '13 Years Experience',
    experienceBn: '১৩ বছরের অভিজ্ঞতা',
    roomEn: 'Room 205, West Wing',
    roomBn: 'রুম ২০৫, ওয়েস্ট উইং',
    rating: '4.9',
    reviewsCount: 215,
    feeAmount: 1200,
    feeEn: '৳ 1,200',
    feeBn: '৳ ১,২০০',
    bioEn: 'Specialist in endoscopic sinus surgery, micro-ear surgeries, and sleep apnea treatment.',
    bioBn: 'এন্ডোস্কোপিক সাইনাস সার্জারি, মাইক্রো-ইয়ার সার্জারি এবং নাক-কান-গলার উন্নত চিকিৎসায় দক্ষ।',
    availableDays: [0, 1, 3, 5], // Sun, Mon, Wed, Fri
    timeSlots: [
      { time: '10:00 AM', available: true },
      { time: '11:30 AM', available: true },
      { time: '03:00 PM', available: true },
      { time: '04:30 PM', available: false },
      { time: '06:00 PM', available: true }
    ]
  },
  {
    id: 7,
    nameEn: 'Dr. Marcus Vance',
    nameBn: 'ডা. মার্কাস ভ্যান্স',
    deptKey: 'pediatrics',
    deptNameEn: 'Pediatrics',
    deptNameBn: 'শিশু বিভাগ',
    titleEn: 'Pediatric Specialist & Neonatologist',
    titleBn: 'শিশু বিশেষজ্ঞ ও নিওনেটোলজিস্ট',
    qualification: 'MBBS, DCH, FCPS (Pediatrics)',
    experienceEn: '10 Years Experience',
    experienceBn: '১০ বছরের অভিজ্ঞতা',
    roomEn: 'Room 105, West Wing',
    roomBn: 'রুম ১০৫, ওয়েস্ট উইং',
    rating: '4.8',
    reviewsCount: 190,
    feeAmount: 1000,
    feeEn: '৳ 1,000',
    feeBn: '৳ ১,০০০',
    bioEn: 'Dedicated to child growth, newborn care, immunization, and pediatric emergencies.',
    bioBn: 'শিশুর বিকাশ, নবজাতকের যত্ন, টিকা প্রদান এবং জরুরি স্বাস্থ্য সেবায় বিশেষজ্ঞ।',
    availableDays: [0, 2, 4, 6], // Sun, Tue, Thu, Sat
    timeSlots: [
      { time: '09:30 AM', available: true },
      { time: '11:00 AM', available: true },
      { time: '02:00 PM', available: false },
      { time: '04:00 PM', available: true }
    ]
  },
  {
    id: 8,
    nameEn: 'Dr. Sarah Jenkins',
    nameBn: 'ডা. সারাহ জেনকিন্স',
    deptKey: 'orthopedics',
    deptNameEn: 'Orthopedics',
    deptNameBn: 'অর্থোপেডিক্স',
    titleEn: 'Senior Orthopedic & Joint Replacement Surgeon',
    titleBn: 'সিনিয়র অর্থোপেডিক ও জয়েন্ট রিপ্লেসমেন্ট সার্জন',
    qualification: 'MBBS, MS (Ortho), Fellowship in Arthroplasty',
    experienceEn: '12 Years Experience',
    experienceBn: '১২ বছরের অভিজ্ঞতা',
    roomEn: 'Room 310, Central Pavilion',
    roomBn: 'রুম ৩১০, সেন্ট্রাল প্যাভিলিয়ন',
    rating: '4.9',
    reviewsCount: 310,
    feeAmount: 1200,
    feeEn: '৳ 1,200',
    feeBn: '৳ ১,২০০',
    bioEn: 'Specializes in robotic knee/hip replacement, sports injuries, and fracture management.',
    bioBn: 'রোবোটিক হাঁটু ও কোমর প্রতিস্থাপন, স্পোর্টস ইনজুরি ও ফ্র্যাকচার চিকিৎসায় অগ্রণী সার্জন।',
    availableDays: [1, 2, 3, 5], // Mon, Tue, Wed, Fri
    timeSlots: [
      { time: '10:00 AM', available: true },
      { time: '11:30 AM', available: true },
      { time: '03:00 PM', available: true },
      { time: '04:30 PM', available: false }
    ]
  },
  {
    id: 9,
    nameEn: 'Dr. Robert Pierce',
    nameBn: 'ডা. রবার্ট পিয়ার্স',
    deptKey: 'neurology',
    deptNameEn: 'Neurology',
    deptNameBn: 'নিউরোলজি',
    titleEn: 'Consultant Neurologist & Stroke Specialist',
    titleBn: 'কনসালট্যান্ট নিউরোলজিস্ট ও স্ট্রোক বিশেষজ্ঞ',
    qualification: 'MBBS, FCPS (Medicine), MD (Neurology)',
    experienceEn: '15 Years Experience',
    experienceBn: '১৫ বছরের অভিজ্ঞতা',
    roomEn: 'Room 202, North Wing',
    roomBn: 'রুম ২০২, নর্থ উইং',
    rating: '4.7',
    reviewsCount: 180,
    feeAmount: 1500,
    feeEn: '৳ 1,500',
    feeBn: '৳ ১,৫০০',
    bioEn: 'Clinical expertise in stroke rehabilitation, epilepsy, Parkinson disease, and migraines.',
    bioBn: 'স্ট্রোক পুনর্বাসন, মৃগীরোগ, পারকিনসন্স ও মাইগ্রেনের চিকিৎসায় অভিজ্ঞ চিকিৎসক।',
    availableDays: [0, 1, 3, 5], // Sun, Mon, Wed, Fri
    timeSlots: [
      { time: '09:00 AM', available: true },
      { time: '11:00 AM', available: true },
      { time: '02:30 PM', available: true },
      { time: '04:00 PM', available: true }
    ]
  },
  {
    id: 10,
    nameEn: 'Dr. Alice Morgan',
    nameBn: 'ডা. এলিস মর্গান',
    deptKey: 'oncology',
    deptNameEn: 'Oncology',
    deptNameBn: 'অনকোলজি',
    titleEn: 'Senior Clinical & Medical Oncologist',
    titleBn: 'সিনিয়র ক্লিনিক্যাল ও মেডিকেল অনকোলজিস্ট',
    qualification: 'MBBS, FCPS (Radiotherapy), ESMO Certified',
    experienceEn: '11 Years Experience',
    experienceBn: '১১ বছরের অভিজ্ঞতা',
    roomEn: 'Room 501, South Wing',
    roomBn: 'রুম ৫০১, সাউথ উইং',
    rating: '4.9',
    reviewsCount: 220,
    feeAmount: 1500,
    feeEn: '৳ 1,500',
    feeBn: '৳ ১,৫০০',
    bioEn: 'Comprehensive cancer management, immunotherapy, targeted therapy, and chemotherapy.',
    bioBn: 'ক্যান্সার কেমোথেরাপি, ইমিউনোথেরাপি এবং টার্গেটেড থেরাপিতে বিশেষ দক্ষ বিশেষজ্ঞ।',
    availableDays: [1, 2, 4, 6], // Mon, Tue, Thu, Sat
    timeSlots: [
      { time: '10:30 AM', available: true },
      { time: '12:00 PM', available: true },
      { time: '03:00 PM', available: false },
      { time: '05:00 PM', available: true }
    ]
  },
  {
    id: 11,
    nameEn: 'Dr. Tariqul Islam',
    nameBn: 'ডা. তরিকুল ইসলাম',
    deptKey: 'internal medicine',
    deptNameEn: 'Internal Medicine',
    deptNameBn: 'ইন্টারনাল মেডিসিন',
    titleEn: 'Senior Consultant Physician',
    titleBn: 'সিনিয়র কনসালট্যান্ট ফিজিশিয়ান',
    qualification: 'MBBS, FCPS (Medicine), MACP (USA)',
    experienceEn: '17 Years Experience',
    experienceBn: '১৭ বছরের অভিজ্ঞতা',
    roomEn: 'Room 102, Central Wing',
    roomBn: 'রুম ১০২, সেন্ট্রাল উইং',
    rating: '4.8',
    reviewsCount: 275,
    feeAmount: 1000,
    feeEn: '৳ 1,000',
    feeBn: '৳ ১,০০০',
    bioEn: 'Specializes in diabetes, complex hypertension, infectious diseases, and multisystem care.',
    bioBn: 'ডায়াবেটিস, উচ্চ রক্তচাপ, সংক্রামক রোগ ও জটিল মেডিসিন সমস্যার নির্ভরযোগ্য বিশেষজ্ঞ।',
    availableDays: [0, 1, 2, 3, 4], // Sun-Thu
    timeSlots: [
      { time: '09:00 AM', available: true },
      { time: '10:30 AM', available: true },
      { time: '12:00 PM', available: true },
      { time: '03:00 PM', available: true },
      { time: '04:30 PM', available: true }
    ]
  },
  {
    id: 12,
    nameEn: 'Dr. Shahana Parveen',
    nameBn: 'ডা. শাহানা পারভীন',
    deptKey: 'gynecology',
    deptNameEn: 'Gynecology & Obstetrics',
    deptNameBn: 'স্ত্রীরোগ ও প্রসূতিবিদ্যা',
    titleEn: 'Senior Consultant Gynecologist & Laparoscopic Surgeon',
    titleBn: 'সিনিয়র কনসালট্যান্ট ও ল্যাপারোস্কোপিক সার্জন',
    qualification: 'MBBS, DGO, FCPS (Obs & Gynae)',
    experienceEn: '14 Years Experience',
    experienceBn: '১৪ বছরের অভিজ্ঞতা',
    roomEn: 'Room 304, South Wing',
    roomBn: 'রুম ৩০৪, সাউথ উইং',
    rating: '4.9',
    reviewsCount: 260,
    feeAmount: 1200,
    feeEn: '৳ 1,200',
    feeBn: '৳ ১,২০০',
    bioEn: 'Expert in high-risk pregnancy care, infertility treatment, and laparoscopic gynecological surgery.',
    bioBn: 'উচ্চ ঝুঁকিপূর্ণ গর্ভধারণ, বন্ধ্যাত্ব চিকিৎসা এবং ল্যাপারোস্কোপিক গাইনোকলজি সার্জারিতে অভিজ্ঞ।',
    availableDays: [0, 2, 3, 5], // Sun, Tue, Wed, Fri
    timeSlots: [
      { time: '10:00 AM', available: true },
      { time: '11:30 AM', available: true },
      { time: '02:30 PM', available: true },
      { time: '04:00 PM', available: false },
      { time: '05:30 PM', available: true }
    ]
  },
  {
    id: 13,
    nameEn: 'Dr. Zubaida Rahman',
    nameBn: 'ডা. জুবাইদা রহমান',
    deptKey: 'dermatology',
    deptNameEn: 'Dermatology',
    deptNameBn: 'চর্ম ও যৌন রোগ',
    titleEn: 'Senior Consultant Dermatologist & Cosmetologist',
    titleBn: 'সিনিয়র কনসালট্যান্ট ডার্মাটোলজিস্ট ও কসমেটোলজিস্ট',
    qualification: 'MBBS, DDV, FCPS (Dermatology)',
    experienceEn: '13 Years Experience',
    experienceBn: '১৩ বছরের অভিজ্ঞতা',
    roomEn: 'Room 208, North Wing',
    roomBn: 'রুম ২০৮, নর্থ উইং',
    rating: '4.9',
    reviewsCount: 210,
    feeAmount: 1200,
    feeEn: '৳ 1,200',
    feeBn: '৳ ১,২০০',
    bioEn: 'Expert in clinical dermatology, acne treatments, laser therapies, eczema, and skin rejuvenation.',
    bioBn: 'ক্লিনিক্যাল চর্মরোগ, একনে, লেজার থেরাপি ও একজিমার আধুনিক চিকিৎসায় দক্ষ বিশেষজ্ঞ।',
    availableDays: [0, 1, 3, 5], // Sun, Mon, Wed, Fri
    timeSlots: [
      { time: '10:00 AM', available: true },
      { time: '11:30 AM', available: true },
      { time: '03:00 PM', available: true },
      { time: '04:30 PM', available: true }
    ]
  },
  {
    id: 14,
    nameEn: 'Prof. Dr. Mahbubur Rahman',
    nameBn: 'অধ্যাপক ডা. মাহবুবুর রহমান',
    deptKey: 'gastroenterology',
    deptNameEn: 'Gastroenterology',
    deptNameBn: 'গ্যাস্ট্রোএন্টারোলজি',
    titleEn: 'Professor & Senior Gastroenterologist',
    titleBn: 'অধ্যাপক ও সিনিয়র গ্যাস্ট্রোএন্টারোলজিস্ট',
    qualification: 'MBBS, MD (Gastroenterology), FACG (USA)',
    experienceEn: '20 Years Experience',
    experienceBn: '২০ বছরের অভিজ্ঞতা',
    roomEn: 'Room 401, Central Wing',
    roomBn: 'রুম ৪০১, সেন্ট্রাল উইং',
    rating: '4.9',
    reviewsCount: 340,
    feeAmount: 1500,
    feeEn: '৳ 1,500',
    feeBn: '৳ ১,৫০০',
    bioEn: 'Renowned specialist in therapeutic endoscopy, liver cirrhosis, chronic hepatitis, and IBD.',
    bioBn: 'থেরাপিউটিক এন্ডোস্কোপি, ক্রনিক হেপাটাইটিস, লিভার ও আইবিডি চিকিৎসায় আন্তর্জাতিক খ্যাতিসম্পন্ন বিশেষজ্ঞ।',
    availableDays: [0, 2, 4, 6], // Sun, Tue, Thu, Sat
    timeSlots: [
      { time: '09:30 AM', available: true },
      { time: '11:00 AM', available: true },
      { time: '02:30 PM', available: true },
      { time: '04:00 PM', available: true }
    ]
  }
]

// Doctor Realistic Images Map
const DOCTOR_IMAGES = {
  1: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=80',
  2: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&auto=format&fit=crop&q=80',
  3: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&auto=format&fit=crop&q=80',
  4: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&auto=format&fit=crop&q=80',
  5: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=80',
  6: 'https://images.unsplash.com/photo-1594824813596-78b17e47190e?w=600&auto=format&fit=crop&q=80',
  7: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
  8: 'https://images.unsplash.com/photo-1594824813589-9831969e6b72?w=600&auto=format&fit=crop&q=80',
  9: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=600&auto=format&fit=crop&q=80',
  10: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&auto=format&fit=crop&q=80',
  11: 'https://images.unsplash.com/photo-1622253694242-abdf3d85bc97?w=600&auto=format&fit=crop&q=80',
  12: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&auto=format&fit=crop&q=80',
  13: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop&q=80',
  14: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=80'
}

// Helper to get localized doctor object
export const getLocalizedDoctor = (doctor, lang = 'en') => {
  if (!doctor) return null
  return {
    ...doctor,
    image: doctor.image || DOCTOR_IMAGES[doctor.id] || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&auto=format&fit=crop&q=80',
    name: lang === 'bn' ? doctor.nameBn : doctor.nameEn,
    department: lang === 'bn' ? doctor.deptNameBn : doctor.deptNameEn,
    deptName: lang === 'bn' ? doctor.deptNameBn : doctor.deptNameEn,
    title: lang === 'bn' ? doctor.titleBn : doctor.titleEn,
    experience: lang === 'bn' ? doctor.experienceBn : doctor.experienceEn,
    room: lang === 'bn' ? doctor.roomBn : doctor.roomEn,
    bio: lang === 'bn' ? doctor.bioBn : doctor.bioEn,
    fee: lang === 'bn' ? (doctor.feeBn || '৳ ১,২০০') : (doctor.feeEn || `৳ ${(doctor.feeAmount || 1200).toLocaleString('en-US')}`),
    initials: doctor.nameEn
      .replace(/(Dr\.|Prof\.)\s*/i, '')
      .split(' ')
      .filter(Boolean)
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase(),
    educationList: [
      {
        degree: doctor.qualification,
        institution: lang === 'bn' ? 'ঢাকা মেডিকেল কলেজ ও পোস্টগ্রাজুয়েট ইনস্টিটিউট' : 'Dhaka Medical College & Recognized Postgraduate Institute'
      },
      {
        degree: 'BMDC Registered Specialist Practitioner',
        institution: `Bangladesh Medical and Dental Council (BMDC Reg: A-${45000 + doctor.id})`
      }
    ],
    experienceHighlights: [
      lang === 'bn' ? `চিকিৎসাক্ষেত্রে ${doctor.experienceBn}ের প্রত্যক্ষ অভিজ্ঞতা` : `Over ${doctor.experienceEn} of specialized clinical practice`,
      lang === 'bn' ? 'সেন্ট্রাল হসপিটালের সিনিয়র ফ্যাকাল্টি ও ক্লিনিক্যাল কনসালট্যান্ট' : 'Senior Clinical Consultant & Faculty at Central Hospital',
      lang === 'bn' ? 'আন্তর্জাতিক মেডিকেল প্রোটোকল ও কনফারেন্সে নিয়মিত অংশগ্রহণ' : 'Active participant in international surgical & clinical symposiums'
    ]
  }
}
