import config from '../../config'

export default function ServicesSection() {
    return (
        <section id="services" className="py-20 px-4" style={{ backgroundColor: config.theme.primaryColor }}>
            <div className="max-w-5xl mx-auto">
                <h2
                    className="text-3xl font-bold text-center mb-12"
                    style={{ color: config.theme.accentColor }}
                >
                    Serviços
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {config.services.map(service => (
                        <div
                            key={service.id}
                            className="border border-white/10 rounded-xl px-6 py-5 flex flex-col gap-2 hover:border-white/20 transition-colors"
                            style={{ backgroundColor: config.theme.primaryColor }}
                        >
                            <span className="text-white font-semibold text-lg">
                                {service.name}
                            </span>

                            {service.description && (
                                <span className="text-gray-400 text-sm">
                                    {service.description}
                                </span>
                            )}

                            <div className="flex items-center justify-between mt-2">
                                <span className="text-sm text-gray-500">
                                    {service.duration} min
                                </span>
                                <span
                                    className="font-semibold text-sm"
                                    style={{ color: config.theme.accentColor }}
                                >
                                    R$ {service.price.toFixed(2).replace('.', ',')}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
