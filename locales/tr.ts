export default {
  errorPage: {
    oops: 'Hay aksi!',
    not_found: 'Sayfa bulunamadı.',
    something_wrong: 'Bir şeyler yanlış gitti.',
  },
  registration: {
    title: 'Hesap Oluştur',
    fields: {
      firstName: {
        label: 'Ad',
        placeholder: 'Adınızı girin',
      },
      lastName: {
        label: 'Soyad',
        placeholder: 'Soyadınızı girin',
      },
      gender: {
        label: 'Cinsiyet',
        select: 'Cinsiyet seçin',
        options: {
          male: 'Erkek',
          female: 'Kadın',
          other: 'Diğer',
        },
      },
      birthday: {
        label: 'Doğum Tarihi',
        day: 'Gün',
        month: 'Ay',
        year: 'Yıl',
        months: {
          january: 'Ocak',
          february: 'Şubat',
          march: 'Mart',
          april: 'Nisan',
          may: 'Mayıs',
          june: 'Haziran',
          july: 'Temmuz',
          august: 'Ağustos',
          september: 'Eylül',
          october: 'Ekim',
          november: 'Kasım',
          december: 'Aralık',
        },
      },
      address: {
        label: 'Sokak',
        placeholder: 'Sokak adını girin',
      },
      addressNumber: {
        label: 'Bina Numarası',
        placeholder: 'Bina numarasını girin',
      },
      postCode: {
        label: 'Posta Kodu',
        placeholder: 'Posta kodunu girin',
      },
      city: {
        label: 'Şehir',
        placeholder: 'Şehir adını girin',
      },
      country: {
        label: 'Ülke',
        select: 'Ülke seçin',
      },
      nationalId: {
        label: 'TC Kimlik Numarası',
        placeholder: 'TC kimlik numaranızı girin',
      },
      existingPatient: {
        label: 'Mevcut bir hastasınız mı?',
        yes: 'Evet',
        no: 'Hayır',
      },
      insuranceType: {
        label: 'Sigorta Türü',
        select: 'Sigorta türünü seçin',
        options: {
          state: 'Devlet Sigortası',
          private: 'Özel Sigorta',
        },
      },
      insuranceCompany: {
        label: 'Sigorta Şirketi',
        select: 'Sigorta şirketi seçin',
      },
      insuranceNumber: {
        label: 'Sigorta Numarası',
        placeholder: 'Sigorta numaranızı girin',
      },
      email: {
        label: 'E-posta Adresi',
        placeholder: 'E-posta adresinizi girin',
      },
      password: {
        label: 'Şifre',
        placeholder: 'Şifrenizi girin',
      },
      confirmPassword: {
        label: 'Şifreyi Onayla',
        placeholder: 'Şifrenizi tekrar girin',
      },
    },
    validation: {
      firstName: 'Ad gereklidir',
      lastName: 'Soyad gereklidir',
      gender: 'Lütfen cinsiyetinizi seçin',
      birthDate: 'Doğum tarihi gereklidir',
      address: 'Sokak adı gereklidir',
      addressNumber: 'Bina numarası gereklidir',
      postCode: 'Posta kodu gereklidir',
      city: 'Şehir gereklidir',
      country: 'Lütfen ülkenizi seçin',
      email: 'Lütfen geçerli bir e-posta adresi girin',
      password: {
        minLength: 'Şifre en az 8 karakter olmalıdır',
        lowercase: 'Şifre en az bir küçük harf içermelidir',
        uppercase: 'Şifre en az bir büyük harf içermelidir',
        number: 'Şifre en az bir rakam içermelidir',
        specialChar: 'Şifre en az bir özel karakter içermelidir',
      },
      confirmPassword: 'Şifreler eşleşmelidir',
      nationalId: 'Lütfen geçerli bir 10 haneli TC kimlik numarası girin',
      existingPatient: 'Lütfen mevcut bir hasta olup olmadığınızı belirtin',
      insurance: 'Lütfen tüm sigorta bilgilerini doldurun',
      termsRequired: 'Şartları ve koşulları kabul etmelisiniz',
      vatNumber: 'Lütfen geçerli bir vergi numarası girin',
      error: 'Hata',
      success: 'Başarılı',
      errorOccurred: 'Bir hata oluştu. Lütfen tekrar deneyin.',
      registrationError: 'Kayıt başarısız oldu. Lütfen tekrar deneyin.',
      successMessage: 'Kayıt başarılı! Artık giriş yapabilirsiniz.',
    },
    terms: {
      accept: 'Kabul ediyorum',
      link: 'Şartlar ve Koşullar',
    },
    submit: {
      buttonText: 'Hesap Oluştur',
      loginPrompt: 'Zaten hesabınız var mı?',
      loginText: 'Giriş Yap',
    },
  },

  login: {
    title: 'Hesabınıza giriş yapın',
    form: {
      email: {
        label: 'E-posta',
        placeholder: 'E-posta adresinizi girin',
      },
      password: {
        label: 'Şifre',
        placeholder: 'Şifrenizi girin',
      },
      submit: 'Giriş Yap',
      forgotPassword: 'Şifrenizi mi unuttunuz?',
      noAccount: 'Hesabınız yok mu?',
      registerNow: 'Şimdi kayıt olun!',
    },
    validation: {
      email: {
        required: 'E-posta gereklidir',
        invalid: 'E-posta geçersiz',
      },
      password: {
        required: 'Şifre gereklidir',
        minLength: 'Şifre en az 8 karakter olmalıdır',
        lowercase: 'Şifre en az bir küçük harf içermelidir',
        uppercase: 'Şifre en az bir büyük harf içermelidir',
        number: 'Şifre en az bir rakam içermelidir',
        specialChar: 'Şifre en az bir özel karakter içermelidir',
      },
    },
    errors: {
      invalidCredentials: 'Geçersiz e-posta veya şifre',
      500: 'Sunucu hatası oluştu',
      unknown: 'Bilinmeyen bir hata oluştu',
      emailNotValidated: 'Giriş yapmadan önce lütfen e-postanızı doğrulayın',
    },
    emailValidation: {
      prompt: 'Devam etmek için lütfen e-postanızı doğrulayın',
      sending: 'Gönderiliyor...',
      resend: 'Doğrulama e-postasını yeniden gönder',
      resendSuccess: 'E-posta Doğrulama',
      tokenStillValid: 'Yeni bir doğrulama e-postası adresinize gönderildi',
      alreadySent: 'Geçerli bir doğrulama e-postası zaten gönderildi. Lütfen gelen kutunuzu kontrol edin.',
      resendError: 'E-posta yeniden gönderilirken bir hata oluştu',
      emailIsValidated: 'E-posta zaten doğrulandı',
      emailValidated: 'E-posta başarıyla doğrulandı',
      expiredToken: 'Doğrulama bağlantısının süresi doldu. Lütfen yeni bir tane isteyin.',
    },
  },

  calendar: {
    title: 'Randevunuzu Rezerve Edin',
    description: 'Bir doktor seçin ve tercih ettiğiniz randevu saatini seçin',
    selectedPlan: 'Seçilen Plan',
    noPlanSelected: 'Plan seçilmedi',
    backToPricing: 'Fiyatlandırmaya Dön',
    selectDoctor: 'Bir Doktor Seçin',
    loadingDoctors: 'Doktorlar yükleniyor...',
    noDoctorsAvailable: 'Bu plan için doktor bulunmuyor',
    selectDateTime: 'Tarih ve Saat Seçin',
    selectDate: 'Bir Tarih Seçin',
    loadingAvailability: 'Müsaitlik yükleniyor...',
    availableTimeSlots: 'Müsait Zaman Dilimleri',
    noSlotsAvailable: 'Bu tarih için müsait zaman dilimi yok',
    proceedToConfirmation: 'Onaylamaya Devam Et',
  },

  confirm: {
    title: 'Randevunuzu Onaylayın',
    description: 'Lütfen randevu detaylarınızı gözden geçirin ve onaylayın',
    incompleteSelection: 'Eksik Seçim',
    pleaseMakeSelection: 'Devam etmeden önce lütfen randevu seçiminizi tamamlayın.',
    backToCalendar: 'Takvime Dön',
    appointmentSummary: 'Randevu Özeti',
    selectedPlan: 'Seçilen Plan',
    selectedDoctor: 'Doktor',
    appointmentDateTime: 'Tarih ve Saat',
    goBack: 'Geri Dön',
    confirmAppointment: 'Randevuyu Onayla',
    confirming: 'Onaylanıyor...',
    appointmentConfirmed: 'Randevu Onaylandı!',
    confirmationMessage: 'Randevunuz başarıyla rezerve edildi. Kısa süre içinde bir onay e-postası alacaksınız.',
  },

  common: {
    retry: 'Yeniden Dene',
  },

  calendar: {
    title: 'Randevunuzu Rezerve Edin',
    description: 'Bir doktor seçin ve tercih ettiğiniz randevu saatini seçin',
    selectedPlan: 'Seçilen Plan',
    noPlanSelected: 'Plan seçilmedi',
    backToPricing: 'Fiyatlandırmaya Dön',
    selectDoctor: 'Bir Doktor Seçin',
    loadingDoctors: 'Doktorlar yükleniyor...',
    noDoctorsAvailable: 'Bu plan için doktor bulunmuyor',
    selectDateTime: 'Tarih ve Saat Seçin',
    selectDate: 'Bir Tarih Seçin',
    loadingAvailability: 'Müsaitlik yükleniyor...',
    availableTimeSlots: 'Müsait Zaman Dilimleri',
    noSlotsAvailable: 'Bu tarih için müsait zaman dilimi yok',
    proceedToConfirmation: 'Onaylamaya Devam Et',
  },

  confirm: {
    title: 'Randevunuzu Onaylayın',
    description: 'Lütfen randevu detaylarınızı gözden geçirin ve onaylayın',
    incompleteSelection: 'Eksik Seçim',
    pleaseMakeSelection: 'Devam etmeden önce lütfen randevu seçiminizi tamamlayın.',
    backToCalendar: 'Takvime Dön',
    appointmentSummary: 'Randevu Özeti',
    selectedPlan: 'Seçilen Plan',
    selectedDoctor: 'Doktor',
    appointmentDateTime: 'Tarih ve Saat',
    goBack: 'Geri Dön',
    confirmAppointment: 'Randevuyu Onayla',
    confirming: 'Onaylanıyor...',
    appointmentConfirmed: 'Randevu Onaylandı!',
    confirmationMessage: 'Randevunuz başarıyla rezerve edildi. Kısa süre içinde bir onay e-postası alacaksınız.',
  },

  common: {
    retry: 'Yeniden Dene',
  },

  appointments: {
    cancel: {
      title: 'Randevuyu İptal Et',
      description: 'Lütfen bu randevuyu iptal etme nedeninizi belirtin. Bu bilgi diğer taraf ile paylaşılacaktır.',
      reasonLabel: 'İptal nedeni',
      reasonPlaceholder: 'Lütfen bu randevuyu neden iptal etmeniz gerektiğini açıklayın...',
      keepAppointment: 'Randevuyu Koru',
      confirmCancel: 'Randevuyu İptal Et',
      cancelledBy: 'İptal eden',
      cancelReason: 'İptal Nedeni',
    },
  },

  featureSection: {
    smartHealthcare: {
      title: 'Akıllı Sağlık Çözümleri',
      description: 'Ev konforunuzda şeffaf fiyatlandırma ve olağanüstü hizmet kalitesi ile premium Alman tıbbi bakımını deneyimleyin.',
    },
    premiumCare: {
      title: 'Avrupa Genelinde Premium Alman Tıbbi Bakımı',
      description: 'Yurtdışındaki aşırı fiyatlı tedavilerden ve en önemlisi değerli zamanınızı boşa harcamaktan kendinizi kurtarın.',
    },

    button: {
      text: 'Fiyatlandırmayı Görüntüle',
    },
  },


  nav: {
    home: 'Ana Sayfa',
    services: 'Hizmetler',
    contact: 'İletişim',
    about_us: 'Hakkımızda',
    pricing: 'Fiyatlandırma',
    signIn: 'Giriş Yap',
    signUp: 'Kayıt Ol',
    forProviders: 'Sağlayıcılar İçin',
    privacy: 'Gizlilik Politikası',
    terms: 'Hizmet Şartları',
    legal: 'Yasal Uyarı',
  },


  authmenu: {
    dashboard: 'Kontrol Paneli',
    adminDashboard: 'Yönetici Paneli',
    userProfile: 'Kullanıcı Profili',
    logout: 'Çıkış Yap',
  },

  button: {
    startForFree: 'Kayıt Ol',
  },

  about: {
    title: ' Platformu',
    titleColored: ' Uluslararası Medikal Turizm ',
    description:
      'Bulgardocs, hastaları dünya çapında güvenilir doktor ve kliniklerle bağlayan uluslararası bir medikal turizm platformudur. Hastalar tedavi arayabilir, doktorlar iş fırsatları bulabilir, klinikler doktor işe alabilir ve medikal turizm ajansları birden fazla sağlayıcıyı yönetebilir—hepsi kapsamlı bir platformda.',
    mission: {
      title: 'Misyonumuz',
      text: 'Hastalar için uluslararası medikal turizmi erişilebilir, şeffaf ve sorunsuz hale getirmek ve aynı zamanda doktorlara, kliniklere ve ajanslara pratiklerini büyütmek ve dünya çapında hastalara ulaşmak için güçlü araçlar sağlamak.'
    },
    features: {
      title: 'Platform Özellikleri',
      description: 'Bulgardocs\'u önde gelen uluslararası medikal turizm platformu yapan şeyi keşfedin',
      patients: {
        title: 'Hastalar İçin',
        text: 'Medikal tedaviler sunan doktor ve klinikleri arayın ve bağlanın. Video konsültasyonları rezerve edin ve detaylı fiyatlandırma ve planlarla kişiselleştirilmiş tedavi teklifleri alın.'
      },
      doctors: {
        title: 'Doktorlar İçin',
        text: 'Pratiklerinizi uluslararası olarak genişletin, dünya çapında hastalarla bağlantı kurun ve dünya çapındaki kliniklerde iş fırsatları arayın.'
      },
      clinics: {
        title: 'Klinikler İçin',
        text: 'Kliniklerinizin uluslararası varlığını genişletin, nitelikli doktorları işe alın ve birden fazla sağlayıcıyı verimli bir şekilde yönetin.'
      },
      agencies: {
        title: 'Ajanslar İçin',
        text: 'Ajansınız altında birden fazla doktor ve klinik yönetin. Tedavileri koordine edin ve medikal turizm operasyonlarınızı tek bir platformdan optimize edin.'
      }
    }
  },

  button: {
    startForFree: 'Kayıt Ol',
  },

  components: {
    whatWeDo: {
      title: 'Nasıl Çalışır',
      description: 'Bulgardocs, uluslararası medikal turizm için kapsamlı bir platformda hasta, doktor, klinik ve medikal turizm ajanslarını bir araya getirir.',
      cards: {
        search: {
          title: 'Ara ve Keşfet',
          text: 'Hastalar dünya çapında belirli tedaviler sunan doktor ve klinikleri arayabilir. Uzmanlık, konum, dil ve daha fazlasına göre filtreleyin.'
        },
        connect: {
          title: 'Rezerve Et ve Bağlan',
          text: 'Doktor ve kliniklerle video konsültasyonları rezerve edin. Detaylı fiyatlandırma ve tedavi planlarıyla kişiselleştirilmiş tedavi teklifleri alın.'
        },
        recruit: {
          title: 'İşe Alım Ağı',
          text: 'Doktorlar kliniklerde iş fırsatları arayabilir. Klinikler ekibine katılacak nitelikli doktorları bulabilir ve işe alabilir.'
        },
        manage: {
          title: 'Ajans Yönetimi',
          text: 'Medikal turizm ajansları birden fazla doktor ve klinik yönetebilir, tedavileri koordine edebilir ve operasyonları optimize edebilir.'
        }
      }
    },
    healthcareFeatures: {
      title: 'Parmaklarınızın Ucunda Akıllı ve Erişilebilir Sağlık Hizmetleri',
      features: {
        experts: {
          title: 'Sertifikalı Tıbbi Uzmanlara Anında Erişim',
          text: 'Ev konforunuzda uzman video konsültasyonları, elektronik reçeteler ve hastalık raporları için lisanslı doktorlarla bağlantı kurun.'
        },
        services: {
          title: 'Kapsamlı Dijital Sağlık Hizmetleri',
          text: 'Kişisel tıbbi kayıtlarınız, reçeteleriniz ve tedavi geçmişiniz güvenli bir şekilde saklanır ve profilinizde istediğiniz zaman erişilebilir.'
        },
        care: {
          title: 'Avrupa Genelinde Sorunsuz Bakım',
          text: 'İster çevrimiçi ister fiziksel kliniklerimizde olsun, nerede olursanız olun yüksek kaliteli, kanıta dayalı sağlık hizmeti sağlıyoruz.'
        }
      },
      tagline: {
        text: 'Kolay. Hızlı. Güvenilir.',
        highlight: 'Sağlığınız, sizin yolunuz!'
      }
    },
    heroSection: {
      title: 'Uluslararası Medikal Turizm Platformu',
      subtitle: 'Dünya çapında güvenilir doktor ve klinikleri bulun. Video konsültasyonları rezerve edin ve uluslararası medikal turizm yolculuğunuz için kişiselleştirilmiş tedavi teklifleri alın.',
      cta: 'Başlayın',
      trustedBy: 'Dünya çapında hastalar tarafından güvenilir',
      trustedByCount: '10.000+ hasta tarafından güvenilir',
      findTreatment: 'Tedavinizi bulun',
      searchLabel: 'Ne arıyorsunuz?',
      locationLabel: 'Nerede?',
      termsAcknowledge: 'Okudum ve kabul ediyorum'
    },
    popularItems: {
      title: 'En Popüler',
      description: 'Hasta rezervasyonları ve teklif talepleri temelinde en çok rezerve edilen tedavileri, doktorları ve klinikleri keşfedin',
      by: 'tarafından',
      managedByAgency: 'Ajans tarafından yönetiliyor',
      appointments: 'randevu'
    },
    featureSection: {
      button: {
        text: 'Fiyatlandırmayı Görüntüle'
      },
      smartHealthcare: {
        title: 'Akıllı Sağlık Çözümleri',
        description: 'Ev konforunuzda şeffaf fiyatlandırma ve olağanüstü hizmet kalitesi ile premium Alman tıbbi bakımını deneyimleyin.',
        point1: 'Tıbbi uygulamalarımızın tüm düzenli hastalarına ücretsiz olarak sunulmaktadır',
        point2: 'Tedavi ne olursa olsun sabit bir düz oran',
        point3: 'Platformumuzun faaliyet gösterdiği her ülkede Alman doktorlardan yüksek kaliteli, kanıta dayalı tıbbi bakım'
      },
      premiumCare: {
        title: 'Avrupa Genelinde Premium Alman Tıbbi Bakımı',
        description: 'Yurtdışındaki aşırı fiyatlı tedavilerden ve en önemlisi değerli zamanınızı boşa harcamaktan kendinizi kurtarın.',
        point1: 'Deneyimli Alman doktorlar tarafından sağlanan yüksek kaliteli, kanıta dayalı tıp',
        point2: 'Birden fazla Avrupa ülkesinde uygun video konsültasyonları ve tedaviler',
        point3: 'Tüm tedaviler için sabit düz oranlı şeffaf fiyatlandırma',
        point4: 'Düzenli hastalar için özel avantajlar, ücretsiz takip hizmetleri dahil',
        point5: 'Gereksiz seyahatlerden ve yurtdışındaki aşırı fiyatlı tedavilerden kaçınarak zaman ve para tasarrufu yapın'
      }
    },
    ourServices: {
      title: 'Hizmetlerimiz',
      description: 'Bulgardocs, hasta, doktor, klinik ve medikal turizm ajanslarına hizmet veren kapsamlı bir uluslararası medikal turizm platformudur.',
      forPatients: {
        title: 'Hastalar İçin',
        description: 'Dünya çapında medikal tedaviler sunan doktor ve klinikleri arayın ve bağlanın. Konsültasyonları rezerve edin ve kişiselleştirilmiş tedavi teklifleri alın.',
        search: {
          title: 'Tedavi Ara',
          text: 'Uzmanlık, tedavi türü, konum ve dile göre doktor ve klinikleri arayın. Tıbbi ihtiyaçlarınız için mükemmel sağlık hizmeti sağlayıcısını bulun.'
        },
        book: {
          title: 'Konsültasyon Rezerve Et',
          text: 'Doktor ve kliniklerle video konsültasyonları planlayın. Tıbbi ihtiyaçlarınızı tartışın ve dünyanın her yerinden uzman tavsiyesi alın.'
        },
        offers: {
          title: 'Tedavi Teklifleri',
          text: 'Fiyatlandırma, zaman çizelgeleri, tedavi planları ve medikal turizm yolculuğunuz için gerekli tüm bilgilerle detaylı PDF tedavi teklifleri alın.'
        },
        manage: {
          title: 'Randevuları Yönet',
          text: 'Tüm konsültasyonlarınızı, randevularınızı ve tedavi tekliflerinizi tek bir uygun yerde takip edin.'
        }
      },
      forDoctors: {
        title: 'Doktorlar İçin',
        description: 'Pratiklerinizi uluslararası olarak genişletin ve dünya çapında hastalarla bağlantı kurun. Kliniklerde iş fırsatları arayın.',
        profile: {
          title: 'Profesyonel Profil',
          text: 'Dünya çapındaki hastaları çekmek için uzmanlıklarınızı, tedavilerinizi ve uzmanlığınızı sergileyen kapsamlı bir profil oluşturun.'
        },
        patients: {
          title: 'Hasta Yönetimi',
          text: 'Konsültasyonları, randevuları ve tedavi tekliflerini yönetin. Medikal turizm hizmetleri arayan hastalarla bağlantı kurun.'
        },
        jobs: {
          title: 'İş Fırsatları',
          text: 'Dünya çapındaki kliniklerde pozisyonlar için arayın ve başvurun. İşe alım teklifleri alın ve kariyer fırsatlarınızı genişletin.'
        }
      },
      forClinics: {
        title: 'Klinikler İçin',
        description: 'Kliniklerinizin uluslararası varlığını genişletin ve nitelikli doktorları işe alın. Birden fazla doktor ve tedaviyi verimli bir şekilde yönetin.',
        profile: {
          title: 'Klinik Profili',
          text: 'Kliniklerinizi, tesislerinizi, hizmetlerinizi ve uzmanlığınızı dünya çapındaki hastaları çekmek için sergileyin.'
        },
        doctors: {
          title: 'Doktor Yönetimi',
          text: 'Kliniklerinizde birden fazla doktoru yönetin. Programları, tedavileri ve hasta bakımını verimli bir şekilde koordine edin.'
        },
        recruit: {
          title: 'Doktor İşe Al',
          text: 'Nitelikli doktorları arayın ve işe alım teklifleri gönderin. Ekibinize katılacak doğru tıp profesyonellerini bulun.'
        }
      },
      forAgencies: {
        title: 'Medikal Turizm Ajansları İçin',
        description: 'Ajansınız altında birden fazla doktor ve klinik yönetin. Tedavileri koordine edin ve medikal turizm operasyonlarınızı optimize edin.',
        manage: {
          title: 'Çoklu Sağlayıcı Yönetimi',
          text: 'Tek bir kontrol panelinden birden fazla doktor ve klinik yönetin. Tedavileri ve operasyonları verimli bir şekilde koordine edin.'
        },
        treatments: {
          title: 'Tedavi Yönetimi',
          text: 'Bağlı doktor ve klinikleriniz tarafından sunulan tedavileri yükleyin ve yönetin. Tam hizmet portföyünüzü sergileyin.'
        },
        coordination: {
          title: 'Koordinasyon Araçları',
          text: 'Ajansınız altındaki hasta, doktor ve klinikler arasındaki iletişimi ve koordinasyonu optimize edin.'
        }
      },
      countries: {
        de: {
          name: 'Almanya',
          clinicInfo: 'Fiziksel klinik - Offenbach am Main\'de Praxis Dr. Kerim'
        },
        bg: {
          name: 'Bulgaristan',
          clinicInfo: 'Fiziksel klinik - Plovdiv, Antonovo ve Omurtag\'da Clinic Dr. Kerim'
        }
      }
    },
    languagesWeSpeak: {
    },
    pricing: {
      title: 'Basit, Şeffaf Fiyatlandırma',
      description: 'Sağlık ihtiyaçlarınıza en uygun planı seçin. Tüm planlar sertifikalı Alman doktorlarımıza ve güvenli dijital platformumuza erişim içerir.',
      note: {
        text: 'Tüm fiyatlar EUR cinsindendir ve KDV dahildir. Abonelikler istediğiniz zaman iptal edilebilir. Sigorta gereksinimleri bölgeye göre değişiklik gösterebilir.'
      },
      forPatients: 'Hastalar İçin',
      forDoctors: 'Doktorlar İçin',
      forClinics: 'Klinikler İçin',
      forAgencies: 'Medikal Turizm Ajansları İçin',
      free: 'Ücretsiz',
      forever: '/sonsuza kadar',
      freeSubtitle: 'Platform hastalar için tamamen ücretsizdir',
      monthlyPlan: 'Aylık Plan',
      annualPlan: 'Yıllık Plan',
      bestValue: 'En İyi Değer',
      perMonth: '/ay',
      perYear: '/yıl',
      getStartedFree: 'Ücretsiz Başlayın',
      getStarted: 'Başlayın',
      save: 'Tasarruf edin',
      perYear: 'yılda',
      patientFeatures: {
        search: 'Dünya çapında doktor ve klinikleri arayın ve göz atın',
        book: 'Video konsültasyonları rezerve edin',
        offers: 'Kişiselleştirilmiş PDF tedavi teklifleri alın',
        manage: 'Randevularınızı yönetin',
        save: 'Favori doktor ve klinikleri kaydedin'
      },
      doctorFeatures: {
        contact: 'Hastalara iletişim bilgilerini gösterin',
        bookings: 'Video konsültasyon rezervasyonları alın',
        treatments: 'Tedavilerinizi ve fiyatlandırmanızı yönetin',
        apply: 'Klinik pozisyonları için başvurun',
        offers: 'İşe alım teklifleri alın'
      },
      clinicFeatures: {
        contact: 'Hastalara iletişim bilgilerini gösterin',
        bookings: 'Video konsültasyon rezervasyonları alın',
        treatments: 'Klinik tedavilerini ve fiyatlandırmayı yönetin',
        recruit: 'Doktor işe alın ve teklifler gönderin',
        manage: 'Birden fazla doktoru yönetin'
      },
      customPlan: 'Özel Plan',
      customPrice: 'Özel Fiyatlandırma',
      customSubtitle: 'Fiyatlandırma yönettiğiniz doktor ve klinik sayısına bağlıdır',
      requestPlan: 'Plan Talep Et',
      agencyFeatures: {
        manage: 'Tek bir kontrol panelinden birden fazla doktor ve klinik yönetin',
        treatments: 'Tüm sağlayıcılarınız için tedavileri yükleyin ve yönetin',
        coordination: 'İletişimi ve koordinasyonu optimize edin',
        scalable: 'İhtiyaçlarınıza göre ölçeklenebilir fiyatlandırma',
        support: 'Özel destek ve onboarding'
      },
      plans: {
        consultation: {
          title: 'Doktor Konsültasyonu',
          price: '60.00',
          description: 'Tam konsültasyon ve hizmetler',
          feature1: 'Sigorta kanıtı gerekmez',
          feature2: 'Video konsültasyon',
          feature3: 'E-Reçeteler',
          feature4: 'E-Hastalık raporları'
        }
      },
      button: {
        text: 'Şimdi Satın Al'
      }
    }
  },

  footer: {
    allRightsReserved: 'Tüm hakları saklıdır.',
    followFacebook: 'Bizi Facebook\'ta takip edin',
    quickLinks: 'Hızlı Bağlantılar',
    account: 'Hesap',
    providers: 'Sağlayıcı',
    joinAsProvider: 'Sağlayıcı Olarak Katıl',
    description: 'Avrupa ve ötesinde hastaları birinci sınıf sağlık hizmeti sağlayıcılarıyla buluşturuyoruz. Sağlığınız, önceliğimiz.',
  },

  contact: {
    title: 'İletişime Geçin',
    subtitle: 'Formu doldurun ve en kısa sürede size ulaşacağız.',
    form: {
      name: {
        label: 'Ad',
        placeholder: 'Adınızı girin',
      },
      email: {
        label: 'E-posta',
        placeholder: 'E-posta adresinizi girin',
      },
      phone: {
        label: 'Telefon (İsteğe Bağlı)',
        placeholder: 'Telefon numaranızı girin',
      },
      message: {
        label: 'Mesaj',
        placeholder: 'Mesajınızı girin',
      },
      submit: 'Mesaj Gönder',
    },
    validation: {
      name: {
        required: 'Ad gereklidir',
        minLength: 'Ad en az 2 karakter olmalıdır',
      },
      email: {
        required: 'E-posta gereklidir',
        invalid: 'Lütfen geçerli bir e-posta adresi girin',
      },
      phone: {
        invalid: 'Lütfen geçerli bir telefon numarası girin',
      },
      message: {
        required: 'Mesaj gereklidir',
        minLength: 'Mesaj en az 10 karakter olmalıdır',
      },
    },
    success: 'Mesajınız başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.',
    error: 'Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.',
    contactInfo: {
      title: 'İletişim Bilgileri',
      address: {
        title: 'Ofis Adresi',
        line1: 'Offenbach am Main',
        line2: 'Almanya',
      },
      phone: {
        title: 'Telefon',
        number: '+49 123 456 789',
      },
      email: {
        title: 'E-posta',
      },
      hours: {
        title: 'Çalışma Saatleri',
        schedule: 'Pazartesi - Cuma: 09:00 - 18:00',
      },
    },
  },
  documents: {
    title: "Belgelerim",
    subtitle: "Tıbbi belgelerinize ve raporlarınıza erişin",
    loading: "Belgeler yükleniyor...",
    error: "Belgeler yüklenirken hata oluştu",
    retry: "Yeniden Dene",
    documents: "belgeler",
    noDocuments: "Henüz belge yok",
    noDocumentsText: "Hizmetlerimizi kullanmaya başladığınızda tıbbi belgeleriniz ve raporlarınız burada görünecek",
    noDocumentsInCategory: "Bu kategoride henüz belge yok",
    view: "Görüntüle",
    opening: "Açılıyor...",
    urgent: "Acil",
    high: "Yüksek",
    reportType: "Rapor Türü",
    labName: "Laboratuvar Adı",
    testType: "Test Türü",
    radiologyCenter: "Radyoloji Merkezi",
    examType: "Muayene Türü",
    insuranceProvider: "Sigorta Sağlayıcı",
    claimNumber: "Talep Numarası",
    referenceNumber: "Referans Numarası",
    notes: "Notlar",
  },
  search: {
    placeholder: "Tedavi, Klinik",
    location: "Konum",
    button: "Şimdi Ara",
    title: "Doktor ve Klinik Ara",
    subtitle: "İhtiyaçlarınız için mükemmel tıbbi profesyoneli bulun",
    searching: "Aranıyor...",
    found: "Bulundu",
    tabs: {
      all: "Tümü",
      doctors: "Doktorlar",
      clinics: "Klinikler",
      agencies: "Ajanslar",
      treatments: "Tedaviler",
    },
    resultLabels: {
      results: "sonuç",
      doctors: "doktor",
      clinics: "klinik",
      agencies: "ajans",
      treatments: "tedavi",
    },
    noResults: {
      title: "Sonuç bulunamadı",
      text: "Arama filtrelerinizi veya arama terimlerinizi ayarlamayı deneyin",
      resetFilters: "Filtreleri Sıfırla",
    },
    filters: {
      title: "Filtreler",
      reset: "Sıfırla",
      search: "Ara",
      searchPlaceholder: "İsim, uzmanlık, tedavi...",
      type: "Tür",
      typeAll: "Tümü",
      typeDoctors: "Doktorlar",
      typeClinics: "Klinikler",
      typeAgencies: "Ajanslar",
      specialty: "Uzmanlık",
      specialtyPlaceholder: "örn. Kardiyoloji, Dermatoloji...",
      treatment: "Tedavi",
      treatmentPlaceholder: "örn. Diş İmplantı, Botoks...",
      category: "Kategori",
      categoryPlaceholder: "örn. Diş, Kozmetik...",
      priceRange: "Fiyat Aralığı (EUR)",
      minPrice: "Min",
      maxPrice: "Max",
      minRating: "Minimum Değerlendirme",
      any: "Herhangi",
      rating4: "4+ Yıldız",
      rating3: "3+ Yıldız",
      rating2: "2+ Yıldız",
      rating1: "1+ Yıldız",
      country: "Ülke",
      countryPlaceholder: "örn. Şehir veya Ülke",
      city: "Şehir",
      cityPlaceholder: "örn. Sofya",
      languages: "Diller",
      languagesPlaceholder: "örn. İngilizce, Almanca, Bulgarca (virgülle ayrılmış)",
      recruitmentStatus: "İşe Alım Durumu",
      recruiting: "Şu Anda İşe Alıyor",
      notRecruiting: "İşe Almıyor",
      openForRecruitment: "İşe Alıma Açık",
      notOpen: "Açık Değil",
      sortBy: "Sırala",
      sortRating: "Değerlendirme",
      sortName: "İsim",
      sortPrice: "Fiyat",
      sortNewest: "En Yeni",
      sortDesc: "Azalan",
      sortAsc: "Artan",
      searchButton: "Ara",
      resetFilters: "Filtreleri Sıfırla",
    },
  },
  cards: {
    treatmentsAvailable: "tedavi mevcut | tedavi mevcut",
    managedBy: "Yöneten",
    agency: "Ajans",
    fromPrice: "{price} €'dan itibaren",
    viewProfileForPricing: "Fiyatlar için profili görüntüle",
    limited: "Sınırlı",
    viewProfile: "Profili Görüntüle",
    doctorsCount: "doktor | doktor",
    currentlyRecruiting: "Şu anda işe alıyor",
    unknownTreatment: "Bilinmeyen tedavi",
    providerType: {
      doctor: "Doktor",
      clinic: "Klinik",
    },
    viewDetails: "Detayları Görüntüle",
    category: "Kategori",
    description: "Açıklama",
    includedServices: "Dahil Edilen Hizmetler",
    excludedServices: "Hariç Tutulan Hizmetler",
    preparationRequired: "Hazırlık Gerekli",
    recoveryTime: "İyileşme Süresi",
    location: "Konum",
    bookNow: "Şimdi Rezervasyon Yap",
    viewProviderProfile: "{type} Profilini Görüntüle",
  },
};

