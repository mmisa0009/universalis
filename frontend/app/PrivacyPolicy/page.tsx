import Navbar from './components/Navbar';
import Footer from './components/Footer';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-[#001c3d] mb-3">{title}</h2>
            <div className="text-[#44474e] text-sm md:text-base leading-relaxed space-y-3">
                {children}
            </div>
        </section>
    );
}

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-[#FFF8F0]">
            <div className="bg-[url('/maastricht.png')] bg-cover bg-center h-[80vh] flex flex-col items-center justify-center">
                <Navbar />
                <div className="flex items-center text-center justify-center backdrop-blur-sm text-[8vmin] w-[80%] h-[65%] lg:max-w-none bg-white/10 p-8 rounded-lg xl:px-20 shadow-[12px_12px_30px_rgba(0,0,0,0.35)]">
                    Privacy Policy
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-16">
                <p className="text-xs uppercase tracking-widest text-[#735c00] font-bold mb-10">
                    Last updated: September 2026
                </p>

                <Section title="Who we are">
                    <p>
                        UCMSA Universalis is a multicultural and multidisciplinary student association
                        directly affiliated with University College Maastricht (UCM). It is run by UCM
                        students, for UCM students, and contributes to both the academic and social life
                        at UCM.
                    </p>
                    <p>
                        For the purposes of data protection law, UCMSA Universalis is the &ldquo;data
                        controller&rdquo; responsible for the personal data described in this policy. Our
                        website address is{' '}
                        <a href="https://ucmsa-universalis.nl" className="underline hover:text-[#001c3d]">
                            ucmsa-universalis.nl
                        </a>
                        . If you have any questions about this policy or how we handle your personal data,
                        you can reach us at{' '}
                        <a href="mailto:ucmsa-secretary@maastrichtuniversity.nl" className="underline hover:text-[#001c3d]">
                            ucmsa-secretary@maastrichtuniversity.nl
                        </a>
                        .
                    </p>
                </Section>

                <Section title="What personal data we collect and why">
                    <p className="font-semibold text-[#001c3d]">Account &amp; login</p>
                    <p>
                        When you create an account, we collect the email address, username, and password
                        you provide. Your password is never stored in plain text — it is hashed before
                        being saved, so we cannot see or recover it ourselves. We use this information
                        solely to let you log in, verify your identity, and access member-only areas of the
                        site. Account creation is currently limited to Maastricht University email
                        addresses (@maastrichtuniversity.nl or @student.maastrichtuniversity.nl) to confirm
                        you are a member of the UCM community.
                    </p>
                    <p className="font-semibold text-[#001c3d]">Board &amp; committee information</p>
                    <p>
                        Names, positions, terms, and photos of board members and committee contacts are
                        published on our &ldquo;Meet Our Team&rdquo;, Previous Boards, and Committees pages.
                        This information is added by admins and board members through the site, and is
                        published in the public interest of transparent association governance — anyone
                        taking on a board or committee role can expect their name and role to be publicly
                        associated with UCMSA Universalis for as long as they hold that position, and
                        afterwards as part of our historical record of past boards.
                    </p>
                    <p className="font-semibold text-[#001c3d]">Media you upload</p>
                    <p>
                        If you (as an admin or board member) upload images to the website — for example a
                        member photo, a committee photo, or an announcement image — please avoid uploading
                        images with embedded location data (EXIF GPS) included. These images are stored
                        publicly and visitors to the website can, in principle, download them and extract
                        any location data embedded in the file.
                    </p>
                    <p className="font-semibold text-[#001c3d]">Technical &amp; server data</p>
                    <p>
                        Like virtually all websites, our hosting and infrastructure providers automatically
                        record standard technical information for security and operational purposes — such
                        as IP address, browser type, and request timestamps — in server logs. We do not use
                        this information for advertising, profiling, or analytics, and we do not run any
                        analytics or tracking scripts on this site.
                    </p>
                </Section>

                <Section title="Our legal basis for processing your data">
                    <p>Under the GDPR, we rely on the following legal grounds:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <span className="font-semibold text-[#001c3d]">Performance of a contract</span> —
                            to create and maintain your account and provide you with the services of the
                            website (Art. 6(1)(b) GDPR).
                        </li>
                        <li>
                            <span className="font-semibold text-[#001c3d]">Legitimate interest</span> — to
                            publicly represent our board and committees, keep a historical record of past
                            boards, and keep the site secure (e.g. limiting sign-up abuse) (Art. 6(1)(f)
                            GDPR).
                        </li>
                        <li>
                            <span className="font-semibold text-[#001c3d]">Consent</span> — where you have
                            separately given it, for example if you choose to upload optional content.
                            You may withdraw consent at any time by contacting us.
                        </li>
                    </ul>
                </Section>

                <Section title="Who we share your data with">
                    <p>
                        We do not sell your personal data. We share it only with the service providers that
                        help us run the website, acting on our instructions:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <span className="font-semibold text-[#001c3d]">Supabase</span> — hosts our
                            database and handles account authentication (sign-up, login, password resets).
                        </li>
                        <li>
                            <span className="font-semibold text-[#001c3d]">Amazon Web Services (S3)</span> —
                            stores uploaded images and documents, in our EU (Frankfurt) region.
                        </li>
                        <li>
                            <span className="font-semibold text-[#001c3d]">Vercel</span> — hosts the website
                            itself.
                        </li>
                        <li>
                            <span className="font-semibold text-[#001c3d]">Google Fonts</span> — we load one
                            icon font directly from Google&apos;s servers, which receives your device&apos;s
                            IP address when the page loads. Our other fonts are self-hosted and do not
                            contact Google.
                        </li>
                    </ul>
                    <p>
                        Some of these providers may process data outside the European Economic Area (EEA).
                        Where that is the case, they do so under an adequacy decision or appropriate
                        safeguards (such as the EU Standard Contractual Clauses) as required by the GDPR.
                    </p>
                </Section>

                <Section title="How long we retain your data">
                    <p>
                        We keep your account information (email address and hashed password) for as long as
                        your account is active, and in any case no longer than five years. If your account
                        has been inactive for 2–3 years, we may delete it and the personal data associated
                        with it. Your account and its data are also deleted sooner, at any time, if you
                        request this or delete your account yourself.
                    </p>
                    <p>
                        Content published through the site — such as member profiles, announcements,
                        committee listings, and uploaded documents — is kept until it is edited or removed
                        by an admin or board member, or as long as it remains relevant to our historical
                        record (e.g. Previous Boards).
                    </p>
                </Section>

                <Section title="Cookies and similar technologies">
                    <p>
                        We do not use cookies, and we do not run any advertising or analytics trackers on
                        this site. We do use your browser&apos;s local storage for a small number of
                        strictly necessary, functional purposes: to keep you logged in between visits, and
                        to remember the homepage&apos;s background image so it loads instantly. This
                        information stays on your own device, is never sent to advertisers, and is not used
                        to track you across other websites.
                    </p>
                </Section>

                <Section title="Your rights">
                    <p>
                        Under the GDPR, you have the right to:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Request access to the personal data we hold about you;</li>
                        <li>Request that we correct any inaccurate or incomplete data;</li>
                        <li>Request that we erase your personal data (&ldquo;right to be forgotten&rdquo;);</li>
                        <li>Request that we restrict or object to certain processing of your data;</li>
                        <li>Request a copy of your data in a portable, machine-readable format; and</li>
                        <li>Withdraw your consent at any time, where we rely on consent.</li>
                    </ul>
                    <p>
                        These rights are not unlimited — for example, we may need to keep some information
                        for legitimate administrative, legal, or security purposes even after a deletion
                        request. To exercise any of these rights, contact us at{' '}
                        <a href="mailto:ucmsa-secretary@maastrichtuniversity.nl" className="underline hover:text-[#001c3d]">
                            ucmsa-secretary@maastrichtuniversity.nl
                        </a>
                        . We will respond within one month, as required by the GDPR.
                    </p>
                    <p>
                        If you believe we have not handled your personal data properly, you also have the
                        right to lodge a complaint with the Dutch Data Protection Authority (Autoriteit
                        Persoonsgegevens),{' '}
                        <a href="https://www.autoriteitpersoonsgegevens.nl" className="underline hover:text-[#001c3d]">
                            autoriteitpersoonsgegevens.nl
                        </a>
                        .
                    </p>
                </Section>

                <Section title="How we protect your data">
                    <p>
                        We use industry-standard measures to protect your data, including encrypted
                        connections (HTTPS), password hashing, and access controls that restrict
                        administrative actions to authorized board members and admins. No method of
                        transmission or storage is completely secure, but we work to protect your personal
                        data to the best of our ability.
                    </p>
                </Section>

                <Section title="Changes to this policy">
                    <p>
                        We may update this privacy policy from time to time, for example to reflect changes
                        in the services we use or in data protection law. We will update the &ldquo;last
                        updated&rdquo; date at the top of this page whenever we do.
                    </p>
                </Section>

                <Section title="Contact us">
                    <p>
                        If you have any questions about this privacy policy or how we handle your personal
                        data, please contact our secretary at{' '}
                        <a href="mailto:ucmsa-secretary@maastrichtuniversity.nl" className="underline hover:text-[#001c3d]">
                            ucmsa-secretary@maastrichtuniversity.nl
                        </a>
                        .
                    </p>
                </Section>
            </div>

            <Footer />
        </main>
    );
}
