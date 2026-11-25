// Comprehensive realistic seed data for ThaliTime

export const INITIAL_USERS = [
  {
    uid: 'usr_student_1',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@college.edu',
    password: 'password123',
    registrationNumber: 'RA2111003010452',
    phone: '+91 98765 43210',
    hostel: 'Kaveri Boys Hostel',
    roomNumber: '304-B',
    role: 'student',
    dietaryPreference: 'Vegetarian',
    createdAt: '2026-09-01T10:00:00.000Z'
  },
  {
    uid: 'usr_student_2',
    name: 'Ananya Iyer',
    email: 'ananya.iyer@college.edu',
    password: 'password123',
    registrationNumber: 'RA2111003010118',
    phone: '+91 98451 23456',
    hostel: 'Ganga Girls Hostel',
    roomNumber: '212-A',
    role: 'student',
    dietaryPreference: 'Non-Vegetarian',
    createdAt: '2026-09-01T11:30:00.000Z'
  },
  {
    uid: 'usr_admin_1',
    name: 'Chef Rajesh Verma',
    email: 'admin.rajesh@mess.college.edu',
    password: 'adminpassword',
    registrationNumber: 'MESS-CHIEF-01',
    phone: '+91 91234 56789',
    hostel: 'Central Mess Administration',
    roomNumber: 'Mess Office 1',
    role: 'admin',
    createdAt: '2026-01-15T08:00:00.000Z'
  }
];

export const INITIAL_MENU_ITEMS = [
  // Breakfast
  {
    itemId: 'item_bf_1',
    name: 'Poha, Sev & Hot Jalebi Thali',
    description: 'Indori spiced flattened rice garnished with crunchy ratlami sev, roasted peanuts, fresh coriander and 2 hot jalebis.',
    category: 'Veg',
    mealType: 'breakfast',
    price: 50,
    quantity: 180,
    availableQuantity: 42,
    availability: 'Available',
    calories: 380,
    imageUrl: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
    allergens: ['Gluten', 'Peanuts']
  },
  {
    itemId: 'item_bf_2',
    name: 'South Indian Idli-Vada Combo',
    description: '3 steamed fluffy idlis with 1 crispy medu vada served with piping hot sambar, coconut chutney and tomato chutney.',
    category: 'Veg',
    mealType: 'breakfast',
    price: 55,
    quantity: 200,
    availableQuantity: 18,
    availability: 'Few Left',
    calories: 340,
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80',
    allergens: ['Mustard']
  },
  {
    itemId: 'item_bf_3',
    name: 'Boiled Eggs & Masala Omelette Thali',
    description: 'Two double-egg masala omelettes or 3 spiced boiled eggs with toasted butter bread and mint dip.',
    category: 'Non-Veg',
    mealType: 'breakfast',
    price: 65,
    quantity: 120,
    availableQuantity: 65,
    availability: 'Available',
    calories: 410,
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
    allergens: ['Egg']
  },

  // Lunch
  {
    itemId: 'item_ln_1',
    name: 'Special Royal Dal Tadka & Jeera Rice Thali',
    description: 'Slow-simmered yellow arhar dal with desi ghee garlic tadka, aromatic jeera basmati rice, 3 tawa rotis, seasonal sabzi, roasted papad and boondi raita.',
    category: 'Veg',
    mealType: 'lunch',
    price: 85,
    quantity: 320,
    availableQuantity: 88,
    availability: 'Available',
    calories: 620,
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    allergens: ['Dairy', 'Gluten']
  },
  {
    itemId: 'item_ln_2',
    name: 'Paneer Butter Masala Deluxe Thali',
    description: 'Fresh cottage cheese cubes in rich cashew tomato gravy, 3 butter rotis, vegetable pulao, crunchy kachumber salad and gulab jamun.',
    category: 'Veg',
    mealType: 'lunch',
    price: 110,
    quantity: 220,
    availableQuantity: 14,
    availability: 'Few Left',
    calories: 740,
    imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    allergens: ['Dairy', 'Nuts', 'Gluten']
  },
  {
    itemId: 'item_ln_3',
    name: 'Homestyle Chicken Curry Thali',
    description: 'Tender chicken simmered in caramelized onion-garlic gravy, served with 3 fluffy phulkas, steamed rice, lemon onion salad and raita.',
    category: 'Non-Veg',
    mealType: 'lunch',
    price: 130,
    quantity: 180,
    availableQuantity: 0,
    availability: 'Sold Out',
    calories: 780,
    imageUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=600&q=80',
    allergens: ['Gluten']
  },

  // Dinner
  {
    itemId: 'item_dn_1',
    name: 'Shahi Paneer & Butter Naan Thali',
    description: 'Royal creamy white gravy paneer, 2 butter tandoori naans, peas pulao, cucumber mint raita and rasgulla.',
    category: 'Veg',
    mealType: 'dinner',
    price: 115,
    quantity: 280,
    availableQuantity: 112,
    availability: 'Available',
    calories: 710,
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    allergens: ['Dairy', 'Nuts', 'Gluten']
  },
  {
    itemId: 'item_dn_2',
    name: 'Dhaba Style Egg Curry Thali',
    description: 'Two pan-roasted boiled eggs in thick spicy Punjabi gravy, 3 fresh rotis, steamed rice, mixed pickle and salad.',
    category: 'Non-Veg',
    mealType: 'dinner',
    price: 95,
    quantity: 190,
    availableQuantity: 36,
    availability: 'Available',
    calories: 640,
    imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80',
    allergens: ['Egg', 'Gluten']
  },
  {
    itemId: 'item_dn_3',
    name: 'Chole Bhature & Sweet Lassi Special',
    description: 'Authentic Amritsari spiced chickpea curry served with 2 puffed golden bhaturas, pickled onions and a glass of chilled curd lassi.',
    category: 'Veg',
    mealType: 'dinner',
    price: 90,
    quantity: 160,
    availableQuantity: 9,
    availability: 'Few Left',
    calories: 820,
    imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80',
    allergens: ['Dairy', 'Gluten']
  }
];

