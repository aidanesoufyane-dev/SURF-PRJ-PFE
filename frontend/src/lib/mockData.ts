import { User, Company, Subscription, SubscriptionPlan, Room, SurfPackage, Activity, Session, Booking, Customer, Payment, TeamMember } from "@/types";

// ─── Mock user (always logged in as admin) ────────────────────────
export const mockUser: User = {
  id: "u1",
  email: "alex@taghazout.com",
  firstName: "Alex",
  lastName: "Martin",
  role: "admin",
  companyId: "c1",
};

// ─── Company ──────────────────────────────────────────────────────
export const mockCompany: Company = {
  _id: "c1",
  name: "Taghazout Surf House",
  slug: "taghazout-surf-house",
  description: "A premier surf camp on the coast of Morocco offering world-class waves, comfortable accommodation, and unforgettable experiences.",
  logo: "",
  coverImage: "",
  email: "hello@taghazout.com",
  phone: "+212 600 123 456",
  address: "Taghazout Village",
  city: "Taghazout",
  country: "Morocco",
  website: "https://taghazout-surf.com",
  ownerId: "u1",
  subscription: { plan: "pro", status: "active", startDate: "2026-01-01T00:00:00.000Z" },
  paymentSettings: {
    method: "manual",
    manualInstructions: "Please pay in cash on arrival at the reception desk.",
    bankName: "",
    iban: "",
    swift: "",
    accountHolder: "",
  },
  isActive: true,
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-04-01T00:00:00.000Z",
};

// ─── Subscription ─────────────────────────────────────────────────
export const mockSubscription: Subscription = {
  _id: "sub1",
  companyId: "c1",
  plan: "pro",
  status: "active",
  pricePerMonth: 9900,
  startDate: "2026-01-01T00:00:00.000Z",
  nextBillingDate: "2026-05-01T00:00:00.000Z",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-04-01T00:00:00.000Z",
};

// ─── Subscription plans ───────────────────────────────────────────
export const mockPlans: SubscriptionPlan[] = [
  {
    id: "basic",
    name: "Basic",
    pricePerMonth: 4900,
    maxRooms: 5,
    maxBookingsPerMonth: 30,
    features: ["Up to 5 rooms", "30 bookings/month", "Customer management", "Basic reporting"],
  },
  {
    id: "pro",
    name: "Pro",
    pricePerMonth: 9900,
    maxRooms: 20,
    maxBookingsPerMonth: 100,
    features: ["Up to 20 rooms", "100 bookings/month", "Activities & sessions", "Team management", "Payment tracking"],
  },
  {
    id: "premium",
    name: "Premium",
    pricePerMonth: 19900,
    maxRooms: -1,
    maxBookingsPerMonth: -1,
    features: ["Unlimited rooms", "Unlimited bookings", "All Pro features", "Priority support", "Custom branding"],
  },
];

