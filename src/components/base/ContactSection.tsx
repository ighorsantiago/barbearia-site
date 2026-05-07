import config from '../../config'

export default function ContactSection() {
    const whatsappUrl = `https://wa.me/${config.business.phone}?text=${encodeURIComponent(config.contact.whatsappMessage)}`

    return (
        <section
            id="contact"
            className="py-20 px-4 border-t border-white/10"
            style={{ backgroundColor: config.theme.primaryColor }}
        >
            <div className="max-w-2xl mx-auto flex flex-col items-center gap-6 text-center">
                <h2
                    className="text-3xl font-bold"
                    style={{ color: config.theme.accentColor }}
                >
                    Contato
                </h2>

                <p className="text-gray-400 text-sm">
                    {config.business.address}
                </p>

                {config.business.instagram && (
                    <a
                        href={`https://instagram.com/${config.business.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 text-sm hover:text-white transition-colors"
                    >
                        @{config.business.instagram}
                    </a>
                )}

                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 px-8 py-3 rounded-full font-semibold text-sm transition-opacity hover:opacity-80"
                    style={{
                        backgroundColor: config.theme.accentColor,
                        color: config.theme.primaryColor,
                    }}
                >
                    Falar no WhatsApp
                </a>

                {
                    config.contact.showMap && config.business.googleMapsUrl && (
                        <a
                            href={config.business.googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 text-sm hover:text-gray-300 transition-colors"
                        >
                            Ver no mapa →
                        </a >
                    )
                }

                <div className="flex items-center gap-4 mt-8">
                    <p className="text-gray-700 text-xs">
                        © {new Date().getFullYear()} {config.business.name} · Desenvolvido por Sant.IA.Go
                    </p>
                    <a
                        href="/admin"
                        className="text-gray-700 text-xs hover:text-gray-500 transition-colors"
                    >
                        Área do profissional
                    </a>
                </div>
            </div >
        </section >
    )
}