export const INITIAL_PICKUP_SLOTS = [
  // Dinner Slots (Current active meal for demo)
  {
    slotId: 'slot_dn_1',
    mealType: 'dinner',
    startTime: '06:50 PM',
    endTime: '07:00 PM',
    displayTime: '6:50 PM – 7:00 PM',
    capacity: 45,
    bookedCount: 42,
    isPeak: true,
    isOpen: true
  },
  {
    slotId: 'slot_dn_2',
    mealType: 'dinner',
    startTime: '07:10 PM',
    endTime: '07:20 PM',
    displayTime: '7:10 PM – 7:20 PM',
    capacity: 55,
    bookedCount: 51,
    isPeak: true,
    isOpen: true
  },
  {
    slotId: 'slot_dn_3',
    mealType: 'dinner',
    startTime: '07:30 PM',
    endTime: '07:40 PM',
    displayTime: '7:30 PM – 7:40 PM',
    capacity: 60,
    bookedCount: 22,
    isPeak: false,
    isOpen: true
  },
  {
    slotId: 'slot_dn_4',
    mealType: 'dinner',
    startTime: '07:50 PM',
    endTime: '08:00 PM',
    displayTime: '7:50 PM – 8:00 PM',
    capacity: 60,
    bookedCount: 16,
    isPeak: false,
    isOpen: true
  },
  {
    slotId: 'slot_dn_5',
    mealType: 'dinner',
    startTime: '08:10 PM',
    endTime: '08:20 PM',
    displayTime: '8:10 PM – 8:20 PM',
    capacity: 50,
    bookedCount: 9,
    isPeak: false,
    isOpen: true
  },
  {
    slotId: 'slot_dn_6',
    mealType: 'dinner',
    startTime: '08:30 PM',
    endTime: '08:40 PM',
    displayTime: '8:30 PM – 8:40 PM',
    capacity: 40,
    bookedCount: 3,
    isPeak: false,
    isOpen: true
  },

  // Lunch Slots
  {
    slotId: 'slot_ln_1',
    mealType: 'lunch',
    startTime: '12:30 PM',
    endTime: '12:40 PM',
    displayTime: '12:30 PM – 12:40 PM',
    capacity: 50,
    bookedCount: 48,
    isPeak: true,
    isOpen: true
  },
  {
    slotId: 'slot_ln_2',
    mealType: 'lunch',
    startTime: '12:50 PM',
    endTime: '01:00 PM',
    displayTime: '12:50 PM – 1:00 PM',
    capacity: 60,
    bookedCount: 55,
    isPeak: true,
    isOpen: true
  },
  {
    slotId: 'slot_ln_3',
    mealType: 'lunch',
    startTime: '01:10 PM',
    endTime: '01:20 PM',
    displayTime: '1:10 PM – 1:20 PM',
    capacity: 60,
    bookedCount: 30,
    isPeak: false,
    isOpen: true
  },

  // Breakfast Slots
  {
    slotId: 'slot_bf_1',
    mealType: 'breakfast',
    startTime: '07:45 AM',
    endTime: '07:55 AM',
    displayTime: '7:45 AM – 7:55 AM',
    capacity: 50,
    bookedCount: 41,
    isPeak: true,
    isOpen: true
  },
  {
    slotId: 'slot_bf_2',
    mealType: 'breakfast',
    startTime: '08:05 AM',
    endTime: '08:15 AM',
    displayTime: '8:05 AM – 8:15 AM',
    capacity: 60,
    bookedCount: 52,
    isPeak: true,
    isOpen: true
  },
  {
    slotId: 'slot_bf_3',
    mealType: 'breakfast',
    startTime: '08:25 AM',
    endTime: '08:35 AM',
    displayTime: '8:25 AM – 8:35 AM',
    capacity: 50,
    bookedCount: 20,
    isPeak: false,
    isOpen: true
  }
];