// ─── Rooms ────────────────────────────────────────────────────────
export const mockRooms: Room[] = [
  { _id: "r1", companyId: "c1", name: "Ocean View Suite", description: "Stunning suite with panoramic ocean views, a king bed, and private terrace.", type: "suite", capacity: 2, pricePerNight: 15000, amenities: ["wifi", "ac", "ocean-view", "balcony", "ensuite"], images: [], isActive: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
  { _id: "r2", companyId: "c1", name: "Beachfront Bungalow", description: "Private bungalow steps from the beach with a hammock and terrace.", type: "bungalow", capacity: 3, pricePerNight: 12000, amenities: ["wifi", "ac", "terrace", "hammock", "kitchenette"], images: [], isActive: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
  { _id: "r3", companyId: "c1", name: "Garden Double", description: "Comfortable double room overlooking the lush garden.", type: "double", capacity: 2, pricePerNight: 8000, amenities: ["wifi", "fan", "garden-view", "ensuite"], images: [], isActive: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
  { _id: "r4", companyId: "c1", name: "Budget Single", description: "Simple, clean single room — perfect for solo surfers on a budget.", type: "single", capacity: 1, pricePerNight: 5000, amenities: ["wifi", "shared-bathroom"], images: [], isActive: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
  { _id: "r5", companyId: "c1", name: "Surfer's Dorm A", description: "6-bed dorm with secure lockers and a shared surf equipment area.", type: "dorm", capacity: 6, pricePerNight: 3000, amenities: ["wifi", "lockers", "shared-bathroom", "fan"], images: [], isActive: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
  { _id: "r6", companyId: "c1", name: "Surfer's Dorm B", description: "4-bed dorm, quieter side of the property with garden access.", type: "dorm", capacity: 4, pricePerNight: 3000, amenities: ["wifi", "lockers", "shared-bathroom"], images: [], isActive: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
  { _id: "r7", companyId: "c1", name: "Rooftop Terrace Suite", description: "Exclusive rooftop suite with 360° ocean views and private plunge pool.", type: "suite", capacity: 2, pricePerNight: 18000, amenities: ["wifi", "ac", "rooftop", "ocean-view", "plunge-pool", "ensuite"], images: [], isActive: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
  { _id: "r8", companyId: "c1", name: "Classic Double", description: "A well-appointed double room with all the essentials.", type: "double", capacity: 2, pricePerNight: 7500, amenities: ["wifi", "fan", "shared-bathroom"], images: [], isActive: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
  { _id: "r9", companyId: "c1", name: "Deluxe Single", description: "Upgraded single room with air conditioning and private bathroom.", type: "single", capacity: 1, pricePerNight: 6000, amenities: ["wifi", "ac", "ensuite"], images: [], isActive: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
  { _id: "r10", companyId: "c1", name: "Family Bungalow", description: "Spacious family bungalow with kitchenette and a large outdoor area.", type: "bungalow", capacity: 5, pricePerNight: 14000, amenities: ["wifi", "ac", "kitchenette", "garden"], images: [], isActive: false, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
];

// ─── Packages ─────────────────────────────────────────────────────
export const mockPackages: SurfPackage[] = [
  { _id: "p1", companyId: "c1", name: "Beginner Wave Rider", description: "The perfect introduction to surfing. Daily lessons, board rental, and wax included.", durationDays: 7, pricePerPerson: 60000, includes: ["Daily surf lesson", "Board rental", "Surf wax", "Welcome dinner", "Video session"], maxParticipants: 10, difficulty: "beginner", isActive: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
  { _id: "p2", companyId: "c1", name: "Intermediate Shredder", description: "Level up your surfing with advanced technique sessions and video analysis.", durationDays: 10, pricePerPerson: 90000, includes: ["Daily surf session", "Video analysis", "Board & leash", "Theory classes", "Farewell BBQ"], maxParticipants: 8, difficulty: "intermediate", isActive: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
  { _id: "p3", companyId: "c1", name: "Advanced Pro Session", description: "Intensive training for experienced surfers looking to sharpen competition skills.", durationDays: 5, pricePerPerson: 80000, includes: ["Advanced coaching", "Competition analysis", "High-performance board", "Recovery yoga", "Nutrition plan"], maxParticipants: 6, difficulty: "advanced", isActive: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
  { _id: "p4", companyId: "c1", name: "Surf & Yoga Retreat", description: "A holistic retreat combining morning surf sessions with sunset yoga.", durationDays: 14, pricePerPerson: 120000, includes: ["Surf lessons", "Daily yoga", "Healthy meals", "Meditation", "Massage session", "Airport transfer"], maxParticipants: 12, difficulty: "all-levels", isActive: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
  { _id: "p5", companyId: "c1", name: "Weekend Intro", description: "A quick 3-day introduction — ideal for first-timers and weekend warriors.", durationDays: 3, pricePerPerson: 30000, includes: ["2 surf lessons", "Board rental", "Rash vest"], maxParticipants: 10, difficulty: "beginner", isActive: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
];

// ─── Activities ───────────────────────────────────────────────────
export const mockActivities: Activity[] = [
  { _id: "a1", companyId: "c1", name: "Morning Surf Lesson", description: "2-hour guided surf lesson at sunrise with an ISA-certified instructor.", price: 3000, duration: 120, capacity: 8, isActive: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
  { _id: "a2", companyId: "c1", name: "Sunset Yoga", description: "1-hour beach yoga session at golden hour. All levels welcome.", price: 1500, duration: 60, capacity: 12, isActive: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
  { _id: "a3", companyId: "c1", name: "SUP Tour", description: "Stand-up paddleboard tour along the coastline with a local guide.", price: 2500, duration: 90, capacity: 6, isActive: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
  { _id: "a4", companyId: "c1", name: "Night Surfing Session", description: "Exclusive after-dark surfing with LED boards and safety lights.", price: 4000, duration: 120, capacity: 5, isActive: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
  { _id: "a5", companyId: "c1", name: "Surf Photography", description: "Professional in-water photographer captures your best waves.", price: 5000, duration: 60, capacity: 4, isActive: true, createdAt: "2026-01-01T00:00:00.000Z", updatedAt: "2026-01-01T00:00:00.000Z" },
];

// ─── Sessions ─────────────────────────────────────────────────────
export const mockSessions: Session[] = [
  { _id: "s1", activityId: mockActivities[0], companyId: "c1", date: "2026-04-20", startTime: "08:00", endTime: "10:00", capacity: 8, bookedCount: 5, createdAt: "2026-04-01T00:00:00.000Z", updatedAt: "2026-04-01T00:00:00.000Z" },
  { _id: "s2", activityId: mockActivities[1], companyId: "c1", date: "2026-04-20", startTime: "18:00", endTime: "19:00", capacity: 12, bookedCount: 8, createdAt: "2026-04-01T00:00:00.000Z", updatedAt: "2026-04-01T00:00:00.000Z" },
  { _id: "s3", activityId: mockActivities[0], companyId: "c1", date: "2026-04-21", startTime: "08:00", endTime: "10:00", capacity: 8, bookedCount: 3, createdAt: "2026-04-01T00:00:00.000Z", updatedAt: "2026-04-01T00:00:00.000Z" },
  { _id: "s4", activityId: mockActivities[2], companyId: "c1", date: "2026-04-22", startTime: "10:00", endTime: "11:30", capacity: 6, bookedCount: 6, createdAt: "2026-04-01T00:00:00.000Z", updatedAt: "2026-04-01T00:00:00.000Z" },
  { _id: "s5", activityId: mockActivities[3], companyId: "c1", date: "2026-04-23", startTime: "20:00", endTime: "22:00", capacity: 5, bookedCount: 2, createdAt: "2026-04-01T00:00:00.000Z", updatedAt: "2026-04-01T00:00:00.000Z" },
  { _id: "s6", activityId: mockActivities[1], companyId: "c1", date: "2026-04-24", startTime: "18:00", endTime: "19:00", capacity: 12, bookedCount: 10, createdAt: "2026-04-01T00:00:00.000Z", updatedAt: "2026-04-01T00:00:00.000Z" },
  { _id: "s7", activityId: mockActivities[0], companyId: "c1", date: "2026-04-25", startTime: "08:00", endTime: "10:00", capacity: 8, bookedCount: 1, createdAt: "2026-04-01T00:00:00.000Z", updatedAt: "2026-04-01T00:00:00.000Z" },
  { _id: "s8", activityId: mockActivities[4], companyId: "c1", date: "2026-04-26", startTime: "09:00", endTime: "10:00", capacity: 4, bookedCount: 2, createdAt: "2026-04-01T00:00:00.000Z", updatedAt: "2026-04-01T00:00:00.000Z" },
  { _id: "s9", activityId: mockActivities[2], companyId: "c1", date: "2026-04-28", startTime: "10:00", endTime: "11:30", capacity: 6, bookedCount: 4, createdAt: "2026-04-01T00:00:00.000Z", updatedAt: "2026-04-01T00:00:00.000Z" },
  { _id: "s10", activityId: mockActivities[0], companyId: "c1", date: "2026-04-30", startTime: "08:00", endTime: "10:00", capacity: 8, bookedCount: 7, createdAt: "2026-04-01T00:00:00.000Z", updatedAt: "2026-04-01T00:00:00.000Z" },
  { _id: "s11", activityId: mockActivities[3], companyId: "c1", date: "2026-05-02", startTime: "20:00", endTime: "22:00", capacity: 5, bookedCount: 0, createdAt: "2026-04-01T00:00:00.000Z", updatedAt: "2026-04-01T00:00:00.000Z" },
  { _id: "s12", activityId: mockActivities[1], companyId: "c1", date: "2026-05-05", startTime: "18:00", endTime: "19:00", capacity: 12, bookedCount: 6, createdAt: "2026-04-01T00:00:00.000Z", updatedAt: "2026-04-01T00:00:00.000Z" },
];

// ─── Customers ────────────────────────────────────────────────────
export const mockCustomers: Customer[] = [
  { _id: "cu1",  companyId: "c1", firstName: "Lucas",    lastName: "Dupont",    email: "l.dupont@email.com",       phone: "+33 612 345 678", nationality: "French",    notes: "Experienced surfer, prefers morning sessions.", createdAt: "2026-01-15T00:00:00.000Z", updatedAt: "2026-01-15T00:00:00.000Z" },
  { _id: "cu2",  companyId: "c1", firstName: "Emma",     lastName: "Schmidt",   email: "e.schmidt@email.com",      phone: "+49 172 345 678", nationality: "German",    notes: "First time surfing.", createdAt: "2026-01-20T00:00:00.000Z", updatedAt: "2026-01-20T00:00:00.000Z" },
  { _id: "cu3",  companyId: "c1", firstName: "Sophie",   lastName: "Martin",    email: "s.martin@email.com",       phone: "+33 623 456 789", nationality: "French",    notes: "", createdAt: "2026-02-01T00:00:00.000Z", updatedAt: "2026-02-01T00:00:00.000Z" },
  { _id: "cu4",  companyId: "c1", firstName: "James",    lastName: "Wilson",    email: "j.wilson@email.com",       phone: "+44 7700 900123", nationality: "British",   notes: "Allergic to shellfish.", createdAt: "2026-02-05T00:00:00.000Z", updatedAt: "2026-02-05T00:00:00.000Z" },
  { _id: "cu5",  companyId: "c1", firstName: "Maria",    lastName: "Rodriguez", email: "m.rodriguez@email.com",    phone: "+34 612 345 678", nationality: "Spanish",   notes: "", createdAt: "2026-02-10T00:00:00.000Z", updatedAt: "2026-02-10T00:00:00.000Z" },
  { _id: "cu6",  companyId: "c1", firstName: "Alex",     lastName: "Johnson",   email: "a.johnson@email.com",      phone: "+1 555 012 3456", nationality: "American",  notes: "Repeat customer — 2nd visit.", createdAt: "2026-02-15T00:00:00.000Z", updatedAt: "2026-02-15T00:00:00.000Z" },
  { _id: "cu7",  companyId: "c1", firstName: "Anna",     lastName: "Weber",     email: "a.weber@email.com",        phone: "+49 160 987 6543", nationality: "German",   notes: "", createdAt: "2026-02-20T00:00:00.000Z", updatedAt: "2026-02-20T00:00:00.000Z" },
  { _id: "cu8",  companyId: "c1", firstName: "Tom",      lastName: "Clark",     email: "t.clark@email.com",        phone: "+44 7800 123456", nationality: "British",   notes: "Prefers quiet rooms.", createdAt: "2026-03-01T00:00:00.000Z", updatedAt: "2026-03-01T00:00:00.000Z" },
  { _id: "cu9",  companyId: "c1", firstName: "Nina",     lastName: "Petit",     email: "n.petit@email.com",        phone: "+33 645 678 901", nationality: "French",    notes: "", createdAt: "2026-03-05T00:00:00.000Z", updatedAt: "2026-03-05T00:00:00.000Z" },
  { _id: "cu10", companyId: "c1", firstName: "Carlos",   lastName: "Fernandez", email: "c.fernandez@email.com",    phone: "+34 623 456 789", nationality: "Spanish",   notes: "Intermediate level.", createdAt: "2026-03-10T00:00:00.000Z", updatedAt: "2026-03-10T00:00:00.000Z" },
  { _id: "cu11", companyId: "c1", firstName: "Sarah",    lastName: "Davis",     email: "s.davis@email.com",        phone: "+1 555 987 6543", nationality: "American",  notes: "", createdAt: "2026-03-15T00:00:00.000Z", updatedAt: "2026-03-15T00:00:00.000Z" },
  { _id: "cu12", companyId: "c1", firstName: "Felix",    lastName: "Müller",    email: "f.muller@email.com",       phone: "+49 152 111 2233", nationality: "German",   notes: "Vegan diet.", createdAt: "2026-03-20T00:00:00.000Z", updatedAt: "2026-03-20T00:00:00.000Z" },
  { _id: "cu13", companyId: "c1", firstName: "Olivia",   lastName: "Brown",     email: "o.brown@email.com",        phone: "+44 7900 555666", nationality: "British",   notes: "", createdAt: "2026-03-25T00:00:00.000Z", updatedAt: "2026-03-25T00:00:00.000Z" },
  { _id: "cu14", companyId: "c1", firstName: "Pierre",   lastName: "Moreau",    email: "p.moreau@email.com",       phone: "+33 678 901 234", nationality: "French",    notes: "Advanced surfer, brings own board.", createdAt: "2026-04-01T00:00:00.000Z", updatedAt: "2026-04-01T00:00:00.000Z" },
  { _id: "cu15", companyId: "c1", firstName: "Isabella", lastName: "Garcia",    email: "i.garcia@email.com",       phone: "+34 645 678 901", nationality: "Spanish",   notes: "", createdAt: "2026-04-05T00:00:00.000Z", updatedAt: "2026-04-05T00:00:00.000Z" },
];

// ─── Bookings ─────────────────────────────────────────────────────
// customerId and roomId are populated objects (as pages cast them to `any`)
export const mockBookings: Booking[] = [
  // Upcoming arrivals (next 7 days from 2026-04-19)
  { _id: "b1",  companyId: "c1", customerId: mockCustomers[0]  as any, roomId: mockRooms[6]  as any, packageId: mockPackages[0]._id, activities: [], checkIn: "2026-04-20T00:00:00.000Z", checkOut: "2026-04-27T00:00:00.000Z", numberOfGuests: 2, numberOfNights: 7, roomTotal: 126000, packageTotal: 60000, activitiesTotal: 0, totalPrice: 186000, status: "confirmed", paymentStatus: "paid",    notes: "", createdAt: "2026-04-10T00:00:00.000Z", updatedAt: "2026-04-10T00:00:00.000Z" },
  { _id: "b2",  companyId: "c1", customerId: mockCustomers[3]  as any, roomId: mockRooms[0]  as any, packageId: undefined, activities: [], checkIn: "2026-04-21T00:00:00.000Z", checkOut: "2026-04-28T00:00:00.000Z", numberOfGuests: 2, numberOfNights: 7, roomTotal: 105000, packageTotal: 0, activitiesTotal: 0, totalPrice: 105000, status: "confirmed", paymentStatus: "paid",    notes: "", createdAt: "2026-04-11T00:00:00.000Z", updatedAt: "2026-04-11T00:00:00.000Z" },
  { _id: "b3",  companyId: "c1", customerId: mockCustomers[4]  as any, roomId: mockRooms[4]  as any, packageId: mockPackages[4]._id, activities: [], checkIn: "2026-04-22T00:00:00.000Z", checkOut: "2026-04-29T00:00:00.000Z", numberOfGuests: 1, numberOfNights: 7, roomTotal: 21000,  packageTotal: 30000, activitiesTotal: 0, totalPrice: 51000,  status: "pending",   paymentStatus: "unpaid",  notes: "", createdAt: "2026-04-12T00:00:00.000Z", updatedAt: "2026-04-12T00:00:00.000Z" },
  { _id: "b4",  companyId: "c1", customerId: mockCustomers[7]  as any, roomId: mockRooms[2]  as any, packageId: undefined, activities: [], checkIn: "2026-04-24T00:00:00.000Z", checkOut: "2026-04-31T00:00:00.000Z", numberOfGuests: 2, numberOfNights: 7, roomTotal: 56000,  packageTotal: 0, activitiesTotal: 0, totalPrice: 56000,  status: "confirmed", paymentStatus: "partial", notes: "Paid deposit.", createdAt: "2026-04-13T00:00:00.000Z", updatedAt: "2026-04-13T00:00:00.000Z" },
  { _id: "b5",  companyId: "c1", customerId: mockCustomers[10] as any, roomId: mockRooms[1]  as any, packageId: mockPackages[0]._id, activities: [], checkIn: "2026-04-26T00:00:00.000Z", checkOut: "2026-05-03T00:00:00.000Z", numberOfGuests: 2, numberOfNights: 7, roomTotal: 84000,  packageTotal: 60000, activitiesTotal: 0, totalPrice: 144000, status: "confirmed", paymentStatus: "paid",    notes: "", createdAt: "2026-04-14T00:00:00.000Z", updatedAt: "2026-04-14T00:00:00.000Z" },
  // Recent (past stays in April)
  { _id: "b6",  companyId: "c1", customerId: mockCustomers[1]  as any, roomId: mockRooms[6]  as any, packageId: mockPackages[1]._id, activities: [], checkIn: "2026-04-10T00:00:00.000Z", checkOut: "2026-04-17T00:00:00.000Z", numberOfGuests: 2, numberOfNights: 7, roomTotal: 126000, packageTotal: 90000, activitiesTotal: 0, totalPrice: 216000, status: "completed", paymentStatus: "paid",    notes: "", createdAt: "2026-04-01T00:00:00.000Z", updatedAt: "2026-04-17T00:00:00.000Z" },
  { _id: "b7",  companyId: "c1", customerId: mockCustomers[2]  as any, roomId: mockRooms[0]  as any, packageId: mockPackages[0]._id, activities: [], checkIn: "2026-04-05T00:00:00.000Z", checkOut: "2026-04-15T00:00:00.000Z", numberOfGuests: 2, numberOfNights: 10, roomTotal: 150000, packageTotal: 60000, activitiesTotal: 0, totalPrice: 210000, status: "completed", paymentStatus: "paid",    notes: "", createdAt: "2026-03-28T00:00:00.000Z", updatedAt: "2026-04-15T00:00:00.000Z" },
  { _id: "b8",  companyId: "c1", customerId: mockCustomers[5]  as any, roomId: mockRooms[1]  as any, packageId: undefined, activities: [], checkIn: "2026-04-12T00:00:00.000Z", checkOut: "2026-04-19T00:00:00.000Z", numberOfGuests: 2, numberOfNights: 7, roomTotal: 84000,  packageTotal: 0, activitiesTotal: 0, totalPrice: 84000,  status: "completed", paymentStatus: "paid",    notes: "", createdAt: "2026-04-02T00:00:00.000Z", updatedAt: "2026-04-19T00:00:00.000Z" },
  { _id: "b9",  companyId: "c1", customerId: mockCustomers[8]  as any, roomId: mockRooms[2]  as any, packageId: undefined, activities: [], checkIn: "2026-04-08T00:00:00.000Z", checkOut: "2026-04-11T00:00:00.000Z", numberOfGuests: 1, numberOfNights: 3, roomTotal: 24000,  packageTotal: 0, activitiesTotal: 0, totalPrice: 24000,  status: "cancelled", paymentStatus: "unpaid",  notes: "Guest cancelled last minute.", createdAt: "2026-04-01T00:00:00.000Z", updatedAt: "2026-04-07T00:00:00.000Z" },
  // Older (February / March)
  { _id: "b10", companyId: "c1", customerId: mockCustomers[6]  as any, roomId: mockRooms[4]  as any, packageId: mockPackages[3]._id, activities: [], checkIn: "2026-02-15T00:00:00.000Z", checkOut: "2026-03-01T00:00:00.000Z", numberOfGuests: 2, numberOfNights: 14, roomTotal: 42000,  packageTotal: 120000, activitiesTotal: 0, totalPrice: 162000, status: "completed", paymentStatus: "paid",    notes: "", createdAt: "2026-02-01T00:00:00.000Z", updatedAt: "2026-03-01T00:00:00.000Z" },
  { _id: "b11", companyId: "c1", customerId: mockCustomers[9]  as any, roomId: mockRooms[0]  as any, packageId: mockPackages[1]._id, activities: [], checkIn: "2026-02-20T00:00:00.000Z", checkOut: "2026-03-02T00:00:00.000Z", numberOfGuests: 2, numberOfNights: 10, roomTotal: 150000, packageTotal: 90000, activitiesTotal: 0, totalPrice: 240000, status: "completed", paymentStatus: "paid",    notes: "", createdAt: "2026-02-05T00:00:00.000Z", updatedAt: "2026-03-02T00:00:00.000Z" },
  { _id: "b12", companyId: "c1", customerId: mockCustomers[11] as any, roomId: mockRooms[6]  as any, packageId: mockPackages[0]._id, activities: [], checkIn: "2026-03-01T00:00:00.000Z", checkOut: "2026-03-08T00:00:00.000Z", numberOfGuests: 1, numberOfNights: 7, roomTotal: 126000, packageTotal: 60000, activitiesTotal: 0, totalPrice: 186000, status: "completed", paymentStatus: "paid",    notes: "", createdAt: "2026-02-15T00:00:00.000Z", updatedAt: "2026-03-08T00:00:00.000Z" },
  { _id: "b13", companyId: "c1", customerId: mockCustomers[12] as any, roomId: mockRooms[2]  as any, packageId: undefined, activities: [], checkIn: "2026-03-10T00:00:00.000Z", checkOut: "2026-03-13T00:00:00.000Z", numberOfGuests: 2, numberOfNights: 3, roomTotal: 24000,  packageTotal: 0, activitiesTotal: 0, totalPrice: 24000,  status: "cancelled", paymentStatus: "refunded", notes: "Refunded in full.", createdAt: "2026-03-01T00:00:00.000Z", updatedAt: "2026-03-09T00:00:00.000Z" },
  { _id: "b14", companyId: "c1", customerId: mockCustomers[13] as any, roomId: mockRooms[1]  as any, packageId: mockPackages[3]._id, activities: [], checkIn: "2026-03-15T00:00:00.000Z", checkOut: "2026-03-29T00:00:00.000Z", numberOfGuests: 2, numberOfNights: 14, roomTotal: 168000, packageTotal: 120000, activitiesTotal: 0, totalPrice: 288000, status: "completed", paymentStatus: "paid",    notes: "", createdAt: "2026-03-01T00:00:00.000Z", updatedAt: "2026-03-29T00:00:00.000Z" },
  { _id: "b15", companyId: "c1", customerId: mockCustomers[14] as any, roomId: mockRooms[0]  as any, packageId: mockPackages[2]._id, activities: [], checkIn: "2026-03-20T00:00:00.000Z", checkOut: "2026-03-25T00:00:00.000Z", numberOfGuests: 1, numberOfNights: 5, roomTotal: 75000,  packageTotal: 80000, activitiesTotal: 0, totalPrice: 155000, status: "completed", paymentStatus: "paid",    notes: "", createdAt: "2026-03-05T00:00:00.000Z", updatedAt: "2026-03-25T00:00:00.000Z" },
  // Future (beyond next 7 days)
  { _id: "b16", companyId: "c1", customerId: mockCustomers[5]  as any, roomId: mockRooms[6]  as any, packageId: mockPackages[0]._id, activities: [], checkIn: "2026-05-01T00:00:00.000Z", checkOut: "2026-05-08T00:00:00.000Z", numberOfGuests: 2, numberOfNights: 7, roomTotal: 126000, packageTotal: 60000, activitiesTotal: 0, totalPrice: 186000, status: "confirmed", paymentStatus: "paid",    notes: "", createdAt: "2026-04-15T00:00:00.000Z", updatedAt: "2026-04-15T00:00:00.000Z" },
  { _id: "b17", companyId: "c1", customerId: mockCustomers[6]  as any, roomId: mockRooms[1]  as any, packageId: mockPackages[3]._id, activities: [], checkIn: "2026-05-10T00:00:00.000Z", checkOut: "2026-05-24T00:00:00.000Z", numberOfGuests: 2, numberOfNights: 14, roomTotal: 168000, packageTotal: 120000, activitiesTotal: 0, totalPrice: 288000, status: "confirmed", paymentStatus: "unpaid",  notes: "", createdAt: "2026-04-16T00:00:00.000Z", updatedAt: "2026-04-16T00:00:00.000Z" },
  { _id: "b18", companyId: "c1", customerId: mockCustomers[8]  as any, roomId: mockRooms[4]  as any, packageId: undefined, activities: [], checkIn: "2026-05-15T00:00:00.000Z", checkOut: "2026-05-22T00:00:00.000Z", numberOfGuests: 1, numberOfNights: 7, roomTotal: 21000,  packageTotal: 0, activitiesTotal: 0, totalPrice: 21000,  status: "pending",   paymentStatus: "unpaid",  notes: "", createdAt: "2026-04-17T00:00:00.000Z", updatedAt: "2026-04-17T00:00:00.000Z" },
];

// ─── Payments ─────────────────────────────────────────────────────
export const mockPayments: Payment[] = [
  { _id: "py1",  companyId: "c1", bookingId: mockBookings[0]  as any, customerId: mockCustomers[0]  as any, amount: 186000, method: "credit_card",   status: "completed", type: "full",      paidAt: "2026-04-10T10:00:00.000Z", notes: "", createdAt: "2026-04-10T10:00:00.000Z", updatedAt: "2026-04-10T10:00:00.000Z" },
  { _id: "py2",  companyId: "c1", bookingId: mockBookings[1]  as any, customerId: mockCustomers[3]  as any, amount: 105000, method: "cash",          status: "completed", type: "full",      paidAt: "2026-04-11T09:00:00.000Z", notes: "", createdAt: "2026-04-11T09:00:00.000Z", updatedAt: "2026-04-11T09:00:00.000Z" },
  { _id: "py3",  companyId: "c1", bookingId: mockBookings[3]  as any, customerId: mockCustomers[7]  as any, amount: 28000,  method: "bank_transfer", status: "completed", type: "deposit",   paidAt: "2026-04-13T14:00:00.000Z", notes: "50% deposit paid.", createdAt: "2026-04-13T14:00:00.000Z", updatedAt: "2026-04-13T14:00:00.000Z" },
  { _id: "py4",  companyId: "c1", bookingId: mockBookings[4]  as any, customerId: mockCustomers[10] as any, amount: 144000, method: "credit_card",   status: "completed", type: "full",      paidAt: "2026-04-14T11:00:00.000Z", notes: "", createdAt: "2026-04-14T11:00:00.000Z", updatedAt: "2026-04-14T11:00:00.000Z" },
  { _id: "py5",  companyId: "c1", bookingId: mockBookings[5]  as any, customerId: mockCustomers[1]  as any, amount: 216000, method: "credit_card",   status: "completed", type: "full",      paidAt: "2026-04-01T08:00:00.000Z", notes: "", createdAt: "2026-04-01T08:00:00.000Z", updatedAt: "2026-04-01T08:00:00.000Z" },
  { _id: "py6",  companyId: "c1", bookingId: mockBookings[6]  as any, customerId: mockCustomers[2]  as any, amount: 210000, method: "cash",          status: "completed", type: "full",      paidAt: "2026-03-28T15:00:00.000Z", notes: "", createdAt: "2026-03-28T15:00:00.000Z", updatedAt: "2026-03-28T15:00:00.000Z" },
  { _id: "py7",  companyId: "c1", bookingId: mockBookings[7]  as any, customerId: mockCustomers[5]  as any, amount: 84000,  method: "credit_card",   status: "completed", type: "full",      paidAt: "2026-04-02T10:00:00.000Z", notes: "", createdAt: "2026-04-02T10:00:00.000Z", updatedAt: "2026-04-02T10:00:00.000Z" },
  { _id: "py8",  companyId: "c1", bookingId: mockBookings[9]  as any, customerId: mockCustomers[6]  as any, amount: 162000, method: "bank_transfer", status: "completed", type: "full",      paidAt: "2026-02-01T09:00:00.000Z", notes: "", createdAt: "2026-02-01T09:00:00.000Z", updatedAt: "2026-02-01T09:00:00.000Z" },
  { _id: "py9",  companyId: "c1", bookingId: mockBookings[10] as any, customerId: mockCustomers[9]  as any, amount: 240000, method: "credit_card",   status: "completed", type: "full",      paidAt: "2026-02-05T11:00:00.000Z", notes: "", createdAt: "2026-02-05T11:00:00.000Z", updatedAt: "2026-02-05T11:00:00.000Z" },
  { _id: "py10", companyId: "c1", bookingId: mockBookings[11] as any, customerId: mockCustomers[11] as any, amount: 186000, method: "cash",          status: "completed", type: "full",      paidAt: "2026-02-15T12:00:00.000Z", notes: "", createdAt: "2026-02-15T12:00:00.000Z", updatedAt: "2026-02-15T12:00:00.000Z" },
  { _id: "py11", companyId: "c1", bookingId: mockBookings[12] as any, customerId: mockCustomers[12] as any, amount: 24000,  method: "credit_card",   status: "refunded",  type: "refund",    paidAt: "2026-03-09T13:00:00.000Z", notes: "Full refund issued.", createdAt: "2026-03-09T13:00:00.000Z", updatedAt: "2026-03-09T13:00:00.000Z" },
  { _id: "py12", companyId: "c1", bookingId: mockBookings[13] as any, customerId: mockCustomers[13] as any, amount: 288000, method: "bank_transfer", status: "completed", type: "full",      paidAt: "2026-03-01T10:00:00.000Z", notes: "", createdAt: "2026-03-01T10:00:00.000Z", updatedAt: "2026-03-01T10:00:00.000Z" },
  { _id: "py13", companyId: "c1", bookingId: mockBookings[14] as any, customerId: mockCustomers[14] as any, amount: 155000, method: "credit_card",   status: "completed", type: "full",      paidAt: "2026-03-05T09:00:00.000Z", notes: "", createdAt: "2026-03-05T09:00:00.000Z", updatedAt: "2026-03-05T09:00:00.000Z" },
  { _id: "py14", companyId: "c1", bookingId: mockBookings[15] as any, customerId: mockCustomers[5]  as any, amount: 186000, method: "credit_card",   status: "completed", type: "full",      paidAt: "2026-04-15T16:00:00.000Z", notes: "", createdAt: "2026-04-15T16:00:00.000Z", updatedAt: "2026-04-15T16:00:00.000Z" },
  { _id: "py15", companyId: "c1", bookingId: mockBookings[16] as any, customerId: mockCustomers[6]  as any, amount: 144000, method: "bank_transfer", status: "pending",   type: "deposit",   paidAt: undefined, notes: "Awaiting bank transfer.", createdAt: "2026-04-16T10:00:00.000Z", updatedAt: "2026-04-16T10:00:00.000Z" },
];

// ─── Team ─────────────────────────────────────────────────────────
export const mockTeam: TeamMember[] = [
  { _id: "t1", email: "alex@taghazout.com",    firstName: "Alex",    lastName: "Martin",   role: "admin",   isActive: true, createdAt: "2026-01-01T00:00:00.000Z" },
  { _id: "t2", email: "sofia@taghazout.com",   firstName: "Sofia",   lastName: "Durand",   role: "manager", isActive: true, createdAt: "2026-01-05T00:00:00.000Z" },
  { _id: "t3", email: "carlos@taghazout.com",  firstName: "Carlos",  lastName: "Rivera",   role: "manager", isActive: true, createdAt: "2026-01-10T00:00:00.000Z" },
  { _id: "t4", email: "emma@taghazout.com",    firstName: "Emma",    lastName: "Johnson",  role: "staff",   isActive: true, createdAt: "2026-02-01T00:00:00.000Z" },
  { _id: "t5", email: "youssef@taghazout.com", firstName: "Youssef", lastName: "Alami",    role: "staff",   isActive: true, createdAt: "2026-02-15T00:00:00.000Z" },
  { _id: "t6", email: "nina@taghazout.com",    firstName: "Nina",    lastName: "Weber",    role: "staff",   isActive: false, createdAt: "2026-03-01T00:00:00.000Z" },
];
