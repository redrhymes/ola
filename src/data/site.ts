export type NavigationItem = {
  label: string;
  href: string;
};

export type SocialLink = {
  name: string;
  href: string;
};

export type QuickAction = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: "bike" | "finance" | "assistance" | "service";
};

export const bookingPaymentValues = ["full", "finance", "undecided"] as const;
export const bookingPaymentOptions = [
  { value: bookingPaymentValues[0], label: "Full payment" },
  { value: bookingPaymentValues[1], label: "Finance / EMI" },
  { value: bookingPaymentValues[2], label: "Not sure yet" },
] as const;

export const bookingPage = {
  eyebrow: "BOOK NOW",
  title: "Book Your Ola Scooter",
  description:
    "Choose your model, tell us about yourself and our team will confirm your booking.",
  steps: ["Choose scooter", "Your details", "Review & send"],
  colorOptions: [] as ReadonlyArray<{ value: string; label: string }>, // TODO: add real colour options per model.
  paymentOptions: bookingPaymentOptions,
  footnote:
    "*Prices, reservation amounts and delivery timelines are indicative and subject to change. Our team will confirm everything before you pay anything.",
  offersFreeTestRides: true, // TODO: confirm the dealership offers free test rides.
  reassurance: [
    { label: "No payment on this page", icon: "shield" },
    { label: "Our team confirms by phone", icon: "phone" },
    { label: "Free test ride before you decide", icon: "bike" },
  ] as const,
} as const;

const dealershipLocations = [
  {
    name: "Tilak Nagar",
    phone: { display: "+91 93554 10428", href: "tel:+919355410428" },
  },
  {
    name: "Dilshad Garden",
    phone: { display: "+91 93554 10427", href: "tel:+919355410427" },
  },
  {
    name: "Burari",
    phone: { display: "+91 93554 10484", href: "tel:+919355410484" },
  },
] as const;
const dealershipPhone = dealershipLocations[0].phone;
const dealershipMapsUrl =
  "https://www.google.com/maps/place/Lamba+Ola+Electric/@28.6379921,77.0891176,1081m/data=!3m1!1e3!4m12!1m5!3m4!2zMjjCsDM4JzEyLjEiTiA3N8KwMDUnMTguMCJF!8m2!3d28.636693!4d77.0883191!3m5!1s0x390d0529b6e2b6c5:0x194f54c94f630225!8m2!3d28.6357988!4d77.0916644!16s%2Fg%2F11z_szbpyn?hl=en-IN&entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D";
const dealershipMapEmbedUrl =
  "https://maps.google.com/maps?q=28.6357988%2C77.0916644&z=16&output=embed";