export const INITIAL_BOOKINGS = [
  {
    bookingId: 'bk_1017',
    tokenNumber: 'TT-1017',
    studentId: 'usr_student_x1',
    studentName: 'Rohan Mehta',
    studentReg: 'RA2111003010012',
    studentHostel: 'Kaveri Boys Hostel',
    mealType: 'dinner',
    selectedItems: [
      { itemId: 'item_dn_1', name: 'Shahi Paneer & Butter Naan Thali', quantity: 1, price: 115 }
    ],
    bookingDate: '2026-11-26',
    pickupSlot: '7:10 PM – 7:20 PM',
    pickupSlotId: 'slot_dn_2',
    status: 'Collected',
    counter: 'Counter 1',
    estimatedWaitMinutes: 0,
    createdAt: '2026-11-26T17:15:00.000Z',
    collectedAt: '2026-11-26T19:08:00.000Z'
  },
  {
    bookingId: 'bk_1018',
    tokenNumber: 'TT-1018',
    studentId: 'usr_student_x2',
    studentName: 'Kavya Nair',
    studentReg: 'RA2111003010044',
    studentHostel: 'Ganga Girls Hostel',
    mealType: 'dinner',
    selectedItems: [
      { itemId: 'item_dn_2', name: 'Dhaba Style Egg Curry Thali', quantity: 1, price: 95 }
    ],
    bookingDate: '2026-11-26',
    pickupSlot: '7:10 PM – 7:20 PM',
    pickupSlotId: 'slot_dn_2',
    status: 'Ready',
    counter: 'Counter 1',
    estimatedWaitMinutes: 0,
    createdAt: '2026-11-26T17:18:00.000Z'
  },
  {
    bookingId: 'bk_1019',
    tokenNumber: 'TT-1019',
    studentId: 'usr_student_x3',
    studentName: 'Divyansh Singh',
    studentReg: 'RA2111003010089',
    studentHostel: 'Brahmaputra Block A',
    mealType: 'dinner',
    selectedItems: [
      { itemId: 'item_dn_1', name: 'Shahi Paneer & Butter Naan Thali', quantity: 1, price: 115 }
    ],
    bookingDate: '2026-11-26',
    pickupSlot: '7:10 PM – 7:20 PM',
    pickupSlotId: 'slot_dn_2',
    status: 'Preparing',
    counter: 'Counter 2',
    estimatedWaitMinutes: 2,
    createdAt: '2026-11-26T17:22:00.000Z'
  },
  {
    bookingId: 'bk_1020',
    tokenNumber: 'TT-1020',
    studentId: 'usr_student_x4',
    studentName: 'Sneha Patel',
    studentReg: 'RA2111003010111',
    studentHostel: 'Ganga Girls Hostel',
    mealType: 'dinner',
    selectedItems: [
      { itemId: 'item_dn_3', name: 'Chole Bhature & Sweet Lassi Special', quantity: 1, price: 90 }
    ],
    bookingDate: '2026-11-26',
    pickupSlot: '7:10 PM – 7:20 PM',
    pickupSlotId: 'slot_dn_2',
    status: 'Preparing',
    counter: 'Counter 2',
    estimatedWaitMinutes: 4,
    createdAt: '2026-11-26T17:25:00.000Z'
  },
  {
    bookingId: 'bk_1021',
    tokenNumber: 'TT-1021',
    studentId: 'usr_student_x5',
    studentName: 'Arjun Das',
    studentReg: 'RA2111003010145',
    studentHostel: 'Kaveri Boys Hostel',
    mealType: 'dinner',
    selectedItems: [
      { itemId: 'item_dn_1', name: 'Shahi Paneer & Butter Naan Thali', quantity: 1, price: 115 }
    ],
    bookingDate: '2026-11-26',
    pickupSlot: '7:10 PM – 7:20 PM',
    pickupSlotId: 'slot_dn_2',
    status: 'Waiting',
    counter: 'Counter 1',
    estimatedWaitMinutes: 6,
    createdAt: '2026-11-26T17:30:00.000Z'
  },
  {
    bookingId: 'bk_1022',
    tokenNumber: 'TT-1022',
    studentId: 'usr_student_x6',
    studentName: 'Meera Nambiar',
    studentReg: 'RA2111003010178',
    studentHostel: 'Yamuna Tower',
    mealType: 'dinner',
    selectedItems: [
      { itemId: 'item_dn_2', name: 'Dhaba Style Egg Curry Thali', quantity: 1, price: 95 }
    ],
    bookingDate: '2026-11-26',
    pickupSlot: '7:10 PM – 7:20 PM',
    pickupSlotId: 'slot_dn_2',
    status: 'Waiting',
    counter: 'Counter 1',
    estimatedWaitMinutes: 8,
    createdAt: '2026-11-26T17:32:00.000Z'
  },
  {
    bookingId: 'bk_1023',
    tokenNumber: 'TT-1023',
    studentId: 'usr_student_x7',
    studentName: 'Vikram Joshi',
    studentReg: 'RA2111003010210',
    studentHostel: 'Kaveri Boys Hostel',
    mealType: 'dinner',
    selectedItems: [
      { itemId: 'item_dn_1', name: 'Shahi Paneer & Butter Naan Thali', quantity: 1, price: 115 }
    ],
    bookingDate: '2026-11-26',
    pickupSlot: '7:10 PM – 7:20 PM',
    pickupSlotId: 'slot_dn_2',
    status: 'Waiting',
    counter: 'Counter 1',
    estimatedWaitMinutes: 10,
    createdAt: '2026-11-26T17:35:00.000Z'
  },
  // Aarav's active booking (TT-1024) matches the exact prompt example!
  {
    bookingId: 'bk_1024',
    tokenNumber: 'TT-1024',
    studentId: 'usr_student_1',
    studentName: 'Aarav Sharma',
    studentReg: 'RA2111003010452',
    studentHostel: 'Kaveri Boys Hostel',
    mealType: 'dinner',
    selectedItems: [
      { itemId: 'item_dn_1', name: 'Shahi Paneer & Butter Naan Thali', quantity: 1, price: 115 }
    ],
    bookingDate: '2026-11-26',
    pickupSlot: '7:10 PM – 7:20 PM',
    pickupSlotId: 'slot_dn_2',
    status: 'Waiting',
    counter: 'Counter 1',
    estimatedWaitMinutes: 10,
    createdAt: '2026-11-26T17:40:00.000Z'
  },
  // Past historical bookings for Aarav
  {
    bookingId: 'bk_1002',
    tokenNumber: 'TT-1002',
    studentId: 'usr_student_1',
    studentName: 'Aarav Sharma',
    studentReg: 'RA2111003010452',
    studentHostel: 'Kaveri Boys Hostel',
    mealType: 'lunch',
    selectedItems: [
      { itemId: 'item_ln_1', name: 'Special Royal Dal Tadka & Jeera Rice Thali', quantity: 1, price: 85 }
    ],
    bookingDate: '2026-11-26',
    pickupSlot: '12:50 PM – 1:00 PM',
    pickupSlotId: 'slot_ln_2',
    status: 'Collected',
    counter: 'Counter 1',
    estimatedWaitMinutes: 0,
    createdAt: '2026-11-26T11:00:00.000Z',
    collectedAt: '2026-11-26T12:54:00.000Z'
  },
  {
    bookingId: 'bk_0985',
    tokenNumber: 'TT-0985',
    studentId: 'usr_student_1',
    studentName: 'Aarav Sharma',
    studentReg: 'RA2111003010452',
    studentHostel: 'Kaveri Boys Hostel',
    mealType: 'breakfast',
    selectedItems: [
      { itemId: 'item_bf_1', name: 'Poha, Sev & Hot Jalebi Thali', quantity: 1, price: 50 }
    ],
    bookingDate: '2026-11-26',
    pickupSlot: '8:05 AM – 8:15 AM',
    pickupSlotId: 'slot_bf_2',
    status: 'Collected',
    counter: 'Counter 3',
    estimatedWaitMinutes: 0,
    createdAt: '2026-11-26T07:15:00.000Z',
    collectedAt: '2026-11-26T08:12:00.000Z'
  },
  {
    bookingId: 'bk_0912',
    tokenNumber: 'TT-0912',
    studentId: 'usr_student_1',
    studentName: 'Aarav Sharma',
    studentReg: 'RA2111003010452',
    studentHostel: 'Kaveri Boys Hostel',
    mealType: 'dinner',
    selectedItems: [
      { itemId: 'item_dn_2', name: 'Dhaba Style Egg Curry Thali', quantity: 1, price: 95 }
    ],
    bookingDate: '2026-11-25',
    pickupSlot: '7:30 PM – 7:40 PM',
    pickupSlotId: 'slot_dn_3',
    status: 'Collected',
    counter: 'Counter 1',
    estimatedWaitMinutes: 0,
    createdAt: '2026-11-25T16:50:00.000Z',
    collectedAt: '2026-11-25T19:35:00.000Z'
  }
];

