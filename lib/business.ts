// ---------------------------------------------------------------------------
// Central business configuration.
//
// Every business fact used across the site (name, contact details, services,
// hours, links) is defined here ONCE. Components must import from this file
// rather than hard-coding business data, so the whole site can be updated by
// editing a single source of truth.
// ---------------------------------------------------------------------------

export const business = {
  name: "Sood Motors Detailing Studio",
  shortName: "Sood Motors",
  tagline: "Precision. Perfected.",
  description:
    "Premium automotive detailing crafted to restore, protect and elevate your vehicle.",

  phone: "+91 99925 51739",
  phoneDial: "+919992551739", // digits + country code, for tel: links
  whatsappNumber: "919992551739", // digits only, for wa.me links

  email: null as string | null, // not provided — kept configurable, not invented

  address: {
    line1: "Grand Trunk Rd, near B.P. Petrol Pump",
    line2: "Ansal Herman City, Pipli",
    city: "Kurukshetra",
    state: "Haryana",
    postalCode: "136131",
    country: "India",
    full: "Grand Trunk Rd, near B.P. Petrol Pump, Ansal Herman City, Pipli, Kurukshetra, Haryana 136131",
  },

  // Used to build a Google Maps search/directions link without depending on a
  // hard-coded place ID that could go stale.
  mapsQuery:
    "Sood Motors Detailing Studio, Grand Trunk Rd, near B.P. Petrol Pump, Ansal Herman City, Pipli, Kurukshetra, Haryana 136131",

  instagramUrl: "https://www.instagram.com/soodmotorsdetailingstudio",

  socialLinks: {
    instagram: "https://www.instagram.com/soodmotorsdetailingstudio",
  },

  hours: [
    { day: "Monday", open: "09:00", close: "19:00" },
    { day: "Tuesday", open: "09:00", close: "19:00" },
    { day: "Wednesday", open: "09:00", close: "19:00" },
    { day: "Thursday", open: "09:00", close: "19:00" },
    { day: "Friday", open: "09:00", close: "19:00" },
    { day: "Saturday", open: "09:00", close: "19:00" },
    { day: "Sunday", open: "10:00", close: "17:00" },
  ],
} as const;

export type ServiceId =
  | "exterior-detailing"
  | "interior-detailing"
  | "paint-correction"
  | "ceramic-coating"
  | "paint-protection-film"
  | "full-car-detailing"
  | "engine-bay-detailing"
  | "headlight-restoration";

export interface Service {
  id: ServiceId;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  detail: string;
}

export const services: Service[] = [
  {
    id: "exterior-detailing",
    number: "01",
    title: "Exterior Detailing",
    shortTitle: "Exterior",
    description:
      "Hand wash, clay treatment and machine polish to lift embedded contaminants and restore true paint clarity.",
    detail:
      "A multi-stage wash and decontamination process that removes bonded surface contaminants before a finishing polish brings back depth and gloss.",
  },
  {
    id: "interior-detailing",
    number: "02",
    title: "Interior Detailing",
    shortTitle: "Interior",
    description:
      "Deep extraction cleaning of seats, carpets and trim, followed by conditioning and odour treatment.",
    detail:
      "Every surface — headliner to footwell — is vacuumed, extracted, conditioned and protected so the cabin looks and feels new.",
  },
  {
    id: "paint-correction",
    number: "03",
    title: "Paint Correction",
    shortTitle: "Correction",
    description:
      "Multi-stage machine polishing to remove swirl marks, oxidation and fine scratches from the clear coat.",
    detail:
      "Measured, stage-by-stage cutting and refining brings the paint back to a true, distortion-free reflection.",
  },
  {
    id: "ceramic-coating",
    number: "04",
    title: "Ceramic Coating",
    shortTitle: "Ceramic",
    description:
      "A durable ceramic layer bonded to the paint for long-term gloss, hydrophobic beading and UV resistance.",
    detail:
      "Applied under controlled conditions after full correction, forming a hard, glossy layer that makes future washing easier.",
  },
  {
    id: "paint-protection-film",
    number: "05",
    title: "Paint Protection Film",
    shortTitle: "PPF",
    description:
      "Self-healing polyurethane film applied to high-impact panels to guard against stone chips and abrasion.",
    detail:
      "Precision-fitted film shields the most exposed panels from road debris while staying virtually invisible.",
  },
  {
    id: "full-car-detailing",
    number: "06",
    title: "Full Car Detailing",
    shortTitle: "Full Detail",
    description:
      "A complete interior and exterior programme — the full studio treatment from wheels to headliner.",
    detail:
      "Our most thorough service, combining exterior correction, interior deep-cleaning and protection in a single visit.",
  },
  {
    id: "engine-bay-detailing",
    number: "07",
    title: "Engine Bay Detailing",
    shortTitle: "Engine Bay",
    description:
      "Careful degreasing and dressing of the engine bay, done safely around sensitive electronics.",
    detail:
      "A methodical clean that leaves the bay presentation-ready without risking connectors, sensors or wiring.",
  },
  {
    id: "headlight-restoration",
    number: "08",
    title: "Headlight Restoration",
    shortTitle: "Headlights",
    description:
      "Wet-sand and polish treatment that clears oxidised, yellowed lenses and restores light output.",
    detail:
      "Restores clarity and night-time visibility by removing the UV-damaged outer layer and resealing the lens.",
  },
];

export const whatsapp = {
  number: business.whatsappNumber,
  buildUrl(message: string) {
    return `https://wa.me/${this.number}?text=${encodeURIComponent(message)}`;
  },
};

export interface BookingDetails {
  name: string;
  phone: string;
  vehicle: string;
  service: string;
  date: string;
  time: string;
  message?: string;
}

export function buildBookingMessage(details: BookingDetails): string {
  const lines = [
    `Hello ${business.name},`,
    "",
    "I would like to book a detailing service.",
    "",
    `Name: ${details.name}`,
    `Phone: ${details.phone}`,
    `Vehicle: ${details.vehicle}`,
    `Service: ${details.service}`,
    `Date: ${details.date}`,
    `Time: ${details.time}`,
    `Message: ${details.message?.trim() ? details.message : "-"}`,
    "",
    "Please confirm availability.",
  ];
  return lines.join("\n");
}
