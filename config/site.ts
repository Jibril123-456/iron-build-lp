export type CTA = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  trackingEvent?: string;
  /** When set, clicking the CTA opens the form modal with this id instead of navigating to href. */
  formId?: string;
};

export type SectionKey =
  | "hero"
  | "socialProof"
  | "problem"
  | "solution"
  | "features"
  | "testimonials"
  | "pricing"
  | "faq"
  | "finalCta"
  | "footer";

export type IconKey =
  | "spark"
  | "target"
  | "rocket"
  | "shield"
  | "clock"
  | "check"
  | "chart"
  | "compass"
  | "lock"
  | "zap";

export type FormQuestion =
  | {
      id: string;
      type: "text";
      label: string;
      placeholder?: string;
      required?: boolean;
    }
  | {
      id: string;
      type: "email";
      label: string;
      placeholder?: string;
      required?: boolean;
    }
  | {
      id: string;
      type: "textarea";
      label: string;
      placeholder?: string;
      required?: boolean;
      maxLength?: number;
    }
  | {
      id: string;
      type: "choice";
      label: string;
      required?: boolean;
      options: { value: string; label: string; disqualifies?: boolean }[];
    };

export type FormDefinition = {
  id: string;
  intro?: { headline: string; subheadline?: string };
  questions: FormQuestion[];
  unqualifiedScreen: { headline: string; description: string };
  successScreen: {
    kind: "calcom";
    calcomLink: string;
    namespace: string;
    headline?: string;
    subheadline?: string;
  };
  redirectAfterBooking?: string;
};

export type SiteConfig = {
  meta: {
    title: string;
    description: string;
    siteUrl: string;
    ogImage: string;
    locale: string;
    favicon: string;
    keywords: string[];
    jsonLd: Record<string, unknown> | null;
  };
  theme: {
    colors: {
      background: string;
      foreground: string;
      muted: string;
      border: string;
      card: string;
      primary: string;
      primaryForeground: string;
      accent: string;
      accentForeground: string;
    };
    fonts: {
      display: string;
      body: string;
    };
    radius: "sm" | "md" | "lg" | "xl";
  };
  tracking: {
    fbPixelId: string;
    ga4Id: string;
    scrollDepths: number[];
    timeMilestones: number[];
    customEvents: { name: string; description: string }[];
  };
  links: {
    primaryCta: string;
    checkout: string;
  };
  forms: {
    qualification: FormDefinition;
  };
  marquee: {
    enabled: boolean;
    items: string[];
  };
  sections: {
    hero: HeroSection;
    socialProof: SocialProofSection;
    problem: ProblemSection;
    solution: SolutionSection;
    features: FeaturesSection;
    testimonials: TestimonialsSection;
    pricing: PricingSection;
    faq: FaqSection;
    finalCta: FinalCtaSection;
    footer: FooterSection;
  };
};

export type HeroSection = {
  enabled: boolean;
  badge?: string;
  liveIndicator?: string;
  headline: string;
  headlineHighlight?: string;
  subheadline: string;
  primaryCta: CTA;
  secondaryCta?: CTA;
  visual?:
    | { kind: "none" }
    | { kind: "image"; src: string; alt: string }
    | { kind: "video"; src: string; poster?: string }
    | { kind: "embed"; html: string }
    | { kind: "beforeafter"; before: string; after: string };
  trustLine?: string;
};

export type SocialProofSection = {
  enabled: boolean;
  caption: string;
  logos: { name: string; src?: string }[];
  stats: { value: string; label: string }[];
  shortQuotes: { quote: string; author: string }[];
};

export type ProblemSection = {
  enabled: boolean;
  dark?: boolean;
  eyebrow: string;
  headline: string;
  description: string;
  pains: { title: string; description: string }[];
};

export type SolutionSection = {
  enabled: boolean;
  dark?: boolean;
  eyebrow: string;
  headline: string;
  description: string;
  bullets: string[];
  image?: { src: string; alt: string };
};

export type FeaturesSection = {
  enabled: boolean;
  dark?: boolean;
  eyebrow: string;
  headline: string;
  description: string;
  features: { icon: IconKey; title: string; description: string }[];
};

export type TestimonialsSection = {
  enabled: boolean;
  eyebrow: string;
  headline: string;
  testimonials: {
    quote: string;
    name: string;
    role: string;
    photo?: string;
    result?: string;
  }[];
};