export const INITIAL_INVENTORY = [
  {
    inventoryId: 'inv_1',
    itemId: 'item_dn_1',
    itemName: 'Shahi Paneer & Butter Naan Thali',
    mealType: 'dinner',
    preparedQuantity: 280,
    servedQuantity: 140,
    availableQuantity: 112,
    wasteQuantity: 0,
    lowStockThreshold: 20,
    updatedAt: '2026-11-26T18:00:00.000Z'
  },
  {
    inventoryId: 'inv_2',
    itemId: 'item_dn_2',
    itemName: 'Dhaba Style Egg Curry Thali',
    mealType: 'dinner',
    preparedQuantity: 190,
    servedQuantity: 120,
    availableQuantity: 36,
    wasteQuantity: 0,
    lowStockThreshold: 15,
    updatedAt: '2026-11-26T18:00:00.000Z'
  },
  {
    inventoryId: 'inv_3',
    itemId: 'item_dn_3',
    itemName: 'Chole Bhature & Sweet Lassi Special',
    mealType: 'dinner',
    preparedQuantity: 160,
    servedQuantity: 145,
    availableQuantity: 9,
    wasteQuantity: 0,
    lowStockThreshold: 15,
    updatedAt: '2026-11-26T18:00:00.000Z'
  },
  {
    inventoryId: 'inv_4',
    itemId: 'item_ln_1',
    itemName: 'Special Royal Dal Tadka & Jeera Rice Thali',
    mealType: 'lunch',
    preparedQuantity: 320,
    servedQuantity: 305,
    availableQuantity: 0,
    wasteQuantity: 15,
    lowStockThreshold: 25,
    updatedAt: '2026-11-26T14:30:00.000Z'
  },
  {
    inventoryId: 'inv_5',
    itemId: 'item_ln_3',
    itemName: 'Homestyle Chicken Curry Thali',
    mealType: 'lunch',
    preparedQuantity: 180,
    servedQuantity: 180,
    availableQuantity: 0,
    wasteQuantity: 0,
    lowStockThreshold: 20,
    updatedAt: '2026-11-26T14:30:00.000Z'
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    notificationId: 'notif_1',
    userId: 'usr_student_1',
    title: 'Booking Confirmed',
    message: 'Your dinner booking TT-1024 has been confirmed for 7:10 PM – 7:20 PM at Counter 1.',
    type: 'booking',
    isRead: false,
    createdAt: '2026-11-26T17:40:00.000Z'
  },
  {
    notificationId: 'notif_2',
    userId: 'usr_student_1',
    title: 'Pickup Approaching',
    message: 'Your pickup slot starts in 10 minutes. Please head towards Mess Hall A.',
    type: 'queue',
    isRead: false,
    createdAt: '2026-11-26T18:50:00.000Z'
  },
  {
    notificationId: 'notif_3',
    userId: 'all',
    title: 'Food Running Low',
    message: 'Only 9 Chole Bhature Special thalis remaining for tonight\'s dinner!',
    type: 'stock_alert',
    isRead: true,
    createdAt: '2026-11-26T18:30:00.000Z'
  },
  {
    notificationId: 'notif_4',
    userId: 'usr_student_1',
    title: 'Meal Ready (Lunch)',
    message: 'Your earlier lunch token TT-1002 was served at Counter 1. Thanks for dining with us!',
    type: 'meal_ready',
    isRead: true,
    createdAt: '2026-11-26T12:54:00.000Z'
  }
];

