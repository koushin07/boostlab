export interface Products {
    id: string;
    title: string;
    image: string;
    icon: React.ReactNode;
    alt: string;
    type: "camo" | "boost" | "service";
    tag?: string;
    price: string;
    features: string[];
    isNew?: boolean;
}
