import type { Bullet } from "./bullet";
import type { Faq } from "./faq";
import type { Feature } from "./feature";
import type { HowItWork } from "./howItWork";
import type { Pricing } from "./pricing";


export interface Product {
  id: string;
  slug: string;
  title: string;
  price: string;
  image: string;
  type: string;
  tag: string;
  alt: string;
  eta: string;
  description: string;
  features: Feature[];
  bullets: Bullet[]
  pricing: Pricing[];
  achievements: string[];
  faq: Faq[];
  howItWorks: HowItWork[];
}