export const INITIAL_FEEDBACK = [
  {
    feedbackId: 'fb_1',
    studentId: 'usr_student_1',
    studentName: 'Aarav Sharma',
    bookingId: 'bk_1002',
    tokenNumber: 'TT-1002',
    mealType: 'lunch',
    rating: 5,
    category: 'Food Quality',
    description: 'Dal tadka was freshly tempered with desi ghee. Rotis were soft and served warm right on time!',
    status: 'Resolved',
    adminNotes: 'Thank you Aarav! Relayed compliment to Kitchen Team A.',
    createdAt: '2026-11-26T13:30:00.000Z'
  },
  {
    feedbackId: 'fb_2',
    studentId: 'usr_student_2',
    studentName: 'Ananya Iyer',
    bookingId: 'bk_0940',
    tokenNumber: 'TT-0940',
    mealType: 'dinner',
    rating: 3,
    category: 'Service Delay',
    description: 'Counter 2 was slow around 7:25 PM due to sudden crowd surge. Took 8 minutes instead of estimated 4.',
    status: 'Under Review',
    adminNotes: 'Assigned an extra staff helper to Counter 2 during peak 7:15-7:45 PM window.',
    createdAt: '2026-11-25T20:00:00.000Z'
  },
  {
    feedbackId: 'fb_3',
    studentId: 'usr_student_x5',
    studentName: 'Arjun Das',
    bookingId: 'bk_0910',
    tokenNumber: 'TT-0910',
    mealType: 'breakfast',
    rating: 4,
    category: 'Suggestion',
    description: 'Could we get coconut chutney refilled more frequently during 8:00 AM rush?',
    status: 'Resolved',
    adminNotes: 'Pre-portioned chutney cups added for breakfast speed.',
    createdAt: '2026-11-25T09:15:00.000Z'
  }
];