export type PricingSection = {
  enabled: boolean;
  eyebrow: string;
  headline: string;
  description: string;
  plans: {
    name: string;
    price: string;
    originalPrice?: string;
    period?: string;
    description?: string;
    features: string[];
    cta: CTA;
    highlighted?: boolean;
    badge?: string;
    orderBump?: { label: string; price: string; description: string };
  }[];
  guarantee?: string;
};

export type FaqSection = {
  enabled: boolean;
  dark?: boolean;
  eyebrow: string;
  headline: string;
  items: { question: string; answer: string }[];
};

export type FinalCtaSection = {
  enabled: boolean;
  dark?: boolean;
  headline: string;
  subheadline: string;
  cta: CTA;
  microTrust?: string;
};

export type FooterSection = {
  enabled: boolean;
  dark?: boolean;
  brand: string;
  tagline?: string;
  links: { label: string; href: string }[];
  socials: { platform: "x" | "instagram" | "youtube" | "linkedin" | "tiktok"; href: string }[];
  legal: string;
};

const CHECKOUT_URL = process.env.NEXT_PUBLIC_CHECKOUT_URL || "#checkout";

export const siteConfig: SiteConfig = {
  meta: {
    title: "Iron Build™ — De Skinny à Solide en 30 jours",
    description:
      "Le seul programme conçu pour les métabolismes rapides. +3 à +5 kg de muscle visible en 30 jours. 3 200+ skinny transformés. Garantie remboursement 30 jours.",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    ogImage: "/og.png",
    locale: "fr_FR",
    favicon: "/favicon.ico",
    keywords: [
      "prise de masse skinny",
      "programme fitness étudiant",
      "ectomorphe muscu",
      "maigre prendre du muscle",
      "Iron Build",
      "calories invisibles",
      "programme maison sans salle",
    ],
    jsonLd: null,
  },
  theme: {
    colors: {
      background: "#0E0E10",
      foreground: "#F5F2EC",
      muted: "#A8A29A",
      border: "#2E2E33",
      card: "#18181B",
      primary: "#D85A30",
      primaryForeground: "#F5F2EC",
      accent: "#D85A30",
      accentForeground: "#F5F2EC",
    },
    fonts: {
      display: "Barlow Condensed",
      body: "Syne",
    },
    radius: "sm",
  },
  tracking: {
    fbPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID || "",
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID || "",
    scrollDepths: [25, 50, 75, 100],
    timeMilestones: [15, 30, 60, 120],
    customEvents: [
      { name: "checkout_click", description: "Clic sur le CTA principal (accès programme 27€)" },
      { name: "order_bump_view", description: "Section Pricing visible (order bump en vue)" },
    ],
  },
  links: {
    primaryCta: CHECKOUT_URL,
    checkout: CHECKOUT_URL,
  },
  forms: {
    qualification: {
      id: "qualification",
      intro: {
        headline: "Quelques questions rapides.",
        subheadline: "Pour s'assurer qu'Iron Build est adapté à ton profil.",
      },
      questions: [
        {
          id: "name",
          type: "text",
          label: "Comment tu t'appelles ?",
          placeholder: "Ton prénom",
          required: true,
        },
        {
          id: "duration",
          type: "text",
          label: "Depuis combien de temps tu t'entraînes sans résultats visibles ?",
          placeholder: "Ex : 8 mois, 2 ans...",
          required: true,
        },
        {
          id: "email",
          type: "email",
          label: "Ton email",
          placeholder: "ton@email.com",
          required: true,
        },
      ],
      unqualifiedScreen: {
        headline: "Iron Build n'est pas fait pour toi.",
        description:
          "Le programme est conçu pour ceux qui s'entraînent déjà mais stagnent. Reviens quand tu auras commencé.",
      },
      successScreen: {
        kind: "calcom",
        calcomLink: "ironbuild/discovery",
        namespace: "qualification",
        headline: "C'est bon.",
        subheadline: "Tu reçois un email avec ton accès sous 2 minutes.",
      },
    },
  },
  marquee: {
    enabled: true,
    items: [
      "3 200+ skinny transformés",
      "+4,8 kg en 30 jours",
      "Garantie remboursement 30 jours",
      "Version salle + maison",
      "Prix étudiant 27€",
      "Méthode calories invisibles",
      "Accès à vie inclus",
    ],
  },
  sections: {
    hero: {
      enabled: true,
      badge: "■ 3 200+ skinny transformés",
      headline: "De Skinny à Solide en 30 jours — même si t'as jamais réussi à prendre du muscle",
      headlineHighlight: "30 jours",
      subheadline:
        "T'as mangé. T'as soulevé. T'as rien vu. C'est pas toi. C'est la méthode.",
      primaryCta: {
        label: "Accéder — 27€ →",
        href: CHECKOUT_URL,
        variant: "primary",
        trackingEvent: "InitiateCheckout",
      },
      secondaryCta: {
        label: "Voir les résultats →",
        href: "#testimonials",
        variant: "ghost",
      },
      visual: {
        kind: "beforeafter",
        before: "/images/avant.jpg",
        after: "/images/apres.jpg",
      },
      trustLine: "Garantie 30 jours · Accès immédiat · Sans salle",
    },
    socialProof: {
      enabled: true,
      caption: "Rejoins 3 200+ skinny déjà transformés",
      logos: [],
      stats: [
        { value: "3 200+", label: "Skinny transformés" },
        { value: "+4,8 kg", label: "En 30 jours en moyenne" },
        { value: "30 jours", label: "Garantie remboursement" },
        { value: "27€", label: "Prix unique étudiant" },
      ],
      shortQuotes: [
        {
          quote: "C'était pas ma génétique. Je mangeais trop peu. C'est tout.",
          author: "Lucas M. · +4,8 kg en 30 j",
        },
        {
          quote: "+6,2 kg en 45 j. J'avais cramé 400€ en coaching avant ça.",
          author: "Romain G. · 23 ans · Paris",
        },
      ],
    },
    problem: {
      enabled: true,
      dark: true,
      eyebrow: "Le vrai problème",
      headline: "T'es pas skinny pour la vie. T'as juste la mauvaise méthode.",
      description:
        "T'as beau manger. T'as beau t'entraîner. Ça stagne. Pas ta faute. La méthode est fausse.",
      pains: [
        {
          title: "\"Je mange beaucoup et grossis pas\"",
          description:
            "Tu manges 500 kcal sous ton besoin. Chaque jour. Ton corps brûle tout. Aucun programme générique te le dit.",
        },
        {
          title: "18 mois de salle. Même corps.",
          description:
            "T'as payé. T'es allé. T'as suivi. Et ton miroir dit la même chose qu'au premier jour. C'est pas toi. C'est la méthode.",
        },
        {
          title: "Les autres grossissent. Toi non.",
          description:
            "Dans ta promo, ils progressent. Toi non. Mêmes conseils. Même effort. Frustrant. Et explicable.",
        },
        {
          title: "Tu commences à croire à ta génétique.",
          description:
            "Logique après des mois sans résultat. Mais c'est faux. La génétique fixe le plafond. Pas le sol.",
        },
      ],
    },
    solution: {
      enabled: true,
      dark: false,
      eyebrow: "La méthode Iron Build",
      headline: "Une approche 100% calibrée pour les métabolismes rapides.",
      description:
        "Chaque calorie calculée pour TON corps. Chaque séance pensée pour ton emploi du temps. Pas une moyenne. TON profil skinny.",
      bullets: [
        "Calories calculées pour TON métabolisme — pas une moyenne",
        "+990 kcal/jour sans manger plus — la technique invisible",
        "Version salle et maison — tu commences là où t'es",
        "Résultats en 30 jours — ou remboursé. Zéro question.",
      ],
    },
    features: {
      enabled: true,
      dark: true,
      eyebrow: "Ce que tu obtiens",
      headline: "Tout ce qu'il faut. Rien de superflu.",
      description:
        "Programme complet, accès immédiat après paiement. Tu télécharges, tu commences aujourd'hui.",
      features: [
        {
          icon: "target",
          title: "Programme split 3/4/5 jours",
          description:
            "3 variations selon ton emploi du temps et ton niveau. Version salle ET version maison avec sac lesté — aucun abonnement requis.",
        },
        {
          icon: "chart",
          title: "Plan alimentaire + calculateur calories",
          description:
            "Formule de calcul précise pour TON métabolisme. Tu sais exactement quoi manger, en quelle quantité, et à quel moment.",
        },
        {
          icon: "spark",
          title: "Technique des calories invisibles",
          description:
            "+990 kcal par jour sans augmenter le volume de nourriture. La technique skinny que 99% des programmes ignorent — et qui change tout.",
        },
        {
          icon: "rocket",
          title: "Tracker de progression 8 semaines",
          description:
            "Tableau de bord simple : poids, mensurations, photos toutes les 2 semaines. Tu vois ta progression — ça change tout pour la motivation.",
        },
        {
          icon: "zap",
          title: "Bonus : Nutrition Express (add-on 9€)",
          description:
            "30 recettes rapides + 15 shakes hypercaloriques. Meal prep du dimanche en 1h, liste de courses à 30€/semaine. Disponible en option lors de l'achat.",
        },
        {
          icon: "shield",
          title: "Accès à vie + mises à jour gratuites",
          description:
            "Tu achètes une fois, tu gardes pour toujours. Toutes les futures versions du programme sont incluses — sans supplément.",
        },
      ],
    },
    testimonials: {
      enabled: true,
      eyebrow: "Ils ont appliqué la méthode",
      headline: "Leurs mots. Pas les nôtres.",
      testimonials: [
        {
          quote:
            "Sérieux j'avais abandonné. Un an et demi de salle. Rien. Semaine 4 avec Iron Build, mes potes me demandaient ce que je faisais. +4,8 kg. C'était pas ma génétique. Je mangeais 500 kcal trop peu chaque jour.",
          name: "Lucas M.",
          role: "21 ans · BUT Informatique · Lyon",
          photo: "/images/avatar-lucas.svg",
          result: "+4,8 kg en 30 jours",
        },
        {
          quote:
            "J'ai cramé 400€ en coaching. Rien. Iron Build m'a montré pourquoi en 5 minutes. La technique des calories invisibles. 45 jours plus tard : +6,2 kg. Frère j'aurais dû commencer là.",
          name: "Romain G.",
          role: "23 ans · Licence Droit · Paris",
          photo: "/images/avatar-romain.svg",
          result: "+6,2 kg en 45 jours",
        },
        {
          quote:
            "Même pas de salle. Version maison. Barre de traction sur la porte, sac à dos lesté. +5,1 kg en 5 semaines. La salle c'est pas le problème. C'est le plan alimentaire qui change tout.",
          name: "Antoine F.",
          role: "20 ans · IUT Informatique · Bordeaux",
          photo: "/images/avatar-antoine.svg",
          result: "+5,1 kg en 35 jours",
        },
        {
          quote:
            "L2 médecine. 50h de cours. Zéro temps. Iron Build c'est 45 min de séance et 1h de meal prep le dimanche. Rien de plus. +3,4 kg en 30 jours. Système simple. Ça marche.",
          name: "Thomas K.",
          role: "22 ans · L2 Médecine · Strasbourg",
          photo: "/images/avatar-thomas.svg",
          result: "+3,4 kg en 30 jours",
        },
        {
          quote:
            "Ma famille dit depuis toujours 'c'est génétique'. J'y croyais. Semaine 4 : +4,2 kg. Je me regarde dans le miroir. Je kiffe enfin. Je mangeais 700 kcal trop peu. C'est tout.",
          name: "Nathan B.",
          role: "24 ans · Master Marketing · Nantes",
          photo: "/images/avatar-nathan.svg",
          result: "+4,2 kg en 28 jours",
        },
        {
          quote:
            "Je suis désorganisé au max. Iron Build c'est une checklist. 4 cases le soir. 1h le dimanche. Rien de plus. +5,5 kg en 6 semaines. Le système marche même pour les gens comme moi.",
          name: "Maxime D.",
          role: "20 ans · Licence Physique · Lille",
          photo: "/images/avatar-maxime.svg",
          result: "+5,5 kg en 42 jours",
        },
      ],
    },
    pricing: {
      enabled: true,
      eyebrow: "Investissement",
      headline: "Un prix étudiant. Des résultats réels.",
      description:
        "27€ là où les coachs facturent 200 à 400€ pour moins de résultats. Garanti ou remboursé.",
      plans: [
        {
          name: "Iron Build™",
          price: "27€",
          originalPrice: "97€",
          period: "accès à vie",
          description:
            "Tout ce qu'il faut pour passer de skinny à solide en 30 jours.",
          features: [
            "Programme split 3/4/5 jours (salle + maison)",
            "Plan alimentaire calculé pour ton métabolisme",
            "Technique des calories invisibles (+990 kcal/jour)",
            "Tracker de progression 8 semaines",
            "Accès à vie + mises à jour gratuites",
            "Garantie remboursement 30 jours — zéro question",
          ],
          cta: {
            label: "Accéder au programme — 27€",
            href: CHECKOUT_URL,
            variant: "primary",
            trackingEvent: "InitiateCheckout",
          },
          highlighted: true,
          badge: "Offre de lancement",
          orderBump: {
            label: "Nutrition Express",
            price: "9€",
            description: "30 recettes rapides + 15 shakes hypercaloriques. Meal prep du dimanche en 1h.",
          },
        },
      ],
      guarantee:
        "30 jours. Zéro résultat → remboursé. Un email suffit. Aucune question. Aucune justification.",
    },
    faq: {
      enabled: true,
      dark: false,
      eyebrow: "FAQ",
      headline: "Les questions qu'on me pose en vrai.",
      items: [
        {
          question: "J'ai déjà essayé des programmes. Ça a jamais marché. Pourquoi ça marcherait là ?",
          answer:
            "Parce que les autres sont calibrés pour des profils moyens. Iron Build est fait pour les métabolismes rapides. Chaque calorie calculée pour TON corps. La garantie 30 jours te protège si t'as le moindre doute.",
        },
        {
          question: "C'est ma génétique. Aucun programme peut changer ça.",
          answer:
            "La génétique fixe le plafond. Pas le sol. 99% des skinny qui stagnent mangent trop peu. C'est tout. Lucas M. disait la même chose. +4,8 kg en 30 jours.",
        },
        {
          question: "27€ c'est quoi le catch ?",
          answer:
            "Le prix bas c'est un choix. L'objectif c'est rendre la méthode accessible. Romain G. avait cramé 400€ en coaching. Iron Build à 27€ lui a donné +6,2 kg en 45 jours. La garantie est là si t'as le moindre doute.",
        },
        {
          question: "J'ai pas de salle. Ça marche quand même ?",
          answer:
            "Oui. Version maison complète incluse. Pompes, tractions, sac lesté. Antoine F. a pris +5,1 kg en 35 jours sans jamais aller en salle. C'est le plan alimentaire qui change tout — pas l'équipement.",
        },
        {
          question: "J'ai un emploi du temps de ouf. Combien de temps ça prend ?",
          answer:
            "45 minutes de séance. 1h de meal prep le dimanche. C'est tout. Thomas K. en L2 médecine a pris +3,4 kg en 30 jours. Si lui il a pu, t'as aucune excuse.",
        },
        {
          question: "Je reçois comment le programme ?",
          answer:
            "Accès immédiat. Paiement confirmé → email avec le lien. Tout en moins de 2 minutes. Plan d'entraînement, plan alimentaire, tracker, calculateur.",
        },
        {
          question: "La garantie 30 jours c'est vraiment sérieux ?",
          answer:
            "Oui. Tu suis la méthode, t'as pas de résultats, on rembourse. Un email suffit. Zéro question. Zéro justification. Zéro procédure.",
        },
      ],
    },
    finalCta: {
      enabled: true,
      dark: true,
      headline: "T'as stagné assez longtemps.",
      subheadline:
        "3 200 skinny ont commencé avant toi. 27€. Accès immédiat. Résultats en 30 jours ou remboursé.",
      cta: {
        label: "Accéder au programme — 27€",
        href: CHECKOUT_URL,
        variant: "primary",
        trackingEvent: "InitiateCheckout",
      },
      microTrust: "Accès immédiat · Garantie 30 jours · Sans salle",
    },
    footer: {
      enabled: true,
      dark: true,
      brand: "IRON ■ BUILD™",
      tagline: "De Skinny à Solide",
      links: [
        { label: "Mentions légales", href: "/mentions-legales" },
        { label: "CGV", href: "/cgv" },
        { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
      ],
      socials: [
        { platform: "instagram", href: "https://instagram.com/ironbuild" },
        { platform: "tiktok", href: "https://tiktok.com/@ironbuild" },
      ],
      legal: `© ${new Date().getFullYear()} Iron Build™. Tous droits réservés.`,
    },
  },
};
