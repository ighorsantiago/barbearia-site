import config from '../../config'

export default function HeroSection() {
    function scrollToBooking() {
        document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center text-center px-4"
            style={{ backgroundColor: config.theme.primaryColor }}
        >
            {config.hero.backgroundImage && (
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30"
                    style={{ backgroundImage: `url(${config.hero.backgroundImage})` }}
                />
            )}

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-6">
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                    {config.hero.headline}
                </h1>

                <p className="text-lg text-gray-300 max-w-xl">
                    {config.hero.subheadline}
                </p>

                <button
                    onClick={scrollToBooking}
                    className="mt-2 px-8 py-3 rounded-full font-semibold text-sm tracking-wide transition-opacity hover:opacity-80"
                    style={{
                        backgroundColor: config.theme.accentColor,
                        color: config.theme.primaryColor,
                    }}
                >
                    {config.hero.ctaText}
                </button>
            </div>
        </section>
    )
}
