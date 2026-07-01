import PageHero from "#/components/PageHero";

const sections = [
    {
        title: 'Information We Collect',
        content: `BCWEST Terminal Freight Services Inc. collects information you voluntarily provide when you contact us, request a quote, apply for employment, or otherwise interact with our website. This may include your name, company name, email address, phone number, and details of your freight or logistics requirements.

We may also collect technical data automatically through standard website analytics — including your IP address, browser type, device information, and pages visited — solely to improve our website experience.`,
    },
    {
        title: 'How We Use Your Information',
        content: `We use the information we collect to: respond to your inquiries and provide requested freight or logistics services; process employment applications; communicate operational and service updates; and improve our website and service offerings.

We do not sell, trade, or rent your personal information to third parties. Information may be shared with trusted service partners only where necessary to deliver the services you have requested.`,
    },
    {
        title: 'Data Retention',
        content: `We retain personal information for as long as is necessary to fulfil the purpose for which it was collected, or as required by applicable Canadian legislation. Client and operational records are retained in accordance with freight and logistics industry standards and regulatory requirements.`,
    },
    {
        title: 'Your Rights',
        content: `Under Canadian privacy law, including the Personal Information Protection and Electronic Documents Act (PIPEDA), you have the right to access the personal information we hold about you, to request corrections to inaccurate information, and to withdraw your consent to our use of your information where consent is the basis for processing.

To exercise these rights, please contact us at the address below.`,
    },
    {
        title: 'Security',
        content: `BCWEST implements industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. Our physical, technical, and administrative safeguards are reviewed and updated in line with our operational security standards.`,
    },
    {
        title: 'Cookies',
        content: `Our website uses cookies and similar tracking technologies to enhance your browsing experience and analyse site traffic. You may configure your browser to refuse cookies; however, this may affect certain functionality of our website.`,
    },
    {
        title: 'Contact',
        content: `For privacy-related inquiries or to exercise your rights under Canadian privacy legislation, please contact:

BCWEST Terminal Freight Services Inc.
201 Portage Avenue
Winnipeg, Manitoba R3B 3K6
Canada

Email: privacy@bcwestterminal.ca
Phone: 204-958-5300`,
    },
];

export default function PrivacyPolicy() {
    return (
        <>
            <PageHero
                label="Privacy Policy"
                title="Your Privacy Matters."
                subtitle="How BCWEST Terminal Freight Services Inc. collects, uses, and protects your personal information."
                backgroundImage="/verification.jpg"
            />
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 grid-overlay opacity-10" />
                <div className="relative mx-auto px-4 md:px-6 lg:px-8 xl:px-10 max-w-screen-2xl">
                    <div className="max-w-3xl">
                        <p className="mb-8 font-mono text-[10px] text-gold/60 uppercase tracking-widest">
                            {`Last Updated: May 2026 // BCWEST_PRIVACY_V1`}
                        </p>
                        <div className="space-y-10">
                            {sections.map((s, i) => (
                                <div key={s.title} className="pb-10 border-steel/20 border-b last:border-b-0">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="w-6 font-mono text-[10px] text-gold/40">{String(i + 1).padStart(2, '0')}</span>
                                        <h2 className="font-heading font-bold text-lg md:text-xl xl:text-2xl uppercase">{s.title}</h2>
                                    </div>
                                    <div className="pl-9 text-foreground/70 leading-relaxed whitespace-pre-line">
                                        {s.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}