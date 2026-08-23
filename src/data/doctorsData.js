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
    fee: '৳ ১,৫০০',
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
    fee: '৳ ১,২০০',
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
    fee: '৳ ১,২০০',
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
    fee: '৳ ১,০০০',
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
    fee: '৳ ১,৫০০',
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
    fee: '৳ ১,২০০',
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
    fee: '৳ ১,০০০',
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
    fee: '৳ ১,২০০',
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
    fee: '৳ ১,৫০০',
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
    fee: '৳ ১,৫০০',
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
    fee: '৳ ১,০০০',
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
    fee: '৳ ১,২০০',
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
  }
]

// Helper to get localized doctor object
export const getLocalizedDoctor = (doctor, lang = 'en') => {
  if (!doctor) return null
  return {
    ...doctor,
    name: lang === 'bn' ? doctor.nameBn : doctor.nameEn,
    department: lang === 'bn' ? doctor.deptNameBn : doctor.deptNameEn,
    deptName: lang === 'bn' ? doctor.deptNameBn : doctor.deptNameEn,
    title: lang === 'bn' ? doctor.titleBn : doctor.titleEn,
    experience: lang === 'bn' ? doctor.experienceBn : doctor.experienceEn,
    room: lang === 'bn' ? doctor.roomBn : doctor.roomEn,
    bio: lang === 'bn' ? doctor.bioBn : doctor.bioEn,
    initials: doctor.nameEn
      .replace(/Dr\.\s*/i, '')
      .split(' ')
      .filter(Boolean)
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }
}
