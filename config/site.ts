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
  headline: string;
  /** Optional substring of headline rendered with an animated red underline. */
  headlineHighlight?: string;
  subheadline: string;
  primaryCta: CTA;
  secondaryCta?: CTA;
  visual?:
    | { kind: "none" }
    | { kind: "image"; src: string; alt: string }
    | { kind: "video"; src: string; poster?: string }
    | { kind: "embed"; html: string };
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
    period?: string;
    description?: string;
    features: string[];
    cta: CTA;
    highlighted?: boolean;
    badge?: string;
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

const CALCOM_LINK = process.env.NEXT_PUBLIC_CALCOM_LINK || "titouan.grow/call-coworking";
const CALCOM_NAMESPACE = "qualification";
const CALENDLY_FALLBACK = process.env.NEXT_PUBLIC_CALENDLY_URL || `https://cal.com/${CALCOM_LINK}`;

export const siteConfig: SiteConfig = {
  meta: {
    title: "Titouan — Atteins 10 000€/mois avec 1 vidéo YouTube par semaine",
    description:
      "Coaching 1:1 pour les coachs qui veulent passer de 3-5k€/mois à 10k€/mois grâce à une stratégie YouTube long format. Pas de Reels, pas d'ads. 12 semaines, 1 appel par semaine.",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    ogImage: "/og.png",
    locale: "fr_FR",
    favicon: "/favicon.ico",
    keywords: [
      "coaching coachs",
      "youtube coachs",
      "scaler coaching",
      "10k mois coach",
      "youtube long format",
      "stratégie YouTube",
    ],
    jsonLd: null,
  },
  theme: {
    colors: {
      background: "#ffffff",
      foreground: "#0a0a0a",
      muted: "#6b7280",
      border: "#e5e7eb",
      card: "#fafafa",
      primary: "#0a0a0a",
      primaryForeground: "#ffffff",
      accent: "#ff0000",
      accentForeground: "#ffffff",
    },
    fonts: {
      display: "Space Grotesk",
      body: "Inter",
    },
    radius: "lg",
  },
  tracking: {
    fbPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID || "",
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID || "",
    scrollDepths: [25, 50, 75, 100],
    timeMilestones: [15, 30, 60, 120],
    customEvents: [
      { name: "form_open", description: "Le visiteur ouvre le formulaire de qualif" },
      { name: "form_step", description: "Validation d'une étape du formulaire" },
      { name: "form_qualified", description: "Form complété avec un profil qualifié" },
      { name: "form_unqualified", description: "Form complété avec un profil non qualifié (CA < 1k€)" },
      { name: "form_abandoned", description: "Form fermé en cours de saisie" },
      { name: "booking_success", description: "Booking Cal.com confirmé" },
    ],
  },
  links: {
    primaryCta: CALENDLY_FALLBACK,
    checkout: process.env.NEXT_PUBLIC_CHECKOUT_URL || "",
  },
  forms: {
    qualification: {
      id: "qualification",
      intro: {
        headline: "On checke si on est le bon match.",
        subheadline:
          "6 questions rapides pour qu'on parte sur l'appel avec du concret. Pas de pitch automatique derrière — juste un audit honnête.",
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
          id: "niche",
          type: "text",
          label: "Tu coaches dans quel domaine ?",
          placeholder: "Ex : coach de vie, business, fitness, parentalité…",
          required: true,
        },
        {
          id: "revenue",
          type: "choice",
          label: "Ton CA mensuel actuel ?",
          required: true,
          options: [
            { value: "<1k", label: "Moins de 1 000€", disqualifies: true },
            { value: "1-3k", label: "1 000€ – 3 000€" },
            { value: "3-5k", label: "3 000€ – 5 000€" },
            { value: "5-10k", label: "5 000€ – 10 000€" },
            { value: "10k+", label: "Plus de 10 000€" },
          ],
        },
        {
          id: "youtube",
          type: "choice",
          label: "Tu fais déjà du YouTube long format ?",
          required: true,
          options: [
            { value: "no", label: "Non, jamais touché" },
            { value: "sometimes", label: "Oui, sporadiquement" },
            { value: "regular", label: "Oui, régulièrement" },
          ],
        },
        {
          id: "pain",
          type: "textarea",
          label: "C'est quoi ton plus gros frein là, maintenant ?",
          placeholder: "En 2-3 phrases, ce qui te bloque vraiment aujourd'hui.",
          required: true,
          maxLength: 400,
        },
        {
          id: "email",
          type: "email",
          label: "Ton email pour qu'on confirme le rendez-vous",
          placeholder: "ton@email.com",
          required: true,
        },
      ],
      unqualifiedScreen: {
        headline: "On est trop tôt pour bosser ensemble.",
        description:
          "L'accompagnement est calibré pour les coachs qui ont déjà au moins 1 000€/mois — c'est à partir de là que le levier YouTube fait sens. En dessous, le sujet c'est pas YouTube, c'est l'offre et le positionnement. Reviens me voir quand t'auras passé ce cap, on regardera vraiment.",
      },
      successScreen: {
        kind: "calcom",
        calcomLink: CALCOM_LINK,
        namespace: CALCOM_NAMESPACE,
        headline: "On est bons. Choisis ton créneau.",
        subheadline: "30 minutes, en visio. Pas de pitch, juste un audit honnête de ta situation.",
      },
      redirectAfterBooking: "/merci",
    },
  },
  marquee: {
    enabled: true,
    items: [
      "1 vidéo YouTube par semaine",
      "Coaching 1:1 · 12 semaines",
      "Sans Reels",
      "Sans ads",
      "Sans burn-out",
      "10 000€/mois",
      "YouTube long format",
      "Audit positionnement inclus",
    ],
  },
  sections: {
    hero: {
      enabled: true,
      headline: "Passe de 3 000€ à 10 000€/mois. Avec 1 vidéo YouTube par semaine.",
      headlineHighlight: "1 vidéo YouTube par semaine",
      subheadline:
        "Sans Reels. Sans ads. Sans burn-out de contenu. Une méthode 1:1 pour les coachs qui ont arrêté d'attendre que l'algo Insta les remarque.",
      primaryCta: {
        label: "Réserver mon appel découverte",
        href: CALENDLY_FALLBACK,
        variant: "primary",
        trackingEvent: "Lead",
        formId: "qualification",
      },
      visual: { kind: "none" },
      trustLine: "Coaching 1:1 · 12 semaines · Pas de groupe, pas de Discord.",
    },
    socialProof: {
      enabled: false,
      caption: "Ils ont fait confiance à la méthode",
      logos: [],
      stats: [],
      shortQuotes: [],
    },
    problem: {
      enabled: true,
      dark: false,
      eyebrow: "Le vrai problème",
      headline:
        "Si tu fais 3-5k€/mois en postant tous les jours, ce n'est pas un problème de contenu. C'est un problème de format.",
      description:
        "Le contenu court attire des curieux. Les curieux likent, ils n'achètent pas. Tu peux poster 5 Reels par semaine pendant 2 ans : tu auras plus d'abonnés, pas plus de clients à 1 000€+.",
      pains: [
        {
          title: "Tu cours après l'algo, pas après tes clients",
          description:
            "Tu passes 15h par semaine sur Insta pour 1-2 clients par mois. Tu sais que c'est pas viable. Tu sais pas comment sortir.",
        },
        {
          title: "Tes followers grossissent, ton CA stagne",
          description:
            "+500 abonnés ce mois-ci. 1 client signé. Le ratio attention → vente est cassé, et personne te le dit clairement.",
        },
        {
          title: "Tu attires des curieux, pas des acheteurs",
          description:
            "Le contenu court divertit. Pour vendre 1k€+, il faut éduquer. Et éduquer en 90 secondes c'est mathématiquement impossible.",
        },
        {
          title: "Tu sens que YouTube serait mieux. Tu te lances pas.",
          description:
            "T'as peur de la caméra. T'as peur de pas savoir quoi dire. T'as peur que ça décolle pas. Donc tu retournes sur Insta.",
        },
      ],
    },
    solution: {
      enabled: true,
      dark: true,
      eyebrow: "La méthode",
      headline: "1 vidéo YouTube par semaine. Qui pré-vend ton offre 24/7.",
      description:
        "Une vidéo longue ne demande pas plus de temps que 5 Reels mal foutus. Elle fait l'inverse : elle continue de bosser pour toi pendant 6, 12, 24 mois. Quand un prospect arrive sur ton appel, t'as déjà passé 30 minutes à le convaincre.",
      bullets: [
        "Une vidéo = 30 minutes de pré-vente pendant que tu dors",
        "Tes prospects arrivent en appel déjà éduqués, déjà convaincus",
        "Ton tunnel ne dépend plus d'un algo qui change tous les 3 mois",
        "Chaque vidéo continue de générer des appels pendant des années (SEO YouTube)",
      ],
    },
    features: {
      enabled: true,
      dark: false,
      eyebrow: "Ce que tu obtiens",
      headline: "Coaching 1:1 sur 12 semaines. Toi et moi. C'est tout.",
      description:
        "Pas de groupe Telegram saturé. Pas de cours en autonomie où tu t'endors à la 3ème vidéo. Un audit complet, une méthode appliquée à ton business, un appel par semaine pour exécuter.",
      features: [
        {
          icon: "target",
          title: "Audit de positionnement",
          description:
            "Première semaine : on dissèque ton offre, ton ICP et ton écosystème actuel. Tu repars avec un positionnement unique en moins de 7 jours.",
        },
        {
          icon: "spark",
          title: "Méthode d'écriture",
          description:
            "Le cœur du programme. Comment scripter une vidéo qui informe ET pré-vend, sans tomber dans la promo lourde. Templates inclus.",
        },
        {
          icon: "compass",
          title: "Stratégie de sujets",
          description:
            "On définit les 24 prochains sujets de tes vidéos — ceux qui attirent les coachs prêts à investir 1-3k€, pas les curieux qui font défiler.",
        },
        {
          icon: "rocket",
          title: "Coaching 1:1 hebdomadaire",
          description:
            "1 appel par semaine pendant 12 semaines. Tu m'envoies tes scripts, on les retravaille en live. Pas d'attente, pas de thread Discord.",
        },
        {
          icon: "chart",
          title: "Optimisation conversion",
          description:
            "Comment transformer une vue YouTube en appel booké. Description, CTA, lead magnet, pinned comment — tout est cadré.",
        },
        {
          icon: "clock",
          title: "Suivi WhatsApp 12 semaines",
          description:
            "Accès direct sur WhatsApp pour les questions courtes entre les sessions. Réponse sous 24h en semaine.",
        },
      ],
    },
    testimonials: {
      enabled: false,
      eyebrow: "Ils l'ont fait",
      headline: "",
      testimonials: [],
    },
    pricing: {
      enabled: false,
      eyebrow: "",
      headline: "",
      description: "",
      plans: [],
    },
    faq: {
      enabled: true,
      dark: false,
      eyebrow: "FAQ",
      headline: "Les vraies questions qu'on me pose en appel.",
      items: [
        {
          question: "YouTube ça prend pas des mois à décoller ?",
          answer:
            "Non — quand tu t'adresses à un public restreint et qu'on optimise chaque vidéo pour la conversion (pas pour les vues), tu n'as pas besoin de millions de vues. 500 vues qualifiées valent mieux que 50 000 vues curieuses. Mes clients signent leur premier client YouTube entre la 3ème et la 5ème vidéo.",
        },
        {
          question: "J'ai pas le temps de tourner et monter une vidéo par semaine.",
          answer:
            "1 vidéo YouTube = 4 à 6h de travail (script, tournage, montage). Tu en récupères 10 en arrêtant de spam Insta. Mathématiquement, tu dégages du temps — pas l'inverse.",
        },
        {
          question: "Je sais pas écrire / je suis pas à l'aise face caméra.",
          answer:
            "C'est exactement ce qu'on travaille en coaching. L'écriture s'apprend en 4 semaines avec la bonne méthode. La caméra, c'est de la répétition — et un script bien écrit règle 80% de ton inconfort dès la 3ème vidéo.",
        },
        {
          question: "Et si ça marche pas pour ma niche ?",
          answer:
            "YouTube fonctionne pour toutes les niches qui ont un client à plus de 500€ — coachs business, coachs de vie, fitness, nutrition, parentalité, dev perso, finance, immobilier. La question c'est jamais 'est-ce que ma niche marche', c'est 'est-ce que je sais m'adresser à la bonne personne dedans'.",
        },
        {
          question: "Pourquoi pas un programme groupe moins cher ?",
          answer:
            "Parce que ton positionnement est unique — un programme groupe ne peut pas le travailler sérieusement. Sur 12 semaines, on adapte chaque vidéo à TA chaîne, TON ICP, TES forces. C'est pour ça que ce n'est pas 297€ et pas en groupe.",
        },
      ],
    },
    finalCta: {
      enabled: true,
      dark: true,
      headline: "Prêt à arrêter de courir après l'algo Insta ?",
      subheadline:
        "30 minutes pour qu'on regarde ensemble si ta chaîne YouTube peut t'amener à 10 000€/mois. Pas de pitch, pas de pression — juste un audit honnête.",
      cta: {
        label: "Réserver mon appel découverte",
        href: CALENDLY_FALLBACK,
        variant: "primary",
        trackingEvent: "Lead",
        formId: "qualification",
      },
      microTrust: "Pas de pitch. Pas de pression. 30 min en visio.",
    },
    footer: {
      enabled: true,
      dark: true,
      brand: "Titouan",
      links: [],
      socials: [],
      legal: `© ${new Date().getFullYear()} Titouan. Tous droits réservés.`,
    },
  },
};
