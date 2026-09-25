/**
 * Copy for the interior pages. Same contract as lib/content-en.ts:
 * this file defines the shape, lib/pages-ar.ts is typed against it.
 *
 * Nothing here claims a statistic, a certification, a named client or a
 * project count. TAM is new and procurement teams verify those.
 */

export const pagesEn = {
  nav: {
    home: "Home",
    about: "About TAM",
    services: "Services",
    blog: "News",
    contact: "Contact us",
  },

  leadBand: {
    eyebrow: "Request a proposal",
    headingLead: "Fewer days offline.",
    headingAccent: "More oil back in stock.",
    points: [
      "Non-entry treatment, so most confined-space work leaves the scope entirely",
      "Sludge broken down in place and hydrocarbon returned to your inventory",
      "A scope, a method statement and a value estimate within two working days",
    ],
    formTitle: "Tell us about the tank",
  },

  about: {
    meta: {
      title: "About — TAM for Oil & Gas Services",
      description:
        "A Qatari asset integrity company bringing proven microbial tank-cleaning technology to the Gulf. Doha-based, built around technology, downtime, recovery, HSE and total cost.",
    },
    hero: {
      eyebrow: "About TAM",
      title: "We are not a tank cleaning contractor.",
      lede: "We are an integrated petroleum tank cleaning, maintenance and asset integrity company, headquartered in Doha and built around proven technology rather than headcount and hand tools.",
    },
    belief: {
      quote:
        "A storage tank is not a container. It is an asset with a service life, and almost everything that shortens that life starts at the bottom of it.",
      caption: "The idea the company is built on",
    },
    story: {
      eyebrow: "How we work",
      heading: "Proven technology, run by a Gulf operator.",
      paragraphs: [
        "Most tank cleaning in the region is still sold by the tonne — crews, vacuum trucks, confined-space entries, and a waste bill at the end of it. The work gets done, but the operator pays twice: once for the cleaning, and again for the hydrocarbon that leaves site as waste.",
        "TAM starts from the other end. We bring microbial and biochemical products from a developer with over forty years in the field, introduce them through nozzles that are already on the tank, and let the sludge break down in place. The oil separates and goes back to stock. What is left to dispose of is a fraction of what was there.",
        "The technology is proven. What we add is the part that decides whether a project succeeds in this region: the client relationship, the contract, the site, the permits and the compliance — run by a company based here, working to your HSE system.",
      ],
    },
    contrast: {
      eyebrow: "Positioning",
      heading: "What that means in practice.",
      isNotLabel: "What we are not",
      isLabel: "What we are",
      isNot: [
        "A cleaning crew priced by the tonne of sludge removed",
        "A vendor that hauls your tank bottoms away as waste",
        "A supplier of people and equipment for someone else's method statement",
      ],
      is: [
        "An asset integrity partner priced on the value recovered",
        "A technology operator that returns hydrocarbon to your stock",
        "The company that owns the scope, the method and the compliance",
      ],
    },
    partner: {
      eyebrow: "Technology partner",
      heading: "Micro-Bac International",
      body: "Our products come from Micro-Bac International, Inc. of Round Rock, Texas — a microbial solutions developer with over forty years in hydrocarbon treatment. They supply the products, the specialist equipment, the training and the engineering support. We run everything on the ground.",
      points: [
        "Naturally occurring, facultative anaerobic cultures that produce their own biosurfactants",
        "Product lines for tank bottoms, paraffin control, corrosion management and soil remediation",
        "Meets EPA requirements for release into the environment",
      ],
      note: "Micro-Bac is referenced here as our technology source. We do not present ourselves as a Micro-Bac subsidiary or agent beyond the scope of our agreement.",
    },
    cta: {
      heading: "Tell us about the tank.",
      body: "A scope, a method statement and a value estimate — usually within two working days of hearing the basics.",
      button: "Request a proposal",
    },
  },

  services: {
    meta: {
      title: "Services — Tank Cleaning, Recovery & Asset Integrity | TAM",
      description:
        "Tank cleaning and sludge treatment, hydrocarbon recovery, decontamination and degassing, API 653 inspection support, flow assurance, coating, preventive maintenance and environmental remediation.",
    },
    hero: {
      eyebrow: "Services",
      title: "One partner across the tank lifecycle.",
      lede: "Eight solutions that cover a storage tank from the sludge at the bottom of it to the coating on the shell — and the lines, vessels and separators around it.",
    },
    indexLabel: "On this page",
    includesLabel: "What it covers",
    enquire: "Enquire about this solution",
    includes: [
      [
        "Crude, fuel, slop and product tanks",
        "In-situ M-1000 dosing through existing nozzles",
        "Sludge volume reduction before disposal",
        "Floating-roof and fixed-roof configurations",
        "Waste characterisation support",
        "Return-to-service coordination",
      ],
      [
        "Paraffin chain breakdown from C16 to C60+",
        "Oil and water phase separation",
        "Recovered product returned to stock",
        "Recovery measurement and reporting",
        "Slop tank and interface management",
        "Disposal volume reduction",
      ],
      [
        "Gas-freeing to API 2015",
        "Diesel, fuel oil and lube residues",
        "Jet fuel and gasoline-range residues",
        "Atmosphere monitoring and certification",
        "Safe-entry preparation for inspection",
        "Hot-work preparation",
      ],
      [
        "Tank preparation for API 653 inspection",
        "NDT coordinated via your approved inspectors",
        "Floor, shell and roof access provision",
        "Cleaning to inspection-ready condition",
        "Findings handover and scope definition",
        "Repair scope support",
      ],
      [
        "Para-Bac paraffin control programmes",
        "Corroso-Bac corrosion and scale management",
        "Pipelines, flowlines and risers",
        "Vessels, separators and knockout drums",
        "Scheduled dosing and condition monitoring",
        "Integrity programme reporting",
      ],
      [
        "Floor and shell plate repair",
        "Internal lining systems",
        "External coating and protection",
        "Surface preparation to specification",
        "Coating inspection coordination",
        "Return of inspected tanks to service life",
      ],
      [
        "Scheduled dosing between turnarounds",
        "Sludge accumulation monitoring",
        "Condition reporting per tank",
        "Programme design across a tank farm",
        "Turnaround interval extension support",
        "Annual maintenance planning",
      ],
      [
        "Landfarming programmes",
        "Biopile construction and management",
        "Contaminated soil treatment",
        "M-1000 LF and PAH product lines",
        "Pit and lagoon remediation",
        "Closure documentation support",
      ],
    ],
    standards: {
      heading: "Every scope is written to a standard.",
      body: "We work to API 653 for inspection, API 2015 and API 2016 for entry and cleaning, ISGOTT where marine interfaces apply, and to your own permit-to-work and HSE management system on site.",
    },
    cta: {
      heading: "Which tank comes out of service first?",
      body: "Send us the size, the product and the outage window. We will come back with a scope, a method statement and a value estimate.",
      button: "Request a proposal",
    },
  },

  blog: {
    meta: {
      title: "News & perspectives — Tank Integrity & Recovery | TAM",
      description:
        "Notes on tank cleaning economics, non-entry methods, API standards and asset integrity in the Gulf, from TAM for Oil & Gas Services.",
    },
    hero: {
      eyebrow: "Insights",
      title: "Notes on tanks, sludge and what they actually cost.",
      lede: "Working notes on the economics and the standards behind tank maintenance in the Gulf. Written for the people who own the outage window.",
    },
    featuredLabel: "Featured",
    recentLabel: "Recent",
    allLabel: "All posts",
    readMore: "Read",
    minRead: "min read",
    byLabel: "By",
    backToBlog: "All news & perspectives",
    draftNotice:
      "Sample article — pending technical review and client sign-off before publication.",
    searchLabel: "Search news & articles",
    searchPlaceholder: "Search a topic or keyword…",
    emptyTitle: "No articles found",
    emptyBody: "Try a different keyword or explore another topic.",
    clearFilters: "Clear filters",
    resultsLabel: "Articles",
    browseLabel: "Explore the journal",
    ctaTitle: "Put insight into action.",
    ctaBody: "Discuss your next tank maintenance project with our team in Doha.",
    ctaLink: "Talk to our team",
    categories: ["All", "Economics", "Method", "Standards", "HSE"],
    posts: [
      {
        slug: "what-tank-bottoms-are-actually-worth",
        category: "Economics",
        date: "2026-09-15",
        readTime: 6,
        author: "TAM for Oil & Gas Services",
        title: "What tank bottoms are actually worth",
        excerpt:
          "Sludge is priced as a disposal problem. Most of it is recoverable hydrocarbon, and the difference between those two framings is the whole business case.",
        body: [
          "Ask a terminal operator what is at the bottom of a crude tank and the answer is usually a volume and a disposal cost. Ask what is in it, and the answer changes: paraffin, asphaltenes, water, solids — and a large fraction of recoverable oil.",
          "That distinction matters because it changes who pays. When tank bottoms are treated as waste, the operator pays to remove them and pays again in lost product. When they are treated as stock, the same material is separated, the oil goes back into inventory, and only the residue is disposed of.",
          "The reason the first framing persists is that conventional cleaning cannot do much else. Manual entry and vacuum removal take the material out as a mixture. Once it leaves site as waste, the hydrocarbon in it is gone.",
          "In-situ biological treatment inverts the sequence. The sludge is broken down inside the tank, the phases separate, and the oil is drawn off before anything is classified as waste. What remains for disposal is a fraction of the original volume.",
          "None of this is free, and the recovery depends on the product, the temperature and the depth of the sludge. But the question a tank owner should be asking is not what cleaning costs per tonne. It is how much of what is down there comes back.",
        ],
      },
      {
        slug: "why-non-entry-changes-the-hse-case",
        category: "HSE",
        date: "2026-09-08",
        readTime: 5,
        author: "TAM for Oil & Gas Services",
        title: "Why non-entry changes the HSE case",
        excerpt:
          "Confined-space entry is the single largest risk in a tank clean. Removing most of it from the scope changes the conversation with your HSE function.",
        body: [
          "Every tank cleaning method statement eventually arrives at the same paragraph: how many people go inside, for how long, under what atmosphere, with what rescue provision.",
          "That paragraph carries most of the risk in the job. Confined space, hydrocarbon atmosphere, restricted egress, and often heat — the combination is why tank entry sits near the top of most operators' risk registers.",
          "A non-entry method does not eliminate confined-space work entirely. Inspection still requires entry, and so does repair. What it does is move most of the cleaning out of the tank: cultures and nutrients are introduced through existing nozzles, and the material breaks down without crews inside.",
          "The second change is chemical. No solvents and no hot-oiling means the atmosphere the entry team eventually faces is a different one, and the products used meet EPA requirements for release into the environment.",
          "For an HSE function reviewing a contractor, this is a more useful conversation than a safety record. It is a structural reduction in exposure hours, and it can be counted before the job starts.",
        ],
      },
      {
        slug: "reading-api-653-as-an-owner",
        category: "Standards",
        date: "2026-08-27",
        readTime: 7,
        author: "TAM for Oil & Gas Services",
        title: "Reading API 653 as an owner, not an inspector",
        excerpt:
          "The standard governs inspection, repair and reconstruction. What it really sets is the clock on your tank — and cleaning is what stops that clock being wasted.",
        body: [
          "API 653 is written for inspectors, but the people whose decisions it constrains are owners. It sets inspection intervals, it defines what counts as a finding, and it determines when a tank can go back into service.",
          "The part that catches operators out is preparation. An inspection cannot start until the tank is clean, gas-free and accessible. If the cleaning runs long, the inspection window slips, and the outage that was scheduled around it stretches with it.",
          "This is why cleaning should be planned against the inspection date rather than the other way round. The relevant question is not how quickly a tank can be emptied, but how quickly it can be brought to inspection-ready condition with a gas-free certificate in hand.",
          "API 2015 governs that second part — safe entry and cleaning — and API 2016 covers entry itself. Between them they describe the state a tank has to reach before an API 653 inspector is of any use to you.",
          "Read together, the three standards are less a compliance burden than a schedule. The operators who treat them that way lose fewer days per turnaround.",
        ],
      },
      {
        slug: "qualifying-to-work-in-the-gulf",
        category: "Method",
        date: "2026-08-14",
        readTime: 5,
        author: "TAM for Oil & Gas Services",
        title: "Qualifying to work in the Gulf takes longer than the work does",
        excerpt:
          "QatarEnergy, Aramco and OQ each run their own vendor gate. Registration is the constraint on a regional tank maintenance business, not capability.",
        body: [
          "A tank cleaning scope might run four to six weeks. Getting to the point where you are allowed to bid on it takes considerably longer.",
          "In Qatar, supplier registration with QatarEnergy runs through KYS and Mushtaryat, and it is a prerequisite for receiving tender documents at all. In Saudi Arabia, Aramco vendor qualification sits alongside the separate approvals of the EPC main contractors who actually manage most tank farms. In Oman, OQ, OTTCO and OQ8 each run supplier portals with technical prequalification attached.",
          "None of these are difficult in isolation. What makes them a constraint is sequence: they cannot be started once a tender is announced, and the documentation each one wants differs.",
          "The practical consequence for a new entrant is that registration has to be treated as its own workstream, running in parallel with building capability rather than after it.",
          "It is also why a regional platform is built market by market. Qualification does not transfer across borders, and neither does the relationship that usually accompanies it.",
        ],
      },
    ],
  },

  contact: {
    meta: {
      title: "Contact — TAM for Oil & Gas Services, Doha",
      description:
        "Talk to our team in Doha about tank cleaning, sludge treatment, hydrocarbon recovery, inspection support or vendor registration.",
    },
    hero: {
      eyebrow: "Contact",
      title: "How can we help?",
      lede: "Tell us about the tank, the product it holds and when it next comes out of service. We will come back with a scope, a method statement and a value estimate.",
    },
    cards: [
      {
        icon: "proposal",
        title: "Request a proposal",
        body: "Tell us about the tank, the product and the outage window. A scope, a method statement and a value estimate come back within two working days.",
        link: "Send tank details",
        href: "#enquiry",
        chips: ["Scope", "Method statement", "Value estimate"],
      },
      {
        icon: "method",
        title: "Technical questions",
        body: "How non-entry treatment works on your product, what the cultures do to paraffin and emulsions, and what the residue looks like.",
        link: "See the method",
        href: "/process",
        chips: ["M-1000", "Para-Bac", "No entry"],
      },
      {
        icon: "registration",
        title: "Vendor registration",
        body: "QatarEnergy KYS and Mushtaryat, Saudi Aramco and OQ prequalification. Include your portal reference if you have one.",
        link: "Start prequalification",
        href: "#enquiry",
        chips: ["KYS", "Mushtaryat", "OQ portal"],
      },
      {
        icon: "hse",
        title: "HSE documentation",
        body: "Our HSE policy, the permit-to-work approach we adopt on site, and gas-free certification to API 2015.",
        link: "Request the HSE policy",
        href: "#enquiry",
        chips: ["API 2015", "Permit to work", "Gas-free"],
      },
      {
        icon: "careers",
        title: "Careers",
        body: "Project engineers, HSE and field crews as the Qatar operation grows through localisation.",
        link: "Discuss opportunities",
        href: "#enquiry",
        chips: ["Doha", "Engineering", "HSE"],
      },
      {
        icon: "media",
        title: "Press and partners",
        body: "Company description, brand assets and partnership enquiries, including the Micro-Bac technology relationship.",
        link: "Contact us",
        href: "#enquiry",
        chips: ["Boilerplate", "Logo", "Partners"],
      },
    ],
    directLabel: "Prefer to reach us directly?",
    standardsLabel: "Every scope is written to",
    railLabels: {
      hours: "Working hours",
      email: "Email",
      phone: "Phone",
      office: "Office",
    },
    hours: "Sunday – Thursday, 8:00 – 17:00 AST",
    reasonLabel: "Reason for enquiry",
    reasons: [
      "Tank cleaning & sludge treatment",
      "Hydrocarbon recovery",
      "Decontamination & degassing",
      "Inspection support (API 653)",
      "Flow assurance & asset integrity",
      "Coating & rehabilitation",
      "Preventive maintenance",
      "Environmental remediation",
      "Vendor registration / prequalification",
      "Careers",
      "Media",
      "Other",
    ],
    deliveryUnavailable: "Online enquiries are not available yet. Your message has not been sent.",
    formHeading: "Let’s talk about your project.",
    helpHeading: "A direct line to the right conversation.",
    helpIntro: "From your first technical question to your next turnaround, we are here to help.",
    optionalLabel: "optional",
    generalMessage: "Your message",
    generalMessageHint: "Tell us how we can help, including any relevant reference or link.",
    formLabel: "Your enquiry",
    fields: {
      name: "Full name",
      company: "Company",
      email: "Work email",
      phone: "Phone",
      message: "About the tank",
      messageHint: "Tank size, product, location and next outage window",
    },
    button: "Send request",
    sending: "Sending…",
    note: "We reply within two working days.",
    success: "Thank you. Your request has reached our team in Doha.",
    error: "Something went wrong. Please email us directly.",
    locationsLabel: "Locations",
    locations: [
      {
        label: "Head office",
        lines: ["[OFFICE ADDRESS]", "Doha, Qatar"],
      },
      {
        label: "Markets served",
        lines: ["Qatar · Saudi Arabia · Oman"],
      },
      {
        label: "Technology partner",
        lines: ["Micro-Bac International, Inc.", "Round Rock, Texas, USA"],
      },
    ],
    registrationLabel: "Vendor registration",
    registrationNote:
      "For QatarEnergy KYS / Mushtaryat, Saudi Aramco or OQ prequalification enquiries, select “Vendor registration” above and include the portal reference if you have one.",
  },
};

export type PagesContent = typeof pagesEn;
