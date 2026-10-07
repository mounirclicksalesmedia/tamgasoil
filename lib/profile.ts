import type { Locale } from "./i18n";

/**
 * Copy from the approved "Company Profile & Technical Brochure".
 * Excluded at the client's request: the per-tank cost comparison chart and any
 * cost figures from the case studies; the operator list credits the company
 * that developed the technology, not an individual.
 */
const en = {
  glance: {
    label: "TAM at a glance",
    stats: [
      {
        value: "30+",
        label:
          "years of leadership experience in management and oil and gas operations",
      },
      {
        value: "Zero",
        label: "confined-space entry during sludge treatment and oil recovery",
      },
      {
        value: "1979",
        label:
          "the year Micro-Bac began developing its microbial products in Texas",
      },
      {
        value: "3",
        label:
          "growth horizons: Qatar, the Gulf region and target Middle East markets",
      },
    ],
  },
  about: {
    eyebrow: "Who we are",
    heading: "Built on long experience",
    lead: "Tam Oil & Gas Services Co., W.L.L is a Qatari company and a member of Tam Holding Group Co., headquartered in Doha.",
    paragraphs: [
      "We specialise in the maintenance and cleaning of petroleum storage tanks using advanced microbial technology from Micro-Bac International, Inc. of the United States.",
      "Our owners and leadership bring no less than 30 years of experience across corporate management and the technical side of the oil and gas sector. It shapes how we operate: disciplined governance, strict compliance, and a clear understanding of what tank owners in this region need: safe work, shorter outages, recovered product and less waste.",
      "Our growth follows a defined strategic plan. We establish the service in Qatar, extend it across the Gulf, and then reach the Middle East markets our strategy targets.",
    ],
    pillars: [
      {
        title: "Governance and compliance",
        body: "Clear accountability, documented procedures and adherence to client and regulatory requirements.",
      },
      {
        title: "Technical depth",
        body: "Decades of hands-on oil and gas experience behind every treatment plan.",
      },
      {
        title: "Global technology, local delivery",
        body: "Micro-Bac products and laboratory support, applied from Doha.",
      },
      {
        title: "Market understanding",
        body: "Built around Gulf operators’ priorities: safety, uptime and asset integrity.",
      },
    ],
  },
  strategy: {
    vision: {
      label: "Vision",
      body: "To be the Gulf’s trusted first choice for safe, clean and value-recovering tank maintenance.",
    },
    mission: {
      label: "Mission",
      body: "We return storage tanks to service faster and more safely, using proven biological technology under disciplined governance to recover product, protect assets and people, and cut waste at its source.",
    },
    valuesLabel: "Our values",
    values: [
      { title: "Safety first", body: "We keep people out of the hazard." },
      { title: "Integrity", body: "We comply fully and report honestly." },
      {
        title: "Technical rigour",
        body: "We test before we treat, and we measure what we achieve.",
      },
      { title: "Stewardship", body: "We recover resources and cut waste." },
      {
        title: "Partnership",
        body: "Long relationships with clients and partners.",
      },
      {
        title: "Accountability",
        body: "We own the outcome of every project we accept.",
      },
    ],
    objectivesLabel: "Strategic objectives",
    objectives: [
      "Make Tam the reference provider of zero-entry biological tank cleaning in Qatar.",
      "Extend operations across the Gulf, then into target Middle East markets.",
      "Deepen the Micro-Bac partnership and add alliances with leading global technology providers.",
      "Develop local technical capability through training and knowledge transfer.",
      "Operate to the highest HSE, governance and compliance standards, with measured results on every project.",
    ],
  },
  partnership: {
    eyebrow: "Technology partner",
    heading: "Global partnership",
    body: "Tam Oil & Gas Services has concluded a cooperation and service agreement with Micro-Bac International, Inc. of Round Rock, Texas. Under it, Tam applies Micro-Bac’s microbial products and treatment methods to the maintenance and cleaning of petroleum tanks, to the highest international standards of precision, occupational safety and preservation of assets and resources.",
    tam: {
      place: "Doha, Qatar",
      name: "Tam Oil & Gas Services",
      body: "Site survey and sampling · project engineering · field crews and equipment · HSE management · client reporting",
    },
    microbac: {
      place: "Round Rock, Texas, USA",
      name: "Micro-Bac International, Inc.",
      body: "Research and development · manufacturing of live microbial cultures · laboratory treatability testing · application protocols",
    },
    recordLabel: "Micro-Bac: a record of firsts",
    record: [
      { year: "1979", body: "Product development begins in Texas" },
      { year: "1982", body: "Company incorporated" },
      {
        year: "1986",
        body: "Para-Bac™ introduced for paraffin, scale and corrosion control",
      },
      {
        year: "1988",
        body: "M-1000H™ for hazardous waste and bioremediation",
      },
      {
        year: "1991",
        body: "Engineering Innovation award, Petroleum Engineer International",
      },
      {
        year: "1995",
        body: "Para-Bac™ named Best New Technology, Hart’s Oil and Gas World",
      },
    ],
    standardsLabel: "Three standards every Micro-Bac strain must meet",
    standards: [
      "Non-pathogenic",
      "Naturally occurring, not genetically engineered",
      "Safe to use",
    ],
    bringsLabel: "What the partnership brings to our clients",
    brings: [
      {
        title: "Proven products",
        body: "The Para-Bac™ and M-1000H™ families, used in the U.S., Canada, Latin America, Asia and Europe.",
      },
      {
        title: "Laboratory backing",
        body: "Pre-treatment evaluation of each sludge to confirm treatability before work begins.",
      },
      {
        title: "Field-tested protocols",
        body: "Application methods refined on documented tank projects since the 1980s.",
      },
      {
        title: "Local accountability",
        body: "One contract and one responsible team in Doha, from survey to final report.",
      },
    ],
  },
  services: {
    eyebrow: "What we do",
    heading: "Our services",
    scopeLabel: "Core scope",
    scope:
      "Maintenance and cleaning of petroleum storage tanks using modern biological technology",
    items: [
      {
        title: "Zero-entry biological tank cleaning",
        body: "In-place treatment of tank bottoms with Para-Bac™ cultures and closed-loop circulation, for fixed and floating-roof tanks.",
      },
      {
        title: "Sludge treatment and oil recovery",
        body: "Liquefaction of paraffinic sludge so trapped hydrocarbons separate and return to the client as saleable oil.",
      },
      {
        title: "Emulsion breaking and slop oil treatment",
        body: "Biological separation of stable oil and water emulsions into recoverable oil, water and settled solids.",
      },
      {
        title: "Tank preparation for inspection and repair",
        body: "Reduction of sludge, VOCs and LEL ahead of internal inspection, coating and repair, so any entry is shorter and safer.",
      },
      {
        title: "Sampling, analysis and treatability studies",
        body: "Representative sludge sampling, characterisation and treatment design, supported by Micro-Bac’s laboratory.",
      },
      {
        title: "Preventive tank maintenance programmes",
        body: "Scheduled treatments that limit bottom build-up between cleanings and preserve working capacity.",
      },
      {
        title: "Production facility treatment",
        body: "Paraffin, scale and corrosion control in flowlines, separators and surface equipment with the Para-Bac™ family.",
      },
      {
        title: "Pits, lagoons and waste minimisation",
        body: "Biological treatment of sludge pits, holding lagoons and oily wastes using M-1000H™ products and nutrients.",
      },
    ],
    assetsLabel: "Assets we treat",
    assets: [
      "Crude oil storage tanks",
      "Slop and off-spec tanks",
      "Condensate and naphtha tanks",
      "Ballast water tanks",
      "Fixed and floating-roof designs",
      "Sludge pits and lagoons",
    ],
    assetsNote:
      "The same microbial approach applies to petroleum sludges, vegetable oil sludges and animal fats.",
  },
  technology: {
    nav: "Technology",
    metaTitle: "How the technology works — Microbial tank cleaning | TAM",
    hero: {
      eyebrow: "Technical specifications",
      title: "How the technology works.",
      lede: "Paraffinic tank sludge is largely crude oil. Living cultures release it inside a closed loop, while people stay outside the tank.",
      jump: "See it work",
    },
    how: {
      eyebrow: "01 · The science",
      heading: "Microbial solubilisation of a tank bottom",
      body: "Paraffinic tank sludge is largely crude oil, held in place by long-chain paraffin and stable water emulsion. Para-Bac™ microorganisms act on both. They break the carbon chains of the paraffin and they split the emulsion, so oil, water and solids separate under gravity.",
      note: "Schematic, not to scale",
      play: "Replay",
      layers: {
        bound: "Sludge: oil, water and solids bound by paraffin",
        oil: "Oil",
        sludge: "Sludge",
        water: "Water",
        hydrocarbons: "Hydrocarbons",
        solids: "Solids",
      },
      stages: [
        {
          label: "Before treatment",
          body: "A dense, unpumpable bottom layer (BS&W).",
        },
        {
          label: "1 · Release",
          body: "Biosurfactants free oil from sand and sediment.",
        },
        {
          label: "2 · Breakout",
          body: "Biosolvents cut viscosity. Oil coalesces and rises.",
        },
        {
          label: "3 · Separation",
          body: "Paraffin is metabolised. Three phases settle.",
        },
      ],
    },
    emulsion: {
      heading: "Emulsion breaking",
      body: "The bacterial cell acts as a wetting bridge. A droplet that touches its surface spreads across it and merges with the next, so the emulsion collapses into free oil.",
      before: "Cell bridges two droplets",
      after: "Droplets coalesce",
    },
    mechanisms: {
      heading: "Three mechanisms of action",
      items: [
        {
          title: "Solubilisation of paraffin",
          body: "by direct metabolic chain breaking.",
        },
        {
          title: "Fatty acids",
          body: "produced in place act as paraffin solvents and dispersants.",
        },
        {
          title: "Biosurfactants",
          body: "disperse paraffin and release oil from solids.",
        },
      ],
    },
    effect: {
      heading: "Measured effect on the oil",
      items: [
        "Lower pour point and cloud point",
        "Lower viscosity",
        "Higher API gravity",
        "More volatile content",
        "Lower interfacial tension",
      ],
      note: "Gas chromatography of treated tank samples shows the C15 to C25 fractions rising while C25 to C30+ fall: heavy wax becoming lighter, liquid oil.",
      chartLabel: "Long paraffin chains are cut into shorter, lighter fractions",
    },
    compare: {
      chemical: {
        title: "Chemical treatment",
        body: "Solvents, dispersants and surfactants move the deposit without changing it. Paraffin can solidify again once the chemical dissipates.",
      },
      microbial: {
        title: "Microbial treatment",
        body: "Living cultures shorten the paraffin chains themselves and keep producing solvents and surfactants while they are active.",
      },
    },
    stages: {
      eyebrow: "02 · Work stages",
      heading: "Six stages, every project",
      body: "Every project follows the same six stages. Nothing is dosed until the sludge has been sampled and tested, and nothing is declared finished until the agreed criteria have been measured.",
      loopLabel: "Typical closed-loop circulation system",
      note: "Schematic, not to scale",
      labels: {
        dosing: "Micro-Bac cultures dosed directly into the tank",
        discharge: "Discharge: valved return line",
        suction: "Suction",
        pump: "Pump",
        crude: "Crude oil and water",
        sludge: "Sludge (BS&W)",
        pumps:
          "Multiple connections may be used on large tanks. Reference projects used 6 to 8 inch pumps.",
      },
      items: [
        {
          title: "Survey and sampling",
          body: "Tank data, sludge depth and volume are recorded. Representative or composite samples are taken, because sludge varies across the tank floor.",
        },
        {
          title: "Laboratory characterisation",
          body: "Solvent fractionation, hydrocarbon distribution by molecular weight and paraffin content by gas chromatography. Treatability is confirmed before commitment.",
        },
        {
          title: "Treatment design",
          body: "Product blend and dosage, carrier fluid, pump and piping layout, circulation schedule and acceptance criteria such as BS&W and pour point.",
        },
        {
          title: "Set-up and inoculation",
          body: "Tank volume is drawn down. Pumps connect to existing nozzles. Carrier fluid is added so the bottom can circulate, then cultures go directly into the tank.",
        },
        {
          title: "Circulation and breakout",
          body: "Intermittent cycles spread the cultures through the sludge, then let oil break out at rest. Samples and gas readings track progress until criteria are met.",
        },
        {
          title: "Recovery and handover",
          body: "Oil, water and solids are pumped out as separate layers to their recovery routes. The residue is removed and the tank is handed over with a results report.",
        },
      ],
      params: [
        {
          value: "12 h on · 12 h off",
          label: "typical circulation and rest cycle",
        },
        {
          value: "10 to 14 days",
          label: "typical programme; about three weeks on large crude tanks",
        },
        {
          value: "1 in to 1 ft",
          label:
            "carrier oil over the sludge, or about 1 inch of carrier water",
        },
        {
          value: "Oil as carrier",
          label: "preferred when the goal is to recover oil from the sludge",
        },
      ],
      circulating: "Circulating",
      resting: "At rest",
    },
    product: {
      eyebrow: "03 · Product data",
      heading: "Product data and handling",
      sdsTitle: "Paraffin treatment culture ER-P200",
      sdsNote: "Extract from the product safety data sheet",
      left: [
        [
          "Use",
          "Paraffin in oil wells and surface equipment: flowlines, tanks, separators",
        ],
        [
          "Composition",
          "Naturally occurring, non-pathogenic microorganisms in a saline nutrient liquid",
        ],
        ["Hazards", "No hazardous components (TSCA 40 CFR 710.4b)"],
        ["Appearance", "Turbid tan-grey liquid, organic odour"],
        ["Flammability", "Not flammable or explosive"],
        ["Stability", "Stable; no hazardous by-products"],
        ["Protection", "Gloves and safety glasses advised"],
      ],
      right: [
        ["pH", "6 to 8"],
        ["Relative density", "1.04"],
        ["Viscosity", "0.982 cP at 70°F (21°C)"],
        ["Solubility", "Freely soluble in water"],
        ["Boiling point", "100°C (212°F)"],
        ["Melting point", "0°C (32°F)"],
        ["Storage", "Closed original container, 4°C to 32°C"],
      ],
      familiesLabel: "Product families",
      families: [
        {
          name: "Para-Bac™",
          body: "Paraffin control, tank bottom cleaning and emulsion breaking. In field use since 1986.",
        },
        {
          name: "Para-Bac/S™",
          body: "Combined with M-1000H™ on oil and water emulsions when laboratory testing indicates it.",
        },
        {
          name: "M-1000H™",
          body: "Sludge reduction, waste minimisation, pits, lagoons and bioremediation, with Micro-Bac nutrients.",
        },
        {
          name: "Corroso-Bac™",
          body: "Scale and corrosion control by chelation, dispersion and surface filming.",
        },
      ],
      storageLabel: "Storage temperature window",
      storage: {
        short: "Short term, one week or less: 4°C to 40°C",
        long: "Long term: 13°C to 35°C",
        avoid: "Avoid > 43°C",
        freeze: "0°C: do not freeze",
        note: "Gulf summer temperatures exceed the upper limit, so shaded, temperature-controlled storage and transport are essential.",
      },
      always: {
        title: "Always",
        items: [
          "Keep containers closed, clean and out of direct sunlight.",
          "Pump with a peristaltic pump first, a piston, diaphragm or screw pump second.",
          "Add the cultures first and any nutrients after them.",
          "Use any blend of products within 24 hours.",
        ],
      },
      never: {
        title: "Never",
        items: [
          "Freeze the product or dilute it before the point of application.",
          "Mix with diesel, kerosene, gasoline, other light refined products or oilfield chemicals.",
          "Expose to biocides. Biocide dosing is suspended during treatment.",
          "Use high-speed impeller pumps, whose shear and cavitation damage the cells.",
        ],
      },
      summary:
        "Live, ready-to-use bacterial cultures: water-based and non-flammable. Keep away from direct sun, freezing, biocides and light petroleum products.",
    },
    advantages: {
      eyebrow: "04 · Why biological cleaning",
      heading: "Advantages",
      items: [
        {
          title: "Zero tank entry",
          body: "No confined-space entry during treatment and oil recovery.",
        },
        {
          title: "Saleable oil recovered",
          body: "Oil locked in sludge returns as product.",
        },
        {
          title: "Waste minimised",
          body: "Far less sludge to haul and dispose of.",
        },
        {
          title: "Lower VOCs and LEL",
          body: "Vapour and explosive-limit readings fall during treatment.",
        },
        {
          title: "Shorter outage",
          body: "Treatment runs in weeks, so tanks return to service sooner.",
        },
        {
          title: "Cost competitive",
          body: "Competitive with standard methods.",
        },
        {
          title: "Asset preserved",
          body: "No door sheets cut in the tank shell.",
        },
        {
          title: "Minimal labour",
          body: "A small crew, circulation pumps and temporary piping.",
        },
        {
          title: "Natural and safe",
          body: "Water-based, non-flammable cultures.",
        },
      ],
      compareLabel: "Conventional cleaning compared with the Tam method",
      columns: [
        "Aspect",
        "Conventional manual or mechanical",
        "Tam biological method",
      ],
      rows: [
        [
          "Personnel",
          "Crews work inside a confined space",
          "No entry during treatment and recovery",
        ],
        [
          "Tank shell",
          "Door sheets may be cut, then repaired",
          "Existing nozzles and manways are used",
        ],
        [
          "Sludge",
          "Hauled and disposed of as waste; oil value lost",
          "Converted to recoverable oil; small solid residue",
        ],
        [
          "Tank atmosphere",
          "Vapours released as sludge is disturbed",
          "VOCs and LEL reduced during treatment",
        ],
        [
          "Time out of service",
          "Months for large tanks",
          "Typically a treatment cycle of weeks",
        ],
      ],
      closing:
        "Biological treatment turns tank cleaning from a cost and a risk into an opportunity to recover value: no personnel entry, sludge converted into saleable oil, less waste and a shorter outage.",
    },
    results: {
      eyebrow: "05 · Micro-Bac project record",
      heading: "Field-proven results",
      stats: [
        {
          value: 94000,
          suffix: " bbl",
          label: "of oil recovered from about 95,000 bbl of crude sludge",
        },
        {
          value: 68,
          suffix: "%",
          label: "of emulsified oil recovered, with under 1% water",
        },
        {
          value: 65,
          suffix: " days",
          label: "instead of more than seven months for one tank programme",
        },
        {
          value: 0,
          suffix: "% LEL",
          label: "vapour reading on day 13 in a 220 ft naphtha tank",
        },
      ],
      lelLabel: "LEL during treatment",
      lelNote: "Vapour reading as % of LEL, naphtha tank, Canada",
      lel: [
        { day: "Day 5", value: 65 },
        { day: "Day 10", value: 30 },
        { day: "Day 13", value: 0 },
      ],
      residueLabel: "What remained after treatment",
      residueNote: "Residue as a share of the starting volume or level",
      residues: [
        {
          label: "Crude tank: 44,000 bbl sludge to 80 bbl solids",
          value: 0.2,
          display: "0.2% left",
        },
        {
          label: "Waxy sludge: 750 bbl to 30 bbl residue",
          value: 4,
          display: "4% left",
        },
        {
          label: "Condensate tank wax: 12 ft to 2 ft 6 in",
          value: 21,
          display: "21% left",
        },
      ],
      columns: ["Tank and contents", "Treatment", "Documented outcome"],
      cases: [
        {
          tank: "Two floating-roof crude tanks",
          detail: "about 95,000 bbl paraffinic sludge",
          treatment: "Para-Bac™, 21 days, 8 h/day circulation",
          outcome: "94,000 bbl of oil recovered. No man entry.",
        },
        {
          tank: "Floating-roof crude tank, 250 ft dia.",
          detail: "about 44,000 bbl, pour point 160°F",
          treatment: "Para-Bac™, three weeks circulation",
          outcome:
            "Pour point lowered below 60°F. Only 80 bbl of solids left for disposal.",
        },
        {
          tank: "Two pipeline company crude tanks",
          detail: "about 22,000 bbl paraffinic sludge",
          treatment: "Para-Bac™, 21 days, 8 h/day circulation",
          outcome:
            "BS&W requirement met. Oil delivered to the refinery with no losses or penalties.",
        },
        {
          tank: "European refinery emulsion",
          detail: "22,800 bbl: 60% oil, 32% water, 8% solids",
          treatment: "Para-Bac/S™ with M-1000H™, 24 days",
          outcome: "10,645 bbl of net oil recovered, with under 1% water.",
        },
        {
          tank: "Naphtha tank, 220 ft dia., Canada",
          detail: "iron oxide scale and residual product",
          treatment: "M-1000H™, 13 days, 10 h/day",
          outcome: "LEL fell to 0%.",
        },
        {
          tank: "Condensate tank, Alberta",
          detail: "96,000 bbl capacity, 12 ft of wax",
          treatment: "Para-Bac™ blend, three injections",
          outcome:
            "Wax at 2 ft 6 in after 49 days; 19,000 bbl of bottoms recovered and sold.",
        },
      ],
      source:
        "Source: Micro-Bac International case studies. Results vary with tank and sludge, so every Tam project begins with sampling and a treatability test.",
    },
    operators: {
      eyebrow: "06 · A technology trusted worldwide",
      heading: "Global operators",
      body: "For more than 26 years, the company behind this technology has served national and international oil companies across the Americas, Europe, Asia and the Middle East. The operators below are among them.",
      regions: [
        { region: "Middle East", names: ["Kuwait Oil Company"] },
        {
          region: "North America",
          names: [
            "ExxonMobil",
            "Chevron",
            "ConocoPhillips",
            "Texaco",
            "Marathon Oil",
            "Devon",
            "Pioneer",
            "Concho",
          ],
        },
        { region: "Latin America", names: ["PDVSA", "Pemex", "Petrobras"] },
        {
          region: "Europe and Russia",
          names: ["BP (British Petroleum)", "Repsol", "Lukoil"],
        },
        {
          region: "Asia",
          names: ["Petronas", "China’s national oil company"],
        },
      ],
      disclaimer:
        "Company names are listed for reference only and remain the property of their owners. The list reflects past client relationships of the company that developed the technology and does not imply endorsement of Tam Oil & Gas Services.",
      site: {
        heading: "How we work on your site",
        items: [
          {
            title: "Client rules first",
            body: "We work under your permit-to-work system and site HSE requirements.",
          },
          {
            title: "Risk assessed in advance",
            body: "A job safety analysis and method statement precede mobilisation.",
          },
          {
            title: "Atmosphere monitored",
            body: "LEL and vapour readings are logged throughout treatment.",
          },
          {
            title: "Agreed treatment plan",
            body: "Dosage, circulation and acceptance criteria are approved before work starts.",
          },
          {
            title: "Measured reporting",
            body: "Daily logs and a final report state volumes recovered and residue removed.",
          },
          {
            title: "Responsible disposal",
            body: "Remaining solids leave site only through approved, licensed routes.",
          },
        ],
      },
    },
    cta: {
      eyebrow: "The next step",
      heading: "Let us assess your tank.",
      body: "Send us the tank data and a sludge sample. We will return a treatability result, a treatment plan and a clear estimate of what can be recovered.",
      steps: [
        {
          title: "Sample",
          body: "We survey the tank and take representative sludge samples.",
        },
        {
          title: "Test",
          body: "The sludge is characterised and its treatability confirmed.",
        },
        {
          title: "Propose",
          body: "You receive a treatment plan, schedule and recovery estimate.",
        },
      ],
      primary: "Request a proposal",
      secondary: "Talk to our team",
    },
    trademarks:
      "Technology partner: Micro-Bac International, Inc., Round Rock, Texas, USA. Para-Bac™, M-1000H™ and Corroso-Bac™ are trademarks of Micro-Bac International, Inc. Technical data and case results are drawn from Micro-Bac International documentation.",
    reducedMotion: "Animation paused to respect your motion settings.",
  },
};

