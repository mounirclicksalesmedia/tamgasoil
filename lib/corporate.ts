import type { Locale } from "./i18n";

export const companySections = [
  "overview",
  "chairman",
  "managing-director",
  "coo",
  "strategy",
] as const;
export type CompanySection = (typeof companySections)[number];

const en = {
  nav: {
    company: "About TAM",
    services: "Services",
    agreements: "Agreements",
    news: "News",
    contact: "Contact us",
    brochure: "Download brochure",
    proposal: "Request a proposal",
  },
  sections: {
    overview: "Company overview",
    chairman: "Chairman’s message",
    "managing-director": "Managing Director’s message",
    coo: "Chief Operating Officer’s message",
    strategy: "Strategic direction",
  },
  companyTitle: "Built around the life of your assets.",
  companyIntro:
    "From our base in Doha, we bring tank treatment, hydrocarbon recovery and asset integrity into one coordinated approach.",
  explore: "Explore TAM",
  discover: "Explore this section",
  leadership: "Our leadership",
  company: "About the company",
  sectionIntros: {
    overview: "Our company, our approach and the value we work to recover.",
    chairman:
      "The Chairman’s perspective on TAM’s direction and long-term ambitions.",
    "managing-director":
      "The Managing Director’s perspective on partnerships and building the business.",
    coo: "The Chief Operating Officer’s perspective on delivery, safety and operational discipline.",
    strategy:
      "A clear path from market entry to a regional platform for asset integrity.",
  },
  pendingTitle: "A message to follow.",
  pendingBody:
    "The official leadership message will be published here when it is available. In the meantime, explore our approach or speak with our team.",
  pendingBadge: "Message coming soon",
  strategyTitle: "Recover value. Build capability. Grow responsibly.",
  strategyIntro:
    "Our direction connects the value delivered on every tank with the people, technology and local capabilities needed for the next project.",
  priorities: [
    {
      title: "Value from every asset",
      body: "Make recovery, downtime and total lifecycle cost central to the scope of each project.",
    },
    {
      title: "Safety in the method",
      body: "Prioritise treatment through existing nozzles and align delivery with the operator’s HSE system.",
    },
    {
      title: "Capability close to the client",
      body: "Build local crews, engineering knowledge and equipment capability as the business grows.",
    },
    {
      title: "Disciplined regional growth",
      body: "Develop market by market, with qualification and local requirements addressed before delivery.",
    },
  ],
  agreementsTitle: "Working together. Delivering with purpose.",
  agreementsIntro:
    "Explore the technology relationships supporting our approach, and talk to us about opportunities to collaborate.",
  partnerLabel: "Technology relationship",
  partnerNote:
    "This overview describes the technology relationship already presented on our website. Signed agreement documents and their terms are not published here.",
  collaboration: "Start a conversation",
  collaborationBody:
    "For technology collaboration, supply-chain support or regional opportunities, introduce your organisation and the capabilities you bring.",
  brochureTitle: "TAM, at a glance.",
  brochureIntro:
    "A concise introduction to our approach, services and strategic direction, ready to keep or share.",
  brochureLabel: "Company overview",
  brochureNote:
    "Prepared from the current website content. Leadership messages and unpublished agreement terms are not included.",
  download: "Download PDF",
  brochureItems: [
    "Company & approach",
    "Services & capabilities",
    "Strategic direction",
  ],
  proposalTitle: "Let’s define the right scope.",
  proposalIntro:
    "Share the tank, product, site and outage window. Our team can use those details to discuss the method and prepare a technical proposal.",
  proposalSteps: [
    {
      title: "Tell us the essentials",
      body: "Tank size, contents, location and the service you need.",
    },
    {
      title: "Define the scope",
      body: "We review the available information and clarify the technical requirements.",
    },
    {
      title: "Plan the next step",
      body: "Discuss the method, timing and supporting information for your proposal.",
    },
  ],
  proposalForm: "Your project brief",
  proposalHint:
    "Add any known sludge depth, access constraints or inspection dates to your message.",
  servicesTitle: "Expertise across the tank lifecycle.",
  servicesIntro:
    "Explore our services, open a card for the scope, and start a conversation about your asset.",
  serviceDetails: "Explore scope",
  serviceClose: "Close scope",
  newsTitle: "News & perspectives.",
  newsIntro:
    "Technical perspectives and company updates from TAM. Explore our existing articles on recovery, safety and asset integrity.",
  allServices: "All services",
  technical: "Technical services",
  more: "Continue exploring",
};

