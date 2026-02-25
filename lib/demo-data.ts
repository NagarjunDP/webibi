export const DEMO_DATA = {
    businessName: "Demo Business",
    domain: "demo.webibi.com",
    templateType: "standard",
    ownerEmail: "demo@webibi.com",
    phone: "+1234567890",
    whatsapp: "+1234567890",
    address: "123 Business St, City, Country",
    logoUrl: "", // Empty or a placeholder URL
    heroImages: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
    ],
    services: [
        {
            id: "service-1",
            name: "Premium Service 1",
            description: "High quality service description goes here. It explains the value proposition.",
            price: "$99",
            images: ["https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"]
        },
        {
            id: "service-2",
            name: "Standard Service 2",
            description: "Another great service offering details about what is included.",
            price: "$199",
            images: ["https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"]
        },
        {
            id: "service-3",
            name: "Custom Solution 3",
            description: "Tailored solutions for your specific needs and requirements.",
            price: "Custom",
            images: ["https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"]
        }
    ],
    gallery: [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
    ],
    offers: {
        enabled: true,
        text: "Special Offer: Get 20% off your first service!"
    },
    contact: {
        phone: "+1234567890",
        whatsapp: "+1234567890",
        email: "contact@demobusiness.com",
        address: "123 Business St, City, Country",
        mapLink: ""
    },
    seo: {
        title: "Demo Business - Quality Services",
        description: "Best services in town. Contact us today."
    },
    // Timestamps are handled by serverTimestamp() during sync
};