type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends readonly (infer U)[]
      ? Widen<U>[]
      : { [K in keyof T]: Widen<T[K]> };
export type Profile = Widen<typeof en>;

const ar: Profile = {
  glance: {
    label: "تم في سطور",
    stats: [
      {
        value: "+30",
        label: "عاماً من الخبرة القيادية في الإدارة وعمليات النفط والغاز",
      },
      {
        value: "صفر",
        label: "دخول للأماكن المغلقة أثناء معالجة الحمأة واسترداد النفط",
      },
      {
        value: "1979",
        label: "عام بدء مايكرو-باك تطوير منتجاتها الحيوية في تكساس",
      },
      {
        value: "3",
        label: "آفاق للنمو: قطر، والخليج العربي، وأسواق الشرق الأوسط المستهدفة",
      },
    ],
  },
  about: {
    eyebrow: "من نحن",
    heading: "نبذة عن الشركة",
    lead: "شركة تم لخدمات النفط والغاز ذ.م.م شركة قطرية، عضو مجموعة تم القابضة، ومقرها الدوحة.",
    paragraphs: [
      "نتخصص في صيانة وتنظيف خزانات النفط باستخدام التقنية الحيوية المتقدمة من شركة مايكرو-باك إنترناشيونال (Micro-Bac) الأمريكية.",
      "لدى ملاك الشركة وقيادتها خبرات لا تقل عن ثلاثين عاماً في الإدارة وفي الجوانب الفنية لقطاع النفط والغاز. وهذه الخبرة تحكم أسلوب عملنا: حوكمة منضبطة، وامتثال صارم، وفهم دقيق لما يحتاجه ملاك الخزانات في المنطقة: عمل آمن، وتوقف أقصر، ومنتج مُستردّ، ونفايات أقل.",
      "ويسير نموّنا وفق خطة استراتيجية محددة: ترسيخ الخدمة في دولة قطر، ثم التوسع في دول الخليج العربي، ثم الوصول إلى أسواق الشرق الأوسط المستهدفة.",
    ],
    pillars: [
      {
        title: "الحوكمة والامتثال",
        body: "مسؤوليات واضحة، وإجراءات موثّقة، والتزام بمتطلبات العميل والجهات التنظيمية.",
      },
      {
        title: "عمق فني",
        body: "عقود من الخبرة الميدانية في النفط والغاز وراء كل خطة معالجة.",
      },
      {
        title: "تقنية عالمية وتنفيذ محلي",
        body: "منتجات مايكرو-باك ودعمها المخبري، تُطبَّق من الدوحة.",
      },
      {
        title: "فهم السوق",
        body: "منهجية مبنية على أولويات المشغّلين في الخليج: السلامة واستمرارية التشغيل وسلامة الأصول.",
      },
    ],
  },
  strategy: {
    vision: {
      label: "الرؤية",
      body: "أن نكون الخيار الأول والموثوق في منطقة الخليج لصيانة الخزانات بأمان ونظافة مع استرداد القيمة.",
    },
    mission: {
      label: "الرسالة",
      body: "نعيد الخزانات إلى الخدمة بسرعة وأمان أكبر، بتقنية حيوية مثبتة وحوكمة منضبطة تستردّ المنتج وتحمي الأصول والأفراد وتقلل النفايات من مصدرها.",
    },
    valuesLabel: "القيم",
    values: [
      { title: "السلامة أولاً", body: "نُبقي الأفراد بعيداً عن الخطر." },
      { title: "النزاهة والامتثال", body: "نلتزم بالكامل ونُبلغ بصدق." },
      {
        title: "الإتقان الفني",
        body: "نختبر قبل أن نعالج، ونقيس ما نحققه.",
      },
      {
        title: "المسؤولية البيئية",
        body: "نستردّ الموارد ونقلل النفايات.",
      },
      { title: "الشراكة", body: "علاقات طويلة مع العملاء والشركاء." },
      { title: "المساءلة", body: "نتحمّل مسؤولية نتيجة كل مشروع نقبله." },
    ],
    objectivesLabel: "الأهداف الاستراتيجية",
    objectives: [
      "ترسيخ مكانة تم مرجعاً لخدمات التنظيف الحيوي للخزانات دون دخول الأفراد في دولة قطر.",
      "التوسع في دول الخليج العربي ثم في أسواق الشرق الأوسط المستهدفة.",
      "تعميق الشراكة مع مايكرو-باك وبناء تحالفات أخرى مع كبريات الشركات العالمية المزوّدة للتقنية.",
      "بناء الكفاءات الفنية المحلية عبر التدريب ونقل المعرفة.",
      "العمل بأعلى معايير السلامة والبيئة والحوكمة والامتثال، مع توثيق نتائج كل مشروع بالأرقام.",
    ],
  },
  partnership: {
    eyebrow: "الشريك التقني",
    heading: "شراكات النجاح العالمية",
    body: "أبرمت شركة تم لخدمات النفط والغاز اتفاقية تعاون وتقديم خدمات مع شركة مايكرو-باك إنترناشيونال الأمريكية ومقرها راوند روك بولاية تكساس، تطبّق بموجبها منتجات مايكرو-باك الحيوية وأساليبها في صيانة وتنظيف خزانات النفط، بأعلى المعايير العالمية للدقة والسلامة المهنية والحفاظ على الأصول والموارد دون هدر.",
    tam: {
      place: "الدوحة، قطر",
      name: "تم لخدمات النفط والغاز",
      body: "معاينة المواقع وأخذ العينات · هندسة المشاريع · الأطقم الميدانية والمعدات · إدارة الصحة والسلامة والبيئة · تقارير العملاء",
    },
    microbac: {
      place: "راوند روك، تكساس، الولايات المتحدة",
      name: "مايكرو-باك إنترناشيونال",
      body: "البحث والتطوير · تصنيع المزارع الميكروبية الحية · اختبارات قابلية المعالجة المخبرية · بروتوكولات التطبيق",
    },
    recordLabel: "مسيرة مايكرو-باك",
    record: [
      { year: "1979", body: "بدء تطوير المنتجات في تكساس" },
      { year: "1982", body: "تأسيس الشركة" },
      {
        year: "1986",
        body: "إطلاق Para-Bac™ لمكافحة البارافين والترسبات والتآكل",
      },
      {
        year: "1988",
        body: "منتج M-1000H™ للنفايات الخطرة والمعالجة الحيوية",
      },
      {
        year: "1991",
        body: "جائزة الابتكار الهندسي من مجلة Petroleum Engineer International",
      },
      {
        year: "1995",
        body: "اختيار Para-Bac™ أفضل تقنية جديدة من Hart’s Oil and Gas World",
      },
    ],
    standardsLabel: "ثلاثة معايير تلتزم بها كل سلالات مايكرو-باك",
    standards: [
      "غير مُمرِضة",
      "طبيعية وغير معدّلة وراثياً",
      "آمنة الاستخدام",
    ],
    bringsLabel: "ما تقدّمه الشراكة لعملائنا",
    brings: [
      {
        title: "منتجات مثبتة",
        body: "عائلتا Para-Bac™ وM-1000H™، المستخدمتان في الولايات المتحدة وكندا وأمريكا اللاتينية وآسيا وأوروبا.",
      },
      {
        title: "دعم مخبري",
        body: "تقييم مسبق لكل حمأة للتأكد من قابليتها للمعالجة قبل بدء العمل.",
      },
      {
        title: "بروتوكولات مجرّبة ميدانياً",
        body: "أساليب تطبيق صُقلت في مشاريع خزانات موثّقة منذ ثمانينيات القرن الماضي.",
      },
      {
        title: "مسؤولية محلية",
        body: "عقد واحد وفريق مسؤول واحد في الدوحة، من المعاينة حتى التقرير الختامي.",
      },
    ],
  },
  services: {
    eyebrow: "ماذا نقدّم",
    heading: "خدمات الشركة",
    scopeLabel: "النطاق الرئيسي",
    scope: "صيانة وتنظيف خزانات النفط باستخدام التقنيات الحيوية الحديثة",
    items: [
      {
        title: "التنظيف الحيوي للخزانات دون دخول الأفراد",
        body: "معالجة قيعان الخزانات في مكانها بمزارع Para-Bac™ والتدوير في دائرة مغلقة، للخزانات ذات الأسقف الثابتة والعائمة.",
      },
      {
        title: "معالجة الحمأة واسترداد النفط",
        body: "تسييل الحمأة البارافينية لتنفصل الهيدروكربونات المحتجزة وتعود إلى العميل نفطاً قابلاً للبيع.",
      },
      {
        title: "كسر المستحلبات ومعالجة الزيوت المرتجعة",
        body: "فصل حيوي للمستحلبات المستقرة من النفط والماء إلى نفط قابل للاسترداد وماء ومواد صلبة مترسبة.",
      },
      {
        title: "تجهيز الخزانات للفحص والإصلاح",
        body: "خفض الحمأة والمركبات العضوية المتطايرة وحدّ الانفجار الأدنى قبل الفحص الداخلي والطلاء والإصلاح، ليكون أي دخول أقصر وأكثر أماناً.",
      },
      {
        title: "أخذ العينات والتحليل ودراسات قابلية المعالجة",
        body: "أخذ عينات تمثيلية من الحمأة وتوصيفها وتصميم المعالجة، بدعم من مختبر مايكرو-باك.",
      },
      {
        title: "برامج الصيانة الوقائية للخزانات",
        body: "معالجات مجدولة تحدّ من تراكم الرواسب بين عمليات التنظيف وتحافظ على السعة التشغيلية.",
      },
      {
        title: "معالجة مرافق الإنتاج السطحية",
        body: "مكافحة البارافين والترسبات والتآكل في خطوط التدفق والفواصل والمعدات السطحية بعائلة Para-Bac™.",
      },
      {
        title: "معالجة الأحواض والبرك وتقليل النفايات",
        body: "معالجة حيوية لأحواض الحمأة وبرك التجميع والنفايات الزيتية بمنتجات M-1000H™ والمغذيات.",
      },
    ],
    assetsLabel: "الأصول التي نعالجها",
    assets: [
      "خزانات تخزين النفط الخام",
      "خزانات الزيوت المرتجعة وغير المطابقة",
      "خزانات المكثفات والنافثا",
      "خزانات مياه الاتزان",
      "التصاميم ذات الأسقف الثابتة والعائمة",
      "أحواض وبرك الحمأة",
    ],
    assetsNote:
      "ينطبق النهج الميكروبي نفسه على الحمأة البترولية وحمأة الزيوت النباتية والدهون الحيوانية.",
  },
  technology: {
    nav: "التقنية",
    metaTitle: "كيف تعمل التقنية — التنظيف الحيوي للخزانات | تم",
    hero: {
      eyebrow: "المواصفات الفنية",
      title: "كيف تعمل التقنية.",
      lede: "جانب كبير من الحمأة البارافينية في الخزانات نفط خام. مزارع حية تحرّره داخل دائرة مغلقة، والعاملون خارج الخزان.",
      jump: "شاهدها تعمل",
    },
    how: {
      eyebrow: "01 · العلم وراء التقنية",
      heading: "الإذابة الميكروبية لقاع الخزان",
      body: "الحمأة البارافينية في الخزانات جانب كبير منها نفط خام يحتجزه البارافين طويل السلاسل والمستحلبات المائية المستقرة. وتعمل كائنات Para-Bac الدقيقة على الاثنين معاً: تكسّر سلاسل الكربون في البارافين وتفكّ المستحلب، فينفصل النفط والماء والمواد الصلبة بفعل الجاذبية.",
      note: "رسم توضيحي، ليس بمقياس رسم",
      play: "إعادة التشغيل",
      layers: {
        bound: "حمأة: نفط وماء ومواد صلبة يربطها البارافين",
        oil: "نفط",
        sludge: "حمأة",
        water: "ماء",
        hydrocarbons: "هيدروكربونات",
        solids: "مواد صلبة",
      },
      stages: [
        {
          label: "قبل المعالجة",
          body: "طبقة قاع كثيفة غير قابلة للضخ (BS&W).",
        },
        {
          label: "1 · التحرير",
          body: "المواد الحيوية الخافضة للتوتر السطحي تحرّر النفط من الرمل والرواسب.",
        },
        {
          label: "2 · الانفصال",
          body: "المذيبات الحيوية تخفض اللزوجة، فيتجمّع النفط ويرتفع.",
        },
        {
          label: "3 · الفصل",
          body: "يُستهلك البارافين حيوياً، وتترسب ثلاث طبقات.",
        },
      ],
    },
    emulsion: {
      heading: "كسر المستحلبات",
      body: "تعمل الخلية البكتيرية جسراً مُبلِّلاً؛ فالقطرة التي تلامس سطحها تنتشر عليه وتندمج مع القطرة التالية، فينهار المستحلب ويتحول إلى نفط حرّ.",
      before: "خلية تربط بين قطرتين",
      after: "القطرات تندمج",
    },
    mechanisms: {
      heading: "ثلاث آليات للعمل",
      items: [
        {
          title: "إذابة البارافين",
          body: "عبر التكسير الأيضي المباشر للسلاسل.",
        },
        {
          title: "الأحماض الدهنية",
          body: "تُنتَج في مكانها وتعمل مذيبات ومشتتات للبارافين.",
        },
        {
          title: "المواد الحيوية الخافضة للتوتر السطحي",
          body: "تشتّت البارافين وتحرّر النفط من المواد الصلبة.",
        },
      ],
    },
    effect: {
      heading: "الأثر المُقاس على النفط",
      items: [
        "انخفاض نقطة الانسكاب ونقطة التعكّر",
        "لزوجة أقل",
        "كثافة API أعلى",
        "محتوى متطاير أكبر",
        "توتر بيني أقل",
      ],
      note: "يُظهر التحليل الكروماتوغرافي الغازي لعينات الخزانات المعالجة ارتفاع الأجزاء من C15 إلى C25 وانخفاض الأجزاء من C25 إلى C30+: الشمع الثقيل يتحول إلى نفط أخف وسائل.",
      chartLabel: "سلاسل البارافين الطويلة تتحول إلى أجزاء أقصر وأخف",
    },
    compare: {
      chemical: {
        title: "المعالجة الكيميائية",
        body: "المذيبات والمشتتات والمواد الخافضة للتوتر السطحي تحرّك الرواسب دون أن تغيّرها، وقد يتصلب البارافين مجدداً بعد زوال المادة الكيميائية.",
      },
      microbial: {
        title: "المعالجة الميكروبية",
        body: "المزارع الحية تقصّر سلاسل البارافين نفسها، وتواصل إنتاج المذيبات والمواد الخافضة للتوتر السطحي طوال نشاطها.",
      },
    },
    stages: {
      eyebrow: "02 · مراحل العمل",
      heading: "ست مراحل في كل مشروع",
      body: "يمرّ كل مشروع بالمراحل الست نفسها؛ فلا تُضاف أي جرعة قبل أخذ عينات الحمأة واختبارها، ولا يُعلن إنجاز العمل قبل قياس المعايير المتفق عليها.",
      loopLabel: "نظام التدوير النموذجي في دائرة مغلقة",
      note: "رسم توضيحي، ليس بمقياس رسم",
      labels: {
        dosing: "مزارع مايكرو-باك تُضاف مباشرة إلى الخزان",
        discharge: "التصريف: خط عودة بصمام",
        suction: "السحب",
        pump: "مضخة",
        crude: "نفط خام وماء",
        sludge: "حمأة (BS&W)",
        pumps:
          "قد تُستخدم عدة وصلات في الخزانات الكبيرة. استخدمت المشاريع المرجعية مضخات من 6 إلى 8 بوصات.",
      },
      items: [
        {
          title: "المعاينة وأخذ العينات",
          body: "تُسجَّل بيانات الخزان وعمق الحمأة وحجمها، وتؤخذ عينات تمثيلية أو مركّبة لأن الحمأة تختلف من موضع لآخر في قاع الخزان.",
        },
        {
          title: "التوصيف المخبري للحمأة",
          body: "تجزئة بالمذيبات، وتوزيع الهيدروكربونات حسب الوزن الجزيئي، ومحتوى البارافين بالتحليل الكروماتوغرافي الغازي. وتُؤكَّد قابلية المعالجة قبل الالتزام.",
        },
        {
          title: "تصميم برنامج المعالجة",
          body: "مزيج المنتجات والجرعات، وسائل الحمل، وتخطيط المضخات والأنابيب، وجدول التدوير، ومعايير القبول مثل BS&W ونقطة الانسكاب.",
        },
        {
          title: "التجهيز وإضافة المزارع الحيوية",
          body: "يُخفَّض حجم الخزان، وتُوصل المضخات بالفتحات القائمة، ويُضاف سائل الحمل ليتمكن القاع من الدوران، ثم تُضاف المزارع مباشرة إلى الخزان.",
        },
        {
          title: "التدوير المتقطع وانفصال النفط",
          body: "دورات متقطعة تنشر المزارع في الحمأة، ثم تتيح للنفط الانفصال أثناء السكون. وتتابع العينات وقراءات الغاز التقدم حتى تتحقق المعايير.",
        },
        {
          title: "الاسترداد والتسليم",
          body: "يُضخ النفط والماء والمواد الصلبة طبقاتٍ منفصلة إلى مسارات استردادها، وتُزال البقايا ويُسلَّم الخزان مع تقرير بالنتائج.",
        },
      ],
      params: [
        {
          value: "12 ساعة تشغيل · 12 ساعة سكون",
          label: "دورة التدوير والسكون النموذجية",
        },
        {
          value: "10 إلى 14 يوماً",
          label: "البرنامج النموذجي؛ ونحو ثلاثة أسابيع للخزانات الكبيرة للنفط الخام",
        },
        {
          value: "من بوصة إلى قدم",
          label: "من النفط الحامل فوق الحمأة، أو نحو بوصة واحدة من الماء الحامل",
        },
        {
          value: "النفط وسيلةً للحمل",
          label: "الخيار المفضّل عندما يكون الهدف استرداد النفط من الحمأة",
        },
      ],
      circulating: "تدوير",
      resting: "سكون",
    },
    product: {
      eyebrow: "03 · بيانات المنتج",
      heading: "بيانات المنتج والمناولة والتخزين",
      sdsTitle: "مزرعة معالجة البارافين ER-P200",
      sdsNote: "مقتطف من صحيفة بيانات سلامة المنتج",
      left: [
        [
          "الاستخدام",
          "البارافين في آبار النفط والمعدات السطحية: خطوط التدفق والخزانات والفواصل",
        ],
        [
          "التركيب",
          "كائنات دقيقة طبيعية غير مُمرِضة في سائل مغذٍّ ملحي",
        ],
        ["المخاطر", "لا مكوّنات خطرة (TSCA 40 CFR 710.4b)"],
        ["المظهر", "سائل عكر بلون رمادي مائل إلى البني، برائحة عضوية"],
        ["القابلية للاشتعال", "غير قابل للاشتعال أو الانفجار"],
        ["الثبات", "مستقر؛ دون نواتج ثانوية خطرة"],
        ["الوقاية", "يُنصح بالقفازات ونظارات السلامة"],
      ],
      right: [
        ["الأس الهيدروجيني", "6 إلى 8"],
        ["الكثافة النسبية", "1.04"],
        ["اللزوجة", "0.982 سنتيبويز عند 21°م (70°ف)"],
        ["الذوبانية", "قابل للذوبان في الماء بالكامل"],
        ["نقطة الغليان", "100°م (212°ف)"],
        ["نقطة الانصهار", "0°م (32°ف)"],
        ["التخزين", "في العبوة الأصلية المغلقة، من 4°م إلى 32°م"],
      ],
      familiesLabel: "مجموعات المنتجات",
      families: [
        {
          name: "Para-Bac™",
          body: "مكافحة البارافين وتنظيف قيعان الخزانات وكسر المستحلبات. مستخدم ميدانياً منذ 1986.",
        },
        {
          name: "Para-Bac/S™",
          body: "يُستخدم مع M-1000H™ على مستحلبات النفط والماء عندما تشير الاختبارات المخبرية إلى ذلك.",
        },
        {
          name: "M-1000H™",
          body: "تقليل الحمأة والنفايات، ومعالجة الأحواض والبرك، والمعالجة الحيوية، مع مغذيات مايكرو-باك.",
        },
        {
          name: "Corroso-Bac™",
          body: "مكافحة الترسبات والتآكل بالاستخلاب والتشتيت وتكوين طبقة واقية على الأسطح.",
        },
      ],
      storageLabel: "نطاق درجات حرارة التخزين",
      storage: {
        short: "قصير المدى، أسبوع أو أقل: من 4°م إلى 40°م",
        long: "طويل المدى: من 13°م إلى 35°م",
        avoid: "تجنّب ما فوق 43°م",
        freeze: "0°م: لا تجمّد",
        note: "تتجاوز درجات الحرارة في صيف الخليج الحد الأعلى، لذا يلزم التخزين والنقل في أماكن مظللة ومتحكم بحرارتها.",
      },
      always: {
        title: "احرص دائماً على",
        items: [
          "إبقاء العبوات مغلقة ونظيفة وبعيدة عن أشعة الشمس المباشرة.",
          "الضخ بمضخة تمعجية أولاً، ثم بمضخة مكبسية أو غشائية أو لولبية.",
          "إضافة المزارع أولاً ثم المغذيات بعدها.",
          "استخدام أي مزيج من المنتجات خلال 24 ساعة.",
        ],
      },
      never: {
        title: "تجنّب دائماً",
        items: [
          "تجميد المنتج أو تخفيفه قبل نقطة الاستخدام.",
          "خلطه بالديزل أو الكيروسين أو البنزين أو المشتقات المكررة الخفيفة الأخرى أو كيماويات الحقول.",
          "تعريضه للمبيدات الحيوية؛ إذ يُعلَّق حقنها أثناء المعالجة.",
          "استخدام مضخات الدفاعات عالية السرعة، لأن القص والتكهف يتلفان الخلايا.",
        ],
      },
      summary:
        "مزارع بكتيرية حية جاهزة للاستخدام، مائية القاعدة وغير قابلة للاشتعال. تُحفظ بعيداً عن الشمس المباشرة والتجمّد والمبيدات الحيوية والمشتقات البترولية الخفيفة.",
    },
    advantages: {
      eyebrow: "04 · لماذا التنظيف الحيوي",
      heading: "مميزات استخدام التقنية",
      items: [
        {
          title: "دون دخول الأفراد إلى الخزان",
          body: "لا دخول إلى الأماكن المغلقة أثناء المعالجة واسترداد النفط.",
        },
        {
          title: "نفط مُستردّ قابل للبيع",
          body: "النفط المحتجز في الحمأة يعود منتجاً.",
        },
        {
          title: "تقليل النفايات وتكاليف التخلص منها",
          body: "حمأة أقل بكثير للنقل والتخلص.",
        },
        {
          title: "خفض الأبخرة وحدّ الانفجار الأدنى",
          body: "تنخفض قراءات الأبخرة وحدّ الانفجار أثناء المعالجة.",
        },
        {
          title: "توقف أقصر عن الخدمة",
          body: "تستغرق المعالجة أسابيع، فتعود الخزانات إلى الخدمة أسرع.",
        },
        { title: "تكلفة منافسة", body: "منافسة للطرق التقليدية." },
        {
          title: "الحفاظ على سلامة الأصل",
          body: "لا قصّ لألواح جدار الخزان.",
        },
        {
          title: "عمالة ومعدات محدودة",
          body: "طاقم صغير ومضخات تدوير وأنابيب مؤقتة.",
        },
        {
          title: "منتج طبيعي وآمن",
          body: "مزارع مائية القاعدة وغير قابلة للاشتعال.",
        },
      ],
      compareLabel: "مقارنة بالطريقة التقليدية",
      columns: [
        "الجانب",
        "التنظيف التقليدي اليدوي أو الميكانيكي",
        "طريقة تم الحيوية",
      ],
      rows: [
        [
          "الأفراد",
          "أطقم تعمل داخل مكان مغلق",
          "لا دخول أثناء المعالجة والاسترداد",
        ],
        [
          "جدار الخزان",
          "قد تُقصّ ألواح الأبواب ثم تُصلَح",
          "تُستخدم الفتحات القائمة وفتحات الدخول",
        ],
        [
          "الحمأة",
          "تُنقل ويُتخلّص منها كنفايات، وتضيع قيمة النفط",
          "تتحول إلى نفط قابل للاسترداد مع بقايا صلبة قليلة",
        ],
        [
          "أجواء الخزان",
          "تنطلق الأبخرة عند تحريك الحمأة",
          "تنخفض الأبخرة وحدّ الانفجار أثناء المعالجة",
        ],
        [
          "مدة التوقف عن الخدمة",
          "شهور للخزانات الكبيرة",
          "عادةً دورة معالجة من بضعة أسابيع",
        ],
      ],
      closing:
        "تحوّل التقنية الحيوية تنظيف الخزان من بند تكلفة ومخاطرة إلى فرصة لاسترداد القيمة: لا دخول للأفراد، وحمأة تتحول إلى نفط قابل للبيع، ونفايات أقل، وتوقف أقصر.",
    },
    results: {
      eyebrow: "05 · سجل مشاريع مايكرو-باك",
      heading: "نتائج مثبتة ميدانياً",
      stats: [
        {
          value: 94000,
          suffix: " برميل",
          label: "من النفط المُستردّ من نحو 95,000 برميل من حمأة النفط الخام",
        },
        {
          value: 68,
          suffix: "%",
          label: "من النفط المستحلب مُستردّ، بنسبة ماء أقل من 1%",
        },
        {
          value: 65,
          suffix: " يوماً",
          label: "بدلاً من أكثر من سبعة أشهر لبرنامج خزان واحد",
        },
        {
          value: 0,
          suffix: "% LEL",
          label: "قراءة الأبخرة في اليوم الثالث عشر في خزان نافثا بقطر 220 قدماً",
        },
      ],
      lelLabel: "حدّ الانفجار الأدنى أثناء المعالجة",
      lelNote: "قراءة الأبخرة كنسبة من LEL، خزان نافثا، كندا",
      lel: [
        { day: "اليوم 5", value: 65 },
        { day: "اليوم 10", value: 30 },
        { day: "اليوم 13", value: 0 },
      ],
      residueLabel: "ما تبقّى بعد المعالجة",
      residueNote: "البقايا كنسبة من الحجم أو المستوى الابتدائي",
      residues: [
        {
          label: "خزان نفط خام: من 44,000 برميل حمأة إلى 80 برميل مواد صلبة",
          value: 0.2,
          display: "تبقّى 0.2%",
        },
        {
          label: "حمأة شمعية: من 750 برميلاً إلى 30 برميل بقايا",
          value: 4,
          display: "تبقّى 4%",
        },
        {
          label: "شمع خزان مكثفات: من 12 قدماً إلى قدمين و6 بوصات",
          value: 21,
          display: "تبقّى 21%",
        },
      ],
      columns: ["الخزان ومحتوياته", "المعالجة", "النتيجة الموثّقة"],
      cases: [
        {
          tank: "خزانان للنفط الخام بسقف عائم",
          detail: "نحو 95,000 برميل من الحمأة البارافينية",
          treatment: "Para-Bac™، 21 يوماً، تدوير 8 ساعات يومياً",
          outcome: "استرداد 94,000 برميل من النفط، دون دخول الأفراد.",
        },
        {
          tank: "خزان نفط خام بسقف عائم، قطر 250 قدماً",
          detail: "نحو 44,000 برميل، نقطة انسكاب 160°ف",
          treatment: "Para-Bac™، تدوير ثلاثة أسابيع",
          outcome:
            "انخفضت نقطة الانسكاب إلى ما دون 60°ف، ولم يتبقَّ سوى 80 برميلاً من المواد الصلبة للتخلص منها.",
        },
        {
          tank: "خزانا نفط خام لشركة خطوط أنابيب",
          detail: "نحو 22,000 برميل من الحمأة البارافينية",
          treatment: "Para-Bac™، 21 يوماً، تدوير 8 ساعات يومياً",
          outcome:
            "تحقق شرط BS&W، وسُلّم النفط إلى المصفاة دون خسائر أو غرامات.",
        },
        {
          tank: "مستحلب في مصفاة أوروبية",
          detail: "22,800 برميل: 60% نفط، 32% ماء، 8% مواد صلبة",
          treatment: "Para-Bac/S™ مع M-1000H™، 24 يوماً",
          outcome: "استرداد 10,645 برميلاً من النفط الصافي، بنسبة ماء أقل من 1%.",
        },
        {
          tank: "خزان نافثا، قطر 220 قدماً، كندا",
          detail: "ترسبات أكسيد الحديد وبقايا المنتج",
          treatment: "M-1000H™، 13 يوماً، 10 ساعات يومياً",
          outcome: "انخفض حدّ الانفجار الأدنى إلى 0%.",
        },
        {
          tank: "خزان مكثفات، ألبرتا",
          detail: "سعة 96,000 برميل، و12 قدماً من الشمع",
          treatment: "مزيج Para-Bac™، ثلاث حقنات",
          outcome:
            "انخفض الشمع إلى قدمين و6 بوصات بعد 49 يوماً، واستُردّ 19,000 برميل من الرواسب وبيعت.",
        },
      ],
      source:
        "المصدر: دراسات حالة من مايكرو-باك إنترناشيونال. تختلف النتائج باختلاف الخزان والحمأة، ولذلك يبدأ كل مشروع لدى تم بأخذ العينات واختبار قابلية المعالجة.",
    },
    operators: {
      eyebrow: "06 · تقنية موثوقة عالمياً",
      heading: "شركات عالمية كبرى تستخدم هذه التقنية",
      body: "على مدى أكثر من 26 عاماً، خدمت الشركة المطوِّرة لهذه التقنية شركات نفط وطنية وعالمية في الأمريكتين وأوروبا وآسيا والشرق الأوسط، ومن بينها الشركات الآتية.",
      regions: [
        { region: "الشرق الأوسط", names: ["Kuwait Oil Company"] },
        {
          region: "أمريكا الشمالية",
          names: [
            "ExxonMobil",
            "Chevron",
            "ConocoPhillips",
            "Texaco",
            "Marathon Oil",
            "Devon",
            "Pioneer",
            "Concho",
          ],
        },
        { region: "أمريكا اللاتينية", names: ["PDVSA", "Pemex", "Petrobras"] },
        {
          region: "أوروبا وروسيا",
          names: ["BP (British Petroleum)", "Repsol", "Lukoil"],
        },
        {
          region: "آسيا",
          names: ["Petronas", "شركة النفط الوطنية الصينية"],
        },
      ],
      disclaimer:
        "أسماء الشركات مذكورة للإشارة فقط وتبقى ملكاً لأصحابها. تعكس القائمة علاقات سابقة للشركة المطوِّرة للتقنية مع عملائها، ولا تعني تأييداً لشركة تم لخدمات النفط والغاز.",
      site: {
        heading: "الحوكمة والامتثال والسلامة في موقع العميل",
        items: [
          {
            title: "قواعد العميل أولاً",
            body: "نعمل وفق نظام تصاريح العمل ومتطلبات الصحة والسلامة والبيئة في موقعكم.",
          },
          {
            title: "تقييم مسبق للمخاطر",
            body: "يسبق التعبئةَ تحليلُ سلامة العمل وبيانُ طريقة التنفيذ.",
          },
          {
            title: "مراقبة أجواء الخزان",
            body: "تُسجَّل قراءات حدّ الانفجار والأبخرة طوال المعالجة.",
          },
          {
            title: "خطة معالجة معتمدة",
            body: "تُعتمد الجرعات والتدوير ومعايير القبول قبل بدء العمل.",
          },
          {
            title: "تقارير بالأرقام",
            body: "سجلات يومية وتقرير ختامي يوثّق الكميات المستردة والبقايا المُزالة.",
          },
          {
            title: "تخلّص مسؤول",
            body: "لا تغادر المواد الصلبة المتبقية الموقع إلا عبر قنوات معتمدة ومرخّصة.",
          },
        ],
      },
    },
    cta: {
      eyebrow: "الخطوة التالية",
      heading: "دعونا نقيّم خزانكم.",
      body: "أرسلوا لنا بيانات الخزان وعينة من الحمأة، ونوافيكم بنتيجة اختبار قابلية المعالجة وخطة المعالجة وتقدير واضح لما يمكن استرداده.",
      steps: [
        {
          title: "العينة",
          body: "نعاين الخزان ونأخذ عينات تمثيلية من الحمأة.",
        },
        {
          title: "الاختبار",
          body: "نوصّف الحمأة ونتأكد من قابليتها للمعالجة.",
        },
        {
          title: "العرض",
          body: "تتسلمون خطة المعالجة والجدول الزمني وتقدير الاسترداد.",
        },
      ],
      primary: "اطلب عرضاً فنياً",
      secondary: "تحدّث إلى فريقنا",
    },
    trademarks:
      "الشريك التقني: مايكرو-باك إنترناشيونال، راوند روك، تكساس، الولايات المتحدة. Para-Bac™ وM-1000H™ وCorroso-Bac™ علامات تجارية مملوكة لشركة مايكرو-باك إنترناشيونال. البيانات الفنية ونتائج الحالات مأخوذة من وثائق مايكرو-باك إنترناشيونال.",
    reducedMotion: "أُوقفت الحركة احتراماً لإعدادات الحركة لديك.",
  },
};

export function getProfile(locale: Locale): Profile {
  return locale === "ar" ? ar : en;
}