type Copy = { [K in keyof typeof en]: (typeof en)[K] };
const ar: Copy = {
  nav: {
    company: "عن الشركة",
    services: "الخدمات",
    agreements: "اتفاقيات",
    news: "أخبار",
    contact: "اتصل بنا",
    brochure: "حمل البروشور",
    proposal: "اطلب عرضاً فنياً",
  },
  sections: {
    overview: "نبذة تعريفية",
    chairman: "كلمة رئيس مجلس الإدارة",
    "managing-director": "كلمة العضو المنتدب",
    coo: "كلمة الرئيس التنفيذي للعمليات",
    strategy: "التوجه الاستراتيجي",
  },
  companyTitle: "نعتني بأصولك طوال عمرها التشغيلي.",
  companyIntro:
    "من مقرنا في الدوحة، نجمع معالجة الخزانات واستعادة الهيدروكربونات وسلامة الأصول في منهجية عمل متكاملة.",
  explore: "تعرّف على تم",
  discover: "اكتشف المزيد",
  leadership: "قيادة الشركة",
  company: "عن الشركة",
  sectionIntros: {
    overview: "تعرّف على شركتنا ومنهجيتنا والقيمة التي نعمل على استعادتها.",
    chairman:
      "رؤية رئيس مجلس الإدارة لتوجهات الشركة وطموحاتها على المدى البعيد.",
    "managing-director": "رؤية العضو المنتدب لتطوير الأعمال وبناء الشراكات.",
    coo: "رؤية الرئيس التنفيذي للعمليات للتنفيذ والسلامة والانضباط التشغيلي.",
    strategy: "مسار واضح من دخول السوق إلى بناء منصة إقليمية لسلامة الأصول.",
  },
  pendingTitle: "كلمة تُنشر قريباً.",
  pendingBody:
    "ستُنشر الكلمة الرسمية للإدارة هنا عند توفرها. إلى ذلك الحين، يمكنك التعرّف على منهجيتنا أو التواصل مع فريقنا.",
  pendingBadge: "الكلمة قريباً",
  strategyTitle: "نستعيد القيمة. نبني القدرات. ننمو بمسؤولية.",
  strategyIntro:
    "يربط توجهنا بين القيمة التي نقدمها في كل خزان وبين الكفاءات والتقنية والقدرات المحلية اللازمة للمشروع القادم.",
  priorities: [
    {
      title: "قيمة من كل أصل",
      body: "نجعل الاستعادة ومدة التوقف والتكلفة الإجمالية للعمر التشغيلي أساساً لنطاق كل مشروع.",
    },
    {
      title: "السلامة في المنهجية",
      body: "نعطي الأولوية للمعالجة عبر الفتحات القائمة، ونعمل وفق منظومة السلامة الخاصة بالمشغّل.",
    },
    {
      title: "قدرات قريبة من العميل",
      body: "نبني فرقاً محلية ومعرفة هندسية وقدرات في المعدات بالتوازي مع نمو الأعمال.",
    },
    {
      title: "نمو إقليمي مدروس",
      body: "نتوسع سوقاً بعد سوق، مع استيفاء التأهيل والمتطلبات المحلية قبل التنفيذ.",
    },
  ],
  agreementsTitle: "نتعاون بهدف. ونعمل بقيمة.",
  agreementsIntro:
    "تعرّف على العلاقات التقنية الداعمة لمنهجيتنا، وتواصل معنا لبحث فرص التعاون.",
  partnerLabel: "العلاقة التقنية",
  partnerNote:
    "يعرض هذا الملخص العلاقة التقنية الواردة في موقعنا. لا تتضمن هذه الصفحة وثائق الاتفاقيات الموقّعة أو شروطها.",
  collaboration: "لنبدأ الحوار",
  collaborationBody:
    "للتعاون التقني أو دعم سلسلة الإمداد أو الفرص الإقليمية، عرّفنا بمؤسستك والقدرات التي تقدمها.",
  brochureTitle: "تم، في لمحة.",
  brochureIntro:
    "تعريف موجز بمنهجيتنا وخدماتنا وتوجهنا الاستراتيجي، للاطلاع والمشاركة.",
  brochureLabel: "الملف التعريفي للشركة",
  brochureNote:
    "أُعدّ من محتوى الموقع الحالي. لا يتضمن كلمات الإدارة أو شروط الاتفاقيات غير المنشورة.",
  download: "تحميل PDF",
  brochureItems: [
    "الشركة ومنهجية العمل",
    "الخدمات والقدرات",
    "التوجه الاستراتيجي",
  ],
  proposalTitle: "لنحدّد نطاق العمل المناسب.",
  proposalIntro:
    "شاركنا معلومات الخزان والمنتج والموقع وموعد التوقف. تساعد هذه التفاصيل فريقنا على مناقشة المنهجية وإعداد عرض فني.",
  proposalSteps: [
    {
      title: "أخبرنا بالأساسيات",
      body: "حجم الخزان ومحتوياته وموقعه والخدمة المطلوبة.",
    },
    {
      title: "نحدّد نطاق العمل",
      body: "نراجع المعلومات المتاحة ونستوضح المتطلبات الفنية.",
    },
    {
      title: "نخطّط للخطوة التالية",
      body: "نناقش المنهجية والجدول الزمني والمعلومات اللازمة للعرض.",
    },
  ],
  proposalForm: "تفاصيل مشروعك",
  proposalHint:
    "أضف عمق الحمأة إن كان معروفاً، وقيود الوصول ومواعيد الفحص إلى رسالتك.",
  servicesTitle: "خبرات تغطي دورة حياة الخزان.",
  servicesIntro:
    "تعرّف على خدماتنا، وافتح البطاقة للاطلاع على نطاق العمل، ثم تواصل معنا بشأن أصولك.",
  serviceDetails: "استكشف نطاق العمل",
  serviceClose: "إغلاق التفاصيل",
  newsTitle: "أخبار ورؤى.",
  newsIntro:
    "رؤى فنية ومستجدات من تم. اطّلع على مقالاتنا حول الاستعادة والسلامة وسلامة الأصول.",
  allServices: "جميع الخدمات",
  technical: "الخدمات الفنية",
  more: "اكتشف أيضاً",
};

export function getCorporate(locale: Locale): Copy {
  return locale === "ar" ? ar : en;
}
export function companyHref(locale: Locale, section: CompanySection) {
  return `/${locale}/company${section === "overview" ? "" : `/${section}`}`;
}
