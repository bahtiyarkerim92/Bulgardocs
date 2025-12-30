export default {
  errorPage: {
    oops: 'Oops!',
    not_found: 'Die Seite wurde nicht gefunden.',
    something_wrong: 'Etwas ist schief gelaufen.',
  },
  registration: {
    title: 'Konto erstellen',
    fields: {
      firstName: {
        label: 'Vorname',
        placeholder: 'Geben Sie Ihren Vornamen ein',
      },
      lastName: {
        label: 'Nachname',
        placeholder: 'Geben Sie Ihren Nachnamen ein',
      },
      gender: {
        label: 'Geschlecht',
        select: 'Geschlecht auswählen',
        options: {
          male: 'Männlich',
          female: 'Weiblich',
          other: 'Divers',
        },
      },
      birthday: {
        label: 'Geburtsdatum',
        day: 'Tag',
        month: 'Monat',
        year: 'Jahr',
        months: {
          january: 'Januar',
          february: 'Februar',
          march: 'März',
          april: 'April',
          may: 'Mai',
          june: 'Juni',
          july: 'Juli',
          august: 'August',
          september: 'September',
          october: 'Oktober',
          november: 'November',
          december: 'Dezember',
        },
      },
      address: {
        label: 'Straße',
        placeholder: 'Geben Sie die Straße ein',
      },
      addressNumber: {
        label: 'Hausnummer',
        placeholder: 'Geben Sie die Hausnummer ein',
      },
      postCode: {
        label: 'Postleitzahl',
        placeholder: 'Geben Sie die Postleitzahl ein',
      },
      city: {
        label: 'Stadt',
        placeholder: 'Geben Sie die Stadt ein',
      },
      country: {
        label: 'Land',
        select: 'Land auswählen',
      },
      nationalId: {
        label: 'Personalausweisnummer',
        placeholder: 'Geben Sie Ihre Personalausweisnummer ein',
      },
      existingPatient: {
        label: 'Sind Sie bereits Patient?',
        yes: 'Ja',
        no: 'Nein',
      },
      insuranceType: {
        label: 'Versicherungsart',
        select: 'Versicherungsart auswählen',
        options: {
          state: 'Gesetzliche Krankenversicherung',
          private: 'Private Krankenversicherung',
        },
      },
      insuranceCompany: {
        label: 'Krankenkasse',
        select: 'Krankenkasse auswählen',
      },
      insuranceNumber: {
        label: 'Versichertennummer',
        placeholder: 'Geben Sie Ihre Versichertennummer ein',
      },
      email: {
        label: 'E-Mail-Adresse',
        placeholder: 'Geben Sie Ihre E-Mail-Adresse ein',
      },
      password: {
        label: 'Passwort',
        placeholder: 'Geben Sie Ihr Passwort ein',
      },
      confirmPassword: {
        label: 'Passwort wiederholen',
        placeholder: 'Wiederholen Sie Ihr Passwort',
      },
    },
    validation: {
      firstName: 'Vorname ist erforderlich',
      lastName: 'Nachname ist erforderlich',
      gender: 'Bitte wählen Sie Ihr Geschlecht',
      birthDate: 'Geburtsdatum ist erforderlich',
      address: 'Straße ist erforderlich',
      addressNumber: 'Hausnummer ist erforderlich',
      postCode: 'Postleitzahl ist erforderlich',
      city: 'Stadt ist erforderlich',
      country: 'Bitte wählen Sie Ihr Land',
      email: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
      password: {
        minLength: 'Passwort muss mindestens 8 Zeichen lang sein',
        lowercase: 'Passwort muss mindestens einen Kleinbuchstaben enthalten',
        uppercase: 'Passwort muss mindestens einen Großbuchstaben enthalten',
        number: 'Passwort muss mindestens eine Zahl enthalten',
        specialChar: 'Passwort muss mindestens ein Sonderzeichen enthalten',
      },
      confirmPassword: 'Die Passwörter müssen übereinstimmen',
      nationalId: 'Bitte geben Sie eine gültige 10-stellige Personalausweisnummer ein',
      existingPatient: 'Bitte geben Sie an, ob Sie bereits Patient sind',
      insurance: 'Bitte vervollständigen Sie alle Versicherungsinformationen',
      termsRequired: 'Sie müssen die Nutzungsbedingungen akzeptieren',
      vatNumber: 'Bitte geben Sie eine gültige Umsatzsteuer-ID ein',
      error: 'Fehler',
      success: 'Erfolg',
      errorOccurred: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.',
      registrationError: 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.',
      successMessage: 'Registrierung erfolgreich! Sie können sich jetzt anmelden.',
    },
    terms: {
      accept: 'Ich akzeptiere die',
      link: 'Nutzungsbedingungen',
    },
    submit: {
      buttonText: 'Konto erstellen',
      loginPrompt: 'Bereits ein Konto?',
      loginText: 'Anmelden',
    },
  },

  login: {
    title: 'Melden Sie sich in Ihrem Konto an',
    form: {
      email: {
        label: 'E-Mail',
        placeholder: 'Geben Sie Ihre E-Mail-Adresse ein',
      },
      password: {
        label: 'Passwort',
        placeholder: 'Geben Sie Ihr Passwort ein',
      },
      submit: 'Anmelden',
      forgotPassword: 'Passwort vergessen?',
      noAccount: 'Sie haben noch kein Konto?',
      registerNow: 'Jetzt registrieren!',
    },
    validation: {
      email: {
        required: 'E-Mail ist erforderlich',
        invalid: 'E-Mail ist ungültig',
      },
      password: {
        required: 'Passwort ist erforderlich',
        minLength: 'Das Passwort muss mindestens 8 Zeichen lang sein',
        lowercase: 'Das Passwort muss mindestens einen Kleinbuchstaben enthalten',
        uppercase: 'Das Passwort muss mindestens einen Großbuchstaben enthalten',
        number: 'Das Passwort muss mindestens eine Zahl enthalten',
        specialChar: 'Das Passwort muss mindestens ein Sonderzeichen enthalten',
      },
    },
    errors: {
      invalidCredentials: 'Ungültige E-Mail oder falsches Passwort',
      500: 'Serverfehler ist aufgetreten',
      unknown: 'Ein unbekannter Fehler ist aufgetreten',
      emailNotValidated: 'Bitte bestätigen Sie Ihre E-Mail, bevor Sie sich anmelden',
    },
    emailValidation: {
      prompt: 'Bitte bestätigen Sie Ihre E-Mail, um fortzufahren',
      sending: 'Sende...',
      resend: 'Bestätigungs-E-Mail erneut senden',
      resendSuccess: 'E-Mail-Bestätigung',
      tokenStillValid: 'Eine neue Bestätigungs-E-Mail wurde an Ihre Adresse gesendet',
      alreadySent:
        'Eine gültige Bestätigungs-E-Mail wurde bereits gesendet. Bitte überprüfen Sie Ihren Posteingang.',
      resendError: 'Fehler beim erneuten Senden der E-Mail-Bestätigung',
      emailIsValidated: 'E-Mail bereits bestätigt',
      emailValidated: 'E-Mail bestätigt erfolgreich',
      expiredToken: 'Die Bestätigungs-E-Mail ist abgelaufen. Bitte bitten Sie um einen neuen Link.',
    },
  },

  calendar: {
    title: 'Buchen Sie Ihren Termin',
    description: 'Wählen Sie einen Arzt und wählen Sie Ihre bevorzugte Terminzeit',
    selectedPlan: 'Ausgewählter Plan',
    noPlanSelected: 'Kein Plan ausgewählt',
    backToPricing: 'Zurück zu den Preisen',
    selectDoctor: 'Wählen Sie einen Arzt',
    loadingDoctors: 'Ärzte werden geladen...',
    noDoctorsAvailable: 'Keine Ärzte für diesen Plan verfügbar',
    selectDateTime: 'Datum & Uhrzeit wählen',
    selectDate: 'Wählen Sie ein Datum',
    loadingAvailability: 'Verfügbarkeit wird geladen...',
    availableTimeSlots: 'Verfügbare Zeitfenster',
    noSlotsAvailable: 'Keine verfügbaren Zeitfenster für dieses Datum',
    proceedToConfirmation: 'Zur Bestätigung fortfahren',
  },

  confirm: {
    title: 'Bestätigen Sie Ihren Termin',
    description: 'Bitte überprüfen Sie Ihre Termindetails und bestätigen Sie',
    incompleteSelection: 'Unvollständige Auswahl',
    pleaseMakeSelection: 'Bitte vervollständigen Sie Ihre Terminauswahl, bevor Sie fortfahren.',
    backToCalendar: 'Zurück zum Kalender',
    appointmentSummary: 'Terminübersicht',
    selectedPlan: 'Ausgewählter Plan',
    selectedDoctor: 'Arzt',
    appointmentDateTime: 'Datum & Uhrzeit',
    goBack: 'Zurück',
    confirmAppointment: 'Termin bestätigen',
    confirming: 'Wird bestätigt...',
    appointmentConfirmed: 'Termin bestätigt!',
    confirmationMessage: 'Ihr Termin wurde erfolgreich gebucht. Sie erhalten in Kürze eine Bestätigungs-E-Mail.',
  },

  common: {
    retry: 'Wiederholen',
  },

  appointments: {
    cancel: {
      title: 'Termin absagen',
      description: 'Bitte geben Sie einen Grund für die Absage dieses Termins an. Dies wird der anderen Partei mitgeteilt.',
      reasonLabel: 'Grund für die Absage',
      reasonPlaceholder: 'Bitte erklären Sie, warum Sie diesen Termin absagen müssen...',
      keepAppointment: 'Termin beibehalten',
      confirmCancel: 'Termin absagen',
      cancelledBy: 'Abgesagt von',
      cancelReason: 'Absagegrund',
    },
  },

  components: {
    whatWeDo: {
      title: 'Wie es funktioniert',
      description: 'Bulgardocs verbindet Patienten, Ärzte, Kliniken und Medizintourismus-Agenturen auf einer umfassenden Plattform für internationalen Medizintourismus.',
      cards: {
        search: {
          title: 'Suchen & Entdecken',
          text: 'Patienten können nach Ärzten und Kliniken suchen, die weltweit spezifische Behandlungen anbieten. Filtern Sie nach Fachgebiet, Standort, Sprache und mehr.'
        },
        connect: {
          title: 'Buchen & Verbinden',
          text: 'Buchen Sie Videokonsultationen mit Ärzten und Kliniken. Erhalten Sie personalisierte Behandlungsangebote mit detaillierten Preisen und Behandlungsplänen.'
        },
        recruit: {
          title: 'Rekrutierungsnetzwerk',
          text: 'Ärzte können nach Stellenangeboten in Kliniken suchen. Kliniken können qualifizierte Ärzte finden und rekrutieren, die ihrem Team beitreten möchten.'
        },
        manage: {
          title: 'Agenturverwaltung',
          text: 'Medizintourismus-Agenturen können mehrere Ärzte und Kliniken verwalten, Behandlungen koordinieren und Abläufe optimieren.'
        }
      }
    },
    healthcareFeatures: {
      title: 'Ihre internationale Medizintourismus-Reise beginnt hier',
      description: 'Bulgardocs verbindet Patienten, Ärzte, Kliniken und Medizintourismus-Agenturen auf einer umfassenden Plattform für internationalen Medizintourismus.',
      features: {
        experts: {
          title: 'Sofortiger Zugang zu zertifizierten medizinischen Experten',
          text: 'Verbinden Sie sich mit lizenzierten Ärzten für Videokonsultationen, elektronische Rezepte und Krankschreibungen – alles von zu Hause aus.'
        },
        services: {
          title: 'Umfassende digitale Gesundheitsdienste',
          text: 'Ihre persönlichen Krankenakten, Rezepte und Behandlungshistorie sind sicher gespeichert und jederzeit in Ihrem Profil abrufbar.'
        },
        care: {
          title: 'Nahtlose Versorgung in ganz Europa',
          text: 'Ob online oder in unseren Praxen vor Ort – wir gewährleisten eine hochwertige, evidenzbasierte Gesundheitsversorgung, wo auch immer Sie sind.'
        }
      },
      tagline: {
        text: 'Einfach. Schnell. Zuverlässig.',
        highlight: 'Ihre Gesundheit, Ihr Weg!'
      }
    },
    heroSection: {
      title: 'Internationale Medizintourismus-Plattform',
      subtitle: 'Finden Sie vertrauenswürdige Ärzte und Kliniken weltweit. Buchen Sie Videokonsultationen und erhalten Sie personalisierte Behandlungsangebote für Ihre internationale Medizintourismus-Reise.',
      cta: 'Loslegen',
      trustedBy: 'Vertraut von Patienten weltweit',
      trustedByCount: 'Vertraut von über 10.000 Patienten',
      findTreatment: 'Finden Sie Ihre Behandlung',
      searchLabel: 'Wonach suchen Sie?',
      locationLabel: 'Wo?',
      termsAcknowledge: 'Ich habe die gelesen und akzeptiere die'
    },
    popularItems: {
      title: 'Beliebteste',
      description: 'Entdecken Sie die am meisten gebuchten Behandlungen, Ärzte und Kliniken basierend auf Patientenbuchungen und Angebotsanfragen',
      by: 'von',
      managedByAgency: 'Verwaltet von Agentur',
      appointments: 'Termine'
    },
    featureSection: {
      button: {
        text: 'Preise ansehen'
      },
      smartHealthcare: {
        title: 'Intelligente Gesundheitslösungen',
        description: 'Erleben Sie erstklassige deutsche medizinische Versorgung von zu Hause aus, mit transparenten Preisen und außergewöhnlicher Servicequalität.',
        point1: 'Kostenlos für alle Stammpatient:innen unserer Praxen',
        point2: 'Ein fester Pauschalbetrag, unabhängig von der Behandlung',
        point3: 'Hochwertige, evidenzbasierte medizinische Versorgung durch deutsche Ärzte in jedem Land, in dem unsere Plattform tätig ist'
      },
      premiumCare: {
        title: 'Premium deutsche medizinische Versorgung in ganz Europa',
        description: 'Sparen Sie sich überteuerte Behandlungen im Ausland und vor allem Ihre wertvolle Zeit.',
        point1: 'Hochwertige, evidenzbasierte Medizin von erfahrenen deutschen Ärzten',
        point2: 'Bequeme Videokonsultationen und Behandlungen in mehreren europäischen Ländern',
        point3: 'Transparente Preisgestaltung mit einem festen Pauschalbetrag für alle Behandlungen',
        point4: 'Exklusive Vorteile für Stammpatient:innen, einschließlich kostenloser Nachsorge',
        point5: 'Sparen Sie Zeit und Geld durch Vermeidung unnötiger Reisen und überteuerter Behandlungen im Ausland'
      }
    },
    ourServices: {
      title: 'Unsere Dienstleistungen',
      description: 'Bulgardocs ist eine umfassende internationale Medizintourismus-Plattform für Patienten, Ärzte, Kliniken und Medizintourismus-Agenturen.',
      forPatients: {
        title: 'Für Patienten',
        description: 'Suchen und verbinden Sie sich mit Ärzten und Kliniken, die weltweit medizinische Behandlungen anbieten. Buchen Sie Konsultationen und erhalten Sie personalisierte Behandlungsangebote.',
        search: {
          title: 'Behandlungen suchen',
          text: 'Suchen Sie nach Ärzten und Kliniken nach Fachgebiet, Behandlungsart, Standort und Sprache. Finden Sie den perfekten Gesundheitsdienstleister für Ihre medizinischen Bedürfnisse.'
        },
        book: {
          title: 'Konsultationen buchen',
          text: 'Planen Sie Videokonsultationen mit Ärzten und Kliniken. Besprechen Sie Ihre medizinischen Bedürfnisse und erhalten Sie Expertenrat von überall auf der Welt.'
        },
        offers: {
          title: 'Behandlungsangebote',
          text: 'Erhalten Sie detaillierte PDF-Behandlungsangebote mit Preisen, Zeitplänen, Behandlungsplänen und allen notwendigen Informationen für Ihre Medizintourismus-Reise.'
        },
        manage: {
          title: 'Termine verwalten',
          text: 'Behalten Sie alle Ihre Konsultationen, Termine und Behandlungsangebote an einem bequemen Ort im Überblick.'
        }
      },
      forDoctors: {
        title: 'Für Ärzte',
        description: 'Erweitern Sie Ihre Praxis international und verbinden Sie sich mit Patienten weltweit. Suchen Sie nach Stellenangeboten in Kliniken.',
        profile: {
          title: 'Professionelles Profil',
          text: 'Erstellen Sie ein umfassendes Profil, das Ihre Fachgebiete, Behandlungen und Expertise präsentiert, um Patienten aus aller Welt anzuziehen.'
        },
        patients: {
          title: 'Patientenverwaltung',
          text: 'Verwalten Sie Konsultationen, Termine und Behandlungsangebote. Verbinden Sie sich mit Patienten, die Medizintourismus-Dienstleistungen suchen.'
        },
        jobs: {
          title: 'Stellenangebote',
          text: 'Suchen und bewerben Sie sich für Positionen in Kliniken weltweit. Erhalten Sie Rekrutierungsangebote und erweitern Sie Ihre Karrieremöglichkeiten.'
        }
      },
      forClinics: {
        title: 'Für Kliniken',
        description: 'Erweitern Sie die internationale Präsenz Ihrer Klinik und rekrutieren Sie qualifizierte Ärzte. Verwalten Sie mehrere Ärzte und Behandlungen effizient.',
        profile: {
          title: 'Klinikprofil',
          text: 'Präsentieren Sie Ihre Klinik, Einrichtungen, Dienstleistungen und Expertise, um Patienten aus aller Welt anzuziehen.'
        },
        doctors: {
          title: 'Arztverwaltung',
          text: 'Verwalten Sie mehrere Ärzte in Ihrer Klinik. Koordinieren Sie Termine, Behandlungen und Patientenversorgung effizient.'
        },
        recruit: {
          title: 'Ärzte rekrutieren',
          text: 'Suchen Sie nach qualifizierten Ärzten und senden Sie Rekrutierungsangebote. Finden Sie die richtigen medizinischen Fachkräfte für Ihr Team.'
        }
      },
      forAgencies: {
        title: 'Für Medizintourismus-Agenturen',
        description: 'Verwalten Sie mehrere Ärzte und Kliniken unter Ihrer Agentur. Koordinieren Sie Behandlungen und optimieren Sie Ihre Medizintourismus-Abläufe.',
        manage: {
          title: 'Multi-Provider-Verwaltung',
          text: 'Verwalten Sie mehrere Ärzte und Kliniken von einem Dashboard aus. Koordinieren Sie Behandlungen und Abläufe effizient.'
        },
        treatments: {
          title: 'Behandlungsverwaltung',
          text: 'Laden Sie Behandlungen hoch und verwalten Sie sie, die von Ihren verbundenen Ärzten und Kliniken angeboten werden. Präsentieren Sie Ihr vollständiges Serviceportfolio.'
        },
        coordination: {
          title: 'Koordinations-Tools',
          text: 'Optimieren Sie die Kommunikation und Koordination zwischen Patienten, Ärzten und Kliniken unter Ihrer Agentur.'
        }
      },
      countries: {
        de: {
          name: 'Deutschland',
          clinicInfo: 'Physische Praxis - Praxis Dr. Kerim in Offenbach am Main'
        },
        bg: {
          name: 'Bulgarien',
          clinicInfo: 'Physische Klinik - Klinik Dr. Kerim in Plovdiv, Antonovo und Omurtag'
        }
      }
    },
    languagesWeSpeak: {
      title: 'Sprachen, die wir sprechen',
      description: 'Unser mehrsprachiges medizinisches Team gewährleistet eine klare Kommunikation und Verständigung über verschiedene Sprachen und Kulturen hinweg.',
      languages: {
        english: 'Englisch',
        german: 'Deutsch',
        turkish: 'Türkisch',
        bulgarian: 'Bulgarisch',
        croatian: 'Kroatisch'
      }
    },
    pricing: {
      title: 'Einfache, transparente Preise',
      description: 'Wählen Sie den Plan, der am besten zu Ihren Gesundheitsbedürfnissen passt. Alle Pläne beinhalten Zugang zu unseren zertifizierten deutschen Ärzten und sicherer digitaler Plattform.',
      note: {
        text: 'Alle Preise sind in EUR und inkl. MwSt. Abonnements können jederzeit gekündigt werden. Versicherungsanforderungen können je nach Region variieren.'
      },
      forPatients: 'Für Patienten',
      forDoctors: 'Für Ärzte',
      forClinics: 'Für Kliniken',
      forAgencies: 'Für Medizintourismus-Agenturen',
      free: 'Kostenlos',
      forever: '/für immer',
      freeSubtitle: 'Die Plattform ist für Patienten vollständig kostenlos',
      monthlyPlan: 'Monatsplan',
      annualPlan: 'Jahresplan',
      bestValue: 'Bester Wert',
      perMonth: '/Monat',
      perYear: '/Jahr',
      getStartedFree: 'Kostenlos starten',
      getStarted: 'Loslegen',
      save: 'Sparen Sie',
      perYear: 'pro Jahr',
      patientFeatures: {
        search: 'Suchen und durchsuchen Sie Ärzte und Kliniken weltweit',
        book: 'Videokonsultationen buchen',
        offers: 'Erhalten Sie personalisierte PDF-Behandlungsangebote',
        manage: 'Verwalten Sie Ihre Termine',
        save: 'Speichern Sie bevorzugte Ärzte und Kliniken'
      },
      doctorFeatures: {
        contact: 'Kontaktinformationen für Patienten anzeigen',
        bookings: 'Videokonsultationsbuchungen erhalten',
        treatments: 'Verwalten Sie Ihre Behandlungen und Preise',
        apply: 'Bewerben Sie sich für Klinikpositionen',
        offers: 'Rekrutierungsangebote erhalten'
      },
      clinicFeatures: {
        contact: 'Kontaktinformationen für Patienten anzeigen',
        bookings: 'Videokonsultationsbuchungen erhalten',
        treatments: 'Verwalten Sie Klinikbehandlungen und Preise',
        recruit: 'Rekrutieren Sie Ärzte und senden Sie Angebote',
        manage: 'Verwalten Sie mehrere Ärzte'
      },
      customPlan: 'Individueller Plan',
      customPrice: 'Individuelle Preisgestaltung',
      customSubtitle: 'Der Preis hängt von der Anzahl der von Ihnen verwalteten Ärzte und Kliniken ab',
      requestPlan: 'Plan anfragen',
      agencyFeatures: {
        manage: 'Verwalten Sie mehrere Ärzte und Kliniken von einem Dashboard aus',
        treatments: 'Laden Sie Behandlungen für alle Ihre Anbieter hoch und verwalten Sie sie',
        coordination: 'Optimieren Sie Kommunikation und Koordination',
        scalable: 'Skalierbare Preisgestaltung basierend auf Ihren Bedürfnissen',
        support: 'Dedizierter Support und Onboarding'
      },
      plans: {
        consultation: {
          title: 'Ärztliche Konsultation',
          price: '60,00',
          description: 'Vollständige Beratung und Services',
          feature1: 'Kein Versicherungsnachweis erforderlich',
          feature2: 'Videosprechstunde',
          feature3: 'e-Rezepte',
          feature4: 'e-Krankschreibungen'
        }
      },
      button: {
        text: 'Jetzt kaufen'
      }
    }
  },

  nav: {
    home: 'Startseite',
    services: 'Dienstleistungen',
    contact: 'Kontakt',
    about_us: 'Über uns',
    pricing: 'Preise',
    signIn: 'Anmelden',
    signUp: 'Registrieren',
    forProviders: 'Für Anbieter',
    privacy: 'Datenschutz',
    terms: 'Nutzungsbedingungen',
    legal: 'Impressum',
  },

  authmenu: {
    dashboard: 'Dashboard',
    adminDashboard: 'Admin-Dashboard',
    userProfile: 'Benutzerprofil',
    logout: 'Abmelden',
  },

  about: {
    title: ' Plattform',
    titleColored: ' Internationaler Medizintourismus ',
    description:
      'Bulgardocs ist eine internationale Medizintourismus-Plattform, die Patienten mit vertrauenswürdigen Ärzten und Kliniken weltweit verbindet. Patienten können nach Behandlungen suchen, Ärzte können Stellenangebote finden, Kliniken können Ärzte rekrutieren, und Medizintourismus-Agenturen können mehrere Anbieter verwalten—alles auf einer umfassenden Plattform.',
    mission: {
      title: 'Unsere Mission',
      text: 'Internationalen Medizintourismus für Patienten zugänglich, transparent und nahtlos zu machen und gleichzeitig Ärzten, Kliniken und Agenturen leistungsstarke Tools zur Verfügung zu stellen, um ihre Praxis zu erweitern und Patienten weltweit zu erreichen.'
    },
    features: {
      title: 'Plattform-Funktionen',
      description: 'Entdecken Sie, was Bulgardocs zur führenden internationalen Medizintourismus-Plattform macht',
      patients: {
        title: 'Für Patienten',
        text: 'Suchen und verbinden Sie sich mit Ärzten und Kliniken, die medizinische Behandlungen anbieten. Buchen Sie Videokonsultationen und erhalten Sie personalisierte Behandlungsangebote mit detaillierten Preisen und Plänen.'
      },
      doctors: {
        title: 'Für Ärzte',
        text: 'Erweitern Sie Ihre Praxis international, verbinden Sie sich mit Patienten weltweit und suchen Sie nach Stellenangeboten in Kliniken auf der ganzen Welt.'
      },
      clinics: {
        title: 'Für Kliniken',
        text: 'Erweitern Sie die internationale Präsenz Ihrer Klinik, rekrutieren Sie qualifizierte Ärzte und verwalten Sie mehrere Anbieter effizient.'
      },
      agencies: {
        title: 'Für Agenturen',
        text: 'Verwalten Sie mehrere Ärzte und Kliniken unter Ihrer Agentur. Koordinieren Sie Behandlungen und optimieren Sie Ihre Medizintourismus-Abläufe von einer Plattform aus.'
      }
    }
  },

  button: {
    startForFree: 'Registrieren',
  },

  footer: {
    allRightsReserved: 'Alle Rechte vorbehalten.',
    followFacebook: 'Folgen Sie uns auf Facebook',
    quickLinks: 'Schnelllinks',
    account: 'Konto',
    providers: 'Anbieter',
    joinAsProvider: 'Als Anbieter beitreten',
    description: 'Verbinden Sie Patienten mit erstklassigen Gesundheitsdienstleistern in Europa und darüber hinaus. Ihre Gesundheit, unsere Priorität.',
  },

  contact: {
    title: 'Kontaktieren Sie uns',
    subtitle: 'Füllen Sie das Formular aus und wir werden Sie schnellstmöglich kontaktieren.',
    form: {
      name: {
        label: 'Name',
        placeholder: 'Geben Sie Ihren Namen ein',
      },
      email: {
        label: 'E-Mail',
        placeholder: 'Geben Sie Ihre E-Mail-Adresse ein',
      },
      phone: {
        label: 'Telefon (Optional)',
        placeholder: 'Geben Sie Ihre Telefonnummer ein',
      },
      message: {
        label: 'Nachricht',
        placeholder: 'Geben Sie Ihre Nachricht ein',
      },
      submit: 'Nachricht senden',
    },
    validation: {
      name: {
        required: 'Name ist erforderlich',
        minLength: 'Name muss mindestens 2 Zeichen lang sein',
      },
      email: {
        required: 'E-Mail ist erforderlich',
        invalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
      },
      phone: {
        invalid: 'Bitte geben Sie eine gültige Telefonnummer ein',
      },
      message: {
        required: 'Nachricht ist erforderlich',
        minLength: 'Nachricht muss mindestens 10 Zeichen lang sein',
      },
    },
    success: 'Ihre Nachricht wurde erfolgreich gesendet. Wir werden Sie in Kürze kontaktieren.',
    error: 'Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
    contactInfo: {
      title: 'Kontaktinformationen',
      address: {
        title: 'Büroadresse',
        line1: 'Offenbach am Main',
        line2: 'Deutschland',
      },
      phone: {
        title: 'Telefon',
        number: '+49 123 456 789',
      },
      email: {
        title: 'E-Mail',
      },
      hours: {
        title: 'Öffnungszeiten',
        schedule: 'Montag - Freitag: 9:00 - 18:00 Uhr',
      },
    },
  },
  documents: {
    title: "Meine Dokumente",
    subtitle: "Zugriff auf Ihre medizinischen Dokumente und Berichte",
    loading: "Dokumente werden geladen...",
    error: "Fehler beim Laden der Dokumente",
    retry: "Wiederholen",
    documents: "Dokumente",
    noDocuments: "Noch keine Dokumente",
    noDocumentsText: "Ihre medizinischen Dokumente und Berichte werden hier angezeigt, sobald Sie unsere Dienste nutzen",
    noDocumentsInCategory: "Noch keine Dokumente in dieser Kategorie",
    view: "Ansehen",
    opening: "Wird geöffnet...",
    urgent: "Dringend",
    high: "Hoch",
    reportType: "Berichtstyp",
    labName: "Labor Name",
    testType: "Test Typ",
    radiologyCenter: "Radiologie Zentrum",
    examType: "Untersuchungstyp",
    insuranceProvider: "Versicherungsanbieter",
    claimNumber: "Anspruchsnummer",
    referenceNumber: "Referenznummer",
    notes: "Notizen",
  },
  search: {
    placeholder: "Behandlung, Klinik",
    location: "Standort",
    button: "Jetzt suchen",
    title: "Ärzte & Kliniken suchen",
    subtitle: "Finden Sie den perfekten medizinischen Fachmann für Ihre Bedürfnisse",
    searching: "Suche...",
    found: "Gefunden",
    tabs: {
      all: "Alle",
      doctors: "Ärzte",
      clinics: "Kliniken",
      agencies: "Agenturen",
      treatments: "Behandlungen",
    },
    resultLabels: {
      results: "Ergebnisse",
      doctors: "Ärzte",
      clinics: "Kliniken",
      agencies: "Agenturen",
      treatments: "Behandlungen",
    },
    noResults: {
      title: "Keine Ergebnisse gefunden",
      text: "Versuchen Sie, Ihre Suchfilter oder Suchbegriffe anzupassen",
      resetFilters: "Filter zurücksetzen",
    },
    filters: {
      title: "Filter",
      reset: "Zurücksetzen",
      search: "Suchen",
      searchPlaceholder: "Name, Fachgebiet, Behandlung...",
      type: "Typ",
      typeAll: "Alle",
      typeDoctors: "Ärzte",
      typeClinics: "Kliniken",
      typeAgencies: "Agenturen",
      specialty: "Fachgebiet",
      specialtyPlaceholder: "z.B. Kardiologie, Dermatologie...",
      treatment: "Behandlung",
      treatmentPlaceholder: "z.B. Zahnimplantat, Botox...",
      category: "Kategorie",
      categoryPlaceholder: "z.B. Zahnmedizin, Kosmetik...",
      priceRange: "Preisspanne (EUR)",
      minPrice: "Min",
      maxPrice: "Max",
      minRating: "Mindestbewertung",
      any: "Beliebig",
      rating4: "4+ Sterne",
      rating3: "3+ Sterne",
      rating2: "2+ Sterne",
      rating1: "1+ Stern",
      country: "Land",
      countryPlaceholder: "z.B. Stadt oder Land",
      city: "Stadt",
      cityPlaceholder: "z.B. Sofia",
      languages: "Sprachen",
      languagesPlaceholder: "z.B. Englisch, Deutsch, Bulgarisch (kommagetrennt)",
      recruitmentStatus: "Rekrutierungsstatus",
      recruiting: "Aktuell rekrutierend",
      notRecruiting: "Nicht rekrutierend",
      openForRecruitment: "Offen für Rekrutierung",
      notOpen: "Nicht offen",
      sortBy: "Sortieren nach",
      sortRating: "Bewertung",
      sortName: "Name",
      sortPrice: "Preis",
      sortNewest: "Neueste",
      sortDesc: "Absteigend",
      sortAsc: "Aufsteigend",
      searchButton: "Suchen",
      resetFilters: "Filter zurücksetzen",
    },
  },
  cards: {
    treatmentsAvailable: "Behandlung verfügbar | Behandlungen verfügbar",
    managedBy: "Verwaltet von",
    agency: "Agentur",
    fromPrice: "Ab €{price}",
    viewProfileForPricing: "Profil für Preise ansehen",
    limited: "Begrenzt",
    viewProfile: "Profil ansehen",
    doctorsCount: "Arzt | Ärzte",
    currentlyRecruiting: "Aktuell rekrutierend",
    unknownTreatment: "Unbekannte Behandlung",
    providerType: {
      doctor: "Arzt",
      clinic: "Klinik",
    },
    viewDetails: "Details ansehen",
    category: "Kategorie",
    description: "Beschreibung",
    includedServices: "Inkludierte Leistungen",
    excludedServices: "Ausgeschlossene Leistungen",
    preparationRequired: "Vorbereitung erforderlich",
    recoveryTime: "Erholungszeit",
    location: "Standort",
    bookNow: "Jetzt buchen",
    viewProviderProfile: "{type} Profil ansehen",
  },
};