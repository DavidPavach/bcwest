import PageHero from "#/components/PageHero";

const sections = [
    {
        title: 'Acceptance of Terms',
        content: `By accessing and using the BCWEST Terminal Freight Services Inc. website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use this website.`,
    },
    {
        title: 'Use of This Website',
        content: `This website is provided for informational purposes relating to BCWEST Terminal Freight Services Inc. and its services. You agree to use this website only for lawful purposes and in a manner that does not infringe the rights of others or restrict or inhibit anyone else's use and enjoyment of the website.`,
    },
    {
        title: 'Intellectual Property',
        content: `All content on this website — including text, images, graphics, logos, and design — is the property of BCWEST Terminal Freight Services Inc. or its content suppliers and is protected under Canadian and international copyright law. Unauthorized reproduction or use of any content from this site is prohibited.`,
    },
    {
        title: 'Service Inquiries & Contracts',
        content: `Information on this website regarding BCWEST services is for general informational purposes only and does not constitute a binding offer or contract. All freight transportation, terminal services, warehousing, and logistics services are subject to separate written agreements executed between BCWEST and its clients.`,
    },
    {
        title: 'Disclaimer of Warranties',
        content: `This website and its content are provided on an "as is" basis without warranties of any kind, either express or implied. BCWEST does not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.`,
    },
    {
        title: 'Limitation of Liability',
        content: `To the maximum extent permitted by applicable law, BCWEST Terminal Freight Services Inc. shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this website.`,
    },
    {
        title: 'Governing Law',
        content: `These Terms and Conditions are governed by and construed in accordance with the laws of the Province of Manitoba and the federal laws of Canada applicable therein. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Manitoba.`,
    },
    {
        title: 'Changes to These Terms',
        content: `BCWEST reserves the right to update these Terms and Conditions at any time. Changes will be effective immediately upon posting to this website. Your continued use of the website following any changes constitutes your acceptance of the revised terms.`,
    },
    {
        title: 'Contact',
        content: `For questions regarding these Terms and Conditions:

BCWEST Terminal Freight Services Inc.
201 Portage Avenue
Winnipeg, Manitoba R3B 3K6
Canada

Email: legal@bcwestterminal.ca
Phone: 204-958-5300`,
    },
];

export default function Terms() {
    return (
        <>
            <PageHero
                label="Terms & Conditions"
                title="Terms of Use."
                subtitle="Please read these Terms and Conditions carefully before using the BCWEST Terminal Freight Services Inc. website."
                backgroundImage="/verification.jpg"
            />
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 grid-overlay opacity-10" />
                <div className="relative mx-auto px-4 md:px-6 lg:px-8 xl:px-10 max-w-screen-2xl">
                    <div className="max-w-3xl">
                        <p className="mb-8 font-mono text-[10px] text-gold/60 uppercase tracking-widest">
                            {`Effective Date: January 1, 2026 // BCWEST_TERMS_V1`}
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