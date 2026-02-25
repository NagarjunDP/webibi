export interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    businessName?: string;
    serviceType?: string;
    budget?: string;
    message: string;
    status: 'new' | 'contacted' | 'resolved';
    createdAt: any;
}

export interface Testimonial {
    id: string;
    name: string;
    role: string;
    content: string;
    rating: number;
    avatarUrl?: string;
}

export interface User {
    uid: string;
    email: string;
    clientId: string;
    role: 'client' | 'admin';
    displayName?: string;
    photoURL?: string;
    createdAt?: any;
    updatedAt?: any;
}

export interface Service {
    id: string;
    name: string;
    description: string;
    price: string;
    images: string[];
}

export interface Offer {
    enabled: boolean;
    text: string;
}

export interface ContactInfo {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    mapLink: string;
}

export interface SeoInfo {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
}

export interface GalleryItem {
    url: string;
    category: string;
    createdAt?: any;
}

export interface Client {
    id: string; // Firestore Document ID
    slug: string; // Unique URL slug
    businessName: string;
    ownerId: string;
    ownerEmail: string;
    status: 'draft' | 'live' | 'suspended';
    logoUrl?: string;
    heroImages: string[];
    services: Service[];
    gallery: GalleryItem[];
    offers: Offer;
    contact: ContactInfo;
    seo: SeoInfo;
    settings: {
        primaryColor: string;
        theme: 'light' | 'dark';
    };
    websiteContent?: {
        heroTitle: string;
        heroSubtitle: string;
        aboutTitle: string;
        aboutContent: string;
        ctaText: string;
    };
    createdAt: any;
    updatedAt: any;
}
