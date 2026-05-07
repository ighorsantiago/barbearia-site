import config from '../../config'

export default function GallerySection() {
    return (
        <section
            id="gallery"
            className="py-20 px-4"
            style={{ backgroundColor: config.theme.primaryColor }}
        >
            <div className="max-w-5xl mx-auto">
                <h2
                    className="text-3xl font-bold text-center mb-12"
                    style={{ color: config.theme.accentColor }}
                >
                    Galeria
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {config.gallery.map((image, index) => (
                        <div
                            key={index}
                            className="rounded-xl overflow-hidden aspect-square bg-gray-900"
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                onError={e => {
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/400x400/1a1a1a/B8960C?text=KMK'
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
