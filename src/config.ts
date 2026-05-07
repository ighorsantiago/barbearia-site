import type { SiteConfig } from './types/config'

const config: SiteConfig = {
    blueprint: 'beta',

    business: {
        name: 'Barbearia',
        tagline: 'Tradition and style for the modern man',
        phone: '5521999999999',
        address: 'Rua Exemplo, 123 — Rio de Janeiro, RJ',
        instagram: 'barbearia',
    },

    theme: {
        primaryColor: '#0D0D0D',
        accentColor: '#B8960C',
    },

    hero: {
        headline: 'Seu melhor visual começa aqui',
        subheadline: 'Corte, barba e tratamentos com quem entende do ofício.',
        ctaText: 'Agendar horário',
        backgroundImage: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1400&auto=format&fit=crop',
    },


    services: [
        { id: 'haircut', name: 'Corte', duration: 45, price: 50 },
        { id: 'beard', name: 'Barba', duration: 30, price: 35 },
        { id: 'haircut-beard', name: 'Corte + Barba', duration: 70, price: 75 },
        { id: 'eyebrow', name: 'Design de sobrancelha', duration: 20, price: 25 },
    ],

    gallery: [
        {
            src: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=600&auto=format&fit=crop',
            alt: 'Corte degradê',
        },
        {
            src: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&auto=format&fit=crop',
            alt: 'Barba desenhada',
        },
        {
            src: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&auto=format&fit=crop',
            alt: 'Ambiente da barbearia',
        },
    ],


    contact: {
        whatsappMessage: 'Olá! Quero agendar um horário na barbearia.',
        showMap: true,
    },

    booking: {
        enabled: true,
        workingDays: [1, 2, 3, 4, 5, 6],
        workingHours: { start: '09:00', end: '19:00' },
        slotDurationMinutes: 30,
        maxDaysAhead: 30,
        adminPassword: '1234',
    },
}

export default config
