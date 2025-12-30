export default {
  errorPage: {
    oops: 'Oops!',
    not_found: 'The page was not found.',
    something_wrong: 'Something went wrong.',
  },
  registration: {
    title: 'Create Account',
    fields: {
      firstName: {
        label: 'First Name',
        placeholder: 'Enter your first name',
      },
      lastName: {
        label: 'Last Name',
        placeholder: 'Enter your last name',
      },
      gender: {
        label: 'Gender',
        select: 'Select gender',
        options: {
          male: 'Male',
          female: 'Female',
          other: 'Other',
        },
      },
      birthday: {
        label: 'Date of Birth',
        day: 'Day',
        month: 'Month',
        year: 'Year',
        months: {
          january: 'January',
          february: 'February',
          march: 'March',
          april: 'April',
          may: 'May',
          june: 'June',
          july: 'July',
          august: 'August',
          september: 'September',
          october: 'October',
          november: 'November',
          december: 'December',
        },
      },
      address: {
        label: 'Street',
        placeholder: 'Enter street name',
      },
      addressNumber: {
        label: 'House Number',
        placeholder: 'Enter house number',
      },
      postCode: {
        label: 'Post Code',
        placeholder: 'Enter post code',
      },
      city: {
        label: 'City',
        placeholder: 'Enter city',
      },
      country: {
        label: 'Country',
        select: 'Select country',
      },
      nationalId: {
        label: 'National ID Number',
        placeholder: 'Enter your national ID number',
      },
      existingPatient: {
        label: 'Are you an existing patient?',
        yes: 'Yes',
        no: 'No',
      },
      insuranceType: {
        label: 'Insurance Type',
        select: 'Select insurance type',
        options: {
          state: 'State Insurance',
          private: 'Private Insurance',
        },
      },
      insuranceCompany: {
        label: 'Insurance Company',
        select: 'Select insurance company',
      },
      insuranceNumber: {
        label: 'Insurance Number',
        placeholder: 'Enter your insurance number',
      },
      email: {
        label: 'Email Address',
        placeholder: 'Enter your email',
      },
      password: {
        label: 'Password',
        placeholder: 'Enter your password',
      },
      confirmPassword: {
        label: 'Confirm Password',
        placeholder: 'Repeat your password',
      },
    },
    validation: {
      firstName: 'First name is required',
      lastName: 'Last name is required',
      gender: 'Please select your gender',
      birthDate: 'Date of birth is required',
      address: 'Street is required',
      addressNumber: 'House number is required',
      postCode: 'Post code is required',
      city: 'City is required',
      country: 'Please select your country',
      email: 'Please enter a valid email address',
      password: {
        minLength: 'Password must be at least 8 characters long',
        lowercase: 'Password must contain at least one lowercase letter',
        uppercase: 'Password must contain at least one uppercase letter',
        number: 'Password must contain at least one number',
        specialChar: 'Password must contain at least one special character',
      },
      confirmPassword: 'Passwords must match',
      nationalId: 'Please enter a valid 10-digit national ID number',
      existingPatient: 'Please indicate if you are an existing patient',
      insurance: 'Please complete all insurance information',
      termsRequired: 'You must accept the terms and conditions',
      vatNumber: 'Please enter a valid VAT number',
      error: 'Error',
      success: 'Success',
      errorOccurred: 'An error occurred. Please try again.',
      registrationError: 'Registration failed. Please try again.',
      successMessage: 'Registration successful! You can now log in.',
    },
    terms: {
      accept: 'I accept the',
      link: 'Terms and Conditions',
    },
    submit: {
      buttonText: 'Create Account',
      loginPrompt: 'Already have an account?',
      loginText: 'Log In',
    },
  },

  login: {
    title: 'Log in to your account',
    form: {
      email: {
        label: 'Email',
        placeholder: 'Enter your email address',
      },
      password: {
        label: 'Password',
        placeholder: 'Enter your password',
      },
      submit: 'Login',
      forgotPassword: 'Forgot password?',
      noAccount: "Don't have an account?",
      registerNow: 'Register now!',
    },
    validation: {
      email: {
        required: 'Email is required',
        invalid: 'Email is invalid',
      },
      password: {
        required: 'Password is required',
        minLength: 'Password must be at least 8 characters long',
        lowercase: 'Password must contain at least one lowercase letter',
        uppercase: 'Password must contain at least one uppercase letter',
        number: 'Password must contain at least one number',
        specialChar: 'Password must contain at least one special character',
      },
    },
    errors: {
      invalidCredentials: 'Invalid email or password',
      500: 'Server error occurred',
      unknown: 'An unknown error occurred',
      emailNotValidated: 'Please validate your email before logging in',
    },
    emailValidation: {
      prompt: 'Please validate your email to continue',
      sending: 'Sending...',
      resend: 'Resend validation email',
      resendSuccess: 'Email Validation',
      tokenStillValid: 'A new validation email has been sent to your address',
      alreadySent: 'A valid verification email was already sent. Please check your inbox.',
      resendError: 'An error occurred while resending the email',
      emailIsValidated: 'Email already validated',
      emailValidated: 'Email validated successfully',
      expiredToken: 'The validation link has expired. Please request a new one.',
    },
  },

  calendar: {
    title: 'Book Your Appointment',
    description: 'Select a doctor and choose your preferred appointment time',
    selectedPlan: 'Selected Plan',
    noPlanSelected: 'No plan selected',
    backToPricing: 'Back to Pricing',
    selectDoctor: 'Select a Doctor',
    loadingDoctors: 'Loading doctors...',
    noDoctorsAvailable: 'No doctors available for this plan',
    selectDateTime: 'Select Date & Time',
    selectDate: 'Select a Date',
    loadingAvailability: 'Loading availability...',
    availableTimeSlots: 'Available Time Slots',
    noSlotsAvailable: 'No available time slots for this date',
    proceedToConfirmation: 'Proceed to Confirmation',
  },

  confirm: {
    title: 'Confirm Your Appointment',
    description: 'Please review your appointment details and confirm',
    incompleteSelection: 'Incomplete Selection',
    pleaseMakeSelection: 'Please complete your appointment selection before proceeding.',
    backToCalendar: 'Back to Calendar',
    appointmentSummary: 'Appointment Summary',
    selectedPlan: 'Selected Plan',
    selectedDoctor: 'Doctor',
    appointmentDateTime: 'Date & Time',
    goBack: 'Go Back',
    confirmAppointment: 'Confirm Appointment',
    confirming: 'Confirming...',
    appointmentConfirmed: 'Appointment Confirmed!',
    confirmationMessage: 'Your appointment has been successfully booked. You will receive a confirmation email shortly.',
  },

  common: {
    retry: 'Retry',
  },

  appointments: {
    cancel: {
      title: 'Cancel Appointment',
      description: 'Please provide a reason for cancelling this appointment. This will be shared with the other party.',
      reasonLabel: 'Reason for cancellation',
      reasonPlaceholder: 'Please explain why you need to cancel this appointment...',
      keepAppointment: 'Keep Appointment',
      confirmCancel: 'Cancel Appointment',
      cancelledBy: 'Cancelled by',
      cancelReason: 'Cancellation Reason',
    },
  },

  featureSection: {
    smartHealthcare: {
      title: 'Smart Healthcare Solutions',
      description: 'Experience premium German medical care from the comfort of your home, with transparent pricing and exceptional service quality.',
    },
    premiumCare: {
      title: 'Premium German Medical Care Across Europe',
      description: 'Save yourself from overpriced treatments abroad and, most importantly, from wasting your valuable time.',
    },

    button: {
      text: 'View Pricing',
    },
  },


  nav: {
    home: 'Home',
    services: 'Services',
    contact: 'Contact',
    about_us: 'About us',
    pricing: 'Pricing',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    forProviders: 'For Providers',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    legal: 'Legal Notice',
  },


  authmenu: {
    dashboard: 'Dashboard',
    adminDashboard: 'Admin Dashboard',
    userProfile: 'User Profile',
    logout: 'Logout',
  },

  about: {
    title: ' Platform',
    titleColored: ' International Medical Tourism ',
    description:
      'Bulgardocs is an international medical tourism platform connecting patients with trusted doctors and clinics worldwide. Patients can search for treatments, doctors can find job opportunities, clinics can recruit doctors, and medical tourism agencies can manage multiple providers—all in one comprehensive platform.',
    mission: {
      title: 'Our Mission',
      text: 'To make international medical tourism accessible, transparent, and seamless for patients, while providing doctors, clinics, and agencies with powerful tools to grow their practice and reach patients worldwide.'
    },
    features: {
      title: 'Platform Features',
      description: 'Discover what makes Bulgardocs the leading international medical tourism platform',
      patients: {
        title: 'For Patients',
        text: 'Search and connect with doctors and clinics offering medical treatments. Book video consultations and receive personalized treatment offers with detailed pricing and plans.'
      },
      doctors: {
        title: 'For Doctors',
        text: 'Expand your practice internationally, connect with patients worldwide, and search for job opportunities at clinics around the globe.'
      },
      clinics: {
        title: 'For Clinics',
        text: 'Grow your clinic\'s international presence, recruit qualified doctors, and manage multiple providers efficiently.'
      },
      agencies: {
        title: 'For Agencies',
        text: 'Manage multiple doctors and clinics under your agency. Coordinate treatments and streamline your medical tourism operations from one platform.'
      }
    }
  },

  button: {
    startForFree: 'Register',
  },

  components: {
    whatWeDo: {
      title: 'How It Works',
      description: 'Bulgardocs connects patients, doctors, clinics, and medical tourism agencies in one comprehensive platform for international medical tourism.',
      cards: {
        search: {
          title: 'Search & Discover',
          text: 'Patients can search for doctors and clinics offering specific treatments worldwide. Filter by specialty, location, language, and more.'
        },
        connect: {
          title: 'Book & Connect',
          text: 'Book video consultations with doctors and clinics. Receive personalized treatment offers with detailed pricing and treatment plans.'
        },
        recruit: {
          title: 'Recruitment Network',
          text: 'Doctors can search for job opportunities at clinics. Clinics can find and recruit qualified doctors to join their team.'
        },
        manage: {
          title: 'Agency Management',
          text: 'Medical tourism agencies can manage multiple doctors and clinics, coordinate treatments, and streamline operations.'
        }
      }
    },
    healthcareFeatures: {
      title: 'Your International Medical Tourism Journey Starts Here',
      description: 'Bulgardocs connects patients, doctors, clinics, and medical tourism agencies in one comprehensive platform for international medical tourism.',
      features: {
        experts: {
          title: 'Find Trusted Doctors & Clinics Worldwide',
          text: 'Search and connect with verified doctors and clinics offering medical treatments worldwide. Book video consultations and receive personalized treatment offers.'
        },
        services: {
          title: 'Personalized Treatment Planning',
          text: 'Receive detailed PDF treatment offers with pricing, timelines, and treatment plans. Make informed decisions about your medical tourism journey.'
        },
        care: {
          title: 'Seamless Medical Tourism Experience',
          text: 'From initial consultation to treatment completion, we help you plan your entire medical tourism journey with confidence and ease.'
        }
      },
      tagline: {
        text: 'Easy. Fast. Reliable.',
        highlight: 'Your health, your way!'
      }
    },
    heroSection: {
      title: 'International Medical Tourism Platform',
      subtitle: 'Find trusted doctors and clinics worldwide. Book video consultations and receive personalized treatment offers for your international medical tourism journey.',
      cta: 'Get Started',
      trustedBy: 'Trusted by patients worldwide',
      trustedByCount: 'Trusted by 10,000+ patients',
      findTreatment: 'Find your treatment',
      searchLabel: 'What are you looking for?',
      locationLabel: 'Where?',
      termsAcknowledge: 'I have read and acknowledge the'
    },
    popularItems: {
      title: 'Most Popular',
      description: 'Discover the most booked treatments, doctors, and clinics based on patient bookings and offer requests',
      by: 'by',
      managedByAgency: 'Managed by agency',
      appointments: 'appointments'
    },
    featureSection: {
      button: {
        text: 'View Pricing'
      },
      smartHealthcare: {
        title: 'Smart Healthcare Solutions',
        description: 'Experience premium German medical care from the comfort of your home, with transparent pricing and exceptional service quality.',
        point1: 'Offered at no cost to all regular patients of our medical practices',
        point2: 'A fixed flat rate, no matter the treatment',
        point3: 'High-quality, evidence-based medical care from German doctors in every country where our platform operates'
      },
      premiumCare: {
        title: 'Premium German Medical Care Across Europe',
        description: 'Save yourself from overpriced treatments abroad and, most importantly, from wasting your valuable time.',
        point1: 'High-quality, evidence-based medicine provided by experienced German doctors',
        point2: 'Convenient video consultations and treatments across multiple European countries',
        point3: 'Transparent pricing with a fixed flat rate for all treatments',
        point4: 'Exclusive benefits for regular patients, including free follow-up services',
        point5: 'Save time and money by avoiding unnecessary travel and overpriced treatments abroad'
      }
    },
    ourServices: {
      title: 'Our Services',
      description: 'Bulgardocs is a comprehensive international medical tourism platform serving patients, doctors, clinics, and medical tourism agencies.',
      forPatients: {
        title: 'For Patients',
        description: 'Search and connect with doctors and clinics offering medical treatments worldwide. Book consultations and receive personalized treatment offers.',
        search: {
          title: 'Search Treatments',
          text: 'Search for doctors and clinics by specialty, treatment type, location, and language. Find the perfect healthcare provider for your medical needs.'
        },
        book: {
          title: 'Book Consultations',
          text: 'Schedule video consultations with doctors and clinics. Discuss your medical needs and receive expert advice from anywhere in the world.'
        },
        offers: {
          title: 'Treatment Offers',
          text: 'Receive detailed PDF treatment offers with pricing, timelines, treatment plans, and all necessary information for your medical tourism journey.'
        },
        manage: {
          title: 'Manage Appointments',
          text: 'Keep track of all your consultations, appointments, and treatment offers in one convenient place.'
        }
      },
      forDoctors: {
        title: 'For Doctors',
        description: 'Expand your practice internationally and connect with patients worldwide. Search for job opportunities at clinics.',
        profile: {
          title: 'Professional Profile',
          text: 'Create a comprehensive profile showcasing your specialties, treatments, and expertise to attract patients from around the world.'
        },
        patients: {
          title: 'Patient Management',
          text: 'Manage consultations, appointments, and treatment offers. Connect with patients seeking medical tourism services.'
        },
        jobs: {
          title: 'Job Opportunities',
          text: 'Search and apply for positions at clinics worldwide. Receive recruitment offers and expand your career opportunities.'
        }
      },
      forClinics: {
        title: 'For Clinics',
        description: 'Grow your clinic\'s international presence and recruit qualified doctors. Manage multiple doctors and treatments efficiently.',
        profile: {
          title: 'Clinic Profile',
          text: 'Showcase your clinic, facilities, services, and expertise to attract patients from around the world.'
        },
        doctors: {
          title: 'Doctor Management',
          text: 'Manage multiple doctors within your clinic. Coordinate schedules, treatments, and patient care efficiently.'
        },
        recruit: {
          title: 'Recruit Doctors',
          text: 'Search for qualified doctors and send recruitment offers. Find the right medical professionals to join your team.'
        }
      },
      forAgencies: {
        title: 'For Medical Tourism Agencies',
        description: 'Manage multiple doctors and clinics under your agency. Coordinate treatments and streamline your medical tourism operations.',
        manage: {
          title: 'Multi-Provider Management',
          text: 'Manage multiple doctors and clinics from one dashboard. Coordinate treatments and operations efficiently.'
        },
        treatments: {
          title: 'Treatment Management',
          text: 'Upload and manage treatments offered by your affiliated doctors and clinics. Showcase your complete service portfolio.'
        },
        coordination: {
          title: 'Coordination Tools',
          text: 'Streamline communication and coordination between patients, doctors, and clinics under your agency.'
        }
      },
      countries: {
        de: {
          name: 'Germany',
          clinicInfo: 'Physical clinic - Praxis Dr. Kerim in Offenbach am Main'
        },
        bg: {
          name: 'Bulgaria',
          clinicInfo: 'Physical clinic - Clinic Dr. Kerim in Plovdiv, Antonovo and Omurtag'
        }
      }
    },
    languagesWeSpeak: {
    },
    pricing: {
      title: 'Simple, Transparent Pricing',
      description: 'Choose the plan that best fits your healthcare needs. All plans include access to our certified German doctors and secure digital platform.',
      note: {
        text: 'All prices are in EUR and include VAT. Subscriptions can be cancelled at any time. Insurance requirements may vary by region.'
      },
      forPatients: 'For Patients',
      forDoctors: 'For Doctors',
      forClinics: 'For Clinics',
      forAgencies: 'For Medical Tourism Agencies',
      free: 'Free',
      forever: '/forever',
      freeSubtitle: 'The platform is completely free for patients',
      monthlyPlan: 'Monthly Plan',
      annualPlan: 'Annual Plan',
      bestValue: 'Best Value',
      perMonth: '/month',
      perYear: '/year',
      getStartedFree: 'Get Started Free',
      getStarted: 'Get Started',
      save: 'Save',
      perYear: 'per year',
      patientFeatures: {
        search: 'Search and browse doctors and clinics worldwide',
        book: 'Book video consultations',
        offers: 'Receive personalized PDF treatment offers',
        manage: 'Manage your appointments',
        save: 'Save favorite doctors and clinics'
      },
      doctorFeatures: {
        contact: 'Show contact information to patients',
        bookings: 'Receive video consultation bookings',
        treatments: 'Manage your treatments and pricing',
        apply: 'Apply for clinic positions',
        offers: 'Receive recruitment offers'
      },
      clinicFeatures: {
        contact: 'Show contact information to patients',
        bookings: 'Receive video consultation bookings',
        treatments: 'Manage clinic treatments and pricing',
        recruit: 'Recruit doctors and send offers',
        manage: 'Manage multiple doctors'
      },
      customPlan: 'Custom Plan',
      customPrice: 'Custom Pricing',
      customSubtitle: 'Pricing depends on the number of doctors and clinics you manage',
      requestPlan: 'Request a Plan',
      agencyFeatures: {
        manage: 'Manage multiple doctors and clinics from one dashboard',
        treatments: 'Upload and manage treatments for all your providers',
        coordination: 'Streamline communication and coordination',
        scalable: 'Scalable pricing based on your needs',
        support: 'Dedicated support and onboarding'
      },
      plans: {
        consultation: {
          title: 'Consultation with a Physician',
          price: '60.00',
          description: 'Full consultation and services',
          feature1: 'No Proof of insurance is required',
          feature2: 'Videoconsultation',
          feature3: 'e-Prescriptions',
          feature4: 'e-Sick notes'
        }
      },
      button: {
        text: 'Buy Now'
      }
    }
  },

  footer: {
    allRightsReserved: 'All rights reserved.',
    followFacebook: 'Follow us on Facebook',
    quickLinks: 'Quick Links',
    account: 'Account',
    providers: 'Provider',
    joinAsProvider: 'Join as Provider',
    description: 'Connecting patients with top-tier healthcare providers across Europe and beyond. Your health, our priority.',
  },

  contact: {
    title: 'Get in Touch',
    subtitle: 'Fill in the form and we will contact you as soon as possible.',
    form: {
      name: {
        label: 'Name',
        placeholder: 'Enter your name',
      },
      email: {
        label: 'Email',
        placeholder: 'Enter your email',
      },
      phone: {
        label: 'Phone (Optional)',
        placeholder: 'Enter your phone number',
      },
      message: {
        label: 'Message',
        placeholder: 'Enter your message',
      },
      submit: 'Send Message',
    },
    validation: {
      name: {
        required: 'Name is required',
        minLength: 'Name must be at least 2 characters',
      },
      email: {
        required: 'Email is required',
        invalid: 'Please enter a valid email address',
      },
      phone: {
        invalid: 'Please enter a valid phone number',
      },
      message: {
        required: 'Message is required',
        minLength: 'Message must be at least 10 characters',
      },
    },
    success: 'Your message has been sent successfully. We will contact you soon.',
    error: 'An error occurred while sending your message. Please try again.',
    contactInfo: {
      title: 'Contact Information',
      address: {
        title: 'Office Address',
        line1: 'Offenbach am Main',
        line2: 'Germany',
      },
      phone: {
        title: 'Phone',
        number: '+49 123 456 789',
      },
      email: {
        title: 'Email',
      },
      hours: {
        title: 'Working Hours',
        schedule: 'Monday - Friday: 9:00 AM - 6:00 PM',
      },
    },
  },
  documents: {
    title: "My Documents",
    subtitle: "Access your medical documents and reports",
    loading: "Loading documents...",
    error: "Error loading documents",
    retry: "Retry",
    documents: "documents",
    noDocuments: "No documents yet",
    noDocumentsText: "Your medical documents and reports will appear here once you start using our services",
    noDocumentsInCategory: "No documents in this category yet",
    view: "View",
    opening: "Opening...",
    urgent: "Urgent",
    high: "High",
    reportType: "Report Type",
    labName: "Lab Name",
    testType: "Test Type",
    radiologyCenter: "Radiology Center",
    examType: "Exam Type",
    insuranceProvider: "Insurance Provider",
    claimNumber: "Claim Number",
    referenceNumber: "Reference Number",
    notes: "Notes",
  },
  search: {
    placeholder: "Treatment, Clinic",
    location: "Location",
    button: "Search Now",
    title: "Search Doctors & Clinics",
    subtitle: "Find the perfect medical professional for your needs",
    searching: "Searching...",
    found: "Found",
    tabs: {
      all: "All",
      doctors: "Doctors",
      clinics: "Clinics",
      agencies: "Agencies",
      treatments: "Treatments",
    },
    resultLabels: {
      results: "results",
      doctors: "doctors",
      clinics: "clinics",
      agencies: "agencies",
      treatments: "treatments",
    },
    noResults: {
      title: "No results found",
      text: "Try adjusting your search filters or search terms",
      resetFilters: "Reset Filters",
    },
    filters: {
      title: "Filters",
      reset: "Reset",
      search: "Search",
      searchPlaceholder: "Name, specialty, treatment...",
      type: "Type",
      typeAll: "All",
      typeDoctors: "Doctors",
      typeClinics: "Clinics",
      typeAgencies: "Agencies",
      specialty: "Specialty",
      specialtyPlaceholder: "e.g., Cardiology, Dermatology...",
      treatment: "Treatment",
      treatmentPlaceholder: "e.g., Dental Implant, Botox...",
      category: "Category",
      categoryPlaceholder: "e.g., Dental, Cosmetic...",
      priceRange: "Price Range (EUR)",
      minPrice: "Min",
      maxPrice: "Max",
      minRating: "Minimum Rating",
      any: "Any",
      rating4: "4+ Stars",
      rating3: "3+ Stars",
      rating2: "2+ Stars",
      rating1: "1+ Star",
      country: "Country",
      countryPlaceholder: "e.g., City or Country",
      city: "City",
      cityPlaceholder: "e.g., Sofia",
      languages: "Languages",
      languagesPlaceholder: "e.g., English, German, Bulgarian (comma-separated)",
      recruitmentStatus: "Recruitment Status",
      recruiting: "Currently Recruiting",
      notRecruiting: "Not Recruiting",
      openForRecruitment: "Open for Recruitment",
      notOpen: "Not Open",
      sortBy: "Sort By",
      sortRating: "Rating",
      sortName: "Name",
      sortPrice: "Price",
      sortNewest: "Newest",
      sortDesc: "Descending",
      sortAsc: "Ascending",
      searchButton: "Search",
      resetFilters: "Reset Filters",
    },
  },
  cards: {
    treatmentsAvailable: "treatment available | treatments available",
    managedBy: "Managed by",
    agency: "Agency",
    fromPrice: "From €{price}",
    viewProfileForPricing: "View profile for pricing",
    limited: "Limited",
    viewProfile: "View Profile",
    doctorsCount: "doctor | doctors",
    currentlyRecruiting: "Currently Recruiting",
    unknownTreatment: "Unknown Treatment",
    providerType: {
      doctor: "Doctor",
      clinic: "Clinic",
    },
    viewDetails: "View Details",
    category: "Category",
    description: "Description",
    includedServices: "Included Services",
    excludedServices: "Excluded Services",
    preparationRequired: "Preparation Required",
    recoveryTime: "Recovery Time",
    location: "Location",
    bookNow: "Book Now",
    viewProviderProfile: "View {type} Profile",
  },
};