export const WEEKLY_MENU_SCHEDULE = {
  Monday: {
    breakfast: ['Poha & Jalebi', 'Boiled Eggs', 'Tea / Coffee'],
    lunch: ['Dal Makhani', 'Jeera Rice', 'Aloo Gobi', 'Roti', 'Salad'],
    dinner: ['Kadai Paneer', 'Egg Curry', 'Phulka', 'Veg Pulao', 'Gulab Jamun']
  },
  Tuesday: {
    breakfast: ['Idli Sambar', 'Medu Vada', 'Chutneys', 'Milk / Tea'],
    lunch: ['Rajma Masala', 'Steamed Basmati Rice', 'Bhindi Masala', 'Roti', 'Curd'],
    dinner: ['Matar Paneer', 'Chicken Masala', 'Butter Roti', 'Jeera Rice', 'Kheer']
  },
  Wednesday: {
    breakfast: ['Aloo Paratha with Butter & Curd', 'Pickle', 'Tea'],
    lunch: ['Chana Masala', 'Lemon Rice', 'Mix Veg Poriyal', 'Roti', 'Papad'],
    dinner: ['Shahi Paneer', 'Dhaba Egg Curry', 'Tandoori Roti', 'Peas Pulao', 'Rasgulla']
  },
  Thursday: {
    breakfast: ['Upma with Coconut Chutney', 'Boiled Eggs', 'Coffee / Tea'],
    lunch: ['Yellow Dal Fry', 'Vegetable Biryani', 'Boondi Raita', 'Roti', 'Salad'],
    dinner: ['Paneer Tikka Masala', 'Chicken Korma', 'Rumali Roti', 'Jeera Rice', 'Ice Cream']
  },
  Friday: {
    breakfast: ['Masala Dosa', 'Sambar', 'Tomato Chutney', 'Filter Coffee'],
    lunch: ['Panchmel Dal', 'Kashmiri Dum Aloo', 'Steamed Rice', 'Roti', 'Papad'],
    dinner: ['Palak Paneer', 'Egg Bhurji Curry', 'Butter Naan', 'Veg Pulao', 'Moong Dal Halwa']
  },
  Saturday: {
    breakfast: ['Puri Bhaji', 'Halwa', 'Chai'],
    lunch: ['Sambhar Sadam', 'Potato Fry', 'Curd Rice', 'Appalam', 'Pickle'],
    dinner: ['Chole Bhature Special', 'Sweet Lassi', 'Fried Green Chillies', 'Onion Salad']
  },
  Sunday: {
    breakfast: ['Chole Kulche', 'Boiled Sprout Salad', 'Fresh Lime Juice'],
    lunch: ['Special Hyderabadi Dum Biryani (Veg/Chicken)', 'Mirchi Ka Salan', 'Raita'],
    dinner: ['Malai Kofta', 'Butter Chicken / Paneer Lababdar', 'Garlic Naan', 'Jeera Rice', 'Brownie']
  }
};

export const HISTORICAL_DEMAND_DATA = [
  { day: 'Mon', breakfast: 210, lunch: 480, dinner: 510, wastageKg: 14, accuracyPct: 94 },
  { day: 'Tue', breakfast: 225, lunch: 495, dinner: 520, wastageKg: 11, accuracyPct: 96 },
  { day: 'Wed', breakfast: 240, lunch: 510, dinner: 540, wastageKg: 9, accuracyPct: 97 },
  { day: 'Thu', breakfast: 215, lunch: 470, dinner: 490, wastageKg: 16, accuracyPct: 92 },
  { day: 'Fri', breakfast: 250, lunch: 530, dinner: 460, wastageKg: 18, accuracyPct: 90 },
  { day: 'Sat', breakfast: 180, lunch: 390, dinner: 410, wastageKg: 8, accuracyPct: 97 },
  { day: 'Sun', breakfast: 195, lunch: 440, dinner: 430, wastageKg: 7, accuracyPct: 98 }
];
