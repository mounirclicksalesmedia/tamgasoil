import type { Locale } from "./i18n";

/** Order and titles follow the approved company profile (sections 02–04). */
export const leadershipSections = [
  "general-assembly",
  "board-chairman",
  "coo",
] as const;
export type LeadershipSection = (typeof leadershipSections)[number];

type Message = {
  name: string;
  role: string;
  organisation: string;
  quote: string;
  paragraphs: string[];
};

type Profile = {
  image: string;
  position: string;
  /** A decorative image of Qatar stands in where no portrait is published. */
  decorative: boolean;
  en: Message;
  ar: Message;
};

const profiles: Record<LeadershipSection, Profile> = {
  "general-assembly": {
    image: "/media/leadership/qatar-doha-bay.webp",
    position: "50% 50%",
    decorative: true,
    en: {
      name: "Mr. Mohammed bin Fahad Al-Hababi",
      role: "Chairman of the Shareholders’ General Assembly",
      organisation: "Tam Holding Group Co.",
      quote:
        "We treat the nation’s resources as a trust, and the services that protect them as part of that trust.",
      paragraphs: [
        "Qatar’s standing in the world of energy was built by people who took the long view: who invested patiently, kept their word, and treated the nation’s resources as a trust. Tam Holding Group was founded in that spirit, and it is in that spirit that I introduce Tam Oil & Gas Services, the Group’s arm for specialised energy services.",
        "Our shareholders chose this field deliberately. The energy sector is the backbone of our national economy, and the services that keep its assets safe, clean and productive are part of that backbone. A storage tank returned to service sooner, with its oil recovered and its waste reduced, is a direct contribution to the efficiency and environmental stewardship that Qatar National Vision 2030 asks of us all.",
        "On behalf of the General Assembly, I affirm the parent company’s full support for this venture: its capital, its governance and its name. We look forward to serving our partners in Qatar first, and the wider region after.",
      ],
    },
    ar: {
      name: "السيد/ محمد بن فهد الحبابي",
      role: "رئيس الجمعية العمومية للمساهمين",
      organisation: "مجموعة تم القابضة",
      quote:
        "ثروات الوطن أمانة، والخدمات التي تصونها جزء من هذه الأمانة.",
      paragraphs: [
        "بُنيت مكانة دولة قطر في عالم الطاقة على أيدي رجال نظروا إلى المدى البعيد؛ استثمروا بصبر، وأوفوا بعهودهم، وتعاملوا مع ثروات الوطن بوصفها أمانة. وعلى هذا النهج قامت مجموعة تم القابضة، وبهذه الروح أقدّم لكم شركة تم لخدمات النفط والغاز، ذراع المجموعة في خدمات الطاقة المتخصصة.",
        "لقد اختار مساهمونا هذا المجال عن قصد؛ فقطاع الطاقة عماد اقتصادنا الوطني، والخدمات التي تحافظ على أصوله آمنةً ونظيفةً ومنتجةً جزء لا يتجزأ من هذا العماد. وكل خزان يعود إلى الخدمة في وقت أقصر، وقد استُردّ نفطه وقلّت نفاياته، إسهام مباشر في الكفاءة وحماية البيئة اللتين تدعونا إليهما رؤية قطر الوطنية 2030.",
        "وباسم الجمعية العمومية، أؤكد دعم الشركة الأم الكامل لهذه الشركة: برأس مالها، وحوكمتها، واسمها. ونتطلع إلى خدمة شركائنا في قطر أولاً، ثم في المنطقة من بعدها.",
      ],
    },
  },
  "board-chairman": {
    image: "/media/leadership/yahya-abo-najab.jpg",
    position: "50% 40%",
    decorative: false,
    en: {
      name: "Mr. Yahya Abu Najem",
      role: "Chairman of the Board of Directors",
      organisation: "Tam Holding Group Co.",
      quote:
        "Lasting value in this industry comes from relationships, not transactions.",
      paragraphs: [
        "Tam Holding Group invests where three things meet: a real need in the market, a technology that answers it, and partners of proven standing. Oil and gas services meet all three, and that is why the Board has made this sector a priority in the Group’s investment strategy.",
        "We believe lasting value in this industry comes from relationships, not transactions. Our agreement with Micro-Bac International of the United States reflects that conviction. It brings our clients a technology refined over decades and applied for some of the best-known operators in the world, and it is the first of the international partnerships we intend to build.",
        "The Board’s commitment is clear: to invest for the long term, to hold our companies to the highest standards of governance and compliance, and to earn the confidence of national and international energy companies one project at a time. We invite you to judge us by our results.",
      ],
    },
    ar: {
      name: "السيد/ يحيى أبو نجم",
      role: "رئيس مجلس الإدارة",
      organisation: "مجموعة تم القابضة",
      quote: "القيمة المستدامة في هذه الصناعة تُبنى بالعلاقات لا بالصفقات.",
      paragraphs: [
        "تستثمر مجموعة تم القابضة حيث تلتقي ثلاثة أمور: حاجة حقيقية في السوق، وتقنية تلبّيها، وشركاء ذوو مكانة مشهودة. وخدمات النفط والغاز تجمع الثلاثة معاً، ولذلك جعلها مجلس الإدارة أولوية في استراتيجية المجموعة الاستثمارية.",
        "نؤمن بأن القيمة المستدامة في هذه الصناعة تُبنى بالعلاقات لا بالصفقات. واتفاقيتنا مع شركة مايكرو-باك إنترناشيونال الأمريكية تجسيد لهذه القناعة؛ فهي تضع بين أيدي عملائنا تقنية صُقلت على مدى عقود وطُبّقت لدى نخبة من أشهر الشركات المشغّلة في العالم، وهي أولى الشراكات الدولية التي نعتزم بناءها.",
        "والتزام مجلس الإدارة واضح: الاستثمار على المدى الطويل، وإلزام شركاتنا بأعلى معايير الحوكمة والامتثال، وكسب ثقة شركات الطاقة الوطنية والعالمية مشروعاً بعد مشروع. وندعوكم إلى أن تحكموا علينا بنتائجنا.",
      ],
    },
  },
  coo: {
    image: "/media/leadership/yasser-tag-eldin-office.webp",
    position: "50% 30%",
    decorative: false,
    en: {
      name: "Eng. Yasser Tag Eldin",
      role: "Chief Operating Officer (COO)",
      organisation: "Tam Oil & Gas Services Co., W.L.L",
      quote:
        "Much of what is hauled away as sludge is crude oil. Our method releases it, while people stay outside the tank.",
      paragraphs: [
        "Anyone who has managed a tank farm knows what a conventional cleaning involves: months out of service, crews working in confined spaces, and thousands of barrels of sludge to haul away and pay to dispose of. Much of that sludge is not waste at all. It is crude oil, trapped in paraffin and emulsion.",
        "Our method releases it. Selected natural microorganisms, circulated through the tank in a closed loop, break down the paraffin, split the emulsion and return the oil to a liquid, pumpable, saleable state, while people stay outside the tank.",
        "Every project we take on follows the same discipline. We sample and test before we commit. We design the treatment for that tank and that sludge. We monitor it daily, and we report what was achieved in measured terms. Safety comes first, the client’s asset second, and our own convenience last. That is the standard my team and I will be held to.",
      ],
    },
    ar: {
      name: "م. ياسر تاج الدين",
      role: "الرئيس التنفيذي للعمليات",
      organisation: "شركة تم لخدمات النفط والغاز ذ.م.م",
      quote:
        "جانب كبير مما يُنقل بوصفه حمأة هو نفط خام، وطريقتنا تحرّره والعاملون خارج الخزان.",
      paragraphs: [
        "كل من أدار مزرعة خزانات يعرف ما يعنيه التنظيف التقليدي: شهور من التوقف عن الخدمة، وأطقم تعمل في أماكن مغلقة، وآلاف البراميل من الحمأة تُنقل ويُدفع ثمن التخلص منها. والحقيقة أن جانباً كبيراً من هذه الحمأة ليس نفايات، بل نفط خام محتجز في البارافين والمستحلبات.",
        "وطريقتنا تحرّره؛ كائنات دقيقة طبيعية منتقاة تُدوَّر داخل الخزان في دائرة مغلقة، فتفكك البارافين، وتكسر المستحلب، وتعيد النفط سائلاً قابلاً للضخ والبيع، والعاملون خارج الخزان.",
        "وكل مشروع نتولاه يخضع للانضباط نفسه: نأخذ العينات ونختبرها قبل أن نلتزم، ونصمم المعالجة لذلك الخزان وتلك الحمأة تحديداً، ونتابعها يومياً، ونوثّق ما تحقق بالأرقام. السلامة أولاً، ثم أصول العميل، ثم راحتنا نحن في آخر القائمة. هذا هو المعيار الذي أُحاسَب عليه أنا وفريقي.",
      ],
    },
  },
};

export function isLeadershipSection(value: string): value is LeadershipSection {
  return leadershipSections.some((key) => key === value);
}

export function getLeader(locale: Locale, section: string) {
  if (!isLeadershipSection(section)) return null;
  const profile = profiles[section];
  const copy = profile[locale];
  return {
    ...copy,
    image: profile.image,
    position: profile.position,
    decorative: profile.decorative,
    alt: profile.decorative
      ? locale === "ar"
        ? "صورة فنية لخليج الدوحة وأفقها، دولة قطر"
        : "Artistic view of Doha Bay and skyline, State of Qatar"
      : copy.name,
  };
}
