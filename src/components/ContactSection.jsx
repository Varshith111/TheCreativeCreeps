import ContactForm from "./ContactForm";
import { Reveal, SectionLabel } from "./ui";
import { EMAIL, SOCIALS } from "../data";

/** Full-width neon-lime contact block with the enquiry form. */
export default function ContactSection({ num = "05", headingLevel = "h2" }) {
  const Heading = headingLevel;
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden bg-lime py-[clamp(88px,12vw,170px)] [--logo-bg:var(--color-lime)]">
      {/* oversized background word */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[.2em] -right-[.05em] select-none font-display text-[clamp(10rem,30vw,30rem)] font-black uppercase leading-none tracking-[-.06em] text-ink/[.06] [font-stretch:75%]"
      >
        Creep
      </span>

      <div className="wrap relative">
        <SectionLabel num={num}>Contact — Start a project</SectionLabel>

        <div className="mt-[clamp(32px,5vw,64px)] grid items-start gap-[clamp(40px,6vw,96px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <Reveal>
            <Heading
              id="contact-title"
              className="font-display text-[clamp(3rem,7.4vw,7.4rem)] font-black uppercase leading-[.84] tracking-[-.05em] [font-stretch:85%]"
            >
              Got a weird idea?
              <br />
              <span className="font-extralight [font-stretch:110%]">Let’s make it</span>{" "}
              <span className="relative inline-block">
                creep.
                <svg viewBox="0 0 300 24" preserveAspectRatio="none" className="absolute -bottom-[.02em] left-0 h-[.12em] w-full" aria-hidden="true">
                  <path d="M4 16 C60 4 120 22 180 10 S270 6 296 14" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                </svg>
              </span>
            </Heading>

            <p className="mt-8 max-w-[40ch] text-lg">Tell us what you’re making. We reply within two working days — usually sooner, we’re nosy.</p>

            <dl className="mt-10 grid gap-6 border-t-2 border-ink pt-6 sm:grid-cols-2">
              <div>
                <dt className="label opacity-70">Email</dt>
                <dd className="mt-2">
                  <a href={`mailto:${EMAIL}`} className="link-underline break-all font-display text-lg font-bold">
                    {EMAIL}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label opacity-70">Elsewhere</dt>
                <dd className="mt-2">
                  <ul className="flex flex-wrap gap-x-4 gap-y-1">
                    {SOCIALS.map(({ label, href }) => (
                      <li key={label}>
                        <a href={href} target="_blank" rel="noopener" className="font-bold hover:underline">
                          {label} <span aria-hidden="true">↗</span>
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