export const site = {
  name: "Ola Electric – Authorized Dealership",
  description:
    "Explore Ola Electric scooters and motorcycles, compare models, and connect with your authorized dealership.",
  aboutPage: {
    title: "Welcome to Ola Electric",
    introduction:
      "We help riders explore Ola Electric scooters and motorcycles, compare available models, and find the option that suits their needs. Visit our dealership to learn about the range and get guidance from our team.",
    paragraphs: [
      "From choosing a model to understanding its available variants, our team is here to make your experience clear and straightforward. We can help with vehicle enquiries, test ride requests, finance information, and booking requests.",
      "Our support continues beyond helping you explore the range. Contact us for assistance with your questions, or visit the showroom to see the available Ola Electric vehicles in person.",
      "We look forward to welcoming you and helping you take the next step toward electric mobility.",
    ],
  } as const,
  phone: dealershipPhone,
  dealershipLocations,
  address: {
    lines: [
      "Ground Floor, 1/22, Near Shiv Bhola Mandir,",
      "Ganesh Nagar, Tilak Nagar, New Delhi - 110018",
    ],
    mapUrl: dealershipMapsUrl,
  },
  hours: [
    { days: "Mon - Sat", time: "9:00 AM - 7:00 PM" },
    { days: "Sunday", time: "10:00 AM - 6:00 PM" },
  ],
  mapEmbedUrl: dealershipMapEmbedUrl,
  mapsUrl: dealershipMapsUrl,
  showroom: {
    eyebrow: "OUR LOCATION",
    title: "Visit Our Showroom",
    description:
      "Explore the complete range of Ola Electric scooters, get expert guidance and experience the ride in person at our dealership.",
    mapFallbackLabel:
      "Map will appear here once the dealership address is added",
    rows: [
      { id: "address", title: "Dealership Name", icon: "mapPin" },
      { id: "hours", title: "Opening Hours", icon: "clock" },
      {
        id: "contact",
        title: "Contact Us",
        icon: "phone",
        note: "For sales, test ride and general enquiries.",
      },
    ],
    directionsLabel: "Get Directions",
    callLabel: "Call the Dealership",
  } as const,
  testimonials: {
    eyebrow: "CUSTOMER EXPERIENCES",
    title: "Experiences That Move Us",
    description:
      "Hear from our customers who have experienced the Ola Electric range at our dealership.",
    verifiedLabel: "Verified Google Review",
    linkLabel: "Read original review",
    newTabLabel: "(opens in a new tab)",
    carouselLabel: "Customer reviews",
    dotLabel: "Show review",
    dotOfLabel: "of",
  } as const,
  ctaBanner: {
    eyebrow: "TAKE THE NEXT STEP",
    titleLines: ["Ready to Make", "the Switch?"],
    descriptionLines: [
      "Experience the future of mobility with Ola Electric scooters.",
      "Book a test ride at our dealership and feel the difference in person.",
    ],
    cta: { label: "Book a Test Ride", href: "#test-ride" },
  } as const,
  footer: {
    vehicleBrandPrefix: "Ola ",
    logoPrimary: "OLA",
    logoSecondary: "ELECTRIC",
    blurb:
      "Your trusted Ola Electric dealership, bringing you a cleaner, smarter and more sustainable way to move.",
    social: [
      { name: "Facebook", href: "https://www.facebook.com/sharer/sharer.php?u=https://lambahyundai.in/" },
      { name: "Instagram", href: "https://www.instagram.com/lambahyundaidelhi?igsh=bm43Z3U0czl4OGpm" },
      { name: "YouTube", href: "https://www.youtube.com/@lambahyundai7049?si=CxtdyPi6z51Rxkpt" },
      { name: "LinkedIn", href: "" },
    ],
    quickLinksTitle: "Quick Links",
    quickLinks: [
      { label: "Home", href: "#top" },
      { label: "About Us", href: "/about" },
      { label: "Our Vehicles", href: "#scooters" },
      { label: "Test Ride", href: "#test-ride" },
      { label: "Finance & Offers", href: "/finance#finance" },
      { label: "Gallery", href: "#gallery" },
      { label: "Contact Us", href: "/contact" },
    ],
    vehiclesTitle: "Our Vehicles",
    compareLabel: "Compare Models",
    dealershipTitle: "Visit Our Dealership",
    contactNote: "For sales, test ride and general enquiries.",
    openingHoursTitle: "Opening Hours",
    legal: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Sitemap", href: "/sitemap.xml" },
      { label: "Cookie Policy", href: "/cookie-policy" },
    ], // TODO: create these pages or point to real URLs.
    copyrightSuffix: "All rights reserved.",
  } as const,
  navigation: [
    { label: "Home", href: "/" },
    { label: "Scooters", href: "/#scooters" },
    { label: "Motorcycles", href: "/#motorcycles" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavigationItem[],
  social: [
    { name: "Instagram", href: "https://www.instagram.com/lambahyundaidelhi?igsh=bm43Z3U0czl4OGpm" },
    { name: "Facebook", href: "https://www.facebook.com/sharer/sharer.php?u=https://lambahyundai.in/" },
    { name: "YouTube", href: "https://www.youtube.com/@lambahyundai7049?si=CxtdyPi6z51Rxkpt" },
  ] satisfies SocialLink[],
  quickActions: [
    {
      id: "test-ride",
      title: "Book a Test Ride",
      description: "Experience Ola Electric scooters at our dealership.",
      href: "#test-ride",
      icon: "bike",
    },
    {
      id: "finance",
      title: "Explore Finance Options",
      description: "Flexible EMI plans to make your ride easier.",
      href: "/finance#finance",
      icon: "finance",
    },
    {
      id: "assistance",
      title: "Dealership Assistance",
      description: "Get expert guidance from our team.",
      href: "/contact",
      icon: "assistance",
    },
    {
      id: "service",
      title: "Service Information",
      description: "Keep your Ola Electric scooter in top condition.",
      href: "/contact",
      icon: "service",
    },
  ] satisfies QuickAction[],
  contactPage: {
    eyebrow: "GET IN TOUCH",
    title: "Contact Us",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Contact",
    description:
      "We’re here to help with any questions about Ola Electric. Get in touch with our team and we’ll be happy to assist.",
    infoLabel: "Contact information",
    mapEyebrow: "VISIT US",
    mapFrameTitle: "Map showing the Ola Electric dealership location",
    directionsNewTabLabel: "(opens in a new tab)",
    directionsLabel: "Get Directions",
    cards: {
      phoneTitle: "Call Us",
      phoneDescription: "Call our dealership for assistance.",
      emailTitle: "Email Us",
      emailDescription: "Send us an email and we’ll get back to you.",
      locationTitle: "Our Location",
      locationDescription: "Visit us at our dealership.",
      hoursTitle: "Business Hours",
    },
    form: {
      eyebrow: "SEND US A MESSAGE",
      title: "Get in Touch",
      description: "Fill out the form and our team will get back to you shortly.",
      fields: {
        fullName: "Full Name",
        email: "Email Address",
        mobile: "Mobile Number",
        message: "Message",
        consent: "I agree to be contacted regarding my enquiry.",
      },
      placeholders: {
        fullName: "Enter your full name",
        email: "you@example.com",
        mobile: "Enter your 10-digit mobile number",
        message: "How can we help you?",
      },
      countryCodeLabel: "Country code",
      requiredLabel: "(required)",
      requiredHint: "Fields marked required must be completed.",
      submitLabel: "Send Message",
      submittingLabel: "Sending message…",
      successTitle: "Thank you for contacting us",
      successText:
        "Your message has been received. Our team will be in touch shortly.",
      errorTitle: "Unable to send your message",
      errorText: "Something went wrong. Please try again.",
      submitAnotherLabel: "Send another message",
      privacyNote:
        "Your information will only be used to respond to your enquiry.",
      honeypotLabel: "Do not fill out this field",
      cooldownText: "You can send another message in {seconds} seconds.",
      messageCountLabel: "characters",
      mapTitle: "Find Our Dealership",
    },
    mapFallbackLabel:
      "Map will appear here once the dealership address is added",
  } as const,
  email: {
    display: "info@olalamba.com",
    href: "mailto:info@olalamba.com",
  },
  financeOffers: {
    eyebrow: "FINANCE & OFFERS",
    title: "Explore Your Purchase Options",
    titleLines: ["Explore Your", "Purchase Options"],
    description:
      "Flexible finance solutions, easy exchange assistance and exciting offers to make your Ola Electric scooter even more accessible.",
    items: [
      {
        title: "Finance Enquiries",
        description: "Get detailed information on available finance options.",
        icon: "receipt",
      },
      {
        title: "Exchange Assistance",
        description:
          "Upgrade to an Ola Electric scooter with easy exchange support.",
        icon: "exchange",
      },
      {
        title: "Current Offers",
        description: "Explore the latest dealership offers and benefits.",
        icon: "offers",
      },
    ],
    cta: {
      label: "Enquire About Finance",
      href: "/#test-ride?topic=finance",
    },
    // TODO: point to a dedicated finance enquiry form if added later.
    footnote:
      "*Terms and conditions apply. Offers, finance options and exchange benefits are subject to eligibility, availability and may vary by location. Please contact our dealership for detailed information.",
  } as const,
  testRide: {
    eyebrow: "TEST RIDE",
    title: "Experience the Ride",
    titleLines: ["Experience", "the Ride"],
    description:
      "Get hands-on with Ola Electric scooters at our dealership. Book a test ride and experience the performance, comfort and technology in person.",
    features: [
      {
        title: "Feel the Performance",
        description: "Experience smooth and silent riding.",
        icon: "HardHat",
      },
      {
        title: "Understand Features",
        description: "Explore the technology up close.",
        icon: "Route",
      },
      {
        title: "Get Expert Guidance",
        description: "Our team is here to assist you.",
        icon: "Users",
      },
    ],
    form: {
      eyebrow: "BOOK A TEST RIDE",
      title: "Request a Test Ride",
      description:
        "Fill in your details and our team will get in touch with you to schedule your test ride.",
      submitLabel: "Request a Test Ride",
      note: "This is a request for a test ride. Our team will contact you to confirm the details as per availability.",
      consent:
        "I agree to be contacted by the dealership regarding my test ride request.",
      successTitle: "Request received",
      successText:
        "Thank you. Our team will contact you shortly to confirm your test ride.",
      errorText: "Something went wrong. Please try again or call us.",
      submitAnotherLabel: "Submit another request",
      requiredHint: "Required fields are marked (required).",
      requiredLabel: "(required)",
      optionalLabel: "(Optional)",
      fields: {
        fullName: "Full Name",
        mobile: "Mobile Number",
        vehicle: "Preferred Vehicle",
        preferredDate: "Preferred Date",
        location: "Preferred Location",
      },
      placeholders: {
        fullName: "Enter your full name",
        mobile: "Enter your mobile number",
        vehicle: "Select a vehicle",
        preferredDate: "Select a date",
        location: "Enter your location",
      },
      countryCodes: [{ code: "+91", label: "+91" }],
      countryCodeLabel: "Country calling code",
      retryLabel: "Retry",
      submittingLabel: "Sending request",
      errorTitle: "Unable to submit your request",
    },
  } as const,
  legalLinks: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Sitemap", href: "/sitemap.xml" },
    { label: "Cookie settings", href: "#cookie-settings" },
  ] satisfies NavigationItem[],
} as const;
