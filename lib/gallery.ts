export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  span: "tall" | "wide" | "square";
  gradient: string;
  /** Optional real photo path under /public. Falls back to the gradient when omitted. */
  image?: string;
}

// Tiles use a real photo where one is available (image field); the rest use
// a hand-tuned gradient treatment as a placeholder — see README "Replacing
// gallery imagery" for how to swap in more photos without touching
// component code.
export const galleryItems: GalleryItem[] = [
  {
    id: "foam-wash",
    title: "Foam Pre-Wash",
    category: "Exterior",
    span: "tall",
    image: "/images/gallery/foam-wash.jpg",
    gradient:
      "radial-gradient(circle at 30% 20%, #eef0f2 0%, #9aa0a6 24%, #2a2d30 60%, #0a0b0c 100%)",
  },
  {
    id: "machine-polish",
    title: "Machine Polishing",
    category: "Paint Correction",
    span: "wide",
    image: "/images/gallery/machine-polish.jpg",
    gradient:
      "conic-gradient(from 200deg at 60% 40%, #1c1f22, #c1743c 20%, #1c1f22 45%, #74797f 70%, #1c1f22)",
  },
  {
    id: "ceramic-bead",
    title: "Ceramic Coating Cure",
    category: "Protection",
    span: "square",
    gradient:
      "radial-gradient(circle at 65% 30%, #f3f1ec 0%, #7fa4c9 20%, #14181c 55%, #0a0b0c 100%)",
  },
  {
    id: "interior-extraction",
    title: "Interior Extraction",
    category: "Interior",
    span: "square",
    gradient:
      "linear-gradient(135deg, #2a2d30 0%, #17191c 40%, #8a5530 100%)",
  },
  {
    id: "wheel-detail",
    title: "Wheel & Barrel Cleaning",
    category: "Exterior",
    span: "wide",
    image: "/images/gallery/wheel-detail.jpg",
    gradient:
      "radial-gradient(circle at 50% 50%, #c7cbd1 0%, #4a4e52 30%, #0a0b0c 75%)",
  },
  {
    id: "tool-tray",
    title: "Precision Tool Tray",
    category: "Studio",
    span: "square",
    image: "/images/gallery/tool-tray.jpg",
    gradient:
      "linear-gradient(160deg, #1c1f22 0%, #101214 60%, #c1743c 140%)",
  },
  {
    id: "headlight-detail",
    title: "Headlight & Trim Detail",
    category: "Exterior",
    span: "tall",
    image: "/images/gallery/headlight-detail.jpg",
    gradient:
      "linear-gradient(200deg, #f3f1ec 0%, #74797f 30%, #14181c 65%, #0a0b0c 100%)",
  },
  {
    id: "before-after",
    title: "Before / After Panel",
    category: "Transformation",
    span: "wide",
    image: "/images/gallery/after-crop.jpg",
    gradient:
      "linear-gradient(90deg, #2a2d30 0%, #2a2d30 49%, #f3f1ec 51%, #c1743c 100%)",
  },
  {
    id: "studio-luxury",
    title: "Studio Bay",
    category: "Studio",
    span: "square",
    image: "/images/gallery/studio-bay.jpg",
    gradient:
      "radial-gradient(circle at 40% 60%, #3a3f45 0%, #14181c 55%, #0a0b0c 100%)",
  },
];
