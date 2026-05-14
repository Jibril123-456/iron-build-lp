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
      "87 gars transformés. +4,8 kg en 30 jours. Ton corps brûle tout ? On a la solution. 27€. Garantie 30 jours.",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    ogImage: "/og.png",
    locale: "fr_FR",
    favicon: "/favicon.ico",
    keywords: [
      "prise de masse skinny",
      "programme fitness étudiant",
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
      { name: "checkout_click", description: "Clic sur le CTA principal" },
      { name: "order_bump_view", description: "Section Pricing visible" },
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
        subheadline: "Pour voir si Iron Build est fait pour toi.",
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
          label: "Depuis combien de temps tu stagnes ?",
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
          "Le programme est pour ceux qui stagnent. Reviens quand tu auras commencé.",
      },
      successScreen: {
        kind: "calcom",
        calcomLink: "ironbuild/discovery",
        namespace: "qualification",
        headline: "C'est bon.",
        subheadline: "Tu reçois ton accès par email sous 2 minutes.",
      },
    },
  },
  marquee: {
    enabled: true,
    items: [
      "87 gars transformés",
      "+4,8 kg en 30 jours",
      "Garantie 30 jours",
      "Version salle + maison",
      "27€ — prix étudiant",
      "Calories invisibles",
      "Accès immédiat",
    ],
  },
  sections: {
    hero: {
      enabled: true,
      badge: "■ 87 gars déjà transformés",
      headline: "De Skinny à Solide en 30 jours — même si t'as jamais réussi",
      headlineHighlight: "30 jours",
      subheadline:
        "T'as tout essayé. Rien a marché. Même corps. 18 mois après. C'est pas toi. C'est la méthode.",
      primaryCta: {
        label: "JE VEUX LE MÊME RÉSULTAT — 27€",
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
      caption: "87 gars ont déjà appliqué la méthode",
      logos: [],
      stats: [
        { value: "87", label: "Gars transformés" },
        { value: "+4,8 kg", label: "En 30 jours en moyenne" },
        { value: "30 jours", label: "Garantie remboursement" },
        { value: "27€", label: "Prix unique" },
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
        "T'as tout essayé. Rien a marché. Même corps. 18 mois après. C'est pas ta faute. La méthode est fausse.",
      pains: [
        {
          title: "\"Je mange beaucoup et grossis pas\"",
          description:
            "Tu manges 500 kcal sous ton besoin. Chaque jour. Ton corps brûle tout. Aucun programme te le dit.",
        },
        {
          title: "18 mois de salle. Même corps.",
          description:
            "T'as payé. T'es allé. T'as suivi. Même résultat. C'est pas toi. C'est la méthode.",
        },
        {
          title: "Les autres grossissent. Toi non.",
          description:
            "Mêmes conseils. Même effort. Eux progressent. Toi tu stagnes. Frustrant. Et explicable.",
        },
        {
          title: "Tu crois que c'est ta génétique.",
          description:
            "Logique après des mois sans résultat. C'est faux. La génétique fixe le plafond. Pas le sol.",
        },
      ],
    },
    solution: {
      enabled: true,
      dark: false,
      eyebrow: "Comment ça marche",
      headline: "3 étapes. C'est tout.",
      description:
        "Iron Build ne nécessite aucune salle. Aucun coach. Aucun gros budget. Juste la bonne méthode.",
      bullets: [
        "✓ Tu calcules tes vraies calories — ton corps brûle plus que la moyenne",
        "✓ Tu ajoutes +990 kcal/jour sans manger plus — technique invisible",
        "✓ Tu suis le programme 30 jours — résultats visibles ou remboursé",
        "❌ Pas besoin de salle de sport",
        "❌ Pas besoin de coach à 200€",
        "❌ Pas besoin de manger énorme",
      ],
    },
    features: {
      enabled: true,
      dark: true,
      eyebrow: "Ce que tu obtiens",
      headline: "Tout ce qu'il faut. Rien de plus.",
      description:
        "Accès immédiat. Tu télécharges. Tu commences aujourd'hui.",
      features: [
        {
          icon: "target",
          title: "Programme 3/4/5 jours",
          description:
            "Salle ou maison. Sac lesté, barre de porte. Pas d'abonnement requis. Tu commences là où t'es.",
        },
        {
          icon: "chart",
          title: "Plan alimentaire + calculateur",
          description:
            "Calcul précis pour TON corps. Tu sais quoi manger. En quelle quantité. À quel moment.",
        },
        {
          icon: "spark",
          title: "Technique calories invisibles",
          description:
            "+990 kcal par jour. Sans manger plus. La technique que 99% des programmes ignorent.",
        },
        {
          icon: "rocket",
          title: "Tracker de progression 8 semaines",
          description:
            "Poids. Mensurations. Photos. Tu vois ce qui change. Semaine après semaine.",
        },
        {
          icon: "zap",
          title: "Bonus : Nutrition Express — 9€",
          description:
            "30 recettes rapides + 15 shakes. Meal prep en 1h le dimanche. Courses à 30€/semaine.",
        },
        {
          icon: "shield",
          title: "Accès à vie",
          description:
            "Tu achètes une fois. Tu gardes pour toujours. Mises à jour incluses. Zéro supplément.",
        },
      ],
    },
    testimonials: {
      enabled: true,
      eyebrow: "87 gars ont appliqué la méthode",
      headline: "Leurs mots. Pas les nôtres.",
      testimonials: [
        {
          quote:
            "Frère j'y croyais plus. Un an et demi à rien voir. J'ai essayé Iron Build un peu par hasard. Semaine 4, mon pote me demande ce que je fais différemment. J'avais même pas encore annoncé. +4,8 kg. C'était juste que je mangeais pas assez. Rien d'autre.",
          name: "Lucas M.",
          role: "21 ans · BUT Informatique · Lyon",
          photo: "/images/avatar-lucas.svg",
          result: "+4,8 kg en 30 jours",
        },
        {
          quote:
            "400€ de coaching sur 2 ans. Littéralement rien. Iron Build à 27€ m'a expliqué le problème en 5 minutes. Mon corps brûle plus vite que les autres. Je mangeais pas assez. C'est tout. +6,2 kg en 45 jours. J'aurais dû commencer là franchement.",
          name: "Romain G.",
          role: "23 ans · Licence Droit · Paris",
          photo: "/images/avatar-romain.svg",
          result: "+6,2 kg en 45 jours",
        },
        {
          quote:
            "J'avais même pas de salle. J'ai fait ça dans ma chambre. Barre de traction sur la porte, sac à dos lesté. +5,1 kg en 5 semaines. Je savais pas que c'était possible sans machine. La clé c'était juste manger assez.",
          name: "Antoine F.",
          role: "20 ans · IUT Informatique · Bordeaux",
          photo: "/images/avatar-antoine.svg",
          result: "+5,1 kg en 35 jours",
        },
        {
          quote:
            "Je suis en L2 médecine, j'ai littéralement zéro temps. J'allais pas me lancer dans un truc qui prend 2h par jour. Iron Build c'est 45 min de séance. 1h le dimanche pour préparer à manger. C'est tout. +3,4 kg en un mois. Honnêtement j'en revenais pas.",
          name: "Thomas K.",
          role: "22 ans · L2 Médecine · Strasbourg",
          photo: "/images/avatar-thomas.svg",
          result: "+3,4 kg en 30 jours",
        },
        {
          quote:
            "Toute ma famille est mince. On m'a toujours dit c'est génétique. J'y croyais. Genre j'avais accepté. Semaine 4 avec Iron Build, +4,2 kg. Je me regarde dans le miroir et pour la première fois je kiffe. Je mangeais 700 calories trop peu chaque jour. C'était ça le problème. Juste ça.",
          name: "Nathan B.",
          role: "24 ans · Master Marketing · Nantes",
          photo: "/images/avatar-nathan.svg",
          result: "+4,2 kg en 28 jours",
        },
        {
          quote:
            "Honnêtement je suis quelqu'un de désorganisé. Je tiens jamais mes habitudes longtemps. Iron Build c'est juste une checklist. 4 trucs à cocher le soir. 1h le dimanche. J'ai tenu 6 semaines. +5,5 kg. Même moi j'ai réussi.",
          name: "Maxime D.",
          role: "20 ans · Licence Physique · Lille",
          photo: "/images/avatar-maxime.svg",
          result: "+5,5 kg en 42 jours",
        },
      ],
    },
    pricing: {
      enabled: true,
      eyebrow: "Uniquement sur cette page",
      headline: "27€. Pas 97€. Pas 200€. 27€.",
      description:
        "Prix de lancement. Disponible aujourd'hui seulement. Garanti ou remboursé.",
      plans: [
        {
          name: "Iron Build™",
          price: "27€",
          originalPrice: "97€",
          period: "accès à vie",
          description:
            "Tout ce qu'il faut pour passer de skinny à solide en 30 jours.",
          features: [
            "Programme 3/4/5 jours (salle + maison)",
            "Plan alimentaire pour TON corps",
            "Technique calories invisibles (+990 kcal/jour)",
            "Tracker de progression 8 semaines",
            "Accès à vie + mises à jour",
            "Garantie 30 jours — zéro question",
          ],
          cta: {
            label: "JE PRENDS IRON BUILD — 27€",
            href: CHECKOUT_URL,
            variant: "primary",
            trackingEvent: "InitiateCheckout",
          },
          highlighted: true,
          badge: "Offre de lancement",
          orderBump: {
            label: "Nutrition Express",
            price: "9€",
            description: "30 recettes rapides + 15 shakes. Meal prep en 1h. Courses à 30€/semaine.",
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
          question: "J'ai déjà essayé. Ça a jamais marché. Pourquoi là ce serait différent ?",
          answer:
            "Les autres programmes sont faits pour les gens normaux. Pas pour toi. Ton corps brûle plus vite. Iron Build calcule tes vraies calories. La garantie 30 jours est là si t'as le moindre doute.",
        },
        {
          question: "C'est ma génétique. Aucun programme peut changer ça.",
          answer:
            "La génétique fixe le plafond. Pas le sol. 99% des gars qui stagnent mangent trop peu. C'est tout. Lucas M. disait pareil. +4,8 kg en 30 jours.",
        },
        {
          question: "27€ c'est quoi le catch ?",
          answer:
            "Pas de catch. Prix de lancement pour rendre la méthode accessible. Romain G. avait cramé 400€ en coaching. Iron Build à 27€ lui a donné +6,2 kg en 45 jours.",
        },
        {
          question: "J'ai pas de salle. Ça marche quand même ?",
          answer:
            "Oui. Version maison incluse. Pompes, tractions, sac lesté. Antoine F. : +5,1 kg en 35 jours sans jamais aller en salle. C'est le plan alimentaire qui change tout.",
        },
        {
          question: "J'ai un emploi du temps chargé. Combien de temps par jour ?",
          answer:
            "45 minutes de séance. 1h de meal prep le dimanche. C'est tout. Thomas K. en L2 médecine : +3,4 kg en 30 jours. Si lui il a pu, t'as aucune excuse.",
        },
        {
          question: "Je reçois comment le programme ?",
          answer:
            "Accès immédiat. Paiement confirmé → email avec le lien. Tout en moins de 2 minutes.",
        },
        {
          question: "La garantie 30 jours c'est vraiment sans condition ?",
          answer:
            "Oui. Tu appliques. T'as pas de résultats. On rembourse. Un email suffit. Zéro question. Zéro procédure.",
        },
      ],
    },
    finalCta: {
      enabled: true,
      dark: true,
      headline: "87 gars ont commencé. T'attends quoi ?",
      subheadline:
        "27€. Accès immédiat. Résultats en 30 jours ou remboursé. Aucune excuse.",
      cta: {
        label: "JE PRENDS IRON BUILD — 27€",
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